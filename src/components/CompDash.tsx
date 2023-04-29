import LastWeek from "./homeDashboard/LastWeek";
import RespRecib from "./homeDashboard/ResponsesCard";
import TablaInicio from "./homeDashboard/HomeTable";

import { useEffect, useRef, useState, lazy, Suspense } from "react";

let Globe: any = () => null;
if (typeof window !== "undefined") Globe = require("react-globe.gl").default;

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
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.8;
    }
  }, []);

  return (
    <div className="flex w-full justify-center overflow-x-hidden">
      <div className="container my-5 mx-0 px-4 sm:px-0 md:px-5 ">
        <h1 className="mb-5 ml-0 text-center  text-2xl font-semibold sm:ml-5 sm:text-left sm:text-4xl  ">
          Estadísitcas Generales
        </h1>
        {isClient && (
          <div className="flex justify-between sm:ml-5">
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
