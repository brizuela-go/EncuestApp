import Auth from "../../components/Auth";

import Image from "next/image";
import Head from "next/head";

import { NextPage } from "next";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { LoadingLogo } from "../../components";

type Props = {};

const Login: NextPage<Props> = () => {
  return (
    <>
      <Head>
        <title>Inicia Sesión | EncuestApp</title>
        <meta name="description" content="Inicia Sesión en EncuestApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className=" relative isolate  lg:px-8">
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
        </div>

        <div className="flex flex-col-reverse md:h-screen md:flex-row">
          <div className="relative flex items-center justify-center md:h-screen md:w-1/2 md:overflow-hidden">
            <div className="absolute inset-0 h-full w-full">
              <Image
                src="/cover-login.png"
                alt="Login Bg"
                quality={100}
                priority={true}
                width={960}
                height={1032}
                className="entrance h-full w-full object-cover "
              />
            </div>
            <div className="entrance absolute z-10 hidden md:block">
              <h2 className="text-center text-xl font-bold uppercase tracking-[0.5em] text-white">
                El mejor lugar
              </h2>
              <h2 className="text-center text-3xl font-bold uppercase tracking-[0.3em] text-white">
                para gestionar encue
                <span className="opacity-80">s</span>
                <span className="opacity-70">t</span>
                <span className="opacity-50">a</span>
                <span className="opacity-30">s</span>
              </h2>
            </div>
          </div>
          <div className="flex min-h-screen items-center justify-center py-20 md:w-1/2">
            <Auth
              title="Inicia Sesión"
              linkText="¿aún no estás registrado? registrate aquí"
              buttonTitle="Iniciar Sesión"
              linkHref="register"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  appPageURL: "/payment",
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(async ({ AuthUser }) => {
  // Optionally, get other props.
  const isPremium = AuthUser.claims?.stripeRole ? true : false;

  console.log(isPremium);

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
  appPageURL: "/payment",
  LoaderComponent: LoadingLogo,
  whenAuthedBeforeRedirect: AuthAction.RENDER,
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Login);
