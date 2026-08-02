"use client";

import { useState } from "react";
import { loginAction } from "@/app/login/actions";
import Link from "next/link";


export default function LoginForm() {


  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [error,setError] = useState("");

  const [loading,setLoading] = useState(false);





  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ){

    e.preventDefault();

    setLoading(true);
    setError("");



    const result =
      await loginAction(
        email,
        password
      );



    if(result?.error){

      setError(
        result.error
      );

      setLoading(false);

      return;

    }


    setLoading(false);

  }






  return (

    <form

      onSubmit={handleLogin}

      className="
      w-full
      max-w-md
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
        text-5xl
        font-black
        text-center
        "
      >

        🏁 Login

      </h1>



      <p
        className="
        mt-3
        mb-10
        text-center
        text-muted
        "
      >

        Intră în comunitatea FH6 România

      </p>





      <input

        type="email"

        required

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
        outline-none
        focus:border-primary
        transition
        "

      />





      <input

        type="password"

        required

        placeholder="Parolă"

        value={password}

        onChange={
          e=>setPassword(e.target.value)
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
        outline-none
        focus:border-primary
        transition
        "

      />







      {
        error &&

        <p
          className="
          mb-5
          text-red-400
          text-center
          font-bold
          "
        >

          {error}

        </p>

      }







      <button

        type="submit"

        disabled={loading}

        className="
        w-full
        py-4
        rounded-xl
        bg-primary
        text-black
        font-black
        text-lg
        hover:bg-primary-hover
        hover:scale-[1.02]
        transition
        disabled:opacity-50
        "

      >

        {
          loading
          ?
          "Se conectează..."
          :
          "Intră în cont"
        }

      </button>







      <div
        className="
        mt-8
        text-center
        space-y-3
        "
      >


        <Link

          href="/forgot-password"

          className="
          block
          text-primary
          font-bold
          hover:text-primary-hover
          transition
          "

        >

          Ai uitat parola?

        </Link>





        <Link

          href="/register"

          className="
          block
          text-muted
          hover:text-white
          transition
          "

        >

          Nu ai cont? Creează unul

        </Link>



      </div>




    </form>

  );

}