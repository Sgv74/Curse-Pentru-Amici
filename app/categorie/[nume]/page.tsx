import Link from "next/link";
import Image from "next/image";
import { createSupabaseServerClient } from "../../../lib/supabaseServer";


export default async function PaginaCategorie({
  params,
}: {
  params: Promise<{
    nume:string;
  }>;
}) {


  const { nume } = await params;


  const supabase =
    await createSupabaseServerClient();




  const mapareCategorii:Record<string,string> = {

    "road-racing":"Road Racing",

    "street-racing":"Street Racing",

    "rally-racing":"Rally Racing",

    "cross-country":"Cross Country",

    "Troll":"Troll",

  };



  const categorie =
    mapareCategorii[nume];





  if(!categorie){

    return (

      <main
        className="
        min-h-screen
        bg-background
        text-white
        flex
        items-center
        justify-center
        "
      >

        <h1
          className="
          text-4xl
          font-black
          "
        >

          ❌ Categoria nu există

        </h1>

      </main>

    );

  }








  const {
    data:curse,
    error
  }
  =
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

    <main

      className="
      min-h-screen
      bg-background
      text-white
      px-6
      py-28
      "

    >



      <div
        className="
        max-w-7xl
        mx-auto
        "
      >






        <div
          className="
          text-center
          mb-16
          "
        >


          <p
            className="
            uppercase
            tracking-[0.4em]
            text-primary
            text-sm
            font-black
            "
          >

            FH6 România

          </p>




          <h1
            className="
            mt-5
            text-5xl
            md:text-6xl
            font-black
            "
          >

            🏁 {categorie}

          </h1>




          <p
            className="
            mt-5
            text-xl
            text-muted
            "
          >

            Descoperă traseele din această categorie.

          </p>



        </div>









        {
          !curse || curse.length === 0 ?


          (

            <div
              className="
              rounded-3xl
              bg-surface
              border
              border-white/10
              p-10
              text-center
              "
            >

              <h2
                className="
                text-2xl
                font-black
                "
              >

                Nu există curse aici.

              </h2>


            </div>

          )


          :



          (

            <div
              className="
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
              "
            >




              {
                curse.map((cursa)=>{



                  const voturi =
                    cursa.race_votes ?? [];



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
                        )=>
                        total + vot.rating,

                        0
                      )

                      /

                      numarVoturi

                    ).toFixed(1)

                    :

                    "0.0";





                  const ratingRotunjit =
                    Math.round(
                      Number(rating)
                    );






                  return (


                    <Link

                      key={cursa.id}

                      href={`/cursa/${cursa.id}`}


                      className="
                      group
                      overflow-hidden
                      rounded-3xl
                      bg-surface
                      border
                      border-white/10
                      hover:border-primary
                      hover:-translate-y-2
                      transition-all
                      duration-300
                      "

                    >





                      <div
                        className="
                        relative
                        h-56
                        overflow-hidden
                        "
                      >



                        <Image

                          src={
                            cursa.image_url ||
                            "/placeholder-race.png"
                          }

                          alt={
                            cursa.title
                          }

                          fill

                          sizes="
                          (max-width:768px) 100vw,
                          33vw
                          "

                          className="
                          object-cover
                          group-hover:scale-110
                          transition
                          duration-500
                          "

                        />




                        <div
                          className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/80
                          to-transparent
                          "
                        />



                      </div>









                      <div
                        className="
                        p-7
                        "
                      >



                        <span
                          className="
                          text-primary
                          text-xs
                          uppercase
                          tracking-widest
                          font-black
                          "
                        >

                          {cursa.category}

                        </span>





                        <h2
                          className="
                          mt-3
                          text-2xl
                          font-black
                          "
                        >

                          {cursa.title}

                        </h2>






                        <div
                          className="
                          mt-5
                          space-y-2
                          text-zinc-300
                          "
                        >

                          <p>
                            🚗 {cursa.car}
                          </p>


                          <p>
                            🔥 {cursa.class}
                          </p>


                          <p>
                            ⏱️ {cursa.duration}
                          </p>


                          <p>
                            🏆 {cursa.score}
                          </p>


                        </div>








                        <div
                          className="
                          mt-6
                          flex
                          items-center
                          gap-2
                          text-yellow-400
                          text-xl
                          font-black
                          "
                        >



                          {
                            [1,2,3,4,5].map((stea)=>(

                              <span key={stea}>

                                {
                                  stea <= ratingRotunjit
                                  ?
                                  "⭐"
                                  :
                                  "☆"
                                }

                              </span>

                            ))
                          }




                          <span
                            className="
                            text-white
                            text-base
                            ml-2
                            "
                          >

                            {rating}

                          </span>




                          <span
                            className="
                            text-zinc-500
                            text-sm
                            "
                          >

                            ({numarVoturi})

                          </span>



                        </div>







                        <div
                          className="
                          mt-6
                          text-primary
                          font-black
                          "
                        >

                          Vezi cursa →

                        </div>




                      </div>





                    </Link>


                  );


                })
              }





            </div>

          )

        }







      </div>




    </main>

  );

}