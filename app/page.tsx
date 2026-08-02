import Link from "next/link";
import Image from "next/image";

import { createSupabaseServerClient } from "@/lib/supabaseServer";
import SearchSection from "@/components/SearchSection";



export default async function Home() {


  const supabase =
    await createSupabaseServerClient();




  const {
    data: toateCursele
  } =
  await supabase
    .from("races")
    .select("*")
    .order(
      "created_at",
      {
        ascending:false
      }
    );





  const {
    data: ultimeleCurse
  }
  =
  await supabase
    .from("races")
    .select("*")
    .order(
      "created_at",
      {
        ascending:false
      }
    )
    .limit(9);







  // FILTRE AUTOMATE

  const categorii =
    Array.from(
      new Set(
        toateCursele
        ?.map(
          race => race.category
        )
        .filter(Boolean)
        )
      );



  const clase =
    Array.from(
      new Set(
        toateCursele
        ?.map(
          race => race.class
        )
        .filter(Boolean)
      )
    );








return (


<main
className="
min-h-screen
bg-background
text-white
overflow-x-hidden
"
>





<section
className="
relative
min-h-screen
flex
items-center
justify-center
"
>


<Image

src="/FH6.png"

alt="FH6 Romania"

fill

priority

className="
object-cover
"

/>



<div
className="
absolute
inset-0
bg-gradient-to-b
from-black/30
via-black/70
to-background
"
/>





<div
className="
relative
z-10
text-center
px-6
max-w-6xl
"
>


<p
className="
uppercase
tracking-[0.5em]
font-black
text-primary
"
>
Forza Horizon Community
</p>



<h1
className="
mt-8
text-6xl
md:text-8xl
font-black
"
>

FH6

<br/>

<span
className="
bg-gradient-to-r
from-primary
via-accent
to-primary
bg-clip-text
text-transparent
"
>
România
</span>


</h1>




<p
className="
mt-10
text-xl
md:text-2xl
text-muted
"
>
Descoperă, publică și votează cele mai bune curse EventLab create de comunitate.
</p>





<div
className="
mt-12
flex
justify-center
gap-5
flex-col
sm:flex-row
"
>


<Link

href="/adauga"

className="
bg-primary
text-black
px-10
py-4
rounded-xl
font-black
hover:bg-primary-hover
transition
"

>
🚀 Publică o cursă
</Link>





<a

href="#search"

className="
border
border-white/20
px-10
py-4
rounded-xl
font-black
hover:border-accent
transition
"

>
🏁 Explorează
</a>


</div>


</div>


</section>









<section

id="search"

className="
max-w-7xl
mx-auto
px-6
py-24
"

>


<SectionTitle

title="Găsește următoarea provocare"

text="Caută după nume, mașină, categorie sau clasă."

/>




<div className="mt-12">


<SearchSection

categories={categorii}

classes={clase}

/>


</div>



</section>









<section

className="
max-w-7xl
mx-auto
px-6
pb-28
"

>


<SectionTitle

title="🔥 Curse noi"

text="Ultimele creații publicate."

/>




<div

className="
mt-14
grid
md:grid-cols-2
lg:grid-cols-3
gap-8
"

>


{

ultimeleCurse?.map(
(cursa)=>(


<Link

key={cursa.id}

href={`/cursa/${cursa.id}`}

className="
bg-surface
border
border-white/10
rounded-3xl
overflow-hidden
group
hover:border-primary
transition
"

>


<div
className="
relative
h-60
"
>


<Image

src={
cursa.image_url ||
"/placeholder-race.jpg"
}

alt={cursa.title}

fill

className="
object-cover
group-hover:scale-110
transition
"

/>


</div>




<div className="p-7">


<p
className="
text-primary
font-black
text-sm
uppercase
"
>

{cursa.category}

</p>




<h3
className="
text-2xl
font-black
mt-3
"
>

{cursa.title}

</h3>




<p className="mt-5 text-muted">
🚗 {cursa.car}
</p>

<p className="text-muted">
🔥 {cursa.class}
</p>

<p className="text-muted">
⏱️ {cursa.duration}
</p>


<p className="mt-5 text-primary font-black">
🏆 {cursa.score}
</p>



</div>



</Link>


)
)

}



</div>


</section>









<section className="px-6 pb-28">


<div

className="
max-w-6xl
mx-auto
rounded-[40px]
p-14
text-center
bg-gradient-to-r
from-primary
via-secondary
to-accent
"

>


<h2

className="
text-5xl
font-black
text-black
"

>
Ai creat o cursă memorabilă?
</h2>



<Link

href="/adauga"

className="
inline-block
mt-10
bg-black
text-white
px-10
py-4
rounded-xl
font-black
"

>
🚀 Publică acum
</Link>


</div>


</section>






</main>


);


}








function SectionTitle({
title,
text
}:{
title:string;
text:string;
}){


return (

<div className="text-center">


<h2
className="
text-5xl
font-black
"
>
{title}
</h2>



<p
className="
mt-5
text-xl
text-muted
"
>
{text}
</p>


</div>

);


}