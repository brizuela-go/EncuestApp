import LastWeek from "./homeDashboard/LastWeek";
import RespRecib from "./homeDashboard/ResponsesCard";
import TablaInicio from "./homeDashboard/HomeTable";

import { useEffect, useRef, useState, useCallback } from "react";
import firebase from "../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import { PulseLoader } from "react-spinners";
import { FaTasks } from "react-icons/fa";
import { RiQuestionAnswerLine } from "react-icons/ri";

let Globe: any = () => null;
if (typeof window !== "undefined") Globe = require("react-globe.gl").default;

const ARC_REL_LEN = 0.4;
const FLIGHT_TIME = 1000;
const RINGS_MAX_R = 3;

const CompDash = () => {
  const [user, userLoading] = useAuthState(firebase.auth());

  let cardClass =
    "entrance card bg-slate-300 bg-opacity-20 dark:bg-slate-900 dark:bg-opacity-50";

  const isDarkMode =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // onSnapshot to retrieve all the users
  const [users, setUsers] = useState([]);
  const [encuestas, setEncuestas] = useState([]);
  const [responses, setResponses] = useState([]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        const usersData: any = [];
        snapshot.forEach((doc) =>
          usersData.push({ ...doc.data(), id: doc.id })
        );
        setUsers(usersData);
      });
    return () => unsubscribe();
  }, []);

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
        });
    };

    getEncuestas();
  }, [user, userLoading]);

  useEffect(() => {
    let responsesDataArray: any[] = []; // create an empty array to hold all the responses data

    encuestas.forEach((encuesta, index) => {
      const db = firebase.firestore();
      const responsesRef = db
        .collection("encuestas")
        .doc(encuesta["id"])
        .collection("respuestas");

      responsesRef.onSnapshot((querySnapshot) => {
        const responsesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        responsesDataArray[index] = responsesData; // save the retrieved responses data in the array

        // check if responses data exists for all surveys
        const allResponsesExist = responsesDataArray.every((data) => data);

        if (allResponsesExist) {
          // combine all the responses data into one array
          const allResponses = responsesDataArray.reduce(
            (accumulator, currentValue) => accumulator.concat(currentValue),
            []
          );

          setResponses(allResponses); // set the state with the combined responses data

          setLoaded(true);
        }
      });
    });
  }, [encuestas]);

  const globeEl = useRef<any>();

  useEffect(() => {
    if (loaded) {
      if (globeEl.current) {
        const controls = globeEl.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1;
        globeEl.current.pointOfView({ lat: 0, lng: 280, altitude: 1.7 });
      }
    }
  }, [loaded, globeEl]);

  const gData = [
    {
      lat: -5,
      lng: -97,
    },
  ];

  const hexData = [
    {
      lat: -5,
      lng: -97,
      label: "Mexico",
    },
  ];

  const [arcsData, setArcsData] = useState<any>([]);

  const prevCoords = useRef({ lat: 0, lng: 0 });
  const emitArc = useCallback(({ lat: endLat, lng: endLng }: any) => {
    const { lat: startLat, lng: startLng } = prevCoords.current;
    prevCoords.current = { lat: endLat, lng: endLng };

    // add and remove arc after 1 cycle
    const arc = { startLat, startLng, endLat, endLng };
    setArcsData((curArcsData: any) => [...curArcsData, arc]);
    setTimeout(
      () =>
        setArcsData((curArcsData: any) =>
          curArcsData.filter((d: any) => d !== arc)
        ),
      FLIGHT_TIME * 2
    );
  }, []);

  const cards = [
    {
      title: "Encuestas Creadas",
      value: encuestas.length,
      icon: <FaTasks />,
      color: "bg-gradient-to-r from-purple-400 to-purple-700",
    },
    {
      title: "Respuestas Recibidas",
      value: responses.length,
      icon: <RiQuestionAnswerLine />,
      color: "bg-gradient-to-r from-blue-400 to-blue-700",
    },
    {
      title: "Última Semana",
      value: 0,
      icon: <FaTasks />,
      color: "bg-purple-400",
    },
    {
      title: "Lol",
      value: 0,
      icon: <RiQuestionAnswerLine />,
      color: "bg-blue-600",
    },
  ];

  return (
    <div className="flex w-full justify-center overflow-x-hidden">
      <div className="container my-5 mx-0 px-4 sm:px-0 md:px-5 ">
        <h1 className="dashboard-title md:ml-5 md:text-left ">
          Estadísitcas Generales
        </h1>
        {!loaded ? (
          <div className="delay-nosurveys mt-28 flex items-center justify-center ">
            <PulseLoader color="#661AE6" />
          </div>
        ) : (
          <div className="flex flex-col justify-center sm:ml-5 lg:flex-row lg:justify-between ">
            <div className="mt-10">
              {/* map cards*/}
              <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-1 lg:gap-x-24 lg:gap-y-6  ">
                {cards.map((card, index) => (
                  <div
                    key={` ${card.title} - ${index}`}
                    className={`${cardClass} card h-24 rounded-lg shadow-lg lg:w-[34rem] `}
                  >
                    <div className="card-body -mt-3">
                      <div className="flex flex-wrap place-items-center items-center justify-between">
                        <div>
                          <h5 className="text-lg font-medium dark:text-gray-300 ">
                            {card.title}
                          </h5>
                          <p className=" text-2xl font-bold">
                            {card.value} <span></span>
                          </p>
                        </div>

                        <div
                          className={`${card.color} rounded-xl p-3 text-2xl text-white shadow-xl`}
                        >
                          {card.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Globe
                ref={globeEl}
                globeImageUrl={`
              ${isDarkMode ? "/darkmap.png" : "/map.png"}
              `}
                backgroundColor="rgba(0,0,0,0)"
                width={650}
                height={650}
                ringsData={gData}
                ringColor={() => "rgb(29%, 63%, 77%)"}
                onGlobeClick={emitArc}
                arcsData={arcsData}
                arcColor={() => "rgb(57%, 57%, 93%)"}
                arcDashLength={ARC_REL_LEN}
                arcDashGap={2}
                arcDashInitialGap={1}
                arcDashAnimateTime={FLIGHT_TIME}
                arcsTransitionDuration={0}
                ringMaxRadius={RINGS_MAX_R}
                pointsData={hexData}
                pointColor={() => "rgb(44%, 35%, 95%)"}
                pointResolution={2}
                pointLabel={({ label }: any) =>
                  `<div align="center" style="background-color: rgba(0, 0, 0, 0.4); padding: 1rem"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1200px-Flag_of_Mexico.svg.png" align="center" width="40px" height="40px" /> <br /> <p> <b>${label}</b> (${19}°, ${102.36}°) <br /> <b> Usuarios: </b> ${
                    users.length
                  }</p> </div> `
                }
                pointAltitude={users.length / 100}
                pointRadius={0.9}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompDash;
