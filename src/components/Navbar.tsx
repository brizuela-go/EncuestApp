import { useState } from "react";

import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FiLogOut } from "react-icons/fi";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import firebase from "../firebase/firebaseClient";

import { useAuthState } from "react-firebase-hooks/auth";

const navigation = [
  { name: "Producto", href: "#producto" },
  { name: "Características", href: "#caracteristicas" },
  { name: "Documentación", href: "/documentacion" },
  { name: "Política de Privacidad", href: "/politica-de-privacidad" },
];

type Props = {};

const Navbar: React.FC<Props> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, userLoading] = useAuthState(firebase.auth());

  const router = useRouter();

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/">
            <button className="-m-1.5 p-1.5">
              <span className="sr-only">EncuestApp </span>
              <Image
                src="/logo.png"
                alt="logo"
                width={60}
                height={60}
                quality={100}
                priority={true}
              />
            </button>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Menú</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 text-gray-900 transition duration-100 ease-in-out hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-400 ${
                router.pathname === item.href &&
                "cursor-default border-b-2 border-gray-900  text-black hover:text-black dark:border-white dark:text-white dark:hover:text-white"
              } }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {userLoading ? (
            <div className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"></div>
          ) : user ? (
            <div className="flex text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
              <button onClick={() => firebase.auth().signOut()}>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
              >
                Iniciar Sesión <span aria-hidden="true">&rarr;</span>
              </button>
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 dark:bg-[#111828] sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">EncuestApp</span>
              <Image
                src="/logo.png"
                alt="logo"
                width={60}
                height={60}
                quality={100}
                priority={true}
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 transition duration-100 ease-in-out hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-700 ${
                      router.pathname === item.href &&
                      " bg-gray-50 text-gray-900 transition duration-100 ease-in-out dark:bg-gray-700 dark:text-gray-100"
                    } }}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {!userLoading && user ? (
                  <div className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-700">
                    <button onClick={() => firebase.auth().signOut()}>
                      Cerrar Sesión
                    </button>
                  </div>
                ) : (
                  <Link href="/login">
                    <button
                      type="button"
                      className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-700"
                    >
                      Iniciar Sesión
                    </button>
                  </Link>
                )}
                <Link href="/login">
                  <button
                    type="button"
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-700"
                  ></button>
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
