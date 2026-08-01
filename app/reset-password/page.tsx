"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function ResetPasswordPage() {


  const router = useRouter();


  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [mesaj, setMesaj] = useState("");
  const [eroare, setEroare] = useState("");

  const [loading, setLoading] = useState(false);



  async function handleUpdate(
    e: React.FormEvent<HTMLFormElement>
  ) {

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



    if (error) {

  setEroare(
    "❌ Linkul de resetare a expirat sau nu mai este valid. Cere un nou link."
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
      bg-zinc-950
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
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-8
        w-full
        max-w-md
        "

      >


        <h1
          className="
          text-3xl
          font-bold
          text-center
          mb-8
          "
        >
          🔑 Setează parola nouă
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
          bg-black
          border
          border-zinc-700
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
          bg-black
          border
          border-zinc-700
          "

        />



        {
          eroare &&

          <p className="text-red-400 mb-4">
            {eroare}
          </p>

        }



        {
          mesaj &&

          <p className="text-green-400 mb-4">
            {mesaj}
          </p>

        }



        <button

          disabled={loading}

          className="
          w-full
          bg-green-600
          hover:bg-green-700
          disabled:opacity-50
          p-4
          rounded-xl
          font-bold
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