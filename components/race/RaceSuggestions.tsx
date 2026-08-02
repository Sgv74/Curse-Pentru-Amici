import Image from "next/image";
import Link from "next/link";


type Race = {

  id:number;

  title:string;

  image_url:string;

  category:string;

  car:string;

  score:string | number;

  gallery?:string[];

};





export default function RaceSuggestions({

  races,

}:{

  races:Race[];

}){


  if(!races || races.length === 0){

    return null;

  }





  return (

<section

className="
mt-16
"

>



<h2

className="
text-3xl
font-black
mb-8
"

>

🏁 Poate îți vor plăcea și...

</h2>







<div

className="
grid
sm:grid-cols-2
lg:grid-cols-4
gap-6
"

>



{

races.slice(0,4).map((race)=>(


<Link


key={race.id}


href={`/cursa/${race.id}`}


className="
group
overflow-hidden
rounded-3xl
bg-surface
border
border-white/10
hover:border-primary
hover:-translate-y-2
transition-all
duration-300
"


>



<div

className="
relative
h-44
overflow-hidden
"

>



<Image


src={

race.image_url ||

"/placeholder-race.png"

}


alt={race.title}


fill


sizes="
(max-width:640px) 100vw,
(max-width:1024px) 50vw,
25vw
"


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
from-black/80
via-transparent
to-transparent
"

/>






{

race.gallery &&
race.gallery.length > 0 &&


<div

className="
absolute
top-3
right-3
bg-black/70
backdrop-blur
px-3
py-1
rounded-full
text-xs
font-bold
"

>

📸 {race.gallery.length + 1}

</div>


}



</div>









<div

className="
p-5
"

>



<h3

className="
text-xl
font-black
line-clamp-2
"

>

{race.title}

</h3>







<div

className="
mt-4
space-y-1
text-zinc-400
"

>


<p>
📂 {race.category}
</p>


<p>
🚗 {race.car}
</p>


</div>







<p

className="
mt-5
text-primary
font-black
text-lg
"

>

🏆 {race.score}

</p>





</div>





</Link>


))


}



</div>





</section>

  );

}