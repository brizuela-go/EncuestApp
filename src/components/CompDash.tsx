import LastWeek from "./homeDashboard/LastWeek";
import RespRecib from "./homeDashboard/ResponsesCard";
import TablaInicio from "./homeDashboard/HomeTable";

const CompDash = () => {
  let cardClass =
    "entrance card bg-slate-400 bg-opacity-20 dark:bg-slate-800 dark:bg-opacity-40";

  return (
    <div className="flex w-full justify-center overflow-x-hidden">
      <div className="container my-3 mx-0 px-4 sm:px-0 md:px-5 ">
        <h1 className="mb-5 text-center text-2xl font-semibold  sm:text-4xl">
          Home Dasboard
        </h1>
        <div className="grid grid-cols-12 gap-4">
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
        </div>
      </div>
    </div>
  );
};

export default CompDash;
