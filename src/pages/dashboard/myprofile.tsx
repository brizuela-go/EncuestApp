import { DashboardLayout } from "../../components";
import { NextPage } from "next";

import firebase from "../../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  AiFillGoogleCircle,
  AiOutlineGithub,
  AiOutlineSave,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

import Image from "next/image";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {};

type VibeType = "Profesional" | "Chistosa" | "Pretenciosa" | "Linda" | "Cool";

const MyProfile: NextPage<Props> = () => {
  const [user, userLoading] = useAuthState(firebase.auth());
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState<VibeType>("Profesional");
  const [generatedBio, setGeneratedBio] = useState<String>("");
  const [saved, setSaved] = useState(false);

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBio = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Genera 1 biografía ${vibe}. Se creativo y original.  ${
    vibe === "Chistosa"
      ? "Asegúrate de que sea ridícula e incluya un chiste."
      : null
  }
      Asegúrate de que la biografía generada tenga menos de 100 caractéres, tenga oraciones cortas, parecidas a las de Twitter, usa emojis y hashtags si quieres, y finalmente, básate en el siguiente contexto: ${bio} 
      ${
        user?.displayName
      } 🇲🇽 México, Puebla. Amante de las encuestas y EncuestApp.
      ${bio.slice(-1) === "." ? "" : "."}`;

  const generateBio = async (e: any) => {
    e.preventDefault();
    setBio("");
    setGeneratedBio("");
    setLoading(true);
    const response = await fetch("/api/description", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBio((prev) => prev + chunkValue);
    }
    scrollToBio();
    setLoading(false);
  };

  async function saveBio() {
    if (!user) {
      return;
    }
    await firebase.firestore().collection("users").doc(user.uid).update({
      bio: generatedBio,
    });
    setSaved(true);
    toast.success("¡Biografía guardada exitosamente 🖊️!");
  }

  async function getBio() {
    if (!user) {
      return;
    }
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setBio(doc.data()?.bio);
        }
      });
  }

  useEffect(() => {
    getBio();
  }, [user]);

  return (
    <DashboardLayout title="Mi Perfil" description="Mi Perfil">
      <div className="p-10">
        <div className="card mt-16 bg-slate-300 bg-opacity-20 p-8 shadow dark:bg-slate-900 dark:bg-opacity-50">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="order-last mt-20 grid grid-cols-3 text-center md:order-first md:mt-0"></div>
            <div className="relative">
              <div className="absolute inset-x-0 top-0 mx-auto -mt-24 flex h-40 w-40 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 shadow-2xl">
                {!user && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {user && !userLoading && user.photoURL && (
                  <Image
                    src={user && user?.photoURL}
                    alt="Profile"
                    width={500}
                    height={500}
                    quality={100}
                    priority
                    className="rounded-full"
                  />
                )}
              </div>
            </div>

            <div className="mt-32 flex flex-col place-items-center justify-between space-y-5 md:mt-0 md:flex-row md:justify-center md:space-y-0 md:space-x-8">
              <button className="btn-primary btn shadow-lg hover:shadow-xl">
                Editar Perfil
              </button>
              <button className="btn border-none bg-gray-700 shadow-lg hover:bg-red-500 hover:shadow-xl dark:text-white">
                Eliminar cuenta
              </button>
            </div>
          </div>

          <div className="mt-20 border-b pb-12 text-center">
            <h1 className="text-4xl font-medium text-slate-900 dark:text-white">
              {user?.displayName}{" "}
            </h1>
            <p className="mt-3 font-light text-slate-800 dark:text-white">
              🇲🇽 México, Puebla
            </p>
            <p className="mt-8 text-slate-700 dark:text-white">
              {user?.providerData[0]?.providerId === "google.com" && (
                <AiFillGoogleCircle className="mx-auto text-4xl" />
              )}
              {user?.providerData[0]?.providerId === "github.com" && (
                <AiOutlineGithub className="mx-auto text-4xl" />
              )}
              {user?.providerData[0]?.providerId === "facebook.com" && (
                <BsFacebook className="mx-auto text-4xl" />
              )}
            </p>
            <p className="mt-4 text-gray-700 dark:text-white">{user?.email}</p>
          </div>
          <div className="mt-12 flex flex-col justify-center space-y-8">
            <p className="lg:px-16dark:text-white text-center font-light text-gray-800 dark:text-white">
              {generatedBio && !bio ? generatedBio : bio}
            </p>
            <button
              type="button"
              onClick={generateBio}
              className={`${
                loading && "loading"
              } btn-outline  btn-accent btn mx-auto justify-center shadow-lg hover:shadow-xl lg:w-1/2`}
            >
              {bio
                ? "Generar Nueva Descripción con IA 🖊️ 🤖"
                : "Generar Descripción con IA 🖊️ 🤖"}
            </button>
          </div>
          {/* save  */}
          {generatedBio && !saved && (
            <div className="mt-12 flex flex-col justify-center space-y-8">
              <button
                type="button"
                onClick={saveBio}
                className={`${
                  saved && "loading"
                } btn-success btn fixed bottom-8 right-6  shadow-lg hover:shadow-xl  `}
              >
                <AiOutlineSave className="mr-2 text-lg" />
                Guardar Descripción
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  // Optionally, get other props.
  const isPremium = AuthUser.claims?.stripeRole ? true : false;

  if (!isPremium) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
});

export default withAuthUser<any>()(MyProfile);
