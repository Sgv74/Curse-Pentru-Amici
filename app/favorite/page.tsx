import Link from "next/link";
import Image from "next/image";
import { createSupabaseServerClient } from "@/lib/supabaseServer";


export default async function FavoritePage() {


  const supabase =
    await createSupabaseServerClient();



  const {
    data:{
      user
    }
  } =
  await supabase.auth.getUser();





  if(!user){

    return (

      <main
        className="
        min-h-screen
        bg-background
        text-white
        flex
        items-center
        justify-center
        px-6
        "
      >

        <div
          className="
          bg-surface
          border
          border-white/10
          rounded-3xl
          p-10
          text-center
          "
        >

          <h1
            className="
            text-4xl
            font-black
            "
          >

            🔒 Trebuie să fii logat

          </h1>


          <p
            className="
            mt-4
            text-muted
            "
          >

            Intră în cont pentru a vedea cursele favorite.

          </p>


        </div>

      </main>

    );

  }






  const {
    data:favoriteIds
  }
  =
  await supabase
    .from("favorites")
    .select("race_id")
    .eq(
      "user_id",
      user.id
    );





  const ids =
    favoriteIds?.map(
      item=>item.race_id
    ) ?? [];






  let curse:any[] = [];





  if(ids.length > 0){


    const {
      data
    }
    =
    await supabase
      .from("races")
      .select("*")
      .in(
        "id",
        ids
      )
      .order(
        "created_at",
        {
          ascending:false
        }
      );


    curse =
      data ?? [];


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

            ❤️ Curse favorite

          </h1>



          <p
            className="
            mt-5
            text-xl
            text-muted
            "
          >

            Cursele pe care le-ai salvat pentru mai târziu.

          </p>


        </div>









        {
          curse.length === 0

          ?

          (

            <div
              className="
              bg-surface
              border
              border-white/10
              rounded-3xl
              p-12
              text-center
              "
            >

              <div
                className="
                text-6xl
                "
              >

                🏁

              </div>


              <h2
                className="
                mt-5
                text-3xl
                font-black
                "
              >

                Nu ai curse favorite

              </h2>


              <p
                className="
                mt-3
                text-muted
                "
              >

                Apasă ❤️ pe o cursă pentru a o salva aici.

              </p>


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
                curse.map((cursa)=>(


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
                          🏆 {cursa.score}
                        </p>


                      </div>






                      <div
                        className="
                        mt-6
                        text-accent
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


          )

        }







      </div>



    </main>


  );


}