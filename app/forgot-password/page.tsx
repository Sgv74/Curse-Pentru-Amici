"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";


export default function ForgotPasswordPage() {


  const [email, setEmail] = useState("");

  const [mesaj, setMesaj] = useState("");

  const [eroare, setEroare] = useState("");

  const [loading, setLoading] = useState(false);



  async function handleReset(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();


    setMesaj("");
    setEroare("");
    setLoading(true);



    const { error } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          "https://curseleamicilor.vercel.app/reset-password",
      }
    );



    if (error) {

      setEroare(
        error.message
      );

      setLoading(false);

      return;

    }



    setMesaj(
      "📩 Dacă există un cont cu acest email, vei primi un link de resetare. Verifică Inbox-ul și folderul Spam."
    );


    setLoading(false);

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

        onSubmit={handleReset}

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
          🔐 Resetare parolă
        </h1>




        <input

          type="email"

          required

          placeholder="Email"

          value={email}

          onChange={(e)=>
            setEmail(e.target.value)
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

          type="submit"

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
            "Se trimite..."
            :
            "Trimite link resetare"
          }


        </button>





        <p className="text-center mt-6">

          <a

            href="/login"

            className="
            text-green-400
            hover:underline
            "

          >

            ← Înapoi la login

          </a>

        </p>




      </form>


    </main>

  );

}