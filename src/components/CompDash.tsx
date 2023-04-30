import LastWeek from "./homeDashboard/LastWeek";
import RespRecib from "./homeDashboard/ResponsesCard";
import TablaInicio from "./homeDashboard/HomeTable";

import { useEffect, useRef, useState, useCallback } from "react";
import firebase from "../firebase/firebaseClient";

let Globe: any = () => null;
if (typeof window !== "undefined") Globe = require("react-globe.gl").default;

const ARC_REL_LEN = 0.4;
const FLIGHT_TIME = 1000;
const RINGS_MAX_R = 3;

const CompDash = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  let cardClass =
    "entrance card bg-slate-400 bg-opacity-20 dark:bg-slate-800 dark:bg-opacity-40";

  const isDarkMode =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const globeEl = useRef<any>();

  useEffect(() => {
    if (isClient) {
      if (globeEl.current) {
        const controls = globeEl.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.8;
        globeEl.current.pointOfView({ lat: 0, lng: 280, altitude: 1.7 });
      }
    }
  }, [isClient, globeEl]);

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

  // onSnapshot to retrieve all the users
  const [users, setUsers] = useState([]);

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

  return (
    <div className="flex w-full justify-center overflow-x-hidden">
      <div className="container my-5 mx-0 px-4 sm:px-0 md:px-5 ">
        <h1 className="mb-5 ml-0 text-center  text-2xl font-semibold sm:ml-5 sm:text-left sm:text-4xl  ">
          Estadísitcas Generales
        </h1>
        {isClient && (
          <div className="flex flex-col justify-center sm:ml-5 md:flex-row md:justify-between ">
            <div className="flex-col place-items-center text-center">
              <div className="text-2xl font-semibold">Encuestas</div>
              <div className="text-4xl font-bold">12</div>
            </div>

            <Globe
              ref={globeEl}
              globeImageUrl={`
          ${isDarkMode ? "/darkmap.png" : "/map.png"}
          `}
              backgroundColor="rgba(0,0,0,0)"
              width={700}
              height={600}
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
        )}
      </div>
    </div>
  );
};

export default CompDash;

{
  /* <div className="grid grid-cols-12 gap-4">
<div className="col-span-12 md:col-span-6">
  <div className={cardClass}>
    <div className="card-body grid grid-cols-6 p-4 pb-0">
      <div className="col-span-3 text-lg">Encuestas Creadas</div>
      <LastWeek />
    </div>
  </div>
</div>
<div className="col-span-12 md:col-span-6">
  <div className={cardClass}>
    <div className="card-body grid grid-cols-6 p-4 pb-0">
      <div className="col-span-3 text-lg">Respuestas Recibidas</div>
      <RespRecib />
    </div>
  </div>
</div>
<div className="col-span-12 md:col-span-8">
  <div className={cardClass}>
    <div className="card-body p-4">
      <div className="col-span-3 text-lg">
        Encuestas con más respuestas
      </div>
      <TablaInicio />
    </div>
  </div>
</div>
<div className="col-span-12 md:col-span-4">
  <div className="card h-96 bg-base-200"></div>
</div>
</div> */
}
