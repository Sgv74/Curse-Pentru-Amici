type Props = {
  description?: string | null;
};


export default function RaceDescription({

  description,

}: Props) {


  return (

    <section

      className="
      rounded-3xl
      bg-surface
      border
      border-white/10
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

        📝 Descriere cursă

      </h2>





      <div

        className="
        rounded-2xl
        bg-background/60
        border
        border-white/10
        p-6
        "

      >



        <p

          className="
          text-zinc-300
          leading-8
          text-lg
          whitespace-pre-wrap
          "

        >

          {

            description?.trim()

            ||

            "Autorul nu a adăugat încă o descriere pentru această cursă."

          }


        </p>



      </div>




    </section>

  );

}