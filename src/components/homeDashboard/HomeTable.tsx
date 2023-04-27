import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/firebaseClient";

const HomeTable = () => {
  const [encuestas, setEncuestas] = useState<any[]>([]);

  //Datos de usuario
  const [user, userLoading] = useAuthState(firebase.auth());

  useEffect(() => {
    const getEncuestasConMasRespuestas = async () => {
      const uid = !userLoading && user?.uid;
      const db = firebase.firestore();
      const encuestasRef = db.collection("encuestas");

      // Obtener todas las encuestas del usuario que tienen una colección llamada "respuestas"
      const snapshot = await encuestasRef.where("belongsTo", "==", uid).get();
      const encuestasData = [];
      for (const doc of snapshot.docs) {
        // Obtener los documentos de la colección "respuestas" para cada documento de "encuestas"
        const respuestasSnapshot = await doc.ref.collection("respuestas").get();
        const respuestasDocs = respuestasSnapshot.docs.map((respuestaDoc) => ({
          id: respuestaDoc.id,
          ...respuestaDoc.data(),
        }));
        // Guardar la cantidad de respuestas en la variable "cantidadRespuestas"
        const cantidadRespuestas = respuestasDocs.length;
        encuestasData.push({
          id: doc.id,
          ...doc.data(),
          cantidadRespuestas,
        });
      }

      // Ordenar las encuestas por cantidad de respuestas en orden descendente
      encuestasData.sort((a, b) => b.cantidadRespuestas - a.cantidadRespuestas);

      // Guardar las encuestas con más respuestas en una variable
      const encuestasConMasRespuestas = encuestasData.slice(0, 5); // Obtener las 5 encuestas con más respuestas
      setEncuestas(encuestasConMasRespuestas);
    };
    getEncuestasConMasRespuestas();
  }, [user, userLoading]);

  let bg = "bg-gradient-to-b from-purple-500 to-blue-600";
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full text-center">
        {/* head */}
        <thead>
          <tr className="bg-white bg-opacity-5">
            <th className="py-5">Encuesta</th>
            <th>Cantidad de respuestas</th>
            <th>Creación</th>
            <th>Ver</th>
          </tr>
        </thead>
        <tbody>
          {/* Map */}
          {encuestas.map((encuesta) => {
            return (
              <tr key={encuesta.id}>
                <td className="border-l-2 border-b-2 border-white border-opacity-5 py-4">
                  {encuesta.title}
                </td>
                <td className="border-b-2 border-white border-opacity-5 py-4">
                  {encuesta.cantidadRespuestas}
                </td>
                <td className="border-b-2 border-white border-opacity-5 py-4">
                  {encuesta.createdAt}
                </td>
                <td className="border-r-2 border-b-2 border-white border-opacity-5 py-4">
                  <div className="btn-primary btn-sm btn">Ir a encuesta</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HomeTable;
