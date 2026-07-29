"use client";


import { useState } from "react";
import { loginAction } from "../../app/login/actions";



export default function LoginForm() {


  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [error,setError] = useState("");

  const [loading,setLoading] = useState(false);







  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {


    e.preventDefault();


    setLoading(true);

    setError("");



    const result = await loginAction(
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







  }







  return (


    <form

      onSubmit={handleLogin}

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
        text-4xl
        font-bold
        mb-8
        text-center
        "

      >

        🏁 Login

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

        placeholder="Parolă"

        value={password}

        onChange={(e)=>
          setPassword(e.target.value)
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
        error && (

          <p className="text-red-400 mb-4">

            {error}

          </p>

        )
      }








      <button

        disabled={loading}

        type="submit"

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
          "Se conectează..."
          :
          "Intră în cont"
        }


      </button>





    </form>


  );

}