import LoginForm from "@/components/auth/LoginForm";


export default function LoginPage() {

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
        pointer-events-none
        "
      />



      <div
        className="
        relative
        z-10
        w-full
        flex
        justify-center
        "
      >

        <LoginForm />

      </div>


    </main>

  );

}