import { useEffect, useRef, useState } from "react";
import { Table } from "../components";
import firebase from "../firebase/firebaseClient";
import { z } from "zod";
import SurveySchema from "../schemas/SurveySchema";
import { FaCalendar } from "react-icons/fa";
import { BsCardText } from "react-icons/bs";
import dynamic from "next/dynamic";
import { RiQuestionAnswerLine } from "react-icons/ri";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  surveyID: string;
};

type Survey = z.infer<typeof SurveySchema>;

const questionTypes = [
  {
    type: "text",
    chart: "treemap",
  },
  {
    type: "radiogroup",
    chart: "pie",
  },
  {
    type: "checkbox",
    chart: "polarArea",
  },
  {
    type: "dropdown",
    chart: "donut",
  },
  {
    type: "boolean",
    chart: "pie",
  },
  {
    type: "rating",
    chart: "bar",
  },
  {
    type: "ranking",
    chart: "bubble",
  },
  {
    type: "comment",
    chart: "treemap",
  },
  {
    type: "signaturepad",
    chart: "pie",
  },
];

const SurveyDashboard: React.FC<Props> = ({ surveyID }) => {
  const [survey, setSurvey] = useState<Survey>();
  const [responses, setResponses] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [Insight, setInsight] = useState("");
  const [vibe, setVibe] = useState<any>("Profesional");
  const [generatedInsight, setGeneratedInsight] = useState<String>("");
  const [saved, setSaved] = useState(false);

  const InsightRef = useRef<null | HTMLDivElement>(null);

  const scrollToInsight = () => {
    if (InsightRef.current !== null) {
      InsightRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Genera un análisis o retroalimentación ${vibe}. Se creativo y original.  ${
    vibe === "Chistosa"
      ? "Asegúrate de que sea ridícula e incluya un chiste."
      : null
  }
      Asegúrate de que el análisis generado tenga menos de 300 caractéres. Finalmente, básate en el siguiente contexto: 
      ${survey?.title} es una encuesta que se realizó a ${
    responses.length
  } personas. 
      ${responses.length > 0 ? "Las respuestas fueron:" : null}
    
      `;

  const generateInsight = async (e: any) => {
    e.preventDefault();
    setInsight("");
    setGeneratedInsight("");
    setLoading(true);
    const response = await fetch("/api/insight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedInsight((prev) => prev + chunkValue);
    }
    scrollToInsight();
    setLoading(false);

    console.log(generatedInsight);
  };

  // get survey data from firestore
  useEffect(() => {
    const db = firebase.firestore();
    const surveyRef = db.collection("encuestas").doc(surveyID);
    surveyRef.onSnapshot((doc) => {
      if (doc.exists) {
        setSurvey(doc.data() as Survey);
      }
    });
  }, []);

  // get responses from firestore
  useEffect(() => {
    const db = firebase.firestore();
    const surveyRef = db.collection("encuestas").doc(surveyID);
    surveyRef.collection("respuestas").onSnapshot((snapshot) => {
      const responses = snapshot.docs.map((doc) => doc.data());
      setResponses(responses);
    });
  }, []);

  return (
    <>
      <div className="flex  flex-col items-center justify-center space-y-4 py-20">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 md:text-5xl">
          {survey?.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          <span className=" mr-3 font-bold text-black dark:text-white">
            <BsCardText className="mr-4 -mt-1 inline-block" />
            Descripción:{" "}
          </span>
          {survey?.description}
        </p>
        {/* get createdAt */}
        <p className="text-gray-600 dark:text-gray-400">
          <span className="mr-3 font-bold text-black dark:text-white">
            <FaCalendar className="mr-3 -mt-1 inline-block" />
            Creada:{" "}
          </span>
          {survey?.createdAt}
        </p>
      </div>

      <div className="mb-24 flex flex-col items-center  justify-center space-y-6 p-6">
        <div
          className={`entrance card my-6 h-24 rounded-lg bg-slate-300  bg-opacity-20 shadow-lg dark:bg-slate-900 dark:bg-opacity-50 lg:w-[40rem] `}
        >
          <div className="card-body -mt-3">
            <div className="flex flex-wrap place-items-center items-center justify-between">
              <div>
                <h5 className="text-lg font-medium dark:text-gray-300  ">
                  Respuestas
                </h5>
                <p className=" text-2xl font-bold lg:text-xl">
                  {responses.length} <span></span>
                </p>
              </div>

              <div
                className={`rounded-xl bg-gradient-to-r from-blue-400 to-blue-700 p-3 text-2xl text-white shadow-xl`}
              >
                <RiQuestionAnswerLine />
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          Gráficas de respuestas
        </h2>
        <div className="w-full">
          <div className=" grid grid-cols-1 gap-8 lg:grid-cols-3">
            {survey?.elements.map((question, index) => (
              <div
                key={question.name + index}
                className="w-full rounded-lg  px-4 py-6 shadow-lg "
              >
                <h3 className="text-xl font-medium text-gray-700 dark:text-white">
                  {question.name}
                </h3>
                <div className="mt-4">
                  {questionTypes.map((type) => {
                    if (type.type === question.type) {
                      return (
                        <Chart
                          key={question.name + index}
                          options={{
                            chart: {
                              id: type.chart,
                            },
                            labels: question.choices as any,
                          }}
                          series={responses.map((response) => {
                            if (question.type === "text") {
                              return response[question.name].length;
                            } else {
                              return response[question.name];
                            }
                          })}
                          type={type.chart as any}
                          width="100%"
                          height="300px"
                        />
                      );
                    }
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col justify-center space-y-8">
            {generatedInsight && (
              <p
                className={`lg:px-16dark:text-white  entrance card bg-slate-300  bg-opacity-20 p-8 text-center font-light text-gray-800 dark:bg-slate-900 dark:bg-opacity-50 dark:text-white`}
              >
                {generatedInsight}
              </p>
            )}
            <button
              type="button"
              onClick={generateInsight}
              className={`${
                loading && "loading"
              } btn-outline  btn-accent btn mx-auto justify-center shadow-lg hover:shadow-xl lg:w-1/2`}
            >
              Generar Retroalimentación con IA 🤖
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyDashboard;
