"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";



export default function Header() {


  const [user,setUser] =
    useState<any>(null);


  const [username,setUsername] =
    useState("");







  async function incarcaUser(){


    const {
      data:{
        user
      }
    } =
    await supabase.auth.getUser();



    setUser(user);





    if(user){


      const {
        data:profil
      } =
      await supabase
        .from("profiles")
        .select("username")
        .eq(
          "id",
          user.id
        )
        .maybeSingle();





      setUsername(
        profil?.username || ""
      );



    } else {


      setUsername("");

    }


  }







  useEffect(()=>{


    incarcaUser();




    const {
      data:{
        subscription
      }
    } =
    supabase.auth.onAuthStateChange(
      ()=>{

        incarcaUser();

      }
    );




    return ()=>{

      subscription.unsubscribe();

    };


  },[]);









  async function logout(){


    await supabase.auth.signOut();


    setUser(null);

    setUsername("");


  }









  return (


    <header

      className="
      fixed
      top-0
      left-0
      right-0
      z-50
      h-16
      px-6
      flex
      items-center
      justify-between
      bg-zinc-950/90
      backdrop-blur-md
      border-b
      border-zinc-800
      "

    >






      <Link

        href="/"

        className="
        text-xl
        font-extrabold
        text-white
        "

      >

        🥬 Legumă • 🍺 Bercică • 🐕 SălbătiCuțu

      </Link>









      <nav

        className="
        flex
        items-center
        gap-4
        "

      >





        <Link
  href="/apreciate"
  className="
  text-yellow-400
  font-bold
  hover:text-yellow-300
  "
>
  🏆 Apreciate
</Link>

<Link
  href="/favorite"
  className="
  text-red-400
  font-bold
  hover:text-red-300
  "
>
  ❤️ Favorite
</Link>








        {
          user ?


          <>


            <Link

              href="/profile"

              className="
              text-green-400
              font-bold
              hover:text-green-300
              "

            >

              👤 {username || "Profil"}

            </Link>







            <button

              onClick={logout}

              className="
              bg-red-600
              hover:bg-red-700
              px-4
              py-2
              rounded-xl
              font-bold
              "

            >

              Logout

            </button>



          </>





          :



          <>


            <Link

              href="/login"

              className="
              bg-green-600
              hover:bg-green-700
              px-4
              py-2
              rounded-xl
              font-bold
              "

            >

              Login

            </Link>







            <Link

              href="/register"

              className="
              bg-zinc-800
              hover:bg-zinc-700
              px-4
              py-2
              rounded-xl
              font-bold
              "

            >

              Register

            </Link>


          </>


        }



      </nav>





    </header>


  );


}  