import Link from "next/link";


export default function EmailConfirmedPage() {


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


      <div
        className="
        max-w-md
        w-full
        text-center
        bg-surface
        border
        border-white/10
        p-10
        rounded-3xl
        shadow-2xl
        "
      >



        <div
          className="
          text-6xl
          mb-6
          "
        >
          ✅
        </div>




        <h1
          className="
          text-3xl
          font-black
          mb-4
          "
        >
          Email verificat!
        </h1>





        <p
          className="
          text-zinc-400
          text-lg
          leading-7
          "
        >
          Contul tău a fost confirmat cu succes.
          Acum te poți autentifica și folosi toate funcțiile comunității.
        </p>





        <Link

          href="/login"

          className="
          inline-flex
          mt-8
          bg-primary
          hover:opacity-90
          text-black
          font-black
          px-8
          py-3
          rounded-2xl
          transition
          "

        >

          🔑 Mergi la autentificare

        </Link>



      </div>


    </main>

  );

}