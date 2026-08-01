import Link from "next/link";
import FavoriteButton from "@/components/races/FavoriteButton";


type Props = {
  race:any;
  author:string;
  rating:string;
  favorites:number;
  views:number;
  isFavorite:boolean;
};



export default function RaceHeader({
  race,
  author,
  rating,
  favorites,
  views,
  isFavorite,
}:Props){


  return (

    <>

      <img
        src={race.image_url}
        alt={race.title}
        className="
        w-full
        h-[450px]
        object-cover
        "
      />



      <div
        className="
        p-8
        "
      >


        <div
          className="
          flex
          justify-between
          items-start
          gap-6
          "
        >



          <div>


            <h1
              className="
              text-5xl
              font-black
              "
            >

              🏁 {race.title}

            </h1>




            <Link
              href={`/profil/${author}`}
              className="
              mt-3
              inline-block
              text-green-400
              hover:text-green-300
              font-bold
              text-lg
              "
            >

              👤 {author}

            </Link>




            <div
              className="
              flex
              gap-6
              mt-5
              text-zinc-300
              text-lg
              "
            >

              <span>
                ⭐ {rating}
              </span>


              <span>
                ❤️ {favorites}
              </span>


              <span>
                👁️ {views}
              </span>


            </div>


          </div>




          <FavoriteButton

            raceId={race.id}

            initialFavorite={
              isFavorite
            }

          />



        </div>


      </div>


    </>

  );

}