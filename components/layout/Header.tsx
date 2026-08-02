import { createSupabaseServerClient } from "@/lib/supabaseServer";
import HeaderClient from "./HeaderClient";


export default async function Header() {


  const supabase =
    await createSupabaseServerClient();



  const {
    data:{
      user
    }
  } =
  await supabase.auth.getUser();




  let profil = null;



  if(user){


    const {
      data
    } =
    await supabase
      .from("profiles")
      .select(`
        username,
        avatar_url
      `)
      .eq(
        "id",
        user.id
      )
      .maybeSingle();



    profil = data;


  }




  return (

    <HeaderClient

      initialUser={
        user
        ?
        {
          id:user.id,
          email:user.email ?? "",
        }
        :
        null
      }


      initialProfil={
        profil
      }

    />

  );

}