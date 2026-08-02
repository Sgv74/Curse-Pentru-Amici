import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";


export default async function CursePage(){


  const {
    data: curse,
    error
  } = await supabase
    .from("races")
    .select(`
      id,
      title,
      image_url,
      gallery_urls,
      category,
      car,
      class,
      duration,
      score,
      created_at
    `)
    .order(
      "created_at",
      {
        ascending:false
      }
    );



  if(error){

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

        <p className="text-red-400 font-bold">

          Eroare la încărcarea curselor

        </p>

      </main>

    );

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



        <header
          className="
          text-center
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

            🏁 Curse publicate

          </h1>



          <p
            className="
            mt-5
            text-xl
            text-muted
            "
          >

            Descoperă traseele create de comunitate.

          </p>


        </header>







        <div
          className="
          mt-16
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
          "
        >



        {
          curse?.map((cursa)=>{


            const numarPoze =
              cursa.gallery_urls?.length
              ?
              cursa.gallery_urls.length + 1
              :
              1;



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
                    via-transparent
                    "
                  />




                  {
                    numarPoze > 1 &&

                    <div
                      className="
                      absolute
                      top-4
                      right-4
                      bg-black/70
                      backdrop-blur
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-bold
                      "
                    >

                      📸 {numarPoze}

                    </div>

                  }



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
                    font-black
                    uppercase
                    tracking-widest
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
                    mt-6
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


                  </div>







                  <div
                    className="
                    mt-7
                    flex
                    justify-between
                    items-center
                    "
                  >


                    <span
                      className="
                      text-primary
                      font-black
                      text-lg
                      "
                    >

                      🏆 {cursa.score}

                    </span>




                    <span
                      className="
                      text-zinc-500
                      group-hover:text-accent
                      transition
                      font-bold
                      "
                    >

                      Vezi cursa →

                    </span>



                  </div>






                  <p
                    className="
                    mt-5
                    text-sm
                    text-muted
                    "
                  >

                    Publicată:

                    {" "}

                    {
                      new Date(
                        cursa.created_at
                      )
                      .toLocaleDateString(
                        "ro-RO"
                      )
                    }


                  </p>



                </div>



              </Link>

            );


          })
        }



        </div>



      </div>


    </main>

  );

}