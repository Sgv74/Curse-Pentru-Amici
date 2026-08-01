"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


type Props = {

  raceId: number;

  initialRating: number | null;

  initialComment?: string | null;

};



export default function Vote({

  raceId,

  initialRating,

  initialComment = "",

}: Props) {


  const router = useRouter();


  const [rating,setRating] =
    useState<number | null>(
      initialRating
    );


  const [comment, setComment] =
  useState<string>(
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


    if(!rating){

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





    const {
      error
    } =
    await supabase
      .from("race_votes")
      .upsert(

        {

          race_id: raceId,

          user_id:user.id,

          rating:rating,

          comment:comment,

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


    } else {


      setMesaj(
        "✅ Review salvat!"
      );


      router.refresh();


    }



    setLoading(false);


  }






  const afisat =
    hover ?? rating;




  return (

    <div
      className="
      mt-10
      bg-black
      rounded-2xl
      p-6
      "
    >


      <h2
className="
text-3xl
font-black
mb-6
"
>
⭐ Lasă un review
</h2>





      <div
        className="
        flex
        gap-3
        mb-6
        "
      >


        {
          [1,2,3,4,5].map((nota)=>(


            <button

              key={nota}

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

        onChange={(e)=>
          setComment(
            e.target.value
          )
        }


        placeholder="Scrie un comentariu (opțional)..."

        className="
        w-full
        h-32
        bg-zinc-900
        border
        border-zinc-700
        rounded-xl
        p-4
        text-white
        resize-none
        "

      />






      <button

        onClick={salveazaReview}

        disabled={loading}

        className="
        mt-5
        bg-green-600
        hover:bg-green-700
        px-6
        py-3
        rounded-xl
        font-bold
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
          mt-4
          text-green-400
          font-bold
          "
        >

          {mesaj}

        </p>

      }



    </div>

  );

}