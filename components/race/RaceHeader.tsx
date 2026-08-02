"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/races/FavoriteButton";


type Props = {

  race:any;

  author:string;

  rating:string;

  favorites:number;

  views:number;

  isFavorite:boolean;

  gallery?:string[];

};



export default function RaceHeader({

  race,
  author,
  rating,
  favorites,
  views,
  isFavorite,
  gallery=[]

}:Props){


  const images =
    gallery.length > 0
    ? gallery
    : [race.image_url];



  const [index,setIndex] = useState(0);

  const [fullscreen,setFullscreen] = useState(false);




  function next(){

    setIndex(
      (index + 1) % images.length
    );

  }



  function prev(){

    setIndex(
      (index - 1 + images.length)
      % images.length
    );

  }




return (

<>


<section

className="
relative
h-[520px]
overflow-hidden
"

>



{/* IMAGINE PRINCIPALA */}

<div

className="
absolute
inset-0
z-0
"

>

<Image

src={
images[index] ||
"/placeholder-race.png"
}

alt={race.title}

fill

priority

onClick={()=>setFullscreen(true)}

className="
object-cover
cursor-zoom-in
"

/>

</div>





{/* OVERLAY */}

<div

className="
absolute
inset-0
z-10
pointer-events-none
bg-gradient-to-t
from-background
via-black/70
to-transparent
"

/>





{/* SAGETI */}

{

images.length > 1 &&

<>


<button

onClick={prev}

className="
absolute
left-5
top-1/2
-translate-y-1/2
z-30
bg-black/70
hover:bg-black
text-white
rounded-full
w-14
h-14
text-3xl
font-black
"

>

←

</button>





<button

onClick={next}

className="
absolute
right-5
top-1/2
-translate-y-1/2
z-30
bg-black/70
hover:bg-black
text-white
rounded-full
w-14
h-14
text-3xl
font-black
"

>

→

</button>





<div

className="
absolute
top-5
right-5
z-30
bg-black/70
px-4
py-2
rounded-full
font-bold
"

>

{index+1} / {images.length}

</div>


</>

}







{/* CONTINUT */}

<div

className="
absolute
bottom-0
left-0
right-0
z-20
p-8
"

>

<div

className="
flex
justify-between
items-end
gap-6
"

>



<div>


<span

className="
text-primary
font-black
uppercase
tracking-widest
"

>

{race.category}

</span>




<h1

className="
text-4xl
md:text-6xl
font-black
mt-3
"

>

🏁 {race.title}

</h1>





<Link

href={`/profil/${author}`}

className="
inline-block
mt-5
text-accent
font-black
text-lg
"

>

👤 {author}

</Link>







<div

className="
flex
flex-wrap
gap-4
mt-7
"

>


<Stat
icon="⭐"
value={rating}
label="Rating"
/>


<Stat
icon="❤️"
value={favorites}
label="Favorite"
/>


<Stat
icon="👁️"
value={views}
label="Views"
/>


</div>



</div>





<FavoriteButton

raceId={race.id}

initialFavorite={isFavorite}

/>



</div>

</div>



</section>









{/* FULLSCREEN */}

{

fullscreen &&


<div

className="
fixed
inset-0
z-[99999]
bg-black/95
flex
items-center
justify-center
"

onClick={()=>setFullscreen(false)}

>



<div

className="
relative
w-screen
h-screen
"

onClick={(e)=>e.stopPropagation()}

>



<Image

src={images[index]}

alt={race.title}

fill

priority

className="
object-contain
"

/>





{

images.length > 1 &&

<>


<button

onClick={prev}

className="
absolute
left-8
top-1/2
-translate-y-1/2
z-50
bg-black/70
text-white
rounded-full
w-16
h-16
text-4xl
font-black
"

>

←

</button>





<button

onClick={next}

className="
absolute
right-8
top-1/2
-translate-y-1/2
z-50
bg-black/70
text-white
rounded-full
w-16
h-16
text-4xl
font-black
"

>

→

</button>


</>


}






<button

onClick={()=>setFullscreen(false)}

className="
absolute
top-8
right-8
z-50
bg-white
text-black
rounded-full
w-14
h-14
text-3xl
font-black
"

>

×

</button>




</div>


</div>


}



</>

);

}





function Stat({

icon,

value,

label

}:{

icon:string;

value:string|number;

label:string;

}){


return (

<div

className="
bg-black/40
backdrop-blur
rounded-2xl
border
border-white/10
px-5
py-3
"

>

<p className="text-xl font-black">

{icon} {value}

</p>


<p className="text-xs text-zinc-400 uppercase">

{label}

</p>


</div>

);

}