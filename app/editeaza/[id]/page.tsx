"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

export default function EditeazaCursa() {

  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [numeCursa, setNumeCursa] = useState("");
  const [imagineCursa, setImagineCursa] = useState<File | null>(null);
  const [imagineVeche, setImagineVeche] = useState("");

  const [codCursa, setCodCursa] = useState("");
  const [categorie, setCategorie] = useState("");
  const [durata, setDurata] = useState("");
  const [masina, setMasina] = useState("");
  const [clasa, setClasa] = useState("");
  const [scor, setScor] = useState("");
  const [descriere, setDescriere] = useState("");

  const [mesaj, setMesaj] = useState("");
  const [eroare, setEroare] = useState(false);

  useEffect(() => {

    async function incarcaCursa() {

      const {
        data: {
          user,
        },
      } = await supabase.auth.getUser();

      if (!user) {

        router.push("/login");

        return;

      }

      const {
        data,
        error,
      } = await supabase
        .from("races")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error || !data) {

        router.push("/");

        return;

      }

      if (data.user_id !== user.id) {

        router.push("/");

        return;

      }

      setNumeCursa(data.title);
      setImagineVeche(data.image_url);
      setCodCursa(data.share_code);
      setCategorie(data.category);
      setDurata(data.duration);
      setMasina(data.car);
      setClasa(data.class);
      setScor(data.score);
      setDescriere(data.description);

      setLoading(false);

    }

    incarcaCursa();

  }, [params.id, router]);
async function salveazaModificarile(
  e: React.FormEvent<HTMLFormElement>
) {

  e.preventDefault();

  setMesaj("");
  setEroare(false);

  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();

  if (!user) {

    setMesaj("❌ Trebuie să fii logat.");
    setEroare(true);

    return;

  }

  /*
    VERIFICĂ DACĂ SHARE CODE ESTE UNIC
  */

  const {
    data: codExistent,
  } = await supabase
    .from("races")
    .select("id")
    .eq("share_code", codCursa.trim());

  if (
    codExistent &&
    codExistent.some(
      (race) => race.id !== Number(params.id)
    )
  ) {

    setMesaj(
      "❌ Acest cod există deja."
    );

    setEroare(true);

    return;

  }

  let imagineFinala = imagineVeche;

  /*
    UPLOAD IMAGINE NOUĂ (OPȚIONAL)
  */

  if (imagineCursa) {

    const extensie =
      imagineCursa.name
        .split(".")
        .pop();

    const numeFisier =
      `${Date.now()}.${extensie}`;

    const {
      error: uploadError,
    } = await supabase.storage
      .from("race-images")
      .upload(
        numeFisier,
        imagineCursa
      );

    if (uploadError) {

      setMesaj(uploadError.message);
      setEroare(true);

      return;

    }

    imagineFinala =
      supabase.storage
        .from("race-images")
        .getPublicUrl(numeFisier)
        .data
        .publicUrl;

  }

  /*
    UPDATE CURSĂ
  */

  const {
    error,
  } = await supabase
    .from("races")
    .update({

      title: numeCursa,

      image_url: imagineFinala,

      share_code:
        codCursa.trim(),

      category: categorie,

      duration: durata,

      car: masina,

      class: clasa,

      score: scor,

      description: descriere,

    })
    .eq("id", params.id);

  if (error) {

    setMesaj(error.message);
    setEroare(true);

    return;

  }

  setMesaj(
    "✅ Modificările au fost salvate!"
  );

  setTimeout(() => {

    router.push(`/cursa/${params.id}`);

    router.refresh();

  }, 1200);

}
if (loading) {

  return (

    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">

      <h1 className="text-3xl font-bold">
        Se încarcă...
      </h1>

    </main>

  );

}

return (

  <main
    className="
    min-h-screen
    bg-zinc-950
    text-white
    px-6
    py-12
    "
  >

    <div
      className="
      max-w-3xl
      mx-auto
      "
    >

      <h1
        className="
        text-5xl
        font-extrabold
        text-center
        mb-10
        "
      >
        ✏️ Editează cursa
      </h1>

      <form
        onSubmit={salveazaModificarile}
        className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-8
        space-y-5
        "
      >

        <input
          required
          placeholder="Nume cursă"
          value={numeCursa}
          onChange={(e) => setNumeCursa(e.target.value)}
          className="w-full bg-zinc-800 p-4 rounded-xl"
        />

        <div>

          <p className="mb-3 text-zinc-400">
            Imagine actuală
          </p>

          <img
            src={imagineVeche}
            alt={numeCursa}
            className="
            w-full
            h-72
            object-cover
            rounded-xl
            border
            border-zinc-700
            "
          />

        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImagineCursa(
              e.target.files?.[0] ?? null
            )
          }
          className="w-full bg-zinc-800 p-4 rounded-xl"
        />

        <input
          required
          placeholder="Cod cursă"
          value={codCursa}
          onChange={(e) => setCodCursa(e.target.value)}
          className="w-full bg-zinc-800 p-4 rounded-xl"
        />

        <select
          required
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          className="w-full bg-zinc-800 p-4 rounded-xl"
        >

          <option value="">
            Categorie
          </option>

          <option>Road Racing</option>
          <option>Street Racing</option>
          <option>Rally</option>
          <option>Cross Country</option>
          <option>Troll</option>

        </select>

        <input
          required
          placeholder="Durată"
          value={durata}
          onChange={(e) => setDurata(e.target.value)}
          className="w-full bg-zinc-800 p-4 rounded-xl"
        />

        <input
          required
          placeholder="Mașină"
          value={masina}
          onChange={(e) => setMasina(e.target.value)}
          className="w-full bg-zinc-800 p-4 rounded-xl"
        />

        <select
          required
          value={clasa}
          onChange={(e) => setClasa(e.target.value)}
          className="w-full bg-zinc-800 p-4 rounded-xl"
        >

          <option value="">
            Clasa
          </option>

          <option>🟢D</option>
          <option>🟡C</option>
          <option>🟠B</option>
          <option>🔴A</option>
          <option>🟣S1</option>
          <option>🔵S2</option>
          <option>⚫X</option>

        </select>

        <input
          required
          placeholder="Scor Exact"
          value={scor}
          onChange={(e) => setScor(e.target.value)}
          className="w-full bg-zinc-800 p-4 rounded-xl"
        />

        <textarea
          required
          rows={6}
          placeholder="Descriere"
          value={descriere}
          onChange={(e) => setDescriere(e.target.value)}
          className="w-full bg-zinc-800 p-4 rounded-xl"
        />

        <button
          className="
          w-full
          bg-yellow-600
          hover:bg-yellow-500
          transition
          py-4
          rounded-xl
          font-bold
          text-xl
          "
        >
          💾 Salvează modificările
        </button>

        {mesaj && (

          <p
            className={`
            text-center
            font-bold
            ${
              eroare
                ? "text-red-400"
                : "text-green-400"
            }
            `}
          >
            {mesaj}
          </p>

        )}

      </form>

    </div>

  </main>

);

}