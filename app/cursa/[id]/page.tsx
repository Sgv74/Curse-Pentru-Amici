import { createSupabaseServerClient } from "@/lib/supabaseServer";

import RaceHeader from "@/components/race/RaceHeader";
import RaceCode from "@/components/race/RaceCode";
import RaceDetails from "@/components/race/RaceDetails";
import RaceDescription from "@/components/race/RaceDescription";
import RaceReviews from "@/components/race/RaceReviews";
import RaceSuggestions from "@/components/race/RaceSuggestions";
import Vote from "@/components/Vote";


export default async function CursaDetalii({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {


  const { id } = await params;


  const raceId = Number(id);



  if (Number.isNaN(raceId)) {

    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">

        <h1 className="text-4xl font-black">
          ❌ ID invalid
        </h1>

      </main>
    );

  }





  const supabase =
    await createSupabaseServerClient();





  const {
    data: race,
    error
  } =
  await supabase
    .from("races")
    .select("*")
    .eq(
      "id",
      raceId
    )
    .single();





  if(error || !race){

    return (

      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">

        <h1 className="text-4xl font-black">
          ❌ Cursa nu există
        </h1>

      </main>

    );

  }







  /*
    GALERIE

    image_url = imagine principala
    gallery = jsonb array

  */


  const gallery:string[] = Array.from(
    new Set(

      [
        race.image_url,

        ...(Array.isArray(race.gallery)
          ? race.gallery
          : [])

      ]

      .filter(
        Boolean
      )

    )
  );









  const {
    data:{
      user
    }
  } =
  await supabase.auth.getUser();









  /*
    AUTOR
  */


  const {
    data:author
  }
  =
  await supabase
    .from("profiles")
    .select(
      `
      username,
      avatar_url
      `
    )
    .eq(
      "id",
      race.user_id
    )
    .maybeSingle();









  /*
    VOT USER
  */


  let initialRating:number|null = null;

  let initialComment = "";



  if(user){


    const {
      data:vote
    }
    =
    await supabase
      .from("race_votes")
      .select(
        `
        rating,
        comment
        `
      )
      .eq(
        "race_id",
        raceId
      )
      .eq(
        "user_id",
        user.id
      )
      .maybeSingle();



    initialRating =
      vote?.rating ?? null;



    initialComment =
      vote?.comment ?? "";


  }









  /*
    FAVORITE TOTAL
  */


  const {
    count:favorites
  }
  =
  await supabase
    .from("favorites")
    .select(
      "*",
      {
        count:"exact",
        head:true
      }
    )
    .eq(
      "race_id",
      raceId
    );











  /*
    FAVORITE USER
  */


  let isFavorite = false;



  if(user){


    const {
      data:fav
    }
    =
    await supabase
      .from("favorites")
      .select("id")
      .eq(
        "race_id",
        raceId
      )
      .eq(
        "user_id",
        user.id
      )
      .maybeSingle();



    isFavorite =
      Boolean(fav);


  }









  /*
    REVIEWURI
  */


  const {
    data:reviews
  }
  =
  await supabase
    .from("race_votes")
    .select(
      `
      rating,
      comment,
      created_at,
      user_id
      `
    )
    .eq(
      "race_id",
      raceId
    )
    .order(
      "created_at",
      {
        ascending:false
      }
    );










  const reviewsWithProfiles =
  await Promise.all(

    (reviews ?? [])
    .map(
      async(review)=>{


        const {
          data:profile
        }
        =
        await supabase
          .from("profiles")
          .select(
            `
            username,
            avatar_url
            `
          )
          .eq(
            "id",
            review.user_id
          )
          .maybeSingle();



        return {

          ...review,

          profiles:profile

        };


      }
    )

  );









  /*
    RATING GENERAL
  */


  const rating =

    reviews && reviews.length > 0

    ?

    (
      reviews.reduce(
        (
          total,
          item
        ) =>
        total + item.rating,

        0
      )

      /

      reviews.length

    )
    .toFixed(1)

    :

    "0.0";












  /*
    VIEW COUNT
  */


  const {
    count:views
  }
  =
  await supabase
    .from("race_views")
    .select(
      "*",
      {
        count:"exact",
        head:true
      }
    )
    .eq(
      "race_id",
      raceId
    );












  /*
    SUGESTII
  */


  const {
    data:suggested
  }
  =
  await supabase
    .from("races")
    .select(
      `
      id,
      title,
      image_url,
      category,
      car,
      score
      `
    )
    .eq(
      "category",
      race.category
    )
    .neq(
      "id",
      raceId
    )
    .limit(4);













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
        max-w-6xl
        mx-auto
        "
      >



        <div
          className="
          overflow-hidden
          rounded-[40px]
          border
          border-white/10
          bg-surface
          shadow-2xl
          "
        >



          <RaceHeader

            race={race}

            gallery={gallery}

            author={
              author?.username ??
              "Necunoscut"
            }

            rating={rating}

            favorites={
              favorites ?? 0
            }

            views={
              views ?? 0
            }

            isFavorite={
              isFavorite
            }

          />







          <div
            className="
            p-6
            md:p-10
            space-y-10
            "
          >



            <RaceCode

              shareCode={
                race.share_code
              }

            />







            <RaceDetails

              category={
                race.category
              }

              car={
                race.car
              }

              raceClass={
                race.class
              }

              score={
                race.score
              }

              duration={
                race.duration
              }

              createdAt={
                new Date(
                  race.created_at
                )
                .toLocaleDateString(
                  "ro-RO"
                )
              }

            />









            <RaceDescription

              description={
                race.description
              }

            />









            <Vote

              raceId={
                race.id
              }

              initialRating={
                initialRating
              }

              initialComment={
                initialComment
              }

            />











            <RaceReviews

              reviews={
                reviewsWithProfiles
              }

            />









            <RaceSuggestions

              races={
                suggested ?? []
              }

            />



          </div>



        </div>



      </div>



    </main>

  );


}