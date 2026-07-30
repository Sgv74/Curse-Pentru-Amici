"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function AdaugaCursa() {

  const router = useRouter();


  const [numeCursa,setNumeCursa] = useState("");
  const [imagineCursa,setImagineCursa] = useState<File | null>(null);
  const [codCursa,setCodCursa] = useState("");
  const [categorie,setCategorie] = useState("");
  const [durata,setDurata] = useState("");
  const [masina,setMasina] = useState("");
  const [clasa,setClasa] = useState("");
  const [scor,setScor] = useState("");
  const [descriere,setDescriere] = useState("");

  const [mesaj,setMesaj] = useState("");
  const [eroare,setEroare] = useState(false);



  async function publicaCursa(
    e:React.FormEvent<HTMLFormElement>
  ){

    e.preventDefault();


    setMesaj("");
    setEroare(false);



    const {
      data:{
        user
      }
    } = await supabase.auth.getUser();



    if(!user){

      setEroare(true);
      setMesaj(
        "❌ Trebuie să fii logat."
      );

      return;

    }




    if(!imagineCursa){

      setEroare(true);
      setMesaj(
        "❌ Selectează o imagine."
      );

      return;

    }



    /*
      VERIFICARE COD UNIC
    */


    const {
      data:existenta
    } = await supabase
      .from("races")
      .select("id")
      .eq(
        "share_code",
        codCursa.trim()
      )
      .single();



    if(existenta){

      setEroare(true);

      setMesaj(
        "❌ Acest cod există deja. Alege alt cod."
      );

      return;

    }




    /*
      UPLOAD IMAGINE
    */


    const extensie =
      imagineCursa.name
      .split(".")
      .pop();


    const numeFisier =
      `${Date.now()}.${extensie}`;



    const {
      error:uploadError
    } =
    await supabase.storage
    .from("race-images")
    .upload(
      numeFisier,
      imagineCursa
    );



    if(uploadError){

      setEroare(true);

      setMesaj(
        uploadError.message
      );

      return;

    }




    const imagineUrl =
      supabase.storage
      .from("race-images")
      .getPublicUrl(
        numeFisier
      )
      .data
      .publicUrl;




    /*
      SALVARE CURSA
    */


    const {
      error
    } =
    await supabase
    .from("races")
    .insert({

      title:numeCursa,

      image_url:imagineUrl,

      share_code:
        codCursa.trim(),

      category:categorie,

      duration:durata,

      car:masina,

      class:clasa,

      score:scor,

      description:descriere,

      user_id:user.id

    });



    if(error){

      setEroare(true);

      setMesaj(
        error.message
      );

      return;

    }



    setMesaj(
      "✅ Cursa a fost publicată!"
    );



    setTimeout(()=>{

      router.push("/");

      router.refresh();

    },1200);



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
        max-w-3xl
        mx-auto
      ">


        <h1 className="
          text-5xl
          font-extrabold
          text-center
          mb-10
        ">
          🏁 Adaugă cursă
        </h1>



        <form
          onSubmit={publicaCursa}
          className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-2xl
            p-8
            space-y-5
          "
        >



<input
required
placeholder="Nume cursă"
value={numeCursa}
onChange={e=>setNumeCursa(e.target.value)}
className="w-full bg-zinc-800 p-4 rounded-xl"
/>



<input
required
type="file"
accept="image/*"
onChange={e=>
setImagineCursa(
e.target.files?.[0] ?? null
)}
className="w-full bg-zinc-800 p-4 rounded-xl"
/>



<input
required
placeholder="Cod cursă "
value={codCursa}
onChange={e=>setCodCursa(e.target.value)}
className="w-full bg-zinc-800 p-4 rounded-xl"
/>



<select
required
value={categorie}
onChange={e=>setCategorie(e.target.value)}
className="w-full bg-zinc-800 p-4 rounded-xl"
>

<option value="">
Categorie
</option>

<option>Road Racing</option>
<option>Street Racing</option>
<option>Rally</option>
<option>Cross Country</option>
<option>Drift</option>

</select>





<input
required
placeholder="Durată"
value={durata}
onChange={e=>setDurata(e.target.value)}
className="w-full bg-zinc-800 p-4 rounded-xl"
/>





<input
required
placeholder="Mașină"
value={masina}
onChange={e=>setMasina(e.target.value)}
className="w-full bg-zinc-800 p-4 rounded-xl"
/>





<select
required
value={clasa}
onChange={e=>setClasa(e.target.value)}
className="w-full bg-zinc-800 p-4 rounded-xl"
>

<option value="">
Clasa
</option>

<option>🟢D </option>
<option>🟡C</option>
<option>🟠B </option>
<option>🔴A </option>
<option>🟣S1 </option>
<option>🔵S2 </option>
<option>⚫X </option>

</select>





<input
required
placeholder="Scor Exact"
value={scor}
onChange={e=>setScor(e.target.value)}
className="w-full bg-zinc-800 p-4 rounded-xl"
/>





<textarea
required
rows={5}
placeholder="Descriere"
value={descriere}
onChange={e=>setDescriere(e.target.value)}
className="w-full bg-zinc-800 p-4 rounded-xl"
/>





<button
className="
w-full
bg-green-600
hover:bg-green-500
py-4
rounded-xl
font-bold
text-xl
"
>

🚀 Publică cursa

</button>




{
mesaj &&

<p className={`
text-center
font-bold
${eroare
?
"text-red-400"
:
"text-green-400"}
`}>

{mesaj}

</p>

}



        </form>


      </div>


    </main>

  );

}