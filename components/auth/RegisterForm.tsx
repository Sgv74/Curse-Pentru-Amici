"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function RegisterForm() {


  

  const router = useRouter();



  const [username,setUsername] = useState("");

  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [confirmPassword,setConfirmPassword] = useState("");


  const [mesaj,setMesaj] = useState("");

  const [eroare,setEroare] = useState("");

  const [loading,setLoading] = useState(false);






  async function register(
    e: React.FormEvent<HTMLFormElement>
  ){

    e.preventDefault();


    setEroare("");

    setMesaj("");




    if(password !== confirmPassword){

      setEroare(
        "Parolele nu coincid."
      );

      return;

    }



    if(username.length < 3){

      setEroare(
        "Username-ul trebuie să aibă minim 3 caractere."
      );

      return;

    }




    setLoading(true);




    // verificăm dacă username-ul există

    const {
      data:existingUser
    } =
    await supabase
    .from("profiles")
    .select("username")
    .eq(
      "username",
      username
    )
    .single();



    if(existingUser){

      setEroare(
        "Acest username este deja folosit."
      );

      setLoading(false);

      return;

    }






    // creare cont AUTH


   const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: "http://https://curseleamicilor.vercel.app//email-confirmed",
  },
});





    if(error){

      setEroare(
        error.message
      );

      setLoading(false);

      return;

    }





    // creare profil


    if(data.user){


      const {

        error:profileError

      } =

      await supabase

      .from("profiles")

      .insert({

        id:data.user.id,

        username:username,

      });





      if(profileError){

        setEroare(
          profileError.message
        );

        setLoading(false);

        return;

      }


    }






    setMesaj(
      "✅ Cont creat cu succes! Verifică email-ul."
    );



    setLoading(false);




    setTimeout(()=>{

      router.push("/login");

    },2000);



  }







  return (


    <form

      onSubmit={register}

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

        🏁 Creează cont

      </h1>





      <input

        required

        placeholder="Username"

        value={username}

        onChange={
          e=>setUsername(e.target.value)
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

        required

        type="email"

        placeholder="Email"

        value={email}

        onChange={
          e=>setEmail(e.target.value)
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

        required

        type="password"

        placeholder="Parolă"

        value={password}

        onChange={
          e=>setPassword(e.target.value)
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
        py-4
        rounded-xl
        font-bold
        text-xl
        "

      >

        {
          loading
          ?
          "Se creează..."
          :
          "Create Account"
        }


      </button>



    </form>


  );

}