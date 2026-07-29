"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  raceId: number;
  initialFavorite: boolean;
};

export default function FavoriteButton({
  raceId,
  initialFavorite,
}: Props) {

  const [favorite, setFavorite] = useState(initialFavorite);
  const [loading, setLoading] = useState(false);

  async function toggleFavorite() {

    if (loading) return;

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      alert("Trebuie să fii logat pentru a adăuga la favorite.");

      setLoading(false);

      return;

    }

    console.log("USER:", user.id);
    console.log("RACE:", raceId);

    if (favorite) {

      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("race_id", raceId);

      console.log("DELETE ERROR:", error);

      if (!error) {

        console.log("Șters din favorite");

        setFavorite(false);

      }

    } else {

      const { data, error } = await supabase
        .from("favorites")
        .insert({
          user_id: user.id,
          race_id: raceId,
        })
        .select();

      console.log("INSERT DATA:", data);
      console.log("INSERT ERROR:", error);

      if (!error) {

        console.log("Adăugat la favorite");

        setFavorite(true);

      }

    }

    setLoading(false);

  }

  return (

    <button
      onClick={toggleFavorite}
      disabled={loading}
      className="
      text-4xl
      transition
      hover:scale-110
      active:scale-95
      "
      title="Adaugă la favorite"
    >

      {favorite ? "❤️" : "🤍"}

    </button>

  );

}