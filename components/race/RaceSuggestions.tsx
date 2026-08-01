import Link from "next/link";


type Race = {
  id:number;
  title:string;
  image_url:string;
  category:string;
  car:string;
  score:number;
};



export default function RaceSuggestions({
  races,
}:{
  races:Race[];
}){


  if(!races || races.length === 0){
    return null;
  }



  return (

    <section
      className="
      mt-16
      "
    >



      <h2
        className="
        text-3xl
        font-black
        mb-8
        "
      >

        🏁 Poate îți vor plăcea și...

      </h2>





      <div
        className="
        grid
        sm:grid-cols-2
        lg:grid-cols-4
        gap-6
        "
      >



        {
          races.slice(0,4).map((race)=>(


            <Link

              key={race.id}

              href={`/cursa/${race.id}`}

              className="
              group
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              overflow-hidden
              hover:border-green-500
              transition
              "

            >



              <div
                className="
                overflow-hidden
                "
              >

                <img

                  src={race.image_url}

                  alt={race.title}

                  className="
                  w-full
                  h-44
                  object-cover
                  group-hover:scale-105
                  transition
                  "

                />

              </div>





              <div
                className="
                p-5
                "
              >



                <h3
                  className="
                  text-xl
                  font-black
                  line-clamp-2
                  "
                >

                  {race.title}

                </h3>





                <p
                  className="
                  text-zinc-400
                  mt-3
                  "
                >

                  📂 {race.category}

                </p>



                <p
                  className="
                  text-zinc-400
                  "
                >

                  🚗 {race.car}

                </p>




                <p
                  className="
                  text-green-400
                  font-bold
                  mt-4
                  "
                >

                  🏆 {race.score}

                </p>



              </div>




            </Link>


          ))
        }



      </div>


    </section>

  );

}