import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function FavoritePage() {

  const supabase =
    await createSupabaseServerClient();

  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();

  if (!user) {

    return (

      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">

        <h1 className="text-4xl font-bold">

          Trebuie să fii logat.

        </h1>

      </main>

    );

  }

  const { data: favoriteIds } =
    await supabase
      .from("favorites")
      .select("race_id")
      .eq("user_id", user.id);

  const ids =
    favoriteIds?.map(
      (x) => x.race_id
    ) ?? [];

  let curse: any[] = [];

  if (ids.length > 0) {

    const { data } =
      await supabase
        .from("races")
        .select("*")
        .in("id", ids);

    curse = data ?? [];

  }

  return (

    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-5xl font-extrabold mb-10">

          ❤️ Favorite

        </h1>

        {

          curse.length === 0 ?

          (

            <div className="bg-zinc-900 rounded-2xl p-10 text-center">

              <h2 className="text-2xl font-bold">

                Nu ai curse favorite.

              </h2>

            </div>

          )

          :

          <div className="grid md:grid-cols-3 gap-6">

            {

              curse.map((cursa)=>(

                <Link
                  key={cursa.id}
                  href={`/cursa/${cursa.id}`}
                  className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-red-500 transition"
                >

                  <img
                    src={cursa.image_url}
                    className="w-full h-56 object-cover"
                    alt={cursa.title}
                  />

                  <div className="p-6">

                    <h2 className="text-2xl font-bold">

                      {cursa.title}

                    </h2>

                    <p className="mt-3">

                      🚗 {cursa.car}

                    </p>

                    <p>

                      ⭐ {cursa.rating ?? "0.0"}

                    </p>

                  </div>

                </Link>

              ))

            }

          </div>

        }

      </div>

    </main>

  );

}