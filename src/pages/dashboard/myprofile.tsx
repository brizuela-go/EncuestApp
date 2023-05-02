import { DashboardLayout } from "../../components";
import { NextPage } from "next";

import firebase from "../../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";

import { AiFillGoogleCircle, AiOutlineGithub } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

import Image from "next/image";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

type Props = {};

const MyProfile: NextPage<Props> = () => {
  const [user, userLoading] = useAuthState(firebase.auth());
  console.log(user);

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
              Descripción
            </p>
            <button
              className="btn-outline  btn-accent btn mx-auto w-1/2 justify-center shadow-lg hover:shadow-xl
            "
            >
              Generar Descripción con IA 🖊️ 🤖
            </button>
          </div>
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
