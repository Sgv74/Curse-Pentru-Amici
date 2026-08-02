"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


type Props = {

  raceId:number;

  initialFavorite:boolean;

};



export default function FavoriteButton({

  raceId,

  initialFavorite,

}:Props){



  const router = useRouter();



  const [favorite,setFavorite] =
    useState(initialFavorite);



  const [loading,setLoading] =
    useState(false);




  async function toggleFavorite(){



    if(loading) return;



    setLoading(true);





    const {

      data:{
        user

      }

    } =
    await supabase.auth.getUser();






    if(!user){


      setLoading(false);


      return;


    }






    if(favorite){



      const {
        error
      } =
      await supabase
        .from("favorites")
        .delete()
        .eq(
          "user_id",
          user.id
        )
        .eq(
          "race_id",
          raceId
        );





      if(!error){


        setFavorite(false);


      }





    }else{





      const {
        error
      } =
      await supabase
        .from("favorites")
        .insert({

          user_id:user.id,

          race_id:raceId,

        });





      if(!error){


        setFavorite(true);


      }



    }







    setLoading(false);


    router.refresh();


  }








  return (


    <button


      onClick={toggleFavorite}


      disabled={loading}



      className="

      w-16

      h-16

      rounded-2xl

      flex

      items-center

      justify-center

      text-4xl

      bg-background

      border

      border-white/10

      hover:border-primary

      hover:scale-110

      transition-all

      duration-300

      disabled:opacity-50

      "




      title={

        favorite

        ?

        "Elimină de la favorite"

        :

        "Adaugă la favorite"

      }



    >


      {

        favorite

        ?

        "❤️"

        :

        "🤍"

      }



    </button>


  );

}