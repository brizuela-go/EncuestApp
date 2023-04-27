import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/firebaseClient";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ResponseCard = () => {
  // Obtener la fecha actual
  const today: Date = new Date();

  //Var cant de encuestas de los ultimos 5 dias
  const [respuestas, setRespuestas] = useState<any[]>([]);
  const [cantRespuestas, setCantRespuestas] = useState<number>();

  //Array de cantidad de encuestas de los ultimos 5 dias type any

  const [arrayCantEncu, setArrayCantEncu] = useState<number[]>();

  //Datos de usuario
  const [user, userLoading] = useAuthState(firebase.auth());

  //Obtener las respuestas de los ultimos 5 dias
  useEffect(() => {
    const getEncuestas = async () => {
      const uid = !userLoading && user?.uid;
      const db = firebase.firestore();
      const encuestasRef = db.collection("encuestas");

      // Get all documents that belong to the user and have a collection called respuestas
      const snapshot = await encuestasRef.where("belongsTo", "==", uid).get();
      const respuestasData = [];
      for (const doc of snapshot.docs) {
        // Get the documents in the "respuestas" collection for each "encuestas" document
        const respuestasSnapshot = await doc.ref.collection("respuestas").get();
        const respuestasDocs = respuestasSnapshot.docs.map((respuestaDoc) => ({
          id: respuestaDoc.id,
          ...respuestaDoc.data(),
        }));
        respuestasData.push(...respuestasDocs);
      }
      setRespuestas(respuestasData);
      setCantRespuestas(respuestasData.length);

      const today: Date = new Date();
      const fiveDaysAgo: Date = new Date();

      var cantRespuestas = [];
      for (let i = 4; i >= 0; i--) {
        fiveDaysAgo.setDate(today.getDate() - i);
        //format to "dd/mm/yyyy
        const day: string = fiveDaysAgo.getDate().toString().padStart(2, "0");
        let month = fiveDaysAgo.getMonth() + 1;
        let month2: string = month.toString().padStart(2, "0");
        const year = fiveDaysAgo.getFullYear();
        const date = `${day}/${month2}/${year}`;

        //cantidad de encuestas de cada dia
        var cantResptasDia = 0;
        for (let j = 0; j < respuestas.length; j++) {
          let fullDate: any = respuestas[j]["createdAt"];
          if (fullDate) {
            let [edate] = fullDate.split(",");
            if (edate === date) {
              cantResptasDia++;
            }
          }
        }
        cantRespuestas.push(cantResptasDia);
      }
      setArrayCantEncu(cantRespuestas);
    };
    getEncuestas();
  }, [respuestas, user, userLoading]);

  // Crear un array con las últimas 5 fechas
  const lastFiveDays = [];
  for (let i = 4; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    lastFiveDays.push(date);
  }

  // Formatear las fechas como cadenas de texto en el formato "MM dd"
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDates = lastFiveDays.map((date) => {
    const day: string = (date.getDate() || "").toString().padStart(2, "0");
    const month = date.getMonth() + 1;

    const monthName = monthNames[month];

    return `${monthName} ${day}`;
  });

  // Configurar las opciones del gráfico utilizando el hook useState
  const options = {
    chart: {
      id: "last-five-days-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: formattedDates,
    },
    yaxis: {
      labels: {
        style: {
          colors: ["#fff"],
        },
        formatter: function (value: number) {
          return value.toFixed(0);
        },
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: false,
      theme: "dark",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
        colorStops: [],
      },
    },
  };

  const series = [
    {
      name: "Creadas",
      data: arrayCantEncu || [],
    },
  ];

  return (
    <>
      <div className="text-md col-span-2 col-start-5">
        Total: <span className="pl-2 text-4xl font-bold">{cantRespuestas}</span>
      </div>
      <div className="cla col-span-6 flex justify-center">
        {arrayCantEncu && (
          <Chart
            options={options}
            series={series}
            type="line"
            width={"100%"}
            height={150}
          />
        )}
      </div>
    </>
  );
};

export default ResponseCard;
