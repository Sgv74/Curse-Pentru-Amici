import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { getRank } from "@/lib/rank";
import { stergeCursa } from "./actions";



function StatCard({
  icon,
  value,
  label,
  color,
}:{
  icon:string;
  value:string | number;
  label:string;
  color:string;
}){

  return (

    <div
      className={`
      bg-surface
      border
      border-white/10
      rounded-3xl
      p-6
      text-center
      transition
      hover:-translate-y-2
      hover:border-primary
      ${color}
      `}
    >

      <div className="text-5xl">
        {icon}
      </div>


      <div className="mt-4 text-4xl font-black">
        {value}
      </div>


      <p className="mt-2 text-muted">
        {label}
      </p>

    </div>

  );

}




export default async function ProfilPage(){


const supabase =
await createSupabaseServerClient();



const {
 data:{
  user
 }
}=await supabase.auth.getUser();



if(!user){

 redirect("/login");

}





const {
 data:profile
}=await supabase
.from("profiles")
.select("*")
.eq(
 "id",
 user.id
)
.single();





const {
 data:curse
}=await supabase
.from("races")
.select("*")
.eq(
 "user_id",
 user.id
)
.order(
 "created_at",
 {
  ascending:false
 }
);





const totalCurse =
curse?.length ?? 0;



const ids =
curse?.map(
c=>c.id
) ?? [];



let totalReviews = 0;
let totalFavorites = 0;
let averageRating = 0;




if(ids.length){


const {
 data:votes
}=await supabase
.from("race_votes")
.select("rating")
.in(
"race_id",
ids
);



totalReviews =
votes?.length ?? 0;



if(votes?.length){

averageRating =
votes.reduce(
(a,b)=>a+b.rating,
0
)
/votes.length;

}




const {
 count
}=await supabase
.from("favorites")
.select("*",
{
 count:"exact",
 head:true
})
.in(
"race_id",
ids
);



totalFavorites =
count ?? 0;


}




const rank =
getRank(totalCurse);



const progress =
(totalCurse % 10) * 10;



const remaining =
progress===0
?
10
:
10-Math.floor(progress/10);





return (

<main
className="
min-h-screen
bg-background
text-white
px-6
py-20
"
>


<div
className="
max-w-7xl
mx-auto
"
>




<h1
className="
text-5xl
md:text-6xl
font-black
mb-12
"
>
👤 Profilul meu
</h1>






<section
className="
bg-surface
border
border-white/10
rounded-[40px]
p-8
md:p-10
relative
overflow-hidden
"
>

<div
className="
absolute
inset-0
bg-gradient-to-r
from-primary/10
via-transparent
to-accent/10
"
/>


<div
className="
relative
flex
flex-col
md:flex-row
items-center
gap-8
"
>


<div
className="
relative
"
>

<div
className="
absolute
inset-0
rounded-full
bg-primary
blur-2xl
opacity-30
"
/>


<Image

src={
profile?.avatar_url ||
"/default-avatar.png"
}

alt="Avatar"

width={120}

height={120}

className="
relative
rounded-full
border-4
border-primary
object-cover
"
/>


</div>





<div
className="
text-center
md:text-left
"
>


<div
className="
flex
flex-col
md:flex-row
md:items-center
gap-3
"
>


<h2
className="
text-4xl
font-black
"
>
{profile?.username}
</h2>



<span
className={`
px-4
py-1
rounded-full
bg-black/40
font-bold
${rank.color}
`}
>
{rank.title}
</span>


</div>




<p
className="
mt-4
text-muted
max-w-xl
"
>
{
profile?.bio ||
"Fără descriere încă."
}
</p>




<p
className="
mt-3
text-sm
text-zinc-500
"
>
{user.email}
</p>




<Link

href="/profil/edit"

className="
inline-flex
mt-6
bg-primary
text-black
px-6
py-3
rounded-xl
font-black
hover:bg-primary-hover
transition
"
>

✏️ Editează profil

</Link>



</div>


</div>


</section>









<section
className="
grid
sm:grid-cols-2
lg:grid-cols-4
gap-6
mt-10
"
>


<StatCard
icon="🏁"
value={totalCurse}
label="Curse create"
color="hover:border-primary"
/>



<StatCard
icon="⭐"
value={averageRating.toFixed(1)}
label="Rating mediu"
color="hover:border-accent"
/>



<StatCard
icon="❤️"
value={totalFavorites}
label="Favorite"
color="hover:border-pink-500"
/>



<StatCard
icon="💬"
value={totalReviews}
label="Review-uri"
color="hover:border-cyan-400"
/>



</section>








<section
className="
mt-10
bg-surface
border
border-white/10
rounded-[40px]
p-8
"
>



<p className="text-muted">
Rang comunitate
</p>


<h2
className={`
text-5xl
font-black
mt-3
${rank.color}
`}
>
{rank.title}
</h2>



<p className="mt-4 text-zinc-300">
🏁 {totalCurse} curse încărcate
</p>





<div
className="
mt-8
h-4
bg-black/50
rounded-full
overflow-hidden
"
>


<div
className="
h-full
bg-gradient-to-r
from-primary
to-accent
"
style={{
width:`${progress}%`
}}
/>


</div>



<p
className="
mt-4
text-muted
"
>
Încă {remaining} curse până la următorul rang.
</p>



</section>









<section
className="
mt-10
bg-surface
border
border-white/10
rounded-[40px]
p-8
"
>



<div
className="
flex
justify-between
items-center
mb-8
"
>


<h2
className="
text-3xl
font-black
"
>
🏁 Cursele mele
</h2>



<Link

href="/adauga"

className="
bg-primary
text-black
px-5
py-3
rounded-xl
font-black
"
>

➕ Adaugă

</Link>


</div>







{
curse && curse.length ?

(

<div
className="
grid
md:grid-cols-2
gap-8
"
>


{

curse.map((cursa)=>(


<div

key={cursa.id}

className="
group
overflow-hidden
rounded-3xl
bg-surface
border
border-white/10
hover:border-primary
hover:-translate-y-2
transition
duration-300
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
duration-500
"

/>


<div
className="
absolute
inset-0
bg-gradient-to-t
from-black
via-black/30
to-transparent
"
/>



<div
className="
absolute
bottom-5
left-5
"
>

<p
className="
text-primary
uppercase
text-xs
font-black
tracking-widest
"
>
{cursa.category}
</p>


<h3
className="
text-3xl
font-black
mt-2
"
>
{cursa.title}
</h3>


</div>


</div>





<div
className="
p-6
"
>



<div
className="
grid
grid-cols-2
gap-3
text-muted
"
>

<p>
🚗 {cursa.car}
</p>


<p>
🔥 {cursa.class}
</p>


<p>
⏱️ {cursa.duration}
</p>


<p>
🏆 {cursa.score}
</p>


</div>




<div
className="
mt-6
flex
gap-3
"
>


<Link

href={`/cursa/${cursa.id}`}

className="
flex-1
text-center
bg-accent
text-black
py-3
rounded-xl
font-black
hover:scale-105
transition
"
>

Vezi

</Link>




<Link

href={`/editeaza/${cursa.id}`}

className="
flex-1
text-center
bg-primary
text-black
py-3
rounded-xl
font-black
hover:scale-105
transition
"
>

Edit

</Link>




<form
action={
stergeCursa.bind(
null,
cursa.id
)
}
>


<button

className="
px-4
rounded-xl
bg-red-500/20
border
border-red-500/40
text-red-400
font-black
hover:bg-red-500
hover:text-white
transition
"

>

🗑️

</button>


</form>



</div>



</div>



</div>


))

}


</div>

)

:

(

<div
className="
border
border-dashed
border-white/20
rounded-3xl
p-12
text-center
"
>


<div className="text-6xl">
🏎️
</div>


<h3
className="
text-3xl
font-black
mt-5
"
>
Nu ai curse încă
</h3>


<p className="mt-3 text-muted">
Publică prima ta creație EventLab.
</p>



</div>

)

}



</section>






</div>

</main>

);


}