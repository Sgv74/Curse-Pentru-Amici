"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function EditProfileForm({
  profile,
}: {
  profile:any;
}) {

  const router = useRouter();

  const [username, setUsername] =
    useState(profile?.username || "");

  const [bio, setBio] =
    useState(profile?.bio || "");

  const [avatar, setAvatar] =
    useState<File | null>(null);

  const [mesaj, setMesaj] =
    useState("");

  const [loading, setLoading] =
    useState(false);



  async function handleSave(
    e: React.FormEvent<HTMLFormElement>
  ){

    e.preventDefault();

    setLoading(true);
    setMesaj("");

    let avatar_url =
      profile.avatar_url;



    if(avatar){


      // șterge poza veche

      if(profile.avatar_url){

        const oldFileName =
          profile.avatar_url
            .split("/")
            .pop()
            ?.split("?")[0];


        if(oldFileName){

          await supabase
            .storage
            .from("avatars")
            .remove([
              oldFileName
            ]);

        }

      }




      // upload poza nouă

      const fileExt =
        avatar.name
          .split(".")
          .pop();



      const fileName =
        `${profile.id}.${fileExt}`;





      const {
        error:uploadError
      } =
      await supabase
        .storage
        .from("avatars")
        .upload(
          fileName,
          avatar,
          {
            upsert:true,
            contentType:avatar.type,
          }
        );



      if(uploadError){

        setMesaj(
          "Eroare avatar: " + uploadError.message
        );

        setLoading(false);

        return;

      }




      const {
        data
      } =
      supabase
        .storage
        .from("avatars")
        .getPublicUrl(fileName);



      avatar_url =
        `${data.publicUrl}?t=${Date.now()}`;


    }





    const {
      error
    } =
    await supabase
      .from("profiles")
      .update({

        username,

        bio,

        avatar_url,

      })
      .eq(
        "id",
        profile.id
      );





    if(error){

      setMesaj(
        "Eroare: " + error.message
      );

      setLoading(false);

      return;

    }



    setMesaj(
      "✅ Profil actualizat!"
    );


    setLoading(false);



    setTimeout(()=>{

      router.push("/profil");

    },1500);


  }





  return (

    <form

      onSubmit={handleSave}

      className="
      bg-zinc-900
      border
      border-zinc-800
      rounded-3xl
      p-8
      w-full
      max-w-md
      "

    >


      <h1
        className="
        text-3xl
        font-black
        mb-8
        "
      >
        ✏️ Editează profil
      </h1>




      <label className="text-zinc-400">
        Username
      </label>


      <input

        value={username}

        onChange={(e)=>
          setUsername(e.target.value)
        }

        className="
        w-full
        mt-2
        mb-6
        p-4
        rounded-xl
        bg-black
        border
        border-zinc-700
        "

      />




      <label className="text-zinc-400">
        Descriere
      </label>


      <textarea

        value={bio}

        onChange={(e)=>
          setBio(e.target.value)
        }

        rows={4}

        className="
        w-full
        mt-2
        mb-6
        p-4
        rounded-xl
        bg-black
        border
        border-zinc-700
        "

        placeholder="Spune ceva despre tine..."

      />




      <label className="text-zinc-400">
        Avatar
      </label>


      <input

        type="file"

        accept="image/*"

        onChange={(e)=>
          setAvatar(
            e.target.files?.[0] || null
          )
        }

        className="
        w-full
        mt-2
        mb-6
        text-sm
        "

      />




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
        hover:bg-green-500
        disabled:opacity-50
        py-4
        rounded-xl
        font-bold
        "

      >

        {
          loading
          ?
          "Se salvează..."
          :
          "Salvează profil"
        }

      </button>


    </form>

  );

}