import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { getRank } from "@/lib/rank";

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
      bg-surface
      border
      border-white/10
      rounded-3xl
      p-6
      text-center
      transition
      hover:-translate-y-2
      ${color}
      `}
    >

      <div className="text-5xl mb-3">
        {icon}
      </div>


      <div
        className="
        text-4xl
        font-black
        "
      >
        {value}
      </div>


      <p
        className="
        mt-2
        text-muted
        "
      >
        {label}
      </p>


    </div>
  );

}
export default async function PublicProfile({
  params,
}: {
  params: Promise<{
    username: string;
  }>;
}) {


  const { username } = await params;


  const supabase =
    await createSupabaseServerClient();



  // Profil

  const {
    data: profile,
  } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .maybeSingle();



  if (!profile) {

    notFound();

  }




  // Cursele utilizatorului

  const {
    data: races,
  } = await supabase
    .from("races")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", {
      ascending: false,
    });



  const totalCurse =
    races?.length ?? 0;
const ids =
  races?.map((race) => race.id) ?? [];

let totalReviews = 0;
let totalFavorites = 0;
let averageRating = 0;

if (ids.length) {

  const {
    data: votes,
  } = await supabase
    .from("race_votes")
    .select("rating")
    .in("race_id", ids);

  totalReviews =
    votes?.length ?? 0;

  if (votes?.length) {

    averageRating =
      votes.reduce(
        (sum, vote) => sum + vote.rating,
        0
      ) / votes.length;

  }

  const {
    count,
  } = await supabase
    .from("favorites")
    .select("*", {
      count: "exact",
      head: true,
    })
    .in("race_id", ids);

  totalFavorites =
    count ?? 0;

}


  const rank =
    getRank(totalCurse);




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
max-w-6xl
mx-auto
"
>


{/* HEADER PROFIL */}

<section

className="
relative
overflow-hidden
rounded-[40px]
bg-surface
border
border-white/10
p-10
text-center
shadow-2xl
"

>


<div

className="
absolute
inset-0
bg-gradient-to-br
from-primary/10
via-transparent
to-accent/10
"

/>



<div
className="
relative
z-10
"
>


{/* AVATAR */}

<div
className="
flex
justify-center
"
>

<div

className="
relative
w-44
h-44
rounded-full
overflow-hidden
border-4
border-primary
shadow-2xl
"

>


<img

src={
profile.avatar_url ||
"/default-avatar.png"
}

alt="Avatar"

className="
w-full
h-full
object-cover
"
/>



<div

className="
absolute
bottom-2
right-2
w-12
h-12
rounded-full
bg-black
border-2
border-primary
flex
items-center
justify-center
text-xl
"

>

🏁

</div>



</div>

</div>





<h1

className="
mt-8
text-5xl
font-black
"

>

👤 {profile.username}

</h1>





<p

className="
mt-4
text-xl
text-muted
max-w-2xl
mx-auto
"

>

{
profile.bio ||
"Acest pilot nu are încă o descriere."
}

</p>





<div

className="
mt-6
"

>

<span

className={`
inline-block
px-6
py-3
rounded-full
bg-black/40
border
border-white/10
text-3xl
font-black
${rank.color}
`}

>

{rank.title}

</span>

</div>





<p

className="
mt-5
text-muted
text-lg
"

>

🏁 {totalCurse} curse create

</p>



</div>


</section>







{/* STATISTICI */}


<div

className="
grid
grid-cols-2
lg:grid-cols-4
gap-6
mt-10
"

>


<StatCard
icon="🏁"
value={totalCurse}
label="Curse"
color="hover:border-primary"
/>



<StatCard
icon="⭐"
value={averageRating.toFixed(1)}
label="Rating"
color="hover:border-yellow-500"
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
color="hover:border-cyan-500"
/>



</div>







{/* CURSE */}



<section
className="
mt-14
"
>


<h2

className="
text-4xl
font-black
mb-8
"

>

🏁 Curse încărcate

</h2>





{
totalCurse === 0 ?


<div

className="
bg-surface
border
border-white/10
rounded-3xl
p-10
text-center
text-muted
"

>

🚗 Acest utilizator nu are încă nicio cursă.

</div>



:


<div

className="
grid
md:grid-cols-2
lg:grid-cols-3
gap-8
"

>


{
races?.map((cursa)=>(


<Link

key={cursa.id}

href={`/cursa/${cursa.id}`}

className="
group
bg-surface
border
border-white/10
rounded-3xl
overflow-hidden
hover:border-primary
hover:-translate-y-2
transition
shadow-xl
"

>


<div

className="
relative
h-56
overflow-hidden
"

>


<img

src={
cursa.image_url ||
"/placeholder-race.jpg"
}

alt={cursa.title}

className="
w-full
h-full
object-cover
group-hover:scale-110
transition
duration-500
"

/>


</div>





<div
className="
p-6
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
mt-3
text-2xl
font-black
"

>

{cursa.title}

</h3>





<div

className="
mt-5
text-muted
space-y-2
"

>

<p>
🚗 {cursa.car}
</p>


<p>
🔥 Clasa {cursa.class}
</p>


<p>
🏆 {cursa.score}
</p>


</div>



</div>



</Link>



))
}



</div>


}



</section>



</div>


</main>

);

}