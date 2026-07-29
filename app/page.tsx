import Link from "next/link";
import { createSupabaseServerClient } from "../lib/supabaseServer";
import SearchSection from "@/components/SearchSection";

export default async function Home() {

  const supabase =
    await createSupabaseServerClient();

  const {
    data: toateCursele,
    error,
  } = await supabase
    .from("races")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  const {
    data: ultimeleCurse,
  } = await supabase
    .from("races")
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .limit(9);

  if (error) {
    console.log(error);
  }

  return (

    <main className="min-h-screen bg-neutral-900 text-white">

      <section
        className="
        relative
        h-[700px]
        flex
        items-center
        justify-center
        text-center
        bg-cover
        bg-center
        "
        style={{
          backgroundImage:
            "url('/Amicii.png')",
        }}
      >

        <div
          className="
          absolute
          inset-0
          bg-black/70
          "
        />

        <div
          className="
          relative
          z-10
          px-6
          "
        >

          <h1
            className="
            text-6xl
            md:text-7xl
            font-extrabold
            "
          >
            🏁 Curse Pentru Amici 🏁
          </h1>

          <p
            className="
            mt-6
            text-xl
            text-gray-300
            max-w-2xl
            mx-auto
            "
          >
            Strângem aici toate cursele făcute de comunitate,
            pentru ca toți să aibă acces rapid la ele.
          </p>

          <Link
            href="/adauga"
            className="
            inline-block
            mt-8
            bg-green-600
            hover:bg-green-700
            px-8
            py-4
            rounded-xl
            text-xl
            font-bold
            "
          >
            ➕ Adaugă o cursă
          </Link>

        </div>

      </section>

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-12
        "
      >

        <h2
          className="
          text-4xl
          font-bold
          mb-8
          "
        >
          Categorii
        </h2>

        <div
          className="
          grid
          md:grid-cols-3
          gap-6
          "
        >

          <Category
            emoji="🏎️"
            title="Road Racing"
            link="/categorie/road-racing"
          />

          <Category
            emoji="🌆"
            title="Street Racing"
            link="/categorie/street-racing"
          />

          <Category
            emoji="🏜️"
            title="Rally Racing"
            link="/categorie/rally-racing"
          />

          <Category
            emoji="🏔️"
            title="Cross Country"
            link="/categorie/cross-country"
          />

          <Category
            emoji="💨"
            title="Drift"
            link="/categorie/drift"
          />

          <Category
            emoji="🏆"
            title="Apreciate"
            link="/apreciate"
          />

        </div>

        <h2
          className="
          text-4xl
          font-bold
          mt-20
          mb-8
          "
        >
          🔍 Căutare și filtre
        </h2>

        <SearchSection races={toateCursele ?? []} />

        <h2
          className="
          text-4xl
          font-bold
          mt-20
          mb-8
          "
        >
          🆕 Cele mai noi curse
        </h2>

        <div
          className="
          grid
          md:grid-cols-3
          gap-6
          "
        >

          {ultimeleCurse?.map((cursa) => (

            <Link
              key={cursa.id}
              href={`/cursa/${cursa.id}`}
              className="
              bg-zinc-900
              rounded-2xl
              overflow-hidden
              border
              border-zinc-800
              hover:border-green-500
              transition
              "
            >

              <img
                src={cursa.image_url}
                alt={cursa.title}
                className="
                w-full
                h-52
                object-cover
                "
              />

              <div className="p-6">

                <h3
                  className="
                  text-2xl
                  font-bold
                  "
                >
                  {cursa.title}
                </h3>

                <p className="text-gray-400 mt-3">
                  📂 {cursa.category}
                </p>

                <p className="text-gray-400">
                  🚗 {cursa.car}
                </p>

                <p className="text-gray-400">
                  🔥 {cursa.class}
                </p>

                <p className="text-gray-400">
                  ⏱️ {cursa.duration}
                </p>

                <p className="mt-3">
                  🏆 Scor: {cursa.score}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </main>

  );

}

function Category({

  emoji,
  title,
  link,

}: {

  emoji: string;
  title: string;
  link: string;

}) {

  return (

    <Link
      href={link}
      className="
      bg-zinc-900
      rounded-2xl
      p-8
      text-center
      hover:bg-zinc-800
      hover:scale-105
      transition
      border
      border-zinc-800
      "
    >

      <div className="text-5xl">
        {emoji}
      </div>

      <h3
        className="
        mt-4
        text-2xl
        font-bold
        "
      >
        {title}
      </h3>

    </Link>

  );

}