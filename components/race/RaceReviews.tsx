import RaceReviewCard from "./RaceReviewCard";


type Review = {

  user_id:string;

  rating:number;

  comment:string | null;

  created_at:string;

  profiles?:{

    username?:string;

    avatar_url?:string | null;

  } | null;

};



export default function RaceReviews({

  reviews,

}: {

  reviews?:Review[] | null;

}) {


  return (

    <section

      className="
      rounded-3xl
      bg-surface
      border
      border-white/10
      p-6
      md:p-8
      "

    >





      <h2

        className="
        text-3xl
        font-black
        mb-8
        "

      >

        💬 Recenzii comunitate

      </h2>







      {

        !reviews || reviews.length === 0

        ?

        (

          <div

            className="
            rounded-2xl
            bg-background
            border
            border-white/10
            p-10
            text-center
            "

          >



            <div

              className="
              text-5xl
              mb-4
              "

            >

              💭

            </div>




            <p

              className="
              text-zinc-400
              text-lg
              "

            >

              Încă nu există review-uri pentru această cursă.

            </p>





            <p

              className="
              mt-3
              text-sm
              text-muted
              "

            >

              Fii primul care lasă o impresie comunității.

            </p>




          </div>

        )


        :

        (

          <div

            className="
            space-y-5
            "

          >


            {

              reviews.map((review)=>(


                <RaceReviewCard


                  key={
                    `${review.user_id}-${review.created_at}`
                  }


                  username={
                    review.profiles?.username ??
                    "Utilizator"
                  }


                  avatar={
  review.profiles?.avatar_url ?? null
}


                  rating={
                    review.rating
                  }


                  comment={
                    review.comment ?? ""
                  }


                  createdAt={

                    review.created_at

                    ?

                    new Date(
                      review.created_at
                    )
                    .toLocaleDateString(
                      "ro-RO"
                    )

                    :

                    "-"

                  }


                />


              ))

            }



          </div>

        )

      }





    </section>

  );

}