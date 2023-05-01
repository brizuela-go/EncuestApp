import { DashboardLayout } from "../../components";
import { NextPage } from "next";

import firebase from "../../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";

import Image from "next/image";

type Props = {};

const MyProfile: NextPage<Props> = () => {
  const [user, userLoading] = useAuthState(firebase.auth());

  return (
    <DashboardLayout title="Mi Perfil" description="Mi Perfil">
      <div className="p-10">
        <div className="mt-24 bg-white p-8 shadow">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="order-last mt-20 grid grid-cols-3 text-center md:order-first md:mt-0"></div>
            <div className="relative">
              <div className="absolute inset-x-0 top-0 mx-auto -mt-24 flex h-48 w-48 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 shadow-2xl">
                {!user && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                )}
                {user && !userLoading && user.photoURL && (
                  <Image
                    src={user && user?.photoURL}
                    alt="Profile"
                    width={400}
                    height={400}
                    quality={100}
                    priority
                    className="rounded-full"
                  />
                )}
              </div>
            </div>

            <div className="mt-32 flex justify-between space-x-8 md:mt-0 md:justify-center">
              <button className="transform rounded bg-blue-400 py-2 px-4 font-medium uppercase text-white shadow transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg">
                Connect
              </button>
              <button className="transform rounded bg-gray-700 py-2 px-4 font-medium uppercase text-white shadow transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg">
                Message
              </button>
            </div>
          </div>

          <div className="mt-20 border-b pb-12 text-center">
            <h1 className="text-4xl font-medium text-gray-700">
              {user?.displayName}{" "}
            </h1>
            <p className="mt-3 font-light text-gray-600">México, Puebla</p>

            <p className="mt-8 text-gray-500">{user?.email}</p>
          </div>

          <div className="mt-12 flex flex-col justify-center">
            <p className="text-center font-light text-gray-600 lg:px-16">
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure. An artist of considerable range.
            </p>
            <button className="mt-4 py-2 px-4  font-medium text-indigo-500">
              Show more
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyProfile;
