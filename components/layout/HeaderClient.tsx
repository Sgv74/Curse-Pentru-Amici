"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


type Props = {
  initialUser:any;
  initialProfil:any;
};


export default function HeaderClient({
  initialUser,
  initialProfil,
}:Props) {


  const [user,setUser] =
useState<any>(initialUser);


const [username,setUsername] =
useState(
  initialProfil?.username ?? ""
);



  const [scrolled, setScrolled] =
    useState(false);





  async function incarcaUser() {


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
        profil?.username ?? ""
      );


    }else{


      setUsername("");

    }


  }







  useEffect(()=>{


    incarcaUser();



    function handleScroll(){


      setScrolled(
        window.scrollY > 40
      );


    }



    window.addEventListener(
      "scroll",
      handleScroll
    );





    const {
      data:{
        subscription
      }
    }
    =
    supabase.auth.onAuthStateChange(()=>{


      incarcaUser();


    });






    return ()=>{


      subscription.unsubscribe();



      window.removeEventListener(
        "scroll",
        handleScroll
      );


    };


  },[]);







  async function logout(){


    await supabase.auth.signOut();


    setUser(null);

    setUsername("");


  }








  return (

    <header

      className={`
      fixed
      top-0
      left-0
      right-0
      z-50
      h-20
      px-6
      md:px-10
      flex
      items-center
      justify-between
      transition-all
      duration-300

      ${
        scrolled
        ?
        `
        bg-background
        border-b
        border-white/10
        shadow-2xl
        `
        :
        `
        bg-transparent
        `
      }

      `}

    >



      <Link

        href="/"

        className="
        text-2xl
        md:text-3xl
        font-black
        text-white
        hover:text-primary
        transition
        "

      >

        FH6 România

      </Link>







      <nav

        className="
        flex
        items-center
        gap-3
        md:gap-8
        "

      >



        <Link

          href="/apreciate"

          className="
          text-muted
          hover:text-accent
          transition
          "

        >

          🏆 Apreciate

        </Link>




        <Link

          href="/favorite"

          className="
          text-muted
          hover:text-accent
          transition
          "

        >

          ❤️ Favorite

        </Link>






        {
          user

          ?

          <>


            <Link

              href="/profil"

              className="
              text-primary
              font-black
              "

            >

              👤 {username || "Profil"}

            </Link>





            <button

              onClick={logout}

              className="
              bg-primary
              text-black
              px-5
              py-2.5
              rounded-xl
              font-black
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
              border
              border-accent
              text-accent
              px-5
              py-2.5
              rounded-xl
              font-bold
              "

            >

              Login

            </Link>





            <Link

              href="/register"

              className="
              bg-primary
              text-black
              px-5
              py-2.5
              rounded-xl
              font-black
              "

            >

              Înregistrare

            </Link>


          </>

        }





      </nav>




    </header>

  );

}