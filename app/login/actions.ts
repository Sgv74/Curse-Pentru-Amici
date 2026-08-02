"use server";

import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";


export async function loginAction(
  email:string,
  password:string
) {


  const supabase =
    await createSupabaseServerClient();





  const {
    data,
    error
  }
  =
  await supabase.auth.signInWithPassword({

    email,

    password,

  });





  if(error){

    return {

      error:error.message

    };

  }






  const user = data.user;





  if(!user){

    return {

      error:"Nu s-a găsit utilizatorul."

    };

  }






  if(!user.email_confirmed_at){


    await supabase.auth.signOut();



    return {

      error:
      "📩 Trebuie să confirmi emailul înainte să intri în cont."

    };


  }









  /*
    VERIFICĂM PROFILUL
  */


  const {

    data:profil

  }
  =
  await supabase

    .from("profiles")

    .select("id")

    .eq(
      "id",
      user.id
    )

    .maybeSingle();







  /*
    DACĂ NU EXISTĂ PROFIL,
    ÎL CREĂM
  */


  if(!profil){



    const username =
      user.user_metadata?.username
      ??
      email.split("@")[0];





    const {

      error:profileError

    }
    =
    await supabase

      .from("profiles")

      .insert({

        id:user.id,

        username,

      });





    if(profileError){


      return {

        error:
        profileError.message

      };


    }


  }








  redirect("/");


}