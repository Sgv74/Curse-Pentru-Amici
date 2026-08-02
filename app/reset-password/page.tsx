"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function ResetPasswordPage() {


  const router = useRouter();


  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const [mesaj,setMesaj] = useState("");
  const [eroare,setEroare] = useState("");

  const [loading,setLoading] = useState(false);



  async function handleUpdate(
    e: React.FormEvent<HTMLFormElement>
  ){

    e.preventDefault();


    setMesaj("");
    setEroare("");



    if(password !== confirmPassword){

      setEroare(
        "Parolele nu coincid."
      );

      return;

    }



    setLoading(true);



    const {
      error
    } = await supabase.auth.updateUser({

      password

    });



    if(error){

      setEroare(
        "❌ Linkul de resetare a expirat sau nu mai este valid."
      );

      setLoading(false);

      return;

    }



    setMesaj(
      "✅ Parola a fost schimbată cu succes!"
    );


    setLoading(false);



    setTimeout(()=>{

      router.push("/login");

    },2000);



  }




  return (

    <main
      className="
      min-h-screen
      bg-background
      text-white
      flex
      items-center
      justify-center
      px-6
      "
    >


      <form

        onSubmit={handleUpdate}

        className="
        w-full
        max-w-md
        bg-surface
        border
        border-white/10
        rounded-3xl
        p-8
        shadow-2xl
        "

      >



        <h1

          className="
          text-4xl
          font-black
          text-center
          mb-8
          "
        >

          🔑 Parolă nouă

        </h1>




        <input

          type="password"

          required

          placeholder="Parolă nouă"

          value={password}

          onChange={(e)=>
            setPassword(e.target.value)
          }

          className="
          w-full
          mb-4
          p-4
          rounded-xl
          bg-black/50
          border
          border-white/10
          outline-none
          focus:border-primary
          transition
          "

        />




        <input

          type="password"

          required

          placeholder="Confirmă parola"

          value={confirmPassword}

          onChange={(e)=>
            setConfirmPassword(e.target.value)
          }

          className="
          w-full
          mb-6
          p-4
          rounded-xl
          bg-black/50
          border
          border-white/10
          outline-none
          focus:border-primary
          transition
          "

        />





        {
          eroare &&

          <p
            className="
            text-red-400
            mb-4
            font-bold
            text-center
            "
          >
            {eroare}
          </p>

        }




        {
          mesaj &&

          <p
            className="
            text-primary
            mb-4
            font-bold
            text-center
            "
          >
            {mesaj}
          </p>

        }





        <button

          disabled={loading}

          type="submit"

          className="
          w-full
          bg-primary
          text-black
          hover:bg-primary-hover
          disabled:opacity-50
          p-4
          rounded-xl
          font-black
          text-lg
          transition
          hover:scale-[1.02]
          "

        >

          {
            loading
            ?
            "Se salvează..."
            :
            "Schimbă parola"
          }


        </button>




      </form>


    </main>

  );

}