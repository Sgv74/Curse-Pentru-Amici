import CopyCodeButton from "./CopyCodeButton";


export default function RaceCode({
  shareCode,
}: {
  shareCode:string;
}) {


  return (

    <section
      className="
      mt-10
      bg-zinc-900
      border
      border-zinc-800
      rounded-2xl
      p-6
      "
    >


      <h2
        className="
        text-2xl
        font-black
        mb-4
        "
      >

        🔑 Codul cursei

      </h2>





      <div
        className="
        flex
        items-center
        justify-between
        gap-4
        bg-black
        rounded-xl
        px-5
        py-4
        "
      >



        <span
          className="
          text-2xl
          md:text-3xl
          font-black
          tracking-[0.25em]
          text-green-400
          "
        >

          {shareCode}

        </span>




        <CopyCodeButton

          code={shareCode}

        />



      </div>



    </section>

  );

}