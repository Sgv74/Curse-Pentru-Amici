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
bg-background
text-white
flex
items-center
justify-center
px-6
py-20
relative
overflow-hidden
"
>

<div
className="
absolute
inset-0
bg-gradient-to-br
from-secondary/20
via-transparent
to-accent/20
"
/>


<div
className="
relative
z-10
w-full
"
>

<EditProfileForm
  profile={profile}
/>

</div>


</main>

);

}