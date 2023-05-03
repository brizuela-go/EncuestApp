import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/firebaseClient";

const HomeTable = () => {
  const respuestas = [
    {
      id: "5NbpWFBGvnjkAjBzmEEY",
      fecha: "30/04/2023",
    },
    {
      id: "AEp2ROEWIzg56825toTb",
      fecha: "30/04/2023",
    },
    {
      id: "RCbqxAWj0qzLZ471SvO6",
      fecha: "28/04/2023",
    },
    {
      id: "Vn9ySuhZBBegV5aNHILE",
      fecha: "28/04/2023",
    },
    {
      id: "5NbpWFBGvnjkAjBzmEEY",
      fecha: "27/04/2023",
    },
    {
      id: "5NbpWFBGvnjkAjBzmEEY",
      fecha: "26/04/2023",
    },
  ];

  let bg = "bg-gradient-to-b from-purple-500 to-blue-600";
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full text-center">
        {/* head */}
        <thead>
          <tr className="bg-white bg-opacity-5">
            <th className="py-5">Respuesta id</th>
            <th>Respondida</th>
            <th>Ver</th>
          </tr>
        </thead>
        <tbody>
          {/* Map */}
          {respuestas.map((respuesta) => {
            return (
              <tr key={respuesta.id}>
                <td className="border-l-2 border-b-2 border-white border-opacity-5 py-4">
                  {respuesta.id}
                </td>
                <td className="border-b-2 border-white border-opacity-5 py-4">
                  {respuesta.fecha}
                </td>
                <td className="border-r-2 border-b-2 border-white border-opacity-5 py-4">
                  <div className="btn-primary btn-sm btn">Ir a respuesta</div>
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
