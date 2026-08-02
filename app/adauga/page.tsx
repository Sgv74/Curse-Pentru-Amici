"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function AdaugaCursa() {


  const router = useRouter();



  const [numeCursa,setNumeCursa] = useState("");

  const [imagineCursa,setImagineCursa] =
    useState<File | null>(null);


  const [imaginiExtra,setImaginiExtra] =
    useState<File[]>([]);


  const [codCursa,setCodCursa] =
    useState("");

  const [categorie,setCategorie] =
    useState("");

  const [durata,setDurata] =
    useState("");

  const [masina,setMasina] =
    useState("");

  const [clasa,setClasa] =
    useState("");

  const [scor,setScor] =
    useState("");

  const [descriere,setDescriere] =
    useState("");



  const [mesaj,setMesaj] =
    useState("");

  const [eroare,setEroare] =
    useState(false);

  const [loading,setLoading] =
    useState(false);






  async function uploadImagine(
    fisier:File
  ){


    const extensie =
      fisier.name
      .split(".")
      .pop();



    const numeFisier =
      `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${extensie}`;





    const {
      error
    } =
    await supabase
    .storage
    .from("race-images")
    .upload(
      numeFisier,
      fisier
    );



    if(error){

      throw error;

    }




    const url =
      supabase
      .storage
      .from("race-images")
      .getPublicUrl(
        numeFisier
      )
      .data
      .publicUrl;



    return url;


  }









  async function publicaCursa(
    e:React.FormEvent<HTMLFormElement>
  ){


    e.preventDefault();


    setMesaj("");

    setEroare(false);

    setLoading(true);




    try{



      const {
        data:{
          user
        }
      } =
      await supabase.auth.getUser();





      if(!user){

        throw new Error(
          "Trebuie să fii logat."
        );

      }






      if(!imagineCursa){

        throw new Error(
          "Imaginea principală este obligatorie."
        );

      }






      const codCurat =
        codCursa.trim();





      if(!/^\d{9}$/.test(codCurat)){


        throw new Error(
          "Codul cursei trebuie să aibă exact 9 cifre."
        );


      }







      const {
        data:existenta
      } =
      await supabase
      .from("races")
      .select("id")
      .eq(
        "share_code",
        codCurat
      )
      .maybeSingle();






      if(existenta){


        throw new Error(
          "Acest cod este deja folosit."
        );


      }








      // imagine principala

      const imaginePrincipala =
        await uploadImagine(
          imagineCursa
        );









      // galerie extra

      const galleryUrls:string[] = [];




      for(
        const poza of imaginiExtra
      ){


        const url =
          await uploadImagine(
            poza
          );


        galleryUrls.push(url);


      }









      const {
        error
      } =
      await supabase
      .from("races")
      .insert({


        title:
          numeCursa,



        image_url:
          imaginePrincipala,


gallery: JSON.parse(
  JSON.stringify(galleryUrls)
),



        share_code:
          codCurat,



        category:
          categorie,



        duration:
          durata,



        car:
          masina,



        class:
          clasa,



        score:
          scor,



        description:
          descriere,



        user_id:
          user.id


      });








      if(error){

        throw error;

      }







      setMesaj(
        "✅ Cursa a fost publicată!"
      );





      setTimeout(()=>{


        router.push("/");

        router.refresh();


      },1200);






    }
    catch(err:any){


      setEroare(true);


      setMesaj(
        "❌ " + err.message
      );


    }
    finally{


      setLoading(false);


    }


  }
  return (

<main

className="
min-h-screen
bg-background
text-white
px-6
py-16
"

>

<div

className="
max-w-3xl
mx-auto
"

>


<h1

className="
text-5xl
font-black
text-center
mb-10
"

>
🏁 Adaugă cursă
</h1>




<form

onSubmit={publicaCursa}

className="
bg-surface
border
border-white/10
rounded-[40px]
p-8
md:p-10
shadow-2xl
space-y-5
"

>




<input

required

placeholder="🏁 Nume cursă"

value={numeCursa}

onChange={
e=>setNumeCursa(e.target.value)
}

className="
w-full
bg-black/50
border
border-white/10
p-4
rounded-xl
outline-none
focus:border-primary
"

/>








<label

className="
block
border
border-dashed
border-white/20
rounded-2xl
p-6
text-center
cursor-pointer
hover:border-primary
transition
"

>


<div className="text-4xl">
📸
</div>


<p className="font-bold mt-2">
Imagine principală
</p>


<p className="text-sm text-muted mt-2">

{
imagineCursa

?

`✅ ${imagineCursa.name}`

:

"Click pentru selectare"

}

</p>



<input

required

type="file"

accept="image/*"

className="hidden"

onChange={

e=>{

setImagineCursa(
e.target.files?.[0] ?? null
)

}

}

/>


</label>









<label

className="
block
border
border-dashed
border-white/20
rounded-2xl
p-6
text-center
cursor-pointer
hover:border-primary
transition
"

>


<div className="text-4xl">
🖼️
</div>


<p className="font-bold mt-2">
Poze suplimentare
</p>


<p className="text-sm text-muted mt-2">

{

imaginiExtra.length > 0

?

`✅ ${imaginiExtra.length} poze selectate`

:

"Opțional - poți selecta mai multe"

}

</p>




{

imaginiExtra.length > 0 &&


<div

className="
mt-4
text-left
text-sm
text-muted
space-y-1
"

>

{

imaginiExtra.map(
(poza,index)=>(

<p key={index}>
📷 {poza.name}
</p>

))

}

</div>


}




<input

type="file"

accept="image/*"

multiple

className="hidden"

onChange={

e=>{


const fisiereNoi =
Array.from(
e.target.files ?? []
);



setImaginiExtra(
prev=>[
...prev,
...fisiereNoi
]
);


}

}

/>



</label>










<input

required

type="text"

inputMode="numeric"

maxLength={9}

placeholder="🔑 Cod cursă (9 cifre)"

value={codCursa}

onChange={

e=>

setCodCursa(
e.target.value.replace(/\D/g,"")
)

}

className="
w-full
bg-black/50
border
border-white/10
p-4
rounded-xl
outline-none
focus:border-primary
"

/>









<select

required

value={categorie}

onChange={
e=>setCategorie(e.target.value)
}

className="
w-full
bg-black/50
border
border-white/10
p-4
rounded-xl
"

>


<option value="">
📂 Categorie
</option>

<option>
Road Racing
</option>

<option>
Street Racing
</option>

<option>
Rally
</option>

<option>
Cross Country
</option>


</select>









<input

required

placeholder="⏱️ Durată"

value={durata}

onChange={
e=>setDurata(e.target.value)
}

className="
w-full
bg-black/50
border
border-white/10
p-4
rounded-xl
"

/>








<input

required

placeholder="🚗 Mașină"

value={masina}

onChange={
e=>setMasina(e.target.value)
}

className="
w-full
bg-black/50
border
border-white/10
p-4
rounded-xl
"

/>









<select

required

value={clasa}

onChange={
e=>setClasa(e.target.value)
}

className="
w-full
bg-black/50
border
border-white/10
p-4
rounded-xl
"

>


<option value="">
🔥 Clasa
</option>

<option>🟢 D</option>

<option>🟡 C</option>

<option>🟠 B</option>

<option>🔴 A</option>

<option>🟣 S1</option>

<option>🔵 S2</option>

<option>⚫ X</option>


</select>









<input

required

placeholder="🏆 Scor"

value={scor}

onChange={
e=>setScor(e.target.value)
}

className="
w-full
bg-black/50
border
border-white/10
p-4
rounded-xl
"

/>









<textarea

required

rows={5}

placeholder="📝 Descriere"

value={descriere}

onChange={
e=>setDescriere(e.target.value)
}

className="
w-full
bg-black/50
border
border-white/10
p-4
rounded-xl
resize-none
"

/>









<button

disabled={loading}

className="
w-full
bg-primary
text-black
py-4
rounded-xl
font-black
text-xl
hover:bg-primary-hover
disabled:opacity-50
transition
"

>


{

loading

?

"⏳ Se publică..."

:

"🚀 Publică cursa"

}


</button>








{

mesaj &&


<p

className={`
text-center
font-bold
mt-4
${
eroare
?
"text-red-400"
:
"text-primary"
}
`}

>

{mesaj}

</p>


}





</form>


</div>


</main>


);


}