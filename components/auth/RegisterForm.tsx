"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";


export default function RegisterForm() {


  const [username,setUsername] = useState("");

  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [confirmPassword,setConfirmPassword] = useState("");


  const [mesaj,setMesaj] = useState("");

  const [eroare,setEroare] = useState("");

  const [loading,setLoading] = useState(false);





  async function register(
    e:React.FormEvent<HTMLFormElement>
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



    if(username.trim().length < 3){

      setEroare(
        "Username-ul trebuie să aibă minim 3 caractere."
      );

      return;

    }




    setLoading(true);





    const {
      data:usernameExist
    } =
    await supabase
      .from("profiles")
      .select("id")
      .eq(
        "username",
        username.trim()
      )
      .maybeSingle();




    if(usernameExist){

      setEroare(
        "Username deja folosit."
      );

      setLoading(false);

      return;

    }







    const {
      error
    } =
    await supabase.auth.signUp({

      email:email.trim(),

      password,


      options:{


        data:{

          username:
          username.trim()

        },


        emailRedirectTo:

        `${window.location.origin}/email-confirmed`

      }


    });






    if(error){

      setEroare(
        error.message
      );

      setLoading(false);

      return;

    }







    setMesaj(
      "✅ Cont creat. Verifică email-ul pentru confirmare."
    );



    setLoading(false);



  }







  return (


    <form

      onSubmit={register}

      className="
      w-full
      bg-surface
      border
      border-white/10
      rounded-[32px]
      p-10
      shadow-2xl
      "

    >



      <h1
        className="
        text-4xl
        font-black
        text-center
        "
      >

        Creează cont

      </h1>




      <p
        className="
        text-center
        text-muted
        mt-3
        mb-10
        "
      >

        Intră în comunitatea FH6 România

      </p>





      <input

        required

        placeholder="Username"

        value={username}

        onChange={
          e=>setUsername(e.target.value)
        }

        className="
        w-full
        mb-5
        px-5
        py-4
        rounded-xl
        bg-black
        border
        border-white/10
        "

      />






      <input

        required

        type="email"

        placeholder="Email"

        value={email}

        onChange={
          e=>setEmail(e.target.value)
        }

        className="
        w-full
        mb-5
        px-5
        py-4
        rounded-xl
        bg-black
        border
        border-white/10
        "

      />







      <input

        required

        type="password"

        placeholder="Parolă"

        value={password}

        onChange={
          e=>setPassword(e.target.value)
        }

        className="
        w-full
        mb-5
        px-5
        py-4
        rounded-xl
        bg-black
        border
        border-white/10
        "

      />








      <input

        required

        type="password"

        placeholder="Confirmă parola"

        value={confirmPassword}

        onChange={
          e=>setConfirmPassword(e.target.value)
        }

        className="
        w-full
        mb-6
        px-5
        py-4
        rounded-xl
        bg-black
        border
        border-white/10
        "

      />







      {
        eroare &&

        <p
          className="
          text-red-400
          font-bold
          text-center
          mb-5
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
          font-bold
          text-center
          mb-5
          "
        >

          {mesaj}

        </p>

      }







      <button

        disabled={loading}

        className="
        w-full
        py-4
        rounded-xl
        bg-primary
        text-black
        font-black
        text-lg
        disabled:opacity-50
        "

      >

        {
          loading
          ?
          "Se creează..."
          :
          "Creează cont"
        }


      </button>







      <div
        className="
        text-center
        mt-8
        "
      >

        <Link

          href="/login"

          className="
          text-muted
          hover:text-white
          "

        >

          Ai deja cont? Intră aici

        </Link>


      </div>



    </form>


  );

}