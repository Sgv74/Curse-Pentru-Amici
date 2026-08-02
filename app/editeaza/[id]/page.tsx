"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";


export default function EditeazaCursa() {


  const params = useParams();
  const router = useRouter();


  const id =
    Number(params.id);



  const [loading,setLoading] =
    useState(true);


  const [saving,setSaving] =
    useState(false);



  const [title,setTitle] =
    useState("");

  const [mainImage,setMainImage] =
    useState("");

  const [newMainImage,setNewMainImage] =
    useState<File|null>(null);



  const [gallery,setGallery] =
    useState<string[]>([]);


  const [newGallery,setNewGallery] =
    useState<File[]>([]);



  const [shareCode,setShareCode] =
    useState("");

  const [category,setCategory] =
    useState("");

  const [duration,setDuration] =
    useState("");

  const [car,setCar] =
    useState("");

  const [raceClass,setRaceClass] =
    useState("");

  const [score,setScore] =
    useState("");

  const [description,setDescription] =
    useState("");



  const [message,setMessage] =
    useState("");




  useEffect(()=>{


    async function load(){


      const {
        data:{
          user
        }
      } =
      await supabase.auth.getUser();



      if(!user){

        router.push("/login");
        return;

      }



      const {
        data,
        error
      }
      =
      await supabase
      .from("races")
      .select("*")
      .eq("id",id)
      .single();



      if(error || !data){

        router.push("/");
        return;

      }



      if(data.user_id !== user.id){

        router.push("/");
        return;

      }



      setTitle(data.title ?? "");

      setMainImage(
        data.image_url ?? ""
      );


      setGallery(
        Array.isArray(data.gallery)
        ?
        data.gallery
        :
        []
      );


      setShareCode(
        data.share_code ?? ""
      );

      setCategory(
        data.category ?? ""
      );

      setDuration(
        data.duration ?? ""
      );

      setCar(
        data.car ?? ""
      );

      setRaceClass(
        data.class ?? ""
      );

      setScore(
        data.score ?? ""
      );

      setDescription(
        data.description ?? ""
      );



      setLoading(false);


    }



    load();


  },[id,router]);







  async function uploadImage(
    file:File
  ){


    const ext =
      file.name.split(".").pop();



    const filename =
      `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}
      .${ext}`;



    const {
      error
    }
    =
    await supabase.storage
    .from("race-images")
    .upload(
      filename,
      file
    );



    if(error){

      throw error;

    }



    const {
      data
    }
    =
    supabase.storage
    .from("race-images")
    .getPublicUrl(filename);



    return data.publicUrl;


  }







  function removeGalleryImage(
    url:string
  ){

    setGallery(
      gallery.filter(
        img=>img!==url
      )
    );

  }









  async function save(
    e:React.FormEvent
  ){

    e.preventDefault();



    setSaving(true);
    setMessage("");



    try{


      let finalMain =
        mainImage;



      /*
        SCHIMBĂ POZA PRINCIPALĂ
      */


      if(newMainImage){

        finalMain =
          await uploadImage(
            newMainImage
          );

      }







      let finalGallery =
        [
          ...gallery
        ];





      /*
        ADAUGĂ POZE NOI ÎN GALERIE
      */


      for(
        const img of newGallery
      ){

        const url =
          await uploadImage(img);


        finalGallery.push(url);

      }








      const {
        error
      }
      =
      await supabase
      .from("races")
      .update({

        title,

        image_url:
          finalMain,


        gallery:
          finalGallery,


        share_code:
          shareCode.trim(),


        category,

        duration,

        car,

        class:
          raceClass,


        score,

        description,


      })
      .eq(
        "id",
        id
      );





      if(error){

        throw error;

      }



      setMessage(
        "✅ Cursa a fost actualizată!"
      );



      setTimeout(()=>{


        router.push(
          `/cursa/${id}`
        );


        router.refresh();


      },1000);




    }
    catch(err:any){


      setMessage(
        "❌ " + err.message
      );


    }
    finally{

      setSaving(false);

    }


  }









  if(loading){


    return (

      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">

        Se încarcă...

      </main>

    );

  }







  return (


<main className="
min-h-screen
bg-zinc-950
text-white
px-6
py-12
">


<div className="
max-w-4xl
mx-auto
">


<h1 className="
text-5xl
font-black
mb-10
">

✏️ Editează cursa

</h1>





<form
onSubmit={save}
className="
bg-zinc-900
border
border-white/10
rounded-3xl
p-8
space-y-6
"
>





<input
value={title}
onChange={
e=>setTitle(e.target.value)
}
placeholder="Titlu"
className="input"
/>





<div>

<h3 className="font-bold mb-3">
Imagine principală
</h3>


<Image
src={mainImage}
alt=""
width={900}
height={500}
className="
rounded-2xl
w-full
h-72
object-cover
"
/>


<input
type="file"
accept="image/*"
onChange={
e=>
setNewMainImage(
e.target.files?.[0] ?? null
)
}
className="mt-4"
/>


</div>








<div>

<h3 className="font-bold mb-3">
Galerie existentă
</h3>



<div className="
grid
grid-cols-2
md:grid-cols-4
gap-4
">


{
gallery.map(img=>(

<div
key={img}
className="relative"
>


<Image
src={img}
alt=""
width={300}
height={200}
className="
rounded-xl
h-32
w-full
object-cover
"
/>


<button
type="button"
onClick={()=>
removeGalleryImage(img)
}
className="
absolute
top-2
right-2
bg-red-600
rounded-full
px-3
"
>
✕
</button>


</div>

))

}


</div>


</div>







<input
type="file"
multiple
accept="image/*"
onChange={
e=>
setNewGallery(
Array.from(
e.target.files ?? []
)
)
}
className="block"
/>









<input
value={shareCode}
onChange={
e=>setShareCode(e.target.value)
}
placeholder="Cod"
className="input"
/>



<input
value={category}
onChange={
e=>setCategory(e.target.value)
}
placeholder="Categorie"
className="input"
/>



<input
value={duration}
onChange={
e=>setDuration(e.target.value)
}
placeholder="Durată"
className="input"
/>



<input
value={car}
onChange={
e=>setCar(e.target.value)
}
placeholder="Mașină"
className="input"
/>



<input
value={raceClass}
onChange={
e=>setRaceClass(e.target.value)
}
placeholder="Clasă"
className="input"
/>



<input
value={score}
onChange={
e=>setScore(e.target.value)
}
placeholder="Scor"
className="input"
/>




<textarea
value={description}
onChange={
e=>setDescription(e.target.value)
}
rows={6}
placeholder="Descriere"
className="input"
/>





<button
disabled={saving}
className="
w-full
bg-yellow-500
text-black
font-black
py-4
rounded-2xl
text-xl
"
>

{
saving
?
"Se salvează..."
:
"💾 Salvează"
}


</button>




{
message &&

<p className="font-bold">
{message}
</p>

}



</form>


</div>


</main>


  );

}