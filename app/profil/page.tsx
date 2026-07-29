import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import { getRank } from "@/lib/rank";

export default async function ProfilPage() {

  const supabase =
    await createSupabaseServerClient();

  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();

  if (!user) {

    redirect("/login");

  }

  const {
    count: totalCurse,
  } = await supabase
    .from("races")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", user.id);

  const rank =
    getRank(totalCurse ?? 0);

  return (

    <main
      className="
      min-h-screen
      bg-zinc-950
      text-white
      px-6
      py-20
      "
    >

      <div
        className="
        max-w-3xl
        mx-auto
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-10
        "
      >

        <h1
          className="
          text-5xl
          font-extrabold
          mb-8
          "
        >
          👤 Profilul meu
        </h1>

        {/* Rang */}

        <div
          className="
          bg-zinc-950
          rounded-2xl
          border
          border-zinc-800
          p-8
          text-center
          mb-8
          "
        >

          <p className="text-gray-400">
            Rang comunitate
          </p>

          <h2
            className={`
            text-4xl
            font-extrabold
            mt-3
            ${rank.color}
            `}
          >
            {rank.title}
          </h2>

          <p
            className="
            mt-4
            text-xl
            text-gray-300
            "
          >
            🏁 {totalCurse ?? 0} curse încărcate
          </p>

        </div>

        <div className="space-y-6">

          <div
            className="
            bg-black
            rounded-xl
            p-5
            "
          >

            <p className="text-gray-400">
              Email
            </p>

            <p className="text-xl font-bold mt-2">
              {user.email}
            </p>

          </div>

          <div
            className="
            bg-black
            rounded-xl
            p-5
            "
          >

            <p className="text-gray-400">
              ID utilizator
            </p>

            <p
              className="
              text-sm
              text-green-400
              mt-2
              break-all
              "
            >
              {user.id}
            </p>

          </div>

          <div
            className="
            grid
            md:grid-cols-2
            gap-5
            "
          >

            <div
              className="
              bg-black
              rounded-xl
              p-5
              "
            >

              <p className="text-gray-400">
                Cont creat
              </p>

              <p className="font-bold mt-2">
                {new Date(
                  user.created_at
                ).toLocaleDateString("ro-RO")}
              </p>

            </div>

            <div
              className="
              bg-black
              rounded-xl
              p-5
              "
            >

              <p className="text-gray-400">
                Ultima conectare
              </p>

              <p className="font-bold mt-2">
                {user.last_sign_in_at
                  ? new Date(
                      user.last_sign_in_at
                    ).toLocaleDateString("ro-RO")
                  : "-"}
              </p>

            </div>

          </div>

          <div
            className="
            bg-green-900/30
            border
            border-green-700
            rounded-xl
            p-5
            "
          >

            <p className="text-green-400 font-bold">
              ✅ Cont verificat
            </p>

            <p className="mt-2 text-gray-300">
              Poți adăuga curse, vota și salva curse la favorite.
            </p>

          </div>

        </div>

      </div>

    </main>

  );

}