"use client";

import { useState } from "react";


export default function CopyCodeButton({
  code,
}: {
  code:string;
}) {


  const [copied,setCopied] = useState(false);



  async function copy(){


    await navigator.clipboard.writeText(code);


    setCopied(true);



    setTimeout(()=>{

      setCopied(false);

    },1500);


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

      className="
      w-12
      h-12
      flex
      items-center
      justify-center
      rounded-xl
      bg-green-600
      hover:bg-green-500
      transition
      text-xl
      "

    >

      {copied ? "✓" : "📋"}


    </button>

  );

}