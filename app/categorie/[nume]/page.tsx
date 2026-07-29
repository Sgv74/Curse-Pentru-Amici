import Link from "next/link";
import { createSupabaseServerClient } from "../../../lib/supabaseServer";


export default async function PaginaCategorie({
  params,
}: {
  params: Promise<{
    nume: string;
  }>;
}) {


  const { nume } = await params;


  const supabase =
    await createSupabaseServerClient();




  const mapareCategorii: Record<string,string> = {

    "road-racing": "Road Racing",
    "street-racing": "Street Racing",
    "rally-racing": "Rally Racing",
    "cross-country": "Cross Country",
    "drift": "Drift",

  };



  const categorie =
    mapareCategorii[nume];




  if(!categorie){

    return (

      <main className="
      min-h-screen
      bg-zinc-950
      text-white
      flex
      items-center
      justify-center
      ">

        <h1 className="
        text-4xl
        font-bold
        ">
          Categoria nu există.
        </h1>

      </main>

    );

  }







  const {
    data: curse,
    error
  } =
  await supabase
    .from("races")
    .select(`
      *,
      race_votes(
        rating
      )
    `)
    .eq(
      "category",
      categorie
    )
    .order(
      "created_at",
      {
        ascending:false
      }
    );




  if(error){

    console.log(error);

  }






  return (

    <main className="
    min-h-screen
    bg-zinc-950
    text-white
    ">


      <div className="
      max-w-7xl
      mx-auto
      px-6
      py-12
      ">



        <h1 className="
        text-5xl
        font-extrabold
        mb-10
        ">

          🏁 {categorie}

        </h1>





        {
          !curse || curse.length === 0 ?


          <div className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-2xl
          p-10
          text-center
          ">

            <p className="
            text-2xl
            font-bold
            ">

              Nu există curse.

            </p>

          </div>



          :



          <div className="
          grid
          md:grid-cols-3
          gap-6
          ">


            {
              curse.map((cursa)=>{


                const voturi =
                  cursa.race_votes || [];



                const numarVoturi =
                  voturi.length;



                const rating =
                  numarVoturi > 0

                  ?

                  (
                    voturi.reduce(
                      (
                        total:number,
                        vot:any
                      ) =>
                      total + vot.rating,
                      0
                    )
                    /
                    numarVoturi
                  ).toFixed(1)

                  :

                  "0";



                const ratingRotunjit =
                  Math.round(
                    Number(rating)
                  );






                return (


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
                    ">





                    <img

                      src={cursa.image_url}

                      alt={cursa.title}

                      className="
                      w-full
                      h-52
                      object-cover
                      "

                    />





                    <div className="
                    p-6
                    ">



                      <h2 className="
                      text-2xl
                      font-bold
                      ">

                        {cursa.title}

                      </h2>




                      <p className="
                      text-gray-400
                      mt-3
                      ">

                        🚗 {cursa.car}

                      </p>




                      <p className="mt-2">

                        🔥 {cursa.class}

                      </p>




                      <p className="mt-2">

                        🏆 {cursa.score}

                      </p>




                      <p className="mt-2">

                        ⏱️ {cursa.duration}

                      </p>






                      <div className="
                      mt-5
                      text-yellow-400
                      text-xl
                      font-bold
                      ">


                        {
                          [1,2,3,4,5].map((stea)=>(

                            <span key={stea}>

                              {
                                stea <= ratingRotunjit
                                ? "⭐"
                                : "☆"
                              }

                            </span>

                          ))
                        }



                        <span className="
                        text-white
                        ml-2
                        ">

                          {rating}

                        </span>


                        <span className="
                        text-gray-400
                        text-sm
                        ml-2
                        ">

                          ({numarVoturi})

                        </span>



                      </div>






                      <p className="
                      mt-4
                      text-green-400
                      font-bold
                      ">

                        Vezi detalii →

                      </p>



                    </div>



                  </Link>


                );


              })
            }


          </div>


        }



      </div>


    </main>

  );

}