import { supabase } from "@/lib/supabase";


export default async function CursePage(){


  const { data: curse, error } = await supabase
    .from("races")
    .select("*")
    .order("created_at", {
      ascending:false
    });



  if(error){

    console.log(error);

    return (
      <div className="text-white">
        Eroare la încărcarea curselor
      </div>
    );

  }




  return (

    <main className="
    min-h-screen
    bg-zinc-950
    text-white
    px-6
    py-12
    ">


      <div className="
      max-w-6xl
      mx-auto
      ">


        <h1 className="
        text-5xl
        font-extrabold
        text-center
        mb-10
        ">
          🏁 Curse publicate
        </h1>




        <div className="
        grid
        md:grid-cols-3
        gap-6
        ">



        {curse?.map((cursa)=>(


          <div

          key={cursa.id}

          className="
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
            h-48
            object-cover
            "

            />




            <div className="p-5">


              <h2 className="
              text-2xl
              font-bold
              mb-3
              ">

                {cursa.title}

              </h2>




              <p>
                📂 {cursa.category}
              </p>


              <p>
                🚗 {cursa.car}
              </p>


              <p>
                🔥 {cursa.class}
              </p>


              <p>
                🏆 Scor: {cursa.score}
              </p>


              <p>
                ⏱️ {cursa.duration}
              </p>



              <p className="
              text-sm
              text-zinc-400
              mt-3
              ">

                Publicată:
                {" "}
                {new Date(
                  cursa.created_at
                ).toLocaleDateString("ro-RO")}

              </p>



            </div>


          </div>


        ))}



        </div>


      </div>


    </main>

  );

}