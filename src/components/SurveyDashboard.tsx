import { useEffect, useRef, useState } from "react";
import { Table } from "../components";
import firebase from "../firebase/firebaseClient";
import { tuple, z } from "zod";
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

  const nameAndTypes: any = survey?.elements.map((element) => [
    element.name,
    element.type,
  ]);

  responses.forEach((response) => delete response.pageNo);

  const chartTypes = [
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
      chart: "radar",
    },
    {
      type: "ranking",
      chart: "bar",
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

  // set type of each question in responses
  const responsesWithType = responses.map((response) => {
    const responseWithType: any = {};
    Object.keys(response).forEach((key) => {
      const index = nameAndTypes.findIndex((nameAndType: any) => {
        return nameAndType[0] === key;
      });
      responseWithType[key] = {
        value: response[key],
        type: nameAndTypes[index][1],
        chart: chartTypes[index].chart,
      };
    });
    return responseWithType;
  });

  // find boolean key
  const booleanKey =
    responsesWithType[0] &&
    Object.keys(responsesWithType[0]).find(
      (key) => responsesWithType[0][key].type === "boolean"
    );

  // find all truthey values and falsy values
  const trutheyValues = responsesWithType.filter(
    (response) => response[booleanKey].value === true
  );
  const falsyValues = responsesWithType.filter(
    (response) => response[booleanKey].value === false
  );

  // find text key
  const textKey =
    responsesWithType[0] &&
    Object.keys(responsesWithType[0]).find(
      (key) => responsesWithType[0][key].type === "text"
    );

  // find all text values
  const textValues = responsesWithType.map(
    (response) => response[textKey].value
  );

  // check if text values are the same and count them
  const textValuesCounted: any = textValues.reduce((acc: any, curr: any) => {
    if (typeof acc[curr] == "undefined") {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }
    return acc;
  }, []);

  // text value result
  const textValueResult = Object.entries(textValuesCounted).map(
    ([option, count]) => ({
      [option]: count,
    })
  );

  // in a new array of objects, store the keys in the key "x" and the values in the key "y"
  const textValueResultXY = textValueResult.map((result) => {
    const key = Object.keys(result)[0];
    const value = Object.values(result)[0];
    return {
      x: key,
      y: value,
    };
  });

  // comment key
  const commentKey =
    responsesWithType[0] &&
    Object.keys(responsesWithType[0]).find(
      (key) => responsesWithType[0][key].type === "comment"
    );

  // find all comment values
  const commentValues = responsesWithType.map(
    (response) => response[commentKey].value
  );

  // check if comment values are the same and count them
  const commentValuesCounted: any = commentValues.reduce(
    (acc: any, curr: any) => {
      if (typeof acc[curr] == "undefined") {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    },
    {}
  );

  // comment value result
  const commentValueResult = Object.entries(commentValuesCounted).map(
    ([option, count]) => ({
      [option]: count,
    })
  );

  const commentValueResultXY = commentValueResult.map((result) => {
    const key = Object.keys(result)[0];
    const value = Object.values(result)[0];
    return {
      x: key,
      y: value,
    };
  });

  // RANKING
  const rankingKey =
    responsesWithType[0] &&
    Object.keys(responsesWithType[0]).find(
      (key) => responsesWithType[0][key].type === "ranking"
    );

  const rankingValues = responsesWithType.map(
    (response) => response[rankingKey].value
  );

  const rankingCounts = rankingValues.reduce((acc, curr) => {
    curr.forEach((option: any, index: number) => {
      acc[option] = (acc[option] || 0) + (curr.length - index);
    });
    return acc;
  }, {});

  const rankingResult = Object.entries(rankingCounts).map(
    ([option, count]) => ({
      [option]: count,
    })
  );

  // ranking result keys in a single array
  const rankingResultKeys = rankingResult.reduce((acc, curr) => {
    return acc.concat(Object.keys(curr).toString() as any);
  }, []);

  const rankingResultValues = rankingResult.reduce((acc, curr) => {
    return acc.concat(Object.values(curr) as any);
  }, []);

  // RADIOGROUP
  const radioKey =
    responsesWithType[0] &&
    Object.keys(responsesWithType[0]).find(
      (key) => responsesWithType[0][key].type === "radiogroup"
    );

  // find all radio values
  const radioValues = responsesWithType.map(
    (response) => response[radioKey].value
  );

  // check if radio values are the same and count them
  const radioValuesCounted: any = radioValues.reduce((acc: any, curr: any) => {
    if (typeof acc[curr] == "undefined") {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }
    return acc;
  }, {});

  const radioValuesValues = Object.values(radioValuesCounted);
  const radioValuesKeys = Object.keys(radioValuesCounted);

  // CHECKBOX
  const checkboxKey =
    responsesWithType[0] &&
    Object.keys(responsesWithType[0]).find(
      (key) => responsesWithType[0][key].type === "checkbox"
    );

  const checkboxValues = responsesWithType.map(
    (response) => response[checkboxKey].value
  );

  const checkboxValuesCounted: any = checkboxValues.reduce(
    (acc: any, curr: any) => {
      curr.forEach((option: any) => {
        acc[option] = (acc[option] || 0) + 1;
      });
      return acc;
    },
    {}
  );

  const checkboxResult = Object.entries(checkboxValuesCounted).map(
    ([option, count]) => ({
      [option]: count,
    })
  );

  // checkbox result values in a single array
  const checkboxResultValues = checkboxResult.reduce((acc, curr) => {
    return acc.concat(Object.values(curr) as any);
  }, []);

  // checkbox result keys in a single array
  const checkboxResultKeys = checkboxResult.reduce((acc, curr) => {
    return acc.concat(Object.keys(curr).toString() as any);
  }, []);

  // Dropdown
  const dropdownKey =
    responsesWithType[0] &&
    Object.keys(responsesWithType[0]).find(
      (key) => responsesWithType[0][key].type === "dropdown"
    );

  const dropdownValues = responsesWithType.map(
    (response) => response[dropdownKey].value
  );

  const dropdownValuesCounted: any = dropdownValues.reduce(
    (acc: any, curr: any) => {
      if (typeof acc[curr] == "undefined") {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    },
    {}
  );

  const dropdownResult = Object.entries(dropdownValuesCounted).map(
    ([option, count]) => ({
      [option]: count,
    })
  );

  // dropdown result values in a single array
  const dropdownResultValues = dropdownResult.reduce((acc, curr) => {
    return acc.concat(Object.values(curr) as any);
  }, []);

  // dropdown result keys in a single array
  const dropdownResultKeys = dropdownResult.reduce((acc, curr) => {
    return acc.concat(Object.keys(curr).toString() as any);
  }, []);

  // RATINGS
  const ratingKey =
    responsesWithType[0] &&
    Object.keys(responsesWithType[0]).find(
      (key) => responsesWithType[0][key].type === "rating"
    );

  // find all rating values
  const ratingValues = responsesWithType.map(
    (response) => response[ratingKey].value
  );

  // check if rating values are the same and count them
  const ratingValuesCounted: any = ratingValues.reduce(
    (acc: any, curr: any) => {
      if (typeof acc[curr] == "undefined") {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    },
    {}
  );

  // rating result values in a single array
  const ratingResultValues: any = Object.values(ratingValuesCounted);

  // rating result keys in a single array
  const ratingResultKeys = Object.keys(ratingValuesCounted);

  // mean of rating values
  const ratingResultMean =
    ratingResultKeys.reduce(
      (a: any, b: any) => parseFloat(a) + parseFloat(b),
      0
    ) / ratingResultKeys.length;

  console.log("TRUTHY AND FALSY", falsyValues, trutheyValues);

  // create new array of objects with type, chart and series
  const chartData = responsesWithType.map((response) => {
    const chartData: any = {};
    Object.keys(response).forEach((key) => {
      chartData[key] = {
        type: response[key].type,
        chart: response[key].chart,
        series:
          response[key].type === "boolean"
            ? [falsyValues.length, trutheyValues.length]
            : response[key].type === "radiogroup"
            ? radioValuesValues
            : response[key].type === "checkbox"
            ? checkboxResultValues
            : response[key].type === "dropdown"
            ? dropdownResultValues
            : response[key].type === "ranking"
            ? [
                {
                  data: textValueResultXY,
                },
              ]
            : response[key].type === "rating"
            ? [
                {
                  name: "Series 1",
                  data: ratingResultValues,
                },
              ]
            : response[key].type === "text"
            ? [
                {
                  data: textValueResultXY,
                },
              ]
            : response[key].type === "comment"
            ? [
                {
                  data: commentValueResultXY,
                },
              ]
            : [3, 2],
        labels:
          response[key].type === "radiogroup"
            ? radioValuesKeys
            : response[key].type === "checkbox"
            ? checkboxResultKeys
            : response[key].type === "dropdown"
            ? dropdownResultKeys
            : "",
        xaxis:
          response[key].type === "rating"
            ? {
                categories: ratingResultKeys,
              }
            : response[key].type === "ranking"
            ? {
                categories: rankingResultKeys,
              }
            : "",
      };
    });
    return chartData;
  });

  const newChartData: object[] = [chartData[0]];

  console.log(newChartData);

  // create series for each question

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
          className={`entrance card my-6 h-24 w-72 rounded-lg bg-slate-300  bg-opacity-20 shadow-lg dark:bg-slate-900 dark:bg-opacity-50 lg:w-[60rem] `}
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
                className="w-full rounded-lg  bg-slate-200 bg-opacity-20 px-4 py-6 shadow-lg transition duration-300 ease-in-out hover:bg-opacity-30 hover:shadow-2xl dark:bg-black dark:bg-opacity-10 dark:hover:bg-opacity-20 dark:hover:shadow-2xl "
              >
                <h3 className="text-xl font-medium text-gray-700 dark:text-white">
                  {question.name}
                </h3>
                <div className="mt-4">
                  {newChartData.map((type: any, index: number) => (
                    <>
                      <Chart
                        key={question.name + index}
                        options={{
                          chart: {
                            id: type[question.name].chart,
                          },
                          labels: question.labelFalse
                            ? [question.labelFalse, question.labelTrue]
                            : type[question.name].type === "signaturepad"
                            ? ["Firmaron", "No firmaron"]
                            : type[question.name].labels,
                          xaxis: type[question.name].xaxis,
                          // fix number of decimals
                        }}
                        series={
                          type[question.name] !== "signaturepad"
                            ? type[question.name].series
                            : [1]
                        }
                        type={type[question.name].chart}
                        width="100%"
                        height="270px"
                      />
                    </>
                  ))}
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
