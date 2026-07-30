import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { getRank } from "@/lib/rank";
import { redirect } from "next/navigation";


function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon:string;
  value:string | number;
  label:string;
  color:string;
}) {

  return (

    <div
      className={`
      bg-zinc-900
      border
      border-zinc-800
      rounded-2xl
      p-6
      text-center
      hover:-translate-y-1
      transition
      duration-300
      ${color}
      `}
    >

      <div className="text-5xl mb-3">
        {icon}
      </div>

      <div className="text-4xl font-black">
        {value}
      </div>

      <p className="text-zinc-400 mt-2">
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




/*
 CURSE USER
*/

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
(cursa)=>cursa.id
) ?? [];




let totalReviews=0;
let totalFavorites=0;
let averageRating=0;



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



if(votes && votes.length){

averageRating =
votes.reduce(
(sum,vote)=>
sum + vote.rating,
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
bg-zinc-950
text-white
px-5
py-16
"
>


<div
className="
max-w-6xl
mx-auto
"
>



<h1
className="
text-5xl
font-black
"
>
👋 Profilul meu
</h1>



<p
className="
text-zinc-400
mt-3
mb-10
"
>

Conectat ca:

<span
className="
text-white
font-bold
ml-2
"
>
{user.email}
</span>

</p>





<section
className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-5
mb-10
"
>


<StatCard
icon="🏁"
value={totalCurse}
label="Curse create"
color="hover:border-green-500"
/>


<StatCard
icon="⭐"
value={averageRating.toFixed(1)}
label="Rating mediu"
color="hover:border-yellow-500"
/>


<StatCard
icon="❤️"
value={totalFavorites}
label="Favorite primite"
color="hover:border-pink-500"
/>


<StatCard
icon="💬"
value={totalReviews}
label="Review-uri"
color="hover:border-cyan-500"
/>


</section>





<section
className="
bg-zinc-900
border
border-zinc-800
rounded-3xl
p-8
mb-8
"
>


<p className="text-zinc-400">
Rang comunitate
</p>


<h2
className={`
text-4xl
font-black
mt-2
${rank.color}
`}
>
{rank.title}
</h2>


<p className="text-zinc-300 mt-3 text-lg">
🏁 {totalCurse} curse încărcate
</p>


<div
className="
h-3
bg-zinc-800
rounded-full
overflow-hidden
mt-6
"
>

<div
className="
h-full
bg-green-500
"
style={{
width:`${progress}%`
}}
/>

</div>


<p className="text-zinc-400 text-sm mt-3">
Încă {remaining} curse până la următorul rang.
</p>


</section>






<section
className="
bg-zinc-900
border
border-zinc-800
rounded-3xl
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


<a
href="/adauga"
className="
bg-green-600
hover:bg-green-500
px-5
py-3
rounded-xl
font-bold
"
>
➕ Adaugă
</a>


</div>





{
curse && curse.length > 0 ? (


<div
className="
grid
md:grid-cols-2
gap-6
"
>


{
curse.map((cursa)=>(


<div
key={cursa.id}
className="
bg-zinc-800
rounded-2xl
overflow-hidden
border
border-zinc-700
"
>


<img
src={cursa.image_url}
alt={cursa.title}
className="
w-full
h-48
object-cover
"
/>



<div className="p-6">


<h3
className="
text-2xl
font-black
"
>
{cursa.title}
</h3>


<p className="text-zinc-400 mt-3">
🏎️ {cursa.car}
</p>


<p className="text-zinc-400">
🏁 Clasa {cursa.class}
</p>


<p className="text-zinc-400">
🔑 Cod: {cursa.share_code}
</p>


<a
href={`/cursa/${cursa.id}`}
className="
inline-block
mt-5
bg-green-600
px-4
py-2
rounded-lg
font-bold
"
>
Vezi cursa
</a>


</div>


</div>


))
}


</div>


)
:


<div
className="
border-2
border-dashed
border-zinc-700
rounded-2xl
p-10
text-center
"
>

<div className="text-6xl">
🚗
</div>


<h3
className="
text-2xl
font-bold
mt-4
"
>
Nu ai curse încă
</h3>


<p className="text-zinc-400 mt-3">
Adaugă prima ta cursă și va apărea aici.
</p>


</div>


}



</section>



</div>


</main>


);


}