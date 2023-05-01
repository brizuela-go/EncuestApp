import Image from "next/image";
import {
  FaUserCircle,
  FaRegChartBar,
  FaTasks,
  FaBars,
  FaHome,
  FaPlusCircle,
  FaQuestionCircle,
} from "react-icons/fa";
import Link from "next/link";
import { ReactElement } from "react";
import { useRouter } from "next/router";

import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/firebaseClient";
import { toast } from "react-hot-toast";
import { RiSurveyLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import Head from "next/head";

const Navbar = () => {
  const [user, userLoading] = useAuthState(firebase.auth());

  async function signOut() {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      toast.error("Error al cerrar sesión");
    }
  }

  const router = useRouter();

  if (!user && !userLoading) {
    router.push("/");
  }

  return (
    <nav className="navbar relative z-10 border border-x-0 border-t-0  border-transparent  bg-slate-400 bg-opacity-10 backdrop-blur-xl backdrop:opacity-20 dark:border-[#0e1320] dark:bg-[#232d40] dark:bg-opacity-20 dark:backdrop-blur-3xl">
      <div className="navbar-start">
        <label htmlFor="my-drawer" className="lg:hidden">
          <FaBars
            tabIndex={0}
            className="drawer-button btn-ghost btn-square btn p-3"
          />
        </label>
      </div>
      <div className="navbar-center">
        <div className="btn-ghost btn space-x-2 text-xl normal-case lg:hidden">
          <Image
            src={"/logo.png"}
            alt={"EncuestApp"}
            width={45}
            height={45}
            priority={true}
            quality={100}
          />
          <span>EncuestApp</span>
        </div>
      </div>
      <div className="navbar-end">
        <div className="dropdown-end dropdown">
          {user && !userLoading && user.photoURL ? (
            <div className="group btn-ghost btn-square avatar btn" tabIndex={0}>
              <div className="btn-sm btn-circle transition duration-300 ease-in-out lg:group-hover:scale-105 lg:group-hover:rounded-xl ">
                <Image
                  src={user?.photoURL || ""}
                  alt={user?.displayName || "User"}
                  width={50}
                  height={50}
                  priority={true}
                  quality={100}
                />
              </div>
            </div>
          ) : (
            <FaUserCircle
              tabIndex={0}
              className="btn-ghost btn-square btn p-3"
            />
          )}
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box mt-3 w-52 bg-gray-200 p-2 lg:menu-compact dark:bg-[#1b2130]  "
          >
            <li>
              <Link href={"/dashboard/myprofile"}>Perfil</Link>
            </li>
            <li>
              <button type="button" onClick={signOut}>
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

type Props = {
  children: ReactElement;
};

const DrawerContent = ({ children }: Props) => {
  const router = useRouter();

  const links = [
    { href: "/dashboard", label: "Inicio", icon: <FaRegChartBar /> },
    { href: "/dashboard/mis-encuestas", label: "Encuestas", icon: <FaTasks /> },
    {
      href: "/dashboard/crear-encuesta",
      label: "Crear Encuesta",
      icon: <FaPlusCircle />,
    },
    {
      href: `/dashboard/mis-encuestas/${router.query.surveyID}`,
      label: "Encuesta",
      icon: <RiSurveyLine />,
    },
    {
      href: `/dashboard/mis-encuestas/${router.query.surveyID}/edit-survey`,
      label: "Editar Encuesta",
      icon: <FiEdit />,
    },
    {
      href: "/dashboard/myprofile",
      label: "Mi Perfil",
      icon: <FaUserCircle />,
    },

    {
      href: "/dashboard/help",
      label: "Ayuda",
      icon: <FaQuestionCircle />,
    },
  ];

  return (
    <div className="drawer-content ">
      <div className="absolute inset-x-0 top-[calc(100%rem)] -z-20 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-49rem)]">
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
              <stop stopColor="#0075ff" />
              <stop offset={1} stopColor="#1186FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-20rem)] -z-20   transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-43rem)]">
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
              <stop stopColor="#A087F0" />
              <stop offset={1} stopColor="#B199F1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Navbar />
      {/* breadcrumb, router */}
      <div className="breadcrumbs mt-4 flex justify-center text-xs sm:ml-10 sm:block sm:text-sm ">
        {/* map router pathnames */}
        <ul className="flex flex-wrap gap-2">
          <li>
            <Link href="/">
              <p className="text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <FaHome />
              </p>
            </Link>
          </li>
          {router.asPath
            .split("/")
            .filter((item) => item !== "")
            .map((item, index, array) => {
              const isLast = index === array.length - 1;
              const href = `/${array.slice(0, index + 1).join("/")}`;
              return (
                <li key={index}>
                  {isLast ? (
                    <span className="flex place-items-center gap-x-2">
                      {links.find((link) => link.href === href)?.icon}
                      {links.find((link) => link.href === href)?.label}
                    </span>
                  ) : (
                    <Link href={href}>
                      <span
                        className={`flex place-items-center gap-x-2 text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300`}
                      >
                        {/* icon */}
                        {links.find((link) => link.href === href)?.icon}
                        {links.find((link) => link.href === href)?.label}
                      </span>
                    </Link>
                  )}
                </li>
              );
            })}
        </ul>
      </div>

      {children}
    </div>
  );
};

const DrawerSide = () => {
  const router = useRouter();

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu w-60  gap-4  border border-t-0 border-l-0  border-slate-100  bg-slate-400 bg-opacity-10 p-4 text-base-content  backdrop-blur-3xl lg:menu-compact backdrop:opacity-20 dark:border-transparent dark:bg-[#232d40]      dark:bg-opacity-20 dark:backdrop-blur-lg  lg:gap-2">
        <li className="mb-3 hidden lg:flex">
          <div className="text-xl text-slate-900 dark:text-white">
            <Image
              src={"/logo.png"}
              alt={"EncuestApp"}
              width={45}
              height={45}
              priority={true}
              quality={100}
            />
            <span className="text-xl font-medium normal-case">EncuestApp</span>
          </div>
        </li>
        <li className="mt-3">
          <Link
            href={"/dashboard"}
            className={
              router.pathname === "/dashboard"
                ? "border-2 border-indigo-500 text-indigo-500"
                : ""
            }
          >
            <FaRegChartBar />
            Inicio
          </Link>
        </li>
        <li className="mb-5">
          <Link
            href={"/dashboard/mis-encuestas"}
            className={
              router.pathname === "/dashboard/mis-encuestas"
                ? "border-2 border-indigo-500 text-indigo-500"
                : ""
            }
          >
            <FaTasks />
            Encuestas
          </Link>
        </li>
        <li>
          <Link
            className="btn mx-4 border-none bg-gradient-to-r from-purple-500 
            to-blue-600 text-center text-gray-100 transition duration-100
            ease-in-out hover:scale-105  hover:from-purple-600 hover:to-blue-700
            focus:text-slate-50 dark:from-purple-600
            dark:to-blue-700 dark:hover:from-purple-500 dark:hover:to-blue-600
            "
            href={"/dashboard/crear-encuesta"}
          >
            <FaPlusCircle />
            Crear
          </Link>
        </li>
        {/* li sticked to the bottom with some mb */}
        <li className=" fixed bottom-6">
          <Link
            href={"/dashboard/help"}
            className={
              "h-40 w-52 transform bg-[url('/faqs-card-light.png')] text-blue-50 shadow-xl brightness-90 contrast-125 hue-rotate-15  saturate-150 filter transition duration-300 ease-in-out  hover:-translate-y-1 hover:text-blue-900 hover:opacity-90  hover:shadow-2xl hover:brightness-100  dark:bg-[url('/faqs-card.png')] dark:filter-none dark:hover:text-white dark:hover:filter-none"
            }
          >
            <div className="flex-col place-items-center items-center justify-center space-y-3">
              <FaQuestionCircle className="w-44 text-center text-2xl" />

              <h4 className=" text-center text-xl font-bold  ">
                ¿Necesitas ayuda?
              </h4>
              <p className="text-center ">
                Visita nuestra sección de preguntas frecuentes
              </p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

const DashboardLayout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <>
      <Head>
        <title>{`Dashboard | ${title}`}</title>
        <meta
          name="description"
          content={`Dashboard de EncuestApp | ${description}`}
        />
      </Head>
      <main className="dark:bg-[#0E1320]">
        <div className="drawer-mobile drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <DrawerContent>{children as any}</DrawerContent>
          <DrawerSide />
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;
