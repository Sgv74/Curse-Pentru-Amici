"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


type Props = {

  raceId:number;

  initialRating:number | null;

  initialComment?:string | null;

};



export default function Vote({

  raceId,

  initialRating,

  initialComment = "",

}:Props){



  const router = useRouter();



  const [rating,setRating] =
    useState<number | null>(
      initialRating
    );



  const [comment,setComment] =
    useState(
      initialComment ?? ""
    );



  const [hover,setHover] =
    useState<number | null>(null);



  const [loading,setLoading] =
    useState(false);



  const [mesaj,setMesaj] =
    useState("");





  async function salveazaReview(){



    if(loading) return;



    if(rating === null){


      setMesaj(
        "⭐ Alege o notă înainte."
      );


      return;

    }





    setLoading(true);

    setMesaj("");






    const {
      data:{
        user
      }
    } =
    await supabase.auth.getUser();






    if(!user){


      setMesaj(
        "❌ Trebuie să fii logat."
      );


      setLoading(false);


      return;


    }







    const textComentariu =
      comment.trim();







    const {
      error
    } =
    await supabase
      .from("race_votes")
      .upsert(

        {

          race_id:raceId,

          user_id:user.id,

          rating,

          comment:
            textComentariu || null,

        },

        {

          onConflict:
          "race_id,user_id"

        }

      );








    if(error){


      console.log(error);


      setMesaj(
        "❌ Eroare la salvare."
      );


      setLoading(false);


      return;


    }







    setMesaj(
      "✅ Review salvat!"
    );



    setRating(rating);



    router.refresh();



    setLoading(false);



  }








  const afisat =
    hover ?? rating;








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

        ⭐ Lasă un review

      </h2>







      <div

        className="
        flex
        gap-3
        mb-8
        "

      >


        {

          [1,2,3,4,5].map((nota)=>(


            <button

              key={nota}

              type="button"

              disabled={loading}


              onMouseEnter={()=>
                setHover(nota)
              }


              onMouseLeave={()=>
                setHover(null)
              }


              onClick={()=>
                setRating(nota)
              }


              className="
              text-5xl
              hover:scale-125
              transition
              duration-200
              "

            >


              {
                afisat &&
                nota <= afisat

                ?

                "⭐"

                :

                "☆"

              }


            </button>


          ))

        }


      </div>








      <textarea


        value={comment}


        maxLength={1000}


        onChange={(e)=>
          setComment(
            e.target.value
          )
        }


        placeholder="Spune comunității ce părere ai despre cursă..."


        className="
        w-full
        h-36
        rounded-2xl
        bg-background
        border
        border-white/10
        p-5
        text-white
        placeholder:text-zinc-500
        resize-none
        focus:outline-none
        focus:border-primary
        transition
        "


      />








      <button


        onClick={salveazaReview}


        disabled={loading}


        className="
        mt-6
        px-8
        py-3
        rounded-xl
        font-black
        bg-primary
        hover:opacity-90
        transition
        disabled:opacity-50
        "


      >


        {

          loading

          ?

          "Se salvează..."

          :

          "Trimite review"

        }


      </button>







      {

        mesaj &&


        <p

          className="
          mt-5
          font-bold
          text-accent
          "

        >

          {mesaj}

        </p>


      }





    </section>


  );

}