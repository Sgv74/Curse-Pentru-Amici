"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


type Props = {
  categories: string[];
  classes: string[];
};


export default function SearchSection({
  categories,
  classes,
}: Props) {


  const router = useRouter();


  const [search, setSearch] = useState("");
  const [car, setCar] = useState("");
  const [category, setCategory] = useState("");
  const [raceClass, setRaceClass] = useState("");



  function cauta() {


    const params = new URLSearchParams();



    if(search.trim()) {

      params.set(
        "search",
        search.trim()
      );

    }



    if(car.trim()) {

      params.set(
        "car",
        car.trim()
      );

    }



    if(category) {

      params.set(
        "category",
        category
      );

    }



    if(raceClass) {

      params.set(
        "class",
        raceClass
      );

    }




    router.push(
      `/cauta?${params.toString()}`
    );


  }





  return (

    <section
      className="
      bg-surface
      border
      border-white/10
      rounded-3xl
      p-8
      "
    >



      <div
        className="
        grid
        lg:grid-cols-4
        gap-5
        "
      >



        <input

          value={search}

          onChange={(e)=>
            setSearch(e.target.value)
          }

          placeholder="🔍 Nume cursă"

          className="
          bg-black
          border
          border-white/10
          rounded-xl
          px-5
          py-4
          outline-none
          focus:border-primary
          "

        />





        <input

          value={car}

          onChange={(e)=>
            setCar(e.target.value)
          }

          placeholder="🚗 Mașină"

          className="
          bg-black
          border
          border-white/10
          rounded-xl
          px-5
          py-4
          outline-none
          focus:border-primary
          "

        />






        <select

          value={category}

          onChange={(e)=>
            setCategory(e.target.value)
          }

          className="
          bg-black
          border
          border-white/10
          rounded-xl
          px-5
          py-4
          "

        >

          <option value="">
            📂 Toate categoriile
          </option>


          {
            categories.map((cat)=>(

              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>

            ))
          }


        </select>







        <select

          value={raceClass}

          onChange={(e)=>
            setRaceClass(e.target.value)
          }

          className="
          bg-black
          border
          border-white/10
          rounded-xl
          px-5
          py-4
          "

        >


          <option value="">
            🔥 Toate clasele
          </option>



          {
            classes.map((c)=>(

              <option
                key={c}
                value={c}
              >
                {c}
              </option>

            ))
          }



        </select>




      </div>






      <button

        onClick={cauta}

        className="
        mt-8
        w-full
        bg-primary
        text-black
        py-4
        rounded-xl
        font-black
        text-lg
        hover:bg-primary-hover
        transition
        "

      >

        🔎 Caută curse

      </button>





    </section>


  );

}