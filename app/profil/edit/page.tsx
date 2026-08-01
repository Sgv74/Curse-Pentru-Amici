import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import EditProfileForm from "@/app/profil/edit/EditProfileForm";


export default async function EditProfilePage() {


  const supabase =
    await createSupabaseServerClient();



  const {
    data:{
      user
    }
  } = await supabase.auth.getUser();



  if(!user){

    redirect("/login");

  }



  const {
    data: profile
  } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();




  return (

    <main
      className="
      min-h-screen
      bg-zinc-950
      text-white
      flex
      items-center
      justify-center
      px-6
      "
    >

      <EditProfileForm
        profile={profile}
      />

    </main>

  );

}