import { ReactElement, useReducer, useState } from "react";

import firebase from "../firebase/firebaseClient";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

import Link from "next/link";
import Image from "next/image";

import toast from "react-hot-toast";
import { RiErrorWarningFill } from "react-icons/ri";

import UserSchema from "../schemas/UserSchema";
import UserLoggedInSchema from "../schemas/UserLoggedInSchema";

const formReducer = (
  state: Record<string, string>,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

type Props = {
  [key: string]: string;
};

export default function Auth({
  title,
  linkText,
  buttonTitle,
  linkHref,
}: Props): ReactElement {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [logInFormData, setLogInFormData] = useReducer(formReducer, {});
  const [logInFormErrors, setLogInFormErrors] = useState<
    Record<string, string>
  >({});

  // translate errors
  const translateErrors = (error: string) => {
    switch (error) {
      case "The email address is badly formatted.":
        return "El correo electrónico no tiene un formato válido";
      case "The password is invalid or the user does not have a password.":
        return "La contraseña no es válida o el usuario está registrado con un proovedor";
      case "There is no user record corresponding to this identifier. The user may have been deleted.":
        return "No hay ningún registro de usuario que corresponda a este identificador. Es posible que el usuario haya sido eliminado";
      case "The email address is already in use by another account.":
        return "El correo electrónico ya está en uso por otra cuenta";
      case "The password must be 6 characters long or more.":
        return "La contraseña debe tener 6 caracteres o más";
      case "The email address is already in use by another account.":
        return "El correo electrónico ya está en uso por otra cuenta";
      case "The email address is badly formatted.":
        return "El correo electrónico no tiene un formato válido";
      default:
        return error;
    }
  };

  const signUpWithEmailAndPassword = async (
    name: string,
    surname: string,
    email: string,
    password: string
  ) => {
    const userCredentials: any = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    firebase
      .firestore()
      .collection("users")
      .doc(userCredentials.user.uid)
      .set({
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
        name: `${name} ${surname}`,
        provider: userCredentials.user.providerData[0].providerId,
      });
  };

  const handleSignUpToast = () => {
    toast.promise(
      signUpWithEmailAndPassword(
        formData.name,
        formData.surname,
        formData.email,
        formData.password
      ),
      {
        loading: "Cargando...",
        success: `¡Bienvenido a EncuestApp, ${formData.name}!`,
        error: (err: any) => {
          return <>{translateErrors(err.message)}</>;
        },
      }
    );
  };

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const handleSignInToast = () => {
    toast.promise(
      signInWithEmailAndPassword(logInFormData.email, logInFormData.password),
      {
        loading: "Cargando...",
        success: `¡Es un gusto tenerte de vuelta en EncuestApp!`,
        error: (err: any) => {
          return <>{translateErrors(err.message)}</>;
        },
      }
    );
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (linkHref === "login") {
      const parsedUser = UserSchema.safeParse(formData);

      if (!parsedUser.success) {
        const error = parsedUser.error;
        let newErrors = {};
        for (const issue of error.issues) {
          newErrors = {
            ...newErrors,
            [issue.path[0]]: issue.message,
          };
        }

        return setFormErrors(newErrors);
      }

      setFormErrors({});

      handleSignUpToast();
    }

    if (linkHref === "register") {
      const parsedUser = UserLoggedInSchema.safeParse(logInFormData);

      if (!parsedUser.success) {
        const error = parsedUser.error;
        let newErrors = {};
        for (const issue of error.issues) {
          newErrors = {
            ...newErrors,
            [issue.path[0]]: issue.message,
          };
        }

        return setLogInFormErrors(newErrors);
      }

      setLogInFormErrors({});

      handleSignInToast();
    }
  };

  async function signInWithGithub() {
    const userCredentials: any = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider());

    firebase.firestore().collection("users").doc(userCredentials.user.uid).set({
      uid: userCredentials.user.uid,
      email: userCredentials.user.email,
      name: userCredentials.user.displayName,
      provider: userCredentials.user.providerData[0].providerId,
      photoUrl: userCredentials.user.photoURL,
    });
  }

  async function signInWithGoogle() {
    const userCredentials: any = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());

    firebase.firestore().collection("users").doc(userCredentials.user.uid).set({
      uid: userCredentials.user.uid,
      email: userCredentials.user.email,
      name: userCredentials.user.displayName,
      provider: userCredentials.user.providerData[0].providerId,
      photoUrl: userCredentials.user.photoURL,
    });
  }

  async function signInWithFacebook() {
    const userCredentials: any = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider());

    firebase
      .firestore()
      .collection("users")
      .doc(userCredentials.user.uid)
      .set({
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
        name: userCredentials.user.displayName,
        provider: userCredentials.user.providerData[0].providerId,
        photoUrl:
          userCredentials.user.photoURL +
          "?height=200&access_token=" +
          process.env.NEXT_PUBLIC_FB_TOKEN,
      });
  }

  return (
    <section>
      <div className="dark-card rounded-2xl bg-opacity-25 bg-gradient-to-r from-slate-50 via-[#fef4fa] to-gray-100 p-8 shadow-xl  backdrop-blur-2xl transition duration-200 ease-in-out md:p-5 lg:px-32">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          o{" "}
          <Link href={`/${linkHref}`}>
            <button className="bg-gradient-to-r  from-[#7a529b] to-[#6a46b8] bg-clip-text font-medium text-transparent transition duration-200 ease-in-out  hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:text-opacity-75 hover:underline hover:decoration-purple-600 focus:text-opacity-75 dark:from-[#b176e1] dark:to-[#915eff] dark:hover:bg-gradient-to-r dark:hover:from-purple-400 dark:hover:to-purple-500 ">
              {linkText}
            </button>
          </Link>
        </p>
        <div className="mt-7 flex justify-evenly space-x-3">
          <button
            type="button"
            onClick={signInWithGoogle}
            className="group rounded-2xl border border-gray-300 bg-transparent p-6 transition  duration-200 ease-in hover:bg-gray-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#7233FC] focus:ring-offset-2 dark:border-slate-700 dark:hover:bg-slate-600 dark:hover:bg-opacity-10 "
          >
            <FaGoogle className="h-6 w-6 text-gray-600 dark:text-white " />
          </button>
          <button
            type="button"
            onClick={signInWithGithub}
            className="group rounded-2xl border border-gray-300 bg-transparent p-6 transition  duration-200 ease-in hover:bg-gray-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#7233FC] focus:ring-offset-2 dark:border-slate-700 dark:hover:bg-slate-600 dark:hover:bg-opacity-10 "
          >
            <FaGithub className="h-6 w-6 text-gray-600 dark:text-white " />
          </button>
          <button
            type="button"
            onClick={signInWithFacebook}
            className="group rounded-2xl border border-gray-300 bg-transparent p-6 transition  duration-200 ease-in hover:bg-gray-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#7233FC] focus:ring-offset-2 dark:border-slate-700 dark:hover:bg-slate-600 dark:hover:bg-opacity-10 "
          >
            <FaFacebook className="h-6 w-6 text-gray-600 dark:text-white " />
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-3 rounded-md shadow-sm">
            {linkHref === "login" && (
              <>
                <div>
                  <label htmlFor="name" className="sr-only">
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={setFormData}
                    onChangeCapture={() =>
                      setFormErrors({ ...formErrors, name: "" })
                    }
                    autoComplete="first-name"
                    required
                    className={`relative block w-full  appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500  transition duration-200 ease-in-out focus:z-10 focus:border-[#7233FC] focus:outline-none focus:ring-[#7233FC] dark:border-slate-700 dark:bg-transparent  dark:text-gray-200 dark:placeholder-gray-200 sm:text-sm
                    ${formErrors.name && "border-error dark:border-error"} 
                  `}
                    placeholder="Nombre"
                  />
                  {formErrors.name && (
                    <div className="mt-2 flex flex-row justify-center space-x-3 text-center text-xs text-error">
                      <RiErrorWarningFill className=" h-4 w-4 " />
                      <p>{formErrors.name}</p>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="apellido" className="sr-only">
                    Apellido
                  </label>
                  <input
                    id="apellido"
                    name="surname"
                    type="text"
                    onChange={setFormData}
                    onChangeCapture={() =>
                      setFormErrors({ ...formErrors, surname: "" })
                    }
                    autoComplete="family-name"
                    required
                    className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500  transition duration-200 ease-in-out focus:z-10 focus:border-[#7233FC] focus:outline-none focus:ring-[#7233FC] dark:border-slate-700 dark:bg-transparent  dark:text-gray-200 dark:placeholder-gray-200 sm:text-sm
                    ${formErrors.surname && "border-error dark:border-error"} 
                    
                  `}
                    placeholder="Apellido"
                  />
                  {formErrors.surname && (
                    <div className="mt-2 flex flex-row justify-center space-x-3 text-center text-xs text-error">
                      <RiErrorWarningFill className=" h-4 w-4 " />
                      <p>{formErrors.surname}</p>
                    </div>
                  )}
                </div>
              </>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Correo
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                onChange={linkHref === "login" ? setFormData : setLogInFormData}
                onChangeCapture={() =>
                  linkHref === "login"
                    ? setFormErrors({ ...formErrors, email: "" })
                    : setLogInFormErrors({ ...logInFormErrors, email: "" })
                }
                required
                className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500  transition duration-200 ease-in-out focus:z-10 focus:border-[#7233FC] focus:outline-none focus:ring-[#7233FC] dark:border-slate-700 dark:bg-transparent  dark:text-gray-200 dark:placeholder-gray-200 sm:text-sm 
                ${
                  formErrors.email
                    ? "border-error dark:border-error"
                    : logInFormErrors.email
                    ? "border-error dark:border-error"
                    : ""
                } 
                `}
                placeholder="Correo"
              />
              {(linkHref === "login"
                ? formErrors.email
                : logInFormErrors.email) && (
                <div className="mt-2 flex flex-row justify-center space-x-3 text-center text-xs text-error">
                  <RiErrorWarningFill className=" h-4 w-4 " />
                  <p>
                    {linkHref === "login"
                      ? formErrors.email
                      : logInFormErrors.email}
                  </p>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={linkHref === "login" ? setFormData : setLogInFormData}
                autoComplete={
                  linkHref === "login" ? "new-password" : "current-password"
                }
                onChangeCapture={() =>
                  linkHref === "login"
                    ? setFormErrors({ ...formErrors, password: "" })
                    : setLogInFormErrors({ ...logInFormErrors, password: "" })
                }
                className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500  transition duration-200 ease-in-out focus:z-10 focus:border-[#7233FC] focus:outline-none focus:ring-[#7233FC] dark:border-slate-700 dark:bg-transparent  dark:text-gray-200 dark:placeholder-gray-200 sm:text-sm
                ${
                  formErrors.password
                    ? "border-error dark:border-error"
                    : logInFormErrors.password
                    ? "border-error dark:border-error"
                    : ""
                } 
                `}
                placeholder="Contraseña"
                required
              />
              {(linkHref === "login"
                ? formErrors.password
                : logInFormErrors.password) && (
                <div className="mt-2 flex flex-row justify-center space-x-3 text-center text-xs text-error">
                  <RiErrorWarningFill className=" h-4 w-4 " />
                  <p>
                    {linkHref === "login"
                      ? formErrors.password
                      : logInFormErrors.password}
                  </p>
                </div>
              )}
            </div>
            {linkHref === "login" && (
              <div>
                <label htmlFor="password" className="sr-only">
                  Confirmar Contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={setFormData}
                  autoComplete={
                    linkHref === "login" ? "new-password" : "current-password"
                  }
                  onChangeCapture={() =>
                    setFormErrors({ ...formErrors, confirmPassword: "" })
                  }
                  className={`relative block w-full appearance-none rounded-none rounded-t-md border  border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500  transition duration-200 ease-in-out focus:z-10 focus:border-[#7233FC] focus:outline-none focus:ring-[#7233FC] dark:border-slate-700 dark:bg-transparent  dark:text-gray-200 dark:placeholder-gray-200 sm:text-sm
                  ${
                    formErrors.confirmPassword &&
                    "border-error dark:border-error"
                  } 
                  `}
                  placeholder="Confirmar Contraseña"
                />
                {formErrors.confirmPassword && (
                  <div className="mt-2 flex flex-row justify-center space-x-3 text-center text-xs text-error">
                    <RiErrorWarningFill className=" h-4 w-4 " />
                    <p>{formErrors.confirmPassword}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-[#5a19e8]  to-[#9432e5]   py-2 px-4 text-sm font-medium text-white  shadow-lg  transition duration-200 ease-in hover:from-[#2b057d] hover:to-[#542977] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#3e091b] focus:ring-offset-2 "
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-slate-100 transition duration-150 ease-in-out group-hover:translate-x-10 group-hover:text-slate-300"
                  aria-hidden="true"
                />
              </span>
              {buttonTitle}
            </button>
          </div>
          <div className=" flex justify-center">
            <Link href="/">
              <button
                name="volver a inico"
                type="button"
                className="bg-gradient-to-r from-[#52779b]  to-[#4664b8] bg-clip-text text-sm font-medium text-transparent transition duration-200 ease-in-out  hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-opacity-75 hover:underline hover:decoration-blue-600 focus:text-opacity-75 dark:from-[#76b8e1] dark:to-[#5e81ff] dark:hover:bg-gradient-to-r dark:hover:from-blue-400 dark:hover:to-blue-500
                dark:hover:text-opacity-75 dark:hover:underline dark:hover:decoration-blue-600 dark:focus:text-opacity-75
                "
              >
                Volver a la página de inicio
              </button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
