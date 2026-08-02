import RegisterForm from "@/components/auth/RegisterForm";


export default function RegisterPage() {


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
      py-20
      "
    >

      <div
        className="
        w-full
        max-w-md
        "
      >

        <RegisterForm />

      </div>


    </main>

  );

}