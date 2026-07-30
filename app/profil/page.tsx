import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import { getRank } from "@/lib/rank";

export default async function ProfilPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { count: totalCurse } = await supabase
    .from("races")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", user.id);

  const { data: raceIds } = await supabase
    .from("races")
    .select("id")
    .eq("user_id", user.id);

  const ids = raceIds?.map((race) => race.id) ?? [];

  let totalReviews = 0;
  let totalFavorites = 0;
  let averageRating = 0;

  if (ids.length > 0) {
    const { data: votes } = await supabase
      .from("race_votes")
      .select("rating")
      .in("race_id", ids);

    totalReviews = votes?.length ?? 0;

    if (votes && votes.length > 0) {
      averageRating =
        votes.reduce((sum, vote) => sum + vote.rating, 0) /
        votes.length;
    }

    const { count } = await supabase
      .from("favorites")
      .select("*", {
        count: "exact",
        head: true,
      })
      .in("race_id", ids);

    totalFavorites = count ?? 0;
  }

  const rank = getRank(totalCurse ?? 0);

  const progress = (totalCurse ?? 0) % 10;
  const remaining = progress === 0 ? 10 : 10 - progress;

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-20">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-extrabold mb-2">
          👋 Profilul meu
        </h1>

        <p className="text-zinc-400 mb-10">
          Bine ai revenit,
          <span className="font-bold text-white ml-2">
            {user.email}
          </span>
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          <div className="bg-zinc-900 border border-zinc-800 hover:border-green-500 hover:-translate-y-1 transition-all duration-300 rounded-2xl p-6 text-center">

            <div className="text-5xl mb-3">
              🏁
            </div>

            <p className="text-4xl font-extrabold">
              {totalCurse ?? 0}
            </p>

            <p className="text-zinc-400 mt-2">
              Curse create
            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 hover:border-yellow-500 hover:-translate-y-1 transition-all duration-300 rounded-2xl p-6 text-center">

            <div className="text-5xl mb-3">
              ⭐
            </div>

            <p className="text-4xl font-extrabold">
              {averageRating.toFixed(1)}
            </p>

            <p className="text-zinc-400 mt-2">
              Rating mediu
            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 hover:border-pink-500 hover:-translate-y-1 transition-all duration-300 rounded-2xl p-6 text-center">

            <div className="text-5xl mb-3">
              ❤️
            </div>

            <p className="text-4xl font-extrabold">
              {totalFavorites}
            </p>

            <p className="text-zinc-400 mt-2">
              Favorite primite
            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 hover:border-cyan-500 hover:-translate-y-1 transition-all duration-300 rounded-2xl p-6 text-center">

            <div className="text-5xl mb-3">
              💬
            </div>

            <p className="text-4xl font-extrabold">
              {totalReviews}
            </p>

            <p className="text-zinc-400 mt-2">
              Review-uri
            </p>

          </div>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">

          <p className="text-zinc-400">
            Rang comunitate
          </p>

          <h2 className={`text-4xl font-extrabold mt-3 ${rank.color}`}>
            {rank.title}
          </h2>

          <p className="mt-4 text-xl text-zinc-300">
            🏁 {totalCurse ?? 0} curse încărcate
          </p>

          <div className="w-full bg-zinc-800 rounded-full h-3 mt-6 overflow-hidden">

            <div
              className="bg-green-500 h-3 rounded-full"
              style={{
                width: `${progress * 10}%`,
              }}
            />

          </div>

          <p className="text-sm text-zinc-400 mt-3">
            Încă {remaining} curse până la următorul rang.
          </p>

        </div>
        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <h3 className="text-2xl font-bold mb-6">
              📄 Informații cont
            </h3>

            <div className="space-y-6">

              <div>

                <p className="text-zinc-500">
                  Email
                </p>

                <p className="text-lg font-bold mt-1">
                  {user.email}
                </p>

              </div>

              <div>

                <p className="text-zinc-500">
                  ID utilizator
                </p>

                <p className="text-sm text-green-400 break-all mt-1">
                  {user.id}
                </p>

              </div>

              <div>

                <p className="text-zinc-500">
                  Cont creat
                </p>

                <p className="font-semibold mt-1">
                  {new Date(user.created_at).toLocaleDateString("ro-RO")}
                </p>

              </div>

              <div>

                <p className="text-zinc-500">
                  Ultima conectare
                </p>

                <p className="font-semibold mt-1">
                  {user.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleDateString("ro-RO")
                    : "-"}
                </p>

              </div>

            </div>

          </div>

          <div className="bg-zinc-900 border border-green-700 rounded-2xl p-6 flex flex-col justify-center">

            <h3 className="text-2xl font-bold text-green-400 mb-4">
              ✅ Cont verificat
            </h3>

            <p className="text-zinc-300">
              Ai acces la toate funcțiile platformei.
            </p>

            <div className="mt-6 space-y-4">

              <div className="flex items-center gap-3">
                <span className="text-2xl">🏁</span>
                <span>Publică curse noi.</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl">⭐</span>
                <span>Lasă review-uri altor creatori.</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl">❤️</span>
                <span>Salvează curse la favorite.</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <span>Crește în clasamentul comunității.</span>
              </div>

            </div>

          </div>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-bold">
              🏁 Cursele mele
            </h2>

            <a
              href="/adauga"
              className="
              bg-green-600
              hover:bg-green-500
              transition
              px-5
              py-3
              rounded-xl
              font-bold
              "
            >
              ➕ Adaugă cursă
            </a>

          </div>

          <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-10 text-center">

            <div className="text-6xl mb-4">
              🚧
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Cursele tale vor apărea aici
            </h3>

            <p className="text-zinc-400 max-w-xl mx-auto">
              În următorul update vei putea vedea toate cursele create,
              împreună cu ratingul, review-urile, favoritele și vei putea
              edita sau șterge fiecare cursă direct din Dashboard.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}