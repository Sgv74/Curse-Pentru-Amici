"use client";

import { useState } from "react";
import Image from "next/image";


type Props = {
  images:string[];
  title:string;
};



export default function RaceGallery({
  images,
  title
}:Props){


  const [index,setIndex] = useState(0);
  const [fullscreen,setFullscreen] = useState(false);



  if(!images || images.length === 0){

    return null;

  }



  function nextImage(){

    setIndex(
      (index + 1) % images.length
    );

  }



  function prevImage(){

    setIndex(
      (index - 1 + images.length) % images.length
    );

  }



  return (

    <>


      <section
        className="
        rounded-3xl
        overflow-hidden
        border
        border-white/10
        bg-black/20
        p-4
        "
      >


        <div
          className="
          relative
          h-[500px]
          "
        >


          <Image

            src={images[index]}

            alt={title}

            fill

            sizes="100vw"

            className="
            object-cover
            rounded-2xl
            cursor-zoom-in
            "
            
            onClick={()=>setFullscreen(true)}

          />



          {
            images.length > 1 &&

            <>


              <button

                onClick={prevImage}

                className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                z-20
                bg-black/70
                hover:bg-black
                text-white
                w-12
                h-12
                rounded-full
                text-3xl
                font-black
                "

              >

                ←

              </button>



              <button

                onClick={nextImage}

                className="
                absolute
                right-5
                top-1/2
                -translate-y-1/2
                z-20
                bg-black/70
                hover:bg-black
                text-white
                w-12
                h-12
                rounded-full
                text-3xl
                font-black
                "

              >

                →

              </button>



              <div
                className="
                absolute
                top-5
                right-5
                z-20
                bg-black/70
                px-4
                py-2
                rounded-full
                font-bold
                "
              >

                {index + 1} / {images.length}

              </div>


            </>

          }



          <button

            onClick={()=>setFullscreen(true)}

            className="
            absolute
            bottom-5
            right-5
            z-20
            bg-black/70
            hover:bg-black
            text-white
            px-5
            py-3
            rounded-xl
            font-bold
            "

          >

            ⛶ Mărește

          </button>


        </div>



      </section>









      {
        fullscreen &&


        <div

          className="
          fixed
          inset-0
          z-[9999]
          bg-black/95
          flex
          items-center
          justify-center
          "

          onClick={()=>setFullscreen(false)}

        >



          <div
            className="
            relative
            w-screen
            h-screen
            "
            onClick={(e)=>e.stopPropagation()}
          >


            <Image

              src={images[index]}

              alt={title}

              fill

              priority

              sizes="100vw"

              className="
              object-contain
              "

            />





            {
              images.length > 1 &&

              <>


                <button

                  onClick={prevImage}

                  className="
                  absolute
                  left-6
                  top-1/2
                  -translate-y-1/2
                  z-50
                  bg-black/70
                  text-white
                  w-14
                  h-14
                  rounded-full
                  text-4xl
                  font-black
                  "

                >

                  ←

                </button>




                <button

                  onClick={nextImage}

                  className="
                  absolute
                  right-6
                  top-1/2
                  -translate-y-1/2
                  z-50
                  bg-black/70
                  text-white
                  w-14
                  h-14
                  rounded-full
                  text-4xl
                  font-black
                  "

                >

                  →

                </button>


              </>

            }





            <button

              onClick={()=>setFullscreen(false)}

              className="
              absolute
              top-6
              right-6
              z-50
              bg-black/70
              text-white
              w-12
              h-12
              rounded-full
              text-3xl
              font-black
              "

            >

              ×

            </button>




          </div>


        </div>

      }


    </>

  );

}