"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Race = {
  id: number;
  title: string;
  image_url: string;
  category: string;
  car: string;
  class: string;
  duration: string;
  score: string;
  rating?: number;
};

export default function SearchSection({
  races,
}: {
  races: Race[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [car, setCar] = useState("");
  const [raceClass, setRaceClass] = useState("");

  const rezultate = useMemo(() => {
    return races.filter((race) => {
      const text = search.toLowerCase();

      const matchSearch =
        search === "" ||
        race.title.toLowerCase().includes(text) ||
        race.car.toLowerCase().includes(text) ||
        race.category.toLowerCase().includes(text) ||
        race.class.toLowerCase().includes(text) ||
        race.duration.toLowerCase().includes(text) ||
        race.score.toLowerCase().includes(text);

      const matchCategory =
        category === "" || race.category === category;

      const matchCar =
        car === "" ||
        race.car.toLowerCase().includes(car.toLowerCase());

      const matchClass =
        raceClass === "" || race.class === raceClass;

      return (
        matchSearch &&
        matchCategory &&
        matchCar &&
        matchClass
      );
    });
  }, [search, category, car, raceClass, races]);

  const categorii = [...new Set(races.map((r) => r.category))];
  const clase = [...new Set(races.map((r) => r.class))];

  return (
    <>
      <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 mt-10">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Caută după nume, mașină, categorie, clasă..."
          className="w-full bg-black rounded-xl p-4 mb-5"
        />

        <div className="grid md:grid-cols-3 gap-4">

          <input
            placeholder="🚗 Mașină"
            value={car}
            onChange={(e) => setCar(e.target.value)}
            className="bg-black rounded-xl p-4"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-black rounded-xl p-4"
          >
            <option value="">Toate categoriile</option>

            {categorii.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={raceClass}
            onChange={(e) => setRaceClass(e.target.value)}
            className="bg-black rounded-xl p-4"
          >
            <option value="">Toate clasele</option>

            {clase.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        {rezultate.map((race) => (

          <Link
            key={race.id}
            href={`/cursa/${race.id}`}
            className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-green-500 transition"
          >
            <img
              src={race.image_url}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

              <h2 className="text-2xl font-bold">
                {race.title}
              </h2>

              <p className="mt-2">
                📂 {race.category}
              </p>

              <p>
                🚗 {race.car}
              </p>

              <p>
                🔥 {race.class}
              </p>

              <p>
                ⏱️ {race.duration}
              </p>

              <p>
                🏆 {race.score}
              </p>

            </div>

          </Link>

        ))}

      </div>
    </>
  );
}