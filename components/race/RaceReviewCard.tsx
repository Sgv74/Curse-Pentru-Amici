import Link from "next/link";


type Props = {
  username:string;
  avatar:string | null;
  rating:number;
  comment:string | null;
  createdAt:string;
};


export default function RaceReviewCard({
  username,
  avatar,
  rating,
  comment,
  createdAt,
}:Props){


  return (

    <div
      className="
      bg-black
      border
      border-zinc-800
      rounded-2xl
      p-6
      "
    >



      <div
        className="
        flex
        items-center
        justify-between
        gap-4
        "
      >



        <div
          className="
          flex
          items-center
          gap-4
          "
        >



          <img
            src={
              avatar ||
              "/default-avatar.png"
            }
            alt={username}
            className="
            w-12
            h-12
            rounded-full
            object-cover
            border
            border-zinc-700
            "
          />




          <div>


            <Link
              href={`/${username}`}
              className="
              font-black
              text-green-400
              hover:text-green-300
              "
            >

              {username}

            </Link>



            <p
              className="
              text-sm
              text-zinc-500
              mt-1
              "
            >

              {createdAt}

            </p>


          </div>



        </div>





        <div
          className="
          text-yellow-400
          text-xl
          "
        >

          {"⭐".repeat(rating)}

        </div>



      </div>





      {
        comment &&

        <div
          className="
          mt-5
          bg-zinc-900
          rounded-xl
          p-4
          "
        >

          <p
            className="
            text-zinc-300
            leading-7
            whitespace-pre-wrap
            "
          >

            {comment}

          </p>

        </div>

      }



    </div>

  );

}