import CopyCodeButton from "./CopyCodeButton";


export default function RaceCode({

  shareCode,

}: {

  shareCode?: string | null;

}) {


  const code = shareCode?.trim() || "N/A";


  return (

    <section

      className="
      rounded-3xl
      border
      border-primary/20
      bg-surface
      p-6
      md:p-8
      "

    >



      <h2

        className="
        text-2xl
        md:text-3xl
        font-black
        mb-6
        "

      >

        🔑 Codul cursei

      </h2>






      <div

        className="
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-5
        bg-background
        rounded-2xl
        border
        border-white/10
        px-6
        py-5
        "

      >



        <span

          className="
          text-3xl
          md:text-5xl
          font-black
          tracking-[0.3em]
          bg-gradient-to-r
          from-primary
          via-accent
          to-primary
          bg-clip-text
          text-transparent
          "

        >

          {code}

        </span>






        {
          code !== "N/A" &&

          <CopyCodeButton

            code={code}

          />

        }



      </div>






      <p

        className="
        mt-5
        text-sm
        text-muted
        "

      >

        Copiază codul și caută această cursă direct în Forza Horizon.

      </p>



    </section>

  );

}