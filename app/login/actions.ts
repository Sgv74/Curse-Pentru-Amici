"use server";

import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";


export async function loginAction(
  email: string,
  password: string
) {


  const supabase =
    await createSupabaseServerClient();



  const {
    data,
    error
  } =
  await supabase.auth.signInWithPassword({

    email,

    password,

  });



  if(error){

    return {
      error: error.message
    };

  }



  // verificăm dacă emailul a fost confirmat

  if(!data.user?.email_confirmed_at){


    await supabase.auth.signOut();


    return {

      error:
      "📩 Trebuie să confirmi emailul înainte să intri în cont."

    };

  }




  redirect("/");


}