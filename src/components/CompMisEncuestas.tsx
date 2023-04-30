import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/firebaseClient";

import { BsShareFill } from "react-icons/bs";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FiEdit, FiWatch } from "react-icons/fi";
import { FaRegCalendar } from "react-icons/fa";

import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

import { DeleteModal } from ".";
import { ShareModal } from ".";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type Encuesta = {
  id: string;
  title: string;
  belongsTo: string;
  createdAt: string;
  description: string;
};

const CompMisEncuestas = () => {
  const [user, userLoading] = useAuthState(firebase.auth());
  const [encuestas, setEncuestas] = useState([]);

  const [copy, setCopy] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getEncuestas = async () => {
      const uid = !userLoading && user?.uid;
      const db = firebase.firestore();
      const encuestasRef = db.collection("encuestas");

      // On snapshot listener and belongsto query to get only the surveys that belong to the user
      encuestasRef
        .where("belongsTo", "==", uid)
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnapshot) => {
          const encuestasData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setEncuestas(encuestasData as any);
          setLoaded(true);
        });
    };

    getEncuestas();
  }, [user, userLoading]);

  const deleteSurvey = async (id: string) => {
    const db = firebase.firestore();
    const encuestasRef = db.collection("encuestas").doc(id);
    await encuestasRef.delete();
    setEncuestas(encuestas.filter((encuesta: Encuesta) => encuesta.id !== id));
  };

  // toast promise for delete survey
  const deleteSurveyToast = async (id: string, name: string) => {
    await toast.promise(deleteSurvey(id), {
      loading: "Eliminando encuesta...",
      success: `Encuesta "${name}" eliminada`,
      error: "Error al eliminar encuesta",
    });
  };

  const router = useRouter();

  return (
    <>
      {!loaded ? (
        <div className="delay-nosurveys mt-28 flex items-center justify-center ">
          <PulseLoader color="#661AE6" />
        </div>
      ) : encuestas.length === 0 ? (
        <div className="mt-28 flex items-center justify-center ">
          <h1 className="delay-nosurveys mx-8 text-center text-2xl font-semibold sm:text-3xl ">
            No tienes encuestas creadas 😔
          </h1>
        </div>
      ) : (
        <section>
          <div className="flex w-full justify-center overflow-x-hidden">
            <div className="container my-8 mx-0 px-4 sm:px-0 md:px-5 ">
              <h1 className="mb-5 text-center text-2xl font-semibold  sm:text-4xl">
                Mis encuestas
              </h1>
              <div className="grid grid-cols-3 gap-4">
                {encuestas.map((encuesta: Encuesta) => (
                  <React.Fragment key={encuesta.id + "-fragment"}>
                    <DeleteModal
                      key={encuesta.id + "-delete"}
                      surveyId={encuesta.id}
                      name={encuesta.title}
                      deleteSurveyToast={deleteSurveyToast}
                    />
                    <ShareModal
                      key={encuesta.id + "-share"}
                      surveyId={encuesta.id}
                      copy={copy}
                      setCopy={setCopy}
                    />

                    <div
                      className="entrance card col-span-3 transform cursor-pointer bg-slate-300 bg-opacity-30 transition-all duration-200 ease-in-out  hover:bg-opacity-60 hover:shadow-xl active:bg-opacity-75

                      active:shadow-lg active:duration-75 active:ease-in-out dark:bg-slate-800 dark:bg-opacity-30  md:col-span-1
                      
                      "
                      key={encuesta.id + "-card"}
                      onClick={() => {
                        router.push(`mis-encuestas/${encuesta.id}`);
                      }}
                    >
                      <div className="card-body p-5">
                        <div className="flex gap-2 sm:justify-end">
                          <Link
                            href={`
                          /encuestas/${encuesta.id}
                          `}
                            passHref
                            legacyBehavior
                          >
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-ghost btn-sm btn-circle btn"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-5 w-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                />
                              </svg>
                            </a>
                          </Link>
                          <label
                            htmlFor={`share-modal-${encuesta.id}`}
                            className="btn-ghost btn-sm btn-circle btn"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <BsShareFill />
                          </label>
                          <Link
                            href={`mis-encuestas/${encuesta.id}/edit-survey`}
                            className="btn-ghost btn-sm btn-circle btn"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <FiEdit />
                          </Link>
                          <label
                            htmlFor={`delete-modal-${encuesta.id}`}
                            className="btn-ghost btn-sm btn-circle btn"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <RiDeleteBin7Line />
                          </label>
                        </div>
                        <h2 className="card-title text-2xl">
                          {encuesta.title}
                        </h2>
                        <p>{encuesta.description}</p>
                        <div className="flex justify-end">
                          <span className="flex flex-wrap place-items-center gap-3">
                            <FaRegCalendar />
                            {encuesta.createdAt.split(",")[0]}
                            <FiWatch />
                            {encuesta.createdAt.split(",")[1]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CompMisEncuestas;
