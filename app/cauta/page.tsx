import Link from "next/link";
import Image from "next/image";
import { createSupabaseServerClient } from "@/lib/supabaseServer";


type Props = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    car?: string;
    class?: string;
  }>;
};



export default async function CautaPage({
  searchParams,
}: Props) {


  const params = await searchParams;


  const search = params.search ?? "";
  const category = params.category ?? "";
  const car = params.car ?? "";
  const raceClass = params.class ?? "";



  const supabase =
    await createSupabaseServerClient();



  let query =
    supabase
      .from("races")
      .select("*")
      .order(
        "created_at",
        {
          ascending:false
        }
      );




  if(search){

    query = query.or(
      `
      title.ilike.%${search}%,
      car.ilike.%${search}%,
      category.ilike.%${search}%,
      class.ilike.%${search}%
      `
    );

  }




  if(category){

    query = query.eq(
      "category",
      category
    );

  }




  if(car){

    query = query.ilike(
      "car",
      `%${car}%`
    );

  }




  if(raceClass){

    query = query.eq(
      "class",
      raceClass
    );

  }




  const {
    data:curse
  } =
  await query;





  return (

    <main
      className="
      min-h-screen
      bg-background
      text-white
      px-6
      py-24
      "
    >


      <div
        className="
        max-w-7xl
        mx-auto
        "
      >



        <h1
          className="
          text-5xl
          font-black
          mb-10
          "
        >

          🔎 Rezultate căutare

        </h1>





        <div
          className="
          mb-10
          text-muted
          "
        >

          {
            curse?.length ?? 0
          }

          {" "}
          curse găsite

        </div>







        {
          !curse || curse.length === 0

          ?

          (

            <div
              className="
              bg-surface
              border
              border-white/10
              rounded-3xl
              p-10
              text-center
              text-xl
              "
            >

              ❌ Nu am găsit curse cu aceste criterii.

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
                    bg-surface
                    border
                    border-white/10
                    rounded-3xl
                    overflow-hidden
                    hover:border-primary
                    hover:-translate-y-2
                    transition
                    "

                  >



                    <div
                      className="
                      relative
                      h-56
                      "
                    >

                      <Image

                        src={
                          cursa.image_url ||
                          "/placeholder-race.jpg"
                        }

                        alt={cursa.title}

                        fill

                        className="
                        object-cover
                        "

                      />


                    </div>






                    <div
                      className="
                      p-6
                      "
                    >


                      <p
                        className="
                        text-primary
                        text-sm
                        uppercase
                        font-black
                        "
                      >

                        {cursa.category}

                      </p>





                      <h2
                        className="
                        text-2xl
                        font-black
                        mt-3
                        "
                      >

                        {cursa.title}

                      </h2>






                      <div
                        className="
                        mt-5
                        text-muted
                        space-y-2
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