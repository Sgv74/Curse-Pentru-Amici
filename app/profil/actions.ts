"use server";

import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";


export async function stergeCursa(id:string){

  const supabase =
    await createSupabaseServerClient();


  const {
    data:{
      user
    }
  } = await supabase.auth.getUser();



  if(!user){
    throw new Error("Nu ești autentificat");
  }



  // verificăm că este cursa lui

  const {
    data:cursa
  } = await supabase
    .from("races")
    .select("image_url")
    .eq("id",id)
    .eq("user_id",user.id)
    .single();



  if(!cursa){
    throw new Error("Cursa nu există");
  }





  // ștergem din baza de date

  const {
    error
  } = await supabase
    .from("races")
    .delete()
    .eq("id",id)
    .eq("user_id",user.id);



  if(error){
    throw error;
  }



  revalidatePath("/profil");

}