import RaceReviewCard from "./RaceReviewCard";


export default function RaceReviews({
  reviews,
}: {
  reviews:any[];
}) {


  return (

    <section
      className="
      mt-12
      bg-zinc-900
      border
      border-zinc-800
      rounded-2xl
      p-6
      "
    >



      <h2
  className="
  text-3xl
  font-black
  mb-6
  mt-10
  "
>
  💬 Recenzii comunitate
</h2>





      {
        !reviews ||
        reviews.length === 0

        ?

        (

          <div
            className="
            bg-black
            rounded-xl
            p-8
            text-zinc-400
            text-center
            "
          >

            <div className="text-4xl mb-3">
              💭
            </div>

            Încă nu există review-uri pentru această cursă.

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
                    review.profiles?.avatar_url
                  }

                  rating={
                    review.rating
                  }

                  comment={
                    review.comment
                  }

                  createdAt={
                    new Date(
                      review.created_at
                    )
                    .toLocaleDateString("ro-RO")
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