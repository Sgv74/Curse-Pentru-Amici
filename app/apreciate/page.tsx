import Link from "next/link";
import Image from "next/image";
import { createSupabaseServerClient } from "@/lib/supabaseServer";


export default async function ApreciatePage() {


  const supabase =
    await createSupabaseServerClient();




  const {
    data:curse
  }
  =
  await supabase
    .from("races")
    .select("*");





  if(!curse){

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
          text-3xl
          font-black
          "
        >

          Nu există curse.

        </h1>


      </main>

    );

  }








  const curseCuRating =
  await Promise.all(


    curse.map(async(cursa)=>{


      const {
        data:voturi
      }
      =
      await supabase
        .from("race_votes")
        .select("rating")
        .eq(
          "race_id",
          cursa.id
        );




      const total =
        voturi?.length ?? 0;




      const rating =

        total > 0

        ?

        voturi!.reduce(
          (
            suma,
            vot
          ) =>
          suma + vot.rating,

          0

        ) / total

        :

        0;





      return {

        ...cursa,

        rating,

        votes:total

      };


    })


  );







  curseCuRating.sort(
    (a,b)=>
    b.rating - a.rating
  );








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

            🏆 Cele mai apreciate curse

          </h1>




          <p
            className="
            mt-5
            text-xl
            text-muted
            "
          >

            Traseele cu cele mai bune note oferite de comunitate.

          </p>



        </div>









        <div
          className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
          "
        >






          {
            curseCuRating.map((cursa)=>(



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
                hover:border-yellow-400
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
                      ⭐ {cursa.rating.toFixed(1)} / 5
                    </p>


                    <p>
                      💬 {cursa.votes} voturi
                    </p>


                  </div>






                  <div
                    className="
                    mt-6
                    text-yellow-400
                    font-black
                    "
                  >

                    Vezi cursa →

                  </div>




                </div>





              </Link>



            ))
          }






        </div>






      </div>



    </main>


  );


}