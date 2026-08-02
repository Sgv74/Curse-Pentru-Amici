type Props = {
  category: string;
  car: string;
  raceClass: string;
  score: string | number;
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
        mb-8
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
        gap-5
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
      rounded-2xl
      p-5
      border
      border-white/10
      bg-background/50
      hover:border-accent/40
      transition
      "

    >


      <div

        className="
        text-3xl
        mb-4
        "

      >

        {icon}

      </div>




      <p

        className="
        text-muted
        text-sm
        uppercase
        tracking-wider
        font-bold
        "

      >

        {label}

      </p>




      <p

        className="
        mt-2
        text-xl
        font-black
        text-white
        "

      >

        {value}

      </p>


    </div>

  );

}