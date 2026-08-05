"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [eroare, setEroare] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setMesaj("");
    setEroare("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://fh6romania.vercel.app/reset-password",
    });

    if (error) {
      setEroare("A apărut o eroare la trimiterea emailului.");
      setLoading(false);
      return;
    }

    setMesaj(
      "📩 Dacă există un cont asociat acestui email, vei primi în câteva momente un link pentru resetarea parolei."
    );

    setLoading(false);
  }

  return (
    <main
      className="
        min-h-screen
        bg-background
        text-white
        flex
        items-center
        justify-center
        px-6
        relative
        overflow-hidden
      "
    >
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-secondary/20
          via-transparent
          to-accent/20
        "
      />

      <form
        onSubmit={handleReset}
        className="
          relative
          z-10
          w-full
          max-w-md
          bg-surface
          border
          border-white/10
          rounded-[32px]
          p-10
          shadow-2xl
        "
      >
        <h1
          className="
            text-4xl
            font-black
            text-center
          "
        >
          🔐 Resetare parolă
        </h1>

        <p
          className="
            text-muted
            text-center
            mt-4
            mb-10
          "
        >
          Introdu adresa de email asociată contului tău.
        </p>

        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full
            px-5
            py-4
            rounded-xl
            bg-black
            border
            border-white/10
            outline-none
            focus:border-primary
            transition
          "
        />

        {eroare && (
          <p
            className="
              mt-5
              text-red-400
              font-bold
              text-center
            "
          >
            {eroare}
          </p>
        )}

        {mesaj && (
          <p
            className="
              mt-5
              text-primary
              font-bold
              text-center
            "
          >
            {mesaj}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            mt-6
            w-full
            py-4
            rounded-xl
            bg-primary
            text-black
            font-black
            text-lg
            hover:bg-primary-hover
            hover:scale-[1.02]
            transition
            disabled:opacity-50
          "
        >
          {loading ? "Se trimite..." : "TEST RESET"}
        </button>

        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="
              text-muted
              hover:text-white
              transition
            "
          >
            ← Înapoi la autentificare
          </Link>
        </div>
      </form>
    </main>
  );
}