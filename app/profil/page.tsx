import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { getRank } from "@/lib/rank";
import { redirect } from "next/navigation";

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: string;
  value: string | number;
  label: string;
  color: string;
}) {
  return (
    <div
      className={`
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-6
        text-center
        transition
        duration-300
        hover:-translate-y-1
        ${color}
      `}
    >
      <div className="text-5xl mb-3">
        {icon}
      </div>

      <div className="text-4xl font-extrabold">
        {value}
      </div>

      <p className="text-zinc-400 mt-2">
        {label}
      </p>
    </div>
  );
}


export default async function ProfilPage() {

  const supabase = await createSupabaseServerClient();


  const {
    data: {
      user
    },
  } = await supabase.auth.getUser();


  if (!user) {
    redirect("/login");
  }


  const {
    count: totalCurse
  } = await supabase
    .from("races")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq(
      "user_id",
      user.id
    );


  const {
    data: raceIds
  } = await supabase
    .from("races")
    .select("id")
    .eq(
      "user_id",
      user.id
    );


  const ids =
    raceIds?.map(
      (race) => race.id
    ) ?? [];



  let totalReviews = 0;
  let totalFavorites = 0;
  let averageRating = 0;



  if (ids.length) {


    const {
      data: votes
    } = await supabase
      .from("race_votes")
      .select("rating")
      .in(
        "race_id",
        ids
      );


    totalReviews =
      votes?.length ?? 0;



    if (
      votes &&
      votes.length > 0
    ) {

      averageRating =
        votes.reduce(
          (
            total,
            vote
          ) =>
            total +
            vote.rating,
          0
        )
        /
        votes.length;

    }



    const {
      count
    } = await supabase
      .from("favorites")
      .select("*", {
        count:"exact",
        head:true,
      })
      .in(
        "race_id",
        ids
      );


    totalFavorites =
      count ?? 0;

  }



  const rank =
    getRank(
      totalCurse ?? 0
    );



  const progress =
    ((totalCurse ?? 0) % 10) * 10;



  const remaining =
    progress === 0
      ? 10
      : 10 - Math.floor(progress / 10);



  return (

    <main
      className="
      min-h-screen
      bg-zinc-950
      text-white
      px-5
      py-16
      "
    >


      <div
        className="
        max-w-6xl
        mx-auto
        "
      >



        <section className="mb-10">


          <h1
            className="
            text-4xl
            md:text-5xl
            font-black
            "
          >
            👋 Profilul meu
          </h1>


          <p
            className="
            text-zinc-400
            mt-3
            "
          >
            Conectat ca:

            <span
              className="
              text-white
              font-bold
              ml-2
              "
            >
              {user.email}
            </span>

          </p>


        </section>




        <section
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-5
          mb-10
          "
        >


          <StatCard
            icon="🏁"
            value={totalCurse ?? 0}
            label="Curse create"
            color="hover:border-green-500"
          />


          <StatCard
            icon="⭐"
            value={averageRating.toFixed(1)}
            label="Rating mediu"
            color="hover:border-yellow-500"
          />


          <StatCard
            icon="❤️"
            value={totalFavorites}
            label="Favorite primite"
            color="hover:border-pink-500"
          />


          <StatCard
            icon="💬"
            value={totalReviews}
            label="Review-uri"
            color="hover:border-cyan-500"
          />


        </section>





        <section
          className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-8
          mb-8
          "
        >


          <p
            className="
            text-zinc-400
            "
          >
            Rang comunitate
          </p>



          <h2
            className={`
            text-4xl
            font-black
            mt-2
            ${rank.color}
            `}
          >
            {rank.title}
          </h2>



          <p
            className="
            text-zinc-300
            mt-3
            text-lg
            "
          >
            🏁
            {totalCurse ?? 0}
            curse încărcate
          </p>




          <div
            className="
            h-3
            bg-zinc-800
            rounded-full
            overflow-hidden
            mt-6
            "
          >

            <div
              className="
              h-full
              bg-green-500
              rounded-full
              transition-all
              "
              style={{
                width:`${progress}%`
              }}
            />

          </div>



          <p
            className="
            text-zinc-400
            text-sm
            mt-3
            "
          >
            Încă {remaining}
            curse până la următorul rang.
          </p>


        </section>






        <section
          className="
          grid
          md:grid-cols-2
          gap-6
          mb-8
          "
        >


          <div
            className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-3xl
            p-7
            "
          >

            <h3
              className="
              text-2xl
              font-bold
              mb-6
              "
            >
              📄 Cont
            </h3>


            <div
              className="
              space-y-5
              "
            >

              <div>
                <p className="text-zinc-500">
                  Email
                </p>

                <p className="font-bold">
                  {user.email}
                </p>
              </div>



              <div>
                <p className="text-zinc-500">
                  Creat la
                </p>

                <p className="font-bold">
                  {
                    new Date(
                      user.created_at
                    )
                    .toLocaleDateString(
                      "ro-RO"
                    )
                  }
                </p>
              </div>



            </div>


          </div>




          <div
            className="
            bg-zinc-900
            border
            border-green-700
            rounded-3xl
            p-7
            "
          >

            <h3
              className="
              text-2xl
              font-bold
              text-green-400
              "
            >
              ✅ Racer verificat
            </h3>


            <p
              className="
              text-zinc-300
              mt-3
              "
            >
              Ai acces la toate funcțiile comunității.
            </p>


            <ul
              className="
              mt-6
              space-y-3
              "
            >

              <li>🏁 Publică curse</li>
              <li>⭐ Primește rating-uri</li>
              <li>❤️ Crește popularitatea</li>
              <li>📈 Urcă în clasament</li>

            </ul>


          </div>


        </section>






        <section
          className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-8
          "
        >


          <div
            className="
            flex
            justify-between
            items-center
            mb-8
            "
          >

            <h2
              className="
              text-3xl
              font-black
              "
            >
              🏁 Cursele mele
            </h2>


            <a
              href="/adauga"
              className="
              bg-green-600
              hover:bg-green-500
              px-5
              py-3
              rounded-xl
              font-bold
              "
            >
              ➕ Adaugă
            </a>


          </div>



          <div
            className="
            border-2
            border-dashed
            border-zinc-700
            rounded-2xl
            p-10
            text-center
            "
          >

            <div className="text-6xl">
              🚗
            </div>


            <h3
              className="
              text-2xl
              font-bold
              mt-4
              "
            >
              Dashboard curse în curând
            </h3>


            <p
              className="
              text-zinc-400
              mt-3
              "
            >
              Aici vor apărea cursele create,
              rating-ul și statisticile lor.
            </p>


          </div>


        </section>



      </div>


    </main>

  );
}