"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function EditProfileForm({
  profile,
}: {
  profile:any;
}) {


  const router = useRouter();


  const [username,setUsername] =
    useState(profile?.username || "");


  const [bio,setBio] =
    useState(profile?.bio || "");


  const [avatar,setAvatar] =
    useState<File | null>(null);


  const [preview,setPreview] =
    useState(
      profile?.avatar_url ||
      "/default-avatar.png"
    );


  const [mesaj,setMesaj] =
    useState("");


  const [loading,setLoading] =
    useState(false);





  async function handleSave(
    e:React.FormEvent<HTMLFormElement>
  ){

    e.preventDefault();

    setLoading(true);
    setMesaj("");



    let avatar_url =
      profile.avatar_url || "";



    if(avatar){


      const fileName =
        `${profile.id}.avatar`;



      const {
        error:uploadError
      } =
      await supabase
        .storage
        .from("avatars")
        .upload(
          fileName,
          avatar,
          {
            upsert:true,
            contentType:avatar.type
          }
        );



      if(uploadError){

        setMesaj(
          "Eroare avatar: " +
          uploadError.message
        );

        setLoading(false);
        return;

      }




      const {
        data
      } =
      supabase
        .storage
        .from("avatars")
        .getPublicUrl(fileName);



      avatar_url =
        `${data.publicUrl}?t=${Date.now()}`;

    }







    const {
      error
    } =
    await supabase
      .from("profiles")
      .update({

        username,

        bio,

        avatar_url

      })
      .eq(
        "id",
        profile.id
      );





    if(error){

      setMesaj(
        "Eroare: " +
        error.message
      );

      setLoading(false);
      return;

    }



    setMesaj(
      "✅ Profil actualizat!"
    );


    setLoading(false);



    setTimeout(()=>{

      router.push("/profil");

    },1200);



  }








  return (


<form

onSubmit={handleSave}

className="
w-full
max-w-xl
mx-auto
bg-surface
border
border-white/10
rounded-[40px]
p-8
md:p-10
shadow-2xl
"

>


<h1
className="
text-4xl
font-black
text-center
mb-10
"
>
✏️ Editează profil
</h1>







{/* AVATAR */}

<div
className="
flex
justify-center
mb-10
"
>


<label
className="
relative
cursor-pointer
group
"
>


<img

src={preview}

alt="Avatar"

className="
w-36
h-36
rounded-full
object-cover
border-4
border-primary
transition
group-hover:scale-105
"

/>



<div
className="
absolute
inset-0
rounded-full
bg-black/70
opacity-0
group-hover:opacity-100
transition
flex
items-center
justify-center
text-white
font-black
text-center
"
>

📷
<br/>
Schimbă

</div>



<input

type="file"

accept="image/*"

className="hidden"

onChange={(e)=>{


const file =
e.target.files?.[0];


if(file){

setAvatar(file);


setPreview(
URL.createObjectURL(file)
);

}


}}

/>



</label>


</div>









<label className="text-muted font-bold">

Username

</label>



<input

value={username}

onChange={(e)=>
setUsername(e.target.value)
}

className="
w-full
mt-2
mb-6
p-4
rounded-xl
bg-black/50
border
border-white/10
outline-none
focus:border-primary
"

/>









<label className="text-muted font-bold">

Descriere

</label>



<textarea

value={bio}

onChange={(e)=>
setBio(e.target.value)
}

rows={5}

placeholder="Spune ceva despre tine..."

className="
w-full
mt-2
mb-6
p-4
rounded-xl
bg-black/50
border
border-white/10
outline-none
focus:border-primary
resize-none
"

/>








{
mesaj &&

<p
className="
text-primary
font-bold
text-center
mb-5
"
>
{mesaj}
</p>

}







<button

disabled={loading}

className="
w-full
bg-primary
text-black
py-4
rounded-xl
font-black
text-lg
hover:bg-primary-hover
disabled:opacity-50
transition
hover:scale-[1.02]
"

>

{

loading

?

"Se salvează..."

:

"💾 Salvează profil"

}


</button>





</form>


  );

}