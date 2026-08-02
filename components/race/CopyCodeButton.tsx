"use client";

import { useState } from "react";


export default function CopyCodeButton({
  code,
}: {
  code: string;
}) {


  const [copied, setCopied] = useState(false);



  async function copy() {

    await navigator.clipboard.writeText(code);

    setCopied(true);


    setTimeout(() => {

      setCopied(false);

    }, 1500);

  }




  return (

    <button

      type="button"

      onClick={copy}

      title={
        copied
          ? "Cod copiat!"
          : "Copiază codul"
      }

      aria-label="Copiază codul"


      className={`
        w-14
        h-14
        flex
        items-center
        justify-center
        rounded-2xl
        text-xl
        font-black
        transition-all
        duration-300

        ${
          copied
            ? 
            "bg-accent text-black scale-105"
            :
            "bg-primary hover:opacity-90"
        }
      `}

    >

      {
        copied
          ? "✓"
          : "📋"
      }


    </button>

  );

}