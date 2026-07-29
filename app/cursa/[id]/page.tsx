import { createSupabaseServerClient } from "@/lib/supabaseServer";
import Vote from "../../../components/Vote";
import FavoriteButton from "../../../components/races/FavoriteButton";
import Link from "next/link";


export default async function CursaDetalii({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {


  const { id } = await params;

  const idCursa = Number(id);


  const supabase =
    await createSupabaseServerClient();




  const {
    data: cursa,
    error,
  } =
  await supabase
    .from("races")
    .select("*")
    .eq(
      "id",
      idCursa
    )
    .single();



  if(error || !cursa){

    return (

      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">

        <h1 className="text-4xl font-bold">
          ❌ Cursa nu a fost găsită
        </h1>

      </main>

    );

  }







  // AUTOR CURSA

  const {
    data: autor
  } =
  await supabase
    .from("profiles")
    .select("username")
    .eq(
      "id",
      cursa.user_id
    )
    .maybeSingle();








  // USER LOGAT

  const {
    data:{
      user
    }
  } =
  await supabase.auth.getUser();









  // VOTURI + REVIEW-URI


  const {
    data: reviews
  } =
  await supabase
    .from("race_votes")
    .select(`
      rating,
      comment,
      created_at,
      user_id
    `)
    .eq(
      "race_id",
      idCursa
    )
    .order(
      "created_at",
      {
        ascending:false
      }
    );






  const totalVoturi =
    reviews?.length || 0;



  const medieRating =
    totalVoturi > 0

    ?

    (
      reviews!.reduce(
        (
          total,
          review
        ) =>
          total + review.rating,
        0
      )
      /
      totalVoturi
    ).toFixed(1)

    :

    "0.0";








  // VOTUL MEU


  let votInitial:number | null = null;


  let comentariuInitial:string | null = null;



  if(user){


    const {
      data:votUser
    }
    =
    await supabase
      .from("race_votes")
      .select("rating, comment")
      .eq(
        "race_id",
        idCursa
      )
      .eq(
        "user_id",
        user.id
      )
      .maybeSingle();



    votInitial =
      votUser?.rating ?? null;


    comentariuInitial =
      votUser?.comment ?? "";

  }










  // FAVORITE


  let isFavorite = false;



  if(user){


    const {
      data:favorite
    }
    =
    await supabase
      .from("favorites")
      .select("id")
      .eq(
        "user_id",
        user.id
      )
      .eq(
        "race_id",
        idCursa
      )
      .maybeSingle();



    isFavorite = !!favorite;

  }









  return (

    <main
      className="
      min-h-screen
      bg-zinc-950
      text-white
      px-6
      py-12
      "
    >


      <div
        className="
        max-w-5xl
        mx-auto
        bg-zinc-900
        rounded-2xl
        overflow-hidden
        border
        border-zinc-800
        "
      >



        <img

          src={cursa.image_url}

          alt={cursa.title}

          className="
          w-full
          h-[450px]
          object-cover
          "

        />





        <div className="p-8">





          <div
            className="
            flex
            justify-between
            items-start
            gap-5
            "
          >



            <div>


              <h1 className="text-5xl font-extrabold">

                🏁 {cursa.title}

              </h1>



              <Link
                href={`/profil/${autor?.username}`}
                className="
                block
                mt-3
                text-green-400
                font-bold
                "
              >

                👤 Creat de {autor?.username || "Utilizator"}

              </Link>


            </div>





            <FavoriteButton

              raceId={cursa.id}

              initialFavorite={isFavorite}

            />


          </div>









          <div
            className="
            mt-8
            bg-black
            rounded-xl
            p-5
            "
          >

            <p className="text-yellow-400 text-2xl font-bold">

              ⭐ {medieRating} / 5

            </p>


            <p className="text-gray-400 mt-2">

              {totalVoturi} review-uri

            </p>


          </div>









          <Vote

            raceId={cursa.id}

            initialRating={votInitial}

            initialComment={comentariuInitial}

          />









          <div
            className="
            mt-10
            space-y-4
            text-xl
            "
          >

            <p>
              📂 Categorie: {cursa.category}
            </p>

            <p>
              🚗 Mașină: {cursa.car}
            </p>

            <p>
              🔥 Clasă: {cursa.class}
            </p>

            <p>
              🏆 Scor: {cursa.score}
            </p>

            <p>
              ⏱️ Durată: {cursa.duration}
            </p>

            <p>
              📅 Publicată:{" "}
              {new Date(
                cursa.created_at
              ).toLocaleDateString("ro-RO")}
            </p>

          </div>









          <div className="mt-10">


            <h2 className="text-3xl font-bold mb-4">

              📝 Descriere

            </h2>


            <p className="text-gray-300 text-lg">

              {cursa.description}

            </p>


          </div>









          <div className="mt-10">


            <h2 className="text-3xl font-bold mb-4">

              🎮 Cod FH6

            </h2>



            <div className="bg-black rounded-xl p-5 text-green-400 font-bold">

              {cursa.share_code}

            </div>


          </div>









          <div className="mt-12">


            <h2 className="text-3xl font-bold mb-6">

              💬 Review-uri

            </h2>





            {
              !reviews || reviews.length === 0

              ?

              (

                <div className="bg-black rounded-xl p-6 text-gray-400">

                  Încă nu există review-uri.

                </div>

              )

              :

              (

                <div className="space-y-5">


                  {
                    reviews.map((review)=>(


                      <Review

                        key={review.user_id}

                        review={review}

                      />


                    ))
                  }


                </div>

              )

            }


          </div>







        </div>


      </div>


    </main>

  );

}









async function Review({
  review,
}:{
  review:any;
}) {


  const supabase =
    await createSupabaseServerClient();



  const {
    data:profil
  }
  =
  await supabase
    .from("profiles")
    .select("username")
    .eq(
      "id",
      review.user_id
    )
    .maybeSingle();




  return (

    <div className="bg-black rounded-xl p-6">


      <Link
        href={`/profil/${profil?.username}`}
        className="
        text-green-400
        font-bold
        "
      >

        👤 {profil?.username || "Utilizator"}

      </Link>



      <p className="text-yellow-400 text-2xl mt-3">

        {"⭐".repeat(review.rating)}

      </p>



      {
        review.comment &&

        <p className="text-gray-300 mt-4 whitespace-pre-wrap">

          {review.comment}

        </p>

      }



      <p className="text-gray-500 text-sm mt-4">

        {new Date(
          review.created_at
        ).toLocaleDateString("ro-RO")}

      </p>


    </div>

  );

}