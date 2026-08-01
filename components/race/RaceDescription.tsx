type Props = {
  description:string;
};


export default function RaceDescription({
  description,
}:Props){


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
        mb-5
        "
      >

        📝 Descriere cursă

      </h2>




      <div
        className="
        bg-black
        rounded-xl
        p-5
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
            description ||
            "Autorul nu a adăugat o descriere."
          }

        </p>


      </div>



    </section>

  );

}