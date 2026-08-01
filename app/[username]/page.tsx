import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { getRank } from "@/lib/rank";


export default async function PublicProfile({
  params,
}: {
  params: Promise<{
    username: string;
  }>;
}) {


  const { username } = await params;


  const supabase =
    await createSupabaseServerClient();



  // Profil

  const {
    data: profile,
  } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .maybeSingle();



  if (!profile) {

    notFound();

  }




  // Cursele utilizatorului

  const {
    data: races,
  } = await supabase
    .from("races")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", {
      ascending: false,
    });



  const totalCurse =
    races?.length ?? 0;
const ids =
  races?.map((race) => race.id) ?? [];

let totalReviews = 0;
let totalFavorites = 0;
let averageRating = 0;

if (ids.length) {

  const {
    data: votes,
  } = await supabase
    .from("race_votes")
    .select("rating")
    .in("race_id", ids);

  totalReviews =
    votes?.length ?? 0;

  if (votes?.length) {

    averageRating =
      votes.reduce(
        (sum, vote) => sum + vote.rating,
        0
      ) / votes.length;

  }

  const {
    count,
  } = await supabase
    .from("favorites")
    .select("*", {
      count: "exact",
      head: true,
    })
    .in("race_id", ids);

  totalFavorites =
    count ?? 0;

}


  const rank =
    getRank(totalCurse);




  return (

    <main
      className="
      min-h-screen
      bg-zinc-950
      text-white
      px-6
      py-16
      "
    >


      <div className="max-w-6xl mx-auto">



        <div
          className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-8
          mb-10
          "
        >



          <img
            src={
              profile.avatar_url ||
              "/default-avatar.png"
            }
            alt="Avatar"
            className="
            w-28
            h-28
            rounded-full
            object-cover
            border-4
            border-zinc-700
            mb-6
            "
          />



          <h1
            className="
            text-5xl
            font-extrabold
            "
          >

            👤 {profile.username}

          </h1>




          <p
            className="
            text-zinc-400
            mt-4
            text-lg
            "
          >

            {
              profile.bio ||
              "Acest pilot nu are încă o descriere."
            }

          </p>




          <p
            className={`
            mt-5
            text-2xl
            font-bold
            ${rank.color}
            `}
          >

            {rank.title}

          </p>




          <p className="mt-3 text-gray-300">

            🏁 {totalCurse} curse încărcate

          </p>



        </div>





        <h2
          className="
          text-3xl
          font-bold
          mb-8
          "
        >

          🏁 Curse încărcate

        </h2>





        {totalCurse === 0 ? (


          <div
            className="
            bg-zinc-900
            rounded-xl
            border
            border-zinc-800
            p-8
            "
          >

            Acest utilizator nu a încărcat încă nicio cursă.

          </div>



        ) : (



          <div
            className="
            grid
            md:grid-cols-3
            gap-6
            "
          >



            {races?.map((cursa) => (



              <Link

                key={cursa.id}

                href={`/cursa/${cursa.id}`}

                className="
                bg-zinc-900
                rounded-2xl
                overflow-hidden
                border
                border-zinc-800
                hover:border-green-500
                transition
                "

              >



                <img

                  src={cursa.image_url}

                  alt={cursa.title}

                  className="
                  w-full
                  h-52
                  object-cover
                  "

                />




                <div className="p-6">



                  <h3
                    className="
                    text-2xl
                    font-bold
                    "
                  >

                    {cursa.title}

                  </h3>



                  <p className="mt-3 text-gray-400">
                    📂 {cursa.category}
                  </p>


                  <p className="text-gray-400">
                    🚗 {cursa.car}
                  </p>


                  <p className="text-gray-400">
                    🔥 {cursa.class}
                  </p>


                  <p className="mt-3">
                    🏆 {cursa.score}
                  </p>



                </div>



              </Link>



            ))}



          </div>



        )}



      </div>



    </main>

  );

}