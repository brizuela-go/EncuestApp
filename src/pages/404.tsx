import { Layout } from "../components";
import Link from "next/link";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";

type Props = {};

const FourOFour: NextPage<Props> = () => {
  const [gifUrl, setGifUrl] = useState<string>("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [inDashboard, setInDashboard] = useState<boolean>(false);

  const AuthUser = useAuthUser();

  useEffect(() => {
    const loadGif = async () => {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&tag=sad&rating=pg13`
      );
      const data = await response.json();
      setGifUrl(data.data.embed_url);
    };

    loadGif();
  }, []);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = gifUrl;
    }
  }, [gifUrl]);

  const router = useRouter();

  useEffect(() => {
    if (router.asPath.includes("/dashboard")) {
      setInDashboard(true);
    }
  }, [router.asPath]);

  return (
    <>
      <Layout
        title="404 | Página No Encontrada"
        description="404 | Página No Encontrada"
        AuthUser={AuthUser}
      >
        <section className="flex flex-col place-items-center items-center  justify-center py-28 px-8 text-center sm:py-28 lg:px-8">
          <div className="absolute isolate px-6 pt-14 lg:px-8">
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
          </div>

          <iframe
            ref={iframeRef}
            data-theme="light"
            className="z-0 "
            width={300}
            height={300}
          />

          <div className="z-0 mt-6 text-center">
            <p className="bg-gradient-to-r from-[#21c8cece] to-[#6f66fa] bg-clip-text text-2xl text-transparent  ">
              404
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
              Página no encontrada
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
              Perdón, pero la página que estás buscando, no existe o ha sido
              removida.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={`${inDashboard ? "/dashboard" : "/"}
              `}
              >
                <button className="animate-bounce rounded-md bg-gradient-to-r from-[#21c8cece] to-[#6f66fa] px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg transition duration-200 ease-in-out hover:-translate-y-2 hover:animate-none hover:bg-gradient-to-tr hover:from-[#4ad3d885] hover:to-[#3930ba] hover:shadow-xl focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {inDashboard
                    ? "De vuelta al Dashboard"
                    : "De vuelta a la página principal"}
                </button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default withAuthUser<any>({
  whenAuthed: AuthAction.RENDER,
})(FourOFour);
