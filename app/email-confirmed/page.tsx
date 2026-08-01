export default function EmailConfirmedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center bg-zinc-900 p-10 rounded-2xl">
        <h1 className="text-3xl font-bold mb-4">
          ✅ Email verificat!
        </h1>

        <p className="text-zinc-300">
          Contul tău a fost confirmat cu succes.
        </p>

        <a
          href="/login"
          className="inline-block mt-6 bg-green-600 px-6 py-3 rounded-xl"
        >
          Mergi la autentificare
        </a>
      </div>
    </main>
  );
}