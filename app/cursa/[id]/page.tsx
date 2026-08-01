import { createSupabaseServerClient } from "@/lib/supabaseServer";

import RaceHeader from "@/components/race/RaceHeader";
import RaceCode from "@/components/race/RaceCode";
import RaceDetails from "@/components/race/RaceDetails";
import RaceDescription from "@/components/race/RaceDescription";
import RaceReviews from "@/components/race/RaceReviews";
import RaceSuggestions from "@/components/race/RaceSuggestions";
import Vote from "../../../components/Vote";


export default async function CursaDetalii({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } = await params;

  const idCursa = Number(id);


  if (isNaN(idCursa)) {

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



  // CURSA

  const {
    data:cursa,
    error
  } =
  await supabase
    .from("races")
    .select("*")
    .eq(
      "id",
      idCursa
    )
    .single();



  if(error || !cursa){

    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">

        <h1 className="text-4xl font-black">
          ❌ Cursa nu există
        </h1>

      </main>
    );

  }




  // USER LOGAT

  const {
    data:{
      user
    }
  } =
  await supabase.auth.getUser();





  // AUTOR CURSĂ

  const {
    data:autor
  } =
  await supabase
    .from("profiles")
    .select(`
      username,
      avatar_url
    `)
    .eq(
      "id",
      cursa.user_id
    )
    .maybeSingle();







  // VIEW UNIC USER


  if(user){


    const {
      data:viewExist
    } =
    await supabase
      .from("race_views")
      .select("id")
      .eq(
        "race_id",
        idCursa
      )
      .eq(
        "user_id",
        user.id
      )
      .maybeSingle();



    if(!viewExist){


      await supabase
        .from("race_views")
        .insert({

          race_id:idCursa,

          user_id:user.id

        });



      await supabase
        .from("races")
        .update({

          views:
          (cursa.views ?? 0) + 1

        })
        .eq(
          "id",
          idCursa
        );


    }


  }







  // VOT USER


  let votInitial:number | null = null;

  let comentariuInitial = "";



  if(user){


    const {
      data:votUser
    } =
    await supabase
      .from("race_votes")
      .select(`
        rating,
        comment
      `)
      .eq(
        "race_id",
        idCursa
      )
      .eq(
        "user_id",
        user.id
      )
      .maybeSingle();



    votInitial =
      votUser?.rating ?? null;


    comentariuInitial =
      votUser?.comment ?? "";


  }







  // FAVORITE TOTAL


  const {
    count:favorites
  } =
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
      idCursa
    );









  // REVIEWS


  const {
    data:reviews
  } =
  await supabase
    .from("race_votes")
    .select(`
      rating,
      comment,
      created_at,
      user_id
    `)
    .eq(
      "race_id",
      idCursa
    )
    .order(
      "created_at",
      {
        ascending:false
      }
    );






  const reviewsWithProfiles =
  await Promise.all(

    (reviews ?? []).map(
      async(review)=>{


        const {
          data:profil
        } =
        await supabase
          .from("profiles")
          .select(`
            username,
            avatar_url
          `)
          .eq(
            "id",
            review.user_id
          )
          .maybeSingle();



        return {

          ...review,

          profiles:profil

        };


      }

    )

  );








  // RATING GENERAL


  const totalReviews =
    reviews?.length ?? 0;



  const rating =
    totalReviews > 0

    ?

    (
      reviews!.reduce(
        (
          total,
          review
        ) =>
        total + review.rating,

        0

      )

      /

      totalReviews

    ).toFixed(1)

    :

    "0.0";









  // FAVORIT USER


  let isFavorite = false;



  if(user){


    const {
      data:fav
    } =
    await supabase
      .from("favorites")
      .select("id")
      .eq(
        "race_id",
        idCursa
      )
      .eq(
        "user_id",
        user.id
      )
      .maybeSingle();



    isFavorite =
      Boolean(fav);


  }









  // SUGESTII


  const {
    data:suggested
  }
  =
  await supabase
    .from("races")
    .select(`
      id,
      title,
      image_url,
      category,
      car,
      score
    `)
    .eq(
      "category",
      cursa.category
    )
    .neq(
      "id",
      idCursa
    )
    .limit(4);









  // TOTAL VIEW-URI


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
      idCursa
    );








  return (

    <main
      className="
      min-h-screen
      bg-zinc-950
      text-white
      px-6
      py-12
      "
    >


      <div
        className="
        max-w-5xl
        mx-auto
        bg-zinc-900
        border
        border-zinc-800
        rounded-3xl
        overflow-hidden
        "
      >



        <RaceHeader

          race={cursa}

          author={
            autor?.username ??
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





        <div className="p-8">


          <RaceCode

            shareCode={
              cursa.share_code
            }

          />




          <RaceDetails

            category={
              cursa.category
            }

            car={
              cursa.car
            }

            raceClass={
              cursa.class
            }

            score={
              cursa.score
            }

            duration={
              cursa.duration
            }

            createdAt={
              new Date(
                cursa.created_at
              )
              .toLocaleDateString(
                "ro-RO"
              )
            }

          />





          <RaceDescription

            description={
              cursa.description
            }

          />





          <Vote

            raceId={
              cursa.id
            }

            initialRating={
              votInitial
            }

            initialComment={
              comentariuInitial
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


    </main>

  );

}