import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function ApreciatePage() {

  const supabase =
    await createSupabaseServerClient();

  const { data: curse } =
    await supabase
      .from("races")
      .select("*");

  if (!curse) {

    return null;

  }

  const curseCuRating = await Promise.all(

    curse.map(async (cursa) => {

      const { data: voturi } =
        await supabase
          .from("race_votes")
          .select("rating")
          .eq("race_id", cursa.id);

      const total = voturi?.length ?? 0;

      const rating =
        total > 0
          ? voturi!.reduce((s, v) => s + v.rating, 0) / total
          : 0;

      return {

        ...cursa,

        rating,

        votes: total,

      };

    })

  );

  curseCuRating.sort(
    (a, b) => b.rating - a.rating
  );

  return (

    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-5xl font-extrabold mb-10">

          🏆 Cele mai apreciate curse

        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {curseCuRating.map((cursa) => (

            <Link
              key={cursa.id}
              href={`/cursa/${cursa.id}`}
              className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-yellow-400 transition"
            >

              <img
                src={cursa.image_url}
                alt={cursa.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">

                <h2 className="text-2xl font-bold">

                  {cursa.title}

                </h2>

                <p className="mt-3">

                  ⭐ {cursa.rating.toFixed(1)} / 5

                </p>

                <p className="text-gray-400">

                  {cursa.votes} voturi

                </p>

                <p className="mt-3">

                  🚗 {cursa.car}

                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </main>

  );

}