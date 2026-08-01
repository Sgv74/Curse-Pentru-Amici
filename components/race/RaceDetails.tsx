type Props = {
  category: string;
  car: string;
  raceClass: string;
  score: number;
  duration: string;
  createdAt: string;
};


export default function RaceDetails({
  category,
  car,
  raceClass,
  score,
  duration,
  createdAt,
}: Props) {


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
        mb-6
        "
      >

        📋 Detalii cursă

      </h2>




      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-4
        "
      >


        <Info
          icon="📂"
          label="Categorie"
          value={category}
        />


        <Info
          icon="🚗"
          label="Mașină"
          value={car}
        />


        <Info
          icon="🔥"
          label="Clasă"
          value={raceClass}
        />


        <Info
          icon="🏆"
          label="Scor"
          value={score}
        />


        <Info
          icon="⏱️"
          label="Durată"
          value={duration}
        />


        <Info
          icon="📅"
          label="Publicată"
          value={createdAt}
        />


      </div>


    </section>

  );

}





function Info({
  icon,
  label,
  value,
}: {
  icon:string;
  label:string;
  value:string | number;
}) {


  return (

    <div
      className="
      bg-black
      rounded-xl
      p-4
      border
      border-zinc-800
      "
    >


      <div
        className="
        text-3xl
        mb-2
        "
      >

        {icon}

      </div>



      <p
        className="
        text-zinc-500
        text-sm
        "
      >

        {label}

      </p>



      <p
        className="
        text-lg
        font-black
        mt-1
        "
      >

        {value}

      </p>


    </div>

  );

}