import { CheckIcon } from "@heroicons/react/20/solid";
import { createCheckoutSession } from "../../stripe/createCheckoutSession";
import toast from "react-hot-toast";

import { NextPage } from "next";

import Link from "next/link";
import { Layout } from "../../components";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { useState } from "react";

const includedFeatures = [
  "Gestión de Encuestas",
  "Dashboard Interactivo y Personalizable",
  "Procesamiento de Datos Inteligente",
  "Playera de Miembro Oficial",
];

type Props = {};

const PaymentHome: NextPage<Props> = (props) => {
  const AuthUser = useAuthUser();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    toast.promise(createCheckoutSession(AuthUser?.id || ""), {
      loading: "Creando sesión de pago...",
      success: "Redireccionando...",
      error: "Error al crear la sesión de pago",
    });
    setLoading(true);
  }

  return (
    <>
      <div className="absolute inset-x-0 -top-40   transform-gpu overflow-hidden blur-3xl sm:-top-80">
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
              <stop stopColor="#E3B261" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)]   transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
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
              <stop stopColor="#E3B261" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="isolate z-10">
        <Layout
          title="Empieza a Gestionar y Procesar tus Encuestas"
          description="EncuestApp. La mejor aplicación para gestionar tus encuestas"
          AuthUser={AuthUser}
        >
          <section className="entrance mx-auto mt-20 max-w-7xl px-6 pt-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                Empieza a Gestionar y Procesar tus Encuestas
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-900 dark:text-slate-300">
                EncuestApp es la mejor aplicación para gestionar y procesar tus
                encuestas. Hazte miembro y empieza a disfrutar de todas las
                ventajas que te ofrece.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-slate-300 dark:ring-slate-700 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className=" bg-gradient-to-r from-amber-400 via-amber-700 to-amber-900 bg-clip-text text-2xl font-bold tracking-tight text-transparent dark:from-amber-200 dark:via-amber-700 dark:to-amber-900">
                  Plan Premium
                </h3>
                <p className="mt-6 text-base leading-7 text-slate-900 dark:text-slate-300">
                  El plan premium te ofrece todas las ventajas de la aplicación.
                  No esperes más y empieza a disfrutar de todas las ventajas que
                  EncuestApp te ofrece.
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none bg-gradient-to-r from-amber-500 via-amber-800  to-amber-900 bg-clip-text text-sm font-semibold leading-6 text-transparent dark:from-amber-200 dark:via-amber-300 dark:to-amber-400">
                    ¿Qué incluye?
                  </h4>
                  <div className="h-px flex-auto bg-slate-200 dark:bg-slate-800" />
                </div>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-slate-900 dark:text-slate-300 sm:grid-cols-2 sm:gap-6"
                >
                  {includedFeatures.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-amber-300"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className=" rounded-2xl bg-transparent bg-gradient-to-r from-transparent  py-10 text-center backdrop:opacity-25 backdrop:blur-xl  dark:to-transparent  dark:ring-0 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-slate-600 dark:text-slate-300">
                      Un pago mensual de tan solo
                    </p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className=" text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                        $149
                      </span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-slate-600 dark:text-slate-400">
                        MXN
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCheckout()}
                      className={` ${
                        loading && "loading "
                      } btn mt-10  w-full rounded-md border-none bg-gradient-to-r from-amber-400 via-amber-700 to-amber-900 px-3 py-2 text-center text-sm font-semibold   
                      text-white shadow-sm transition duration-300 ease-in-out hover:-translate-y-1  hover:bg-gradient-to-tl
                       hover:from-amber-900 hover:via-amber-600 hover:to-amber-400 hover:shadow-2xl
                    dark:from-amber-200
                    dark:via-amber-700
                    dark:to-amber-800
                    dark:hover:from-amber-800
                    dark:hover:via-amber-700
                    dark:hover:to-amber-200
                    `}
                    >
                      {loading ? "Obteniendo Acceso..." : "Obtener Acceso"}
                    </button>
                    <p className="mt-6 text-xs leading-5 text-slate-600 dark:text-slate-400">
                      <span className="font-semibold">Nota:</span> El pago se
                      realiza a través de{" "}
                      <Link
                        href="https://stripe.com/es"
                        className="font-bold text-purple-800 transition
                      duration-200 ease-in-out  hover:text-purple-700 hover:underline dark:text-purple-600 dark:hover:text-fuchsia-400
                      "
                      >
                        Stripe
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </div>
    </>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.RENDER,
})(async ({ AuthUser }) => {
  // Optionally, get other props.
  const isPremium = AuthUser.claims?.stripeRole ? true : false;

  if (isPremium) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
});

export default withAuthUser<any>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(PaymentHome);
