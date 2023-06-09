import Link from "next/link";
import { useState } from "react";
import Typewriter from "typewriter-effect";

type Props = {
  user: boolean;
  userIsPremium: boolean;
};

const Hero: React.FC<Props> = ({ user, userIsPremium }) => {
  const [loading, setLoading] = useState(false);

  return (
    <section className="relative isolate px-6 pt-14 lg:px-8">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="entrance mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="hero-small-devices text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
            <Typewriter
              options={{
                strings: [
                  "Generar insights, ",
                  "Crear encuestas, ",
                  "Procesar datos, ",
                ],
                autoStart: true,
                loop: true,
                delay: 60,
              }}
            />
            nunca fue tan fácil.
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
            Con nuestro dashboard intuitivo, analiza los resultados de tus
            usuarios y toma decisiones informadas para llevar tu negocio al
            siguiente nivel.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={
                !user
                  ? "register"
                  : user && !userIsPremium
                  ? "payment"
                  : "dashboard"
              }
            >
              <button
                type="button"
                className={`${
                  loading && "loading cursor-wait"
                } btn-md btn animate-pulse  rounded-md border-none border-transparent bg-gradient-to-r from-[#50c5ecee] to-[#6f66fa] px-3.5 py-0 text-sm font-semibold capitalize text-white shadow-lg transition duration-200 ease-in-out hover:-translate-y-2 hover:animate-none hover:bg-gradient-to-tr hover:from-[#50c5ecee] hover:to-[#4e42ee] hover:shadow-xl focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-95`}
                onClick={() => setLoading(true)}
              >
                {userIsPremium && user ? "Ir al Dashboard" : "Empieza ahora"}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
