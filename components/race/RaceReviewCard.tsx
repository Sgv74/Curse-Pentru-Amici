import Image from "next/image";
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



  const ratingSafe = Math.min(
    Math.max(
      Number(rating) || 0,
      0
    ),
    5
  );



  return (

    <article

      className="
      rounded-3xl
      bg-background
      border
      border-white/10
      p-6
      hover:border-primary/30
      transition
      "

    >





      <div

        className="
        flex
        flex-col
        md:flex-row
        md:items-center
        justify-between
        gap-5
        "

      >





        <div

          className="
          flex
          items-center
          gap-4
          "

        >





          <Image

            src={
              avatar ||
              "/default-avatar.png"
            }

            alt={username}

            width={56}

            height={56}

            className="
            w-14
            h-14
            rounded-full
            object-cover
            border
            border-primary/40
            "

          />







          <div>



            <Link

              href={`/${username}`}

              className="
              font-black
              text-accent
              hover:text-primary
              transition
              "

            >

              {username}

            </Link>






            <p

              className="
              text-sm
              text-muted
              mt-1
              "

            >

              {createdAt}

            </p>





          </div>





        </div>








        <div

          className="
          px-4
          py-2
          rounded-full
          bg-primary/10
          border
          border-primary/20
          text-primary
          font-bold
          "

        >

          {"⭐".repeat(ratingSafe)}

        </div>





      </div>









      {

        comment &&

        <div

          className="
          mt-6
          rounded-2xl
          bg-surface
          border
          border-white/10
          p-5
          "

        >



          <p

            className="
            text-zinc-300
            leading-8
            whitespace-pre-wrap
            "

          >

            {comment}

          </p>



        </div>

      }






    </article>

  );

}