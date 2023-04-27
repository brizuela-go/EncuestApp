import { Model, Survey } from "survey-react";
// import { Container } from "./styles"; // your styles here

import Image from "next/image";

import firebase from "../firebase/firebaseClient";

// Modern theme
import "survey-react/modern.min.css";
import { FaRegCalendarAlt } from "react-icons/fa";
// Default theme
// import 'survey-react/survey.min.css';

type Props = {
  id: string;
  data: any;
  user: any;
};

const SurveyComponent: React.FC<Props> = ({ id, data, user }) => {
  // Create a modal
  const survey = new Model(data);

  // /components/survey/index.tsx
  survey.sendResultOnPageNext = true;
  const storageName = "SurveyNextjs";
  function saveSurveyData(survey: any) {
    let data = survey.data;
    data.pageNo = survey.currentPageNo;
    window.localStorage.setItem(storageName, JSON.stringify(data));
    console.log(data);
  }
  survey.onPartialSend.add(function (survey) {
    saveSurveyData(survey);
  });
  const prevData = window.localStorage.getItem(storageName) || null;
  if (prevData) {
    let data = JSON.parse(prevData);
    survey.data = data;
    if (data.pageNo) {
      survey.currentPageNo = data.pageNo;
    }
  }

  const saveSurveyToFirebase = async (survey: any) => {
    const db = firebase.firestore();
    const ref = db
      .collection("encuestas")
      .doc(id)
      .collection("respuestas")
      .doc();

    const res = await ref.set(survey.data);
    return res;
  };

  survey.onComplete.add(function (survey, options) {
    saveSurveyData(survey);
    saveSurveyToFirebase(survey);
    console.log(survey.data);
    // window.location.href = "/survey/finish";
  });

  // Render the survey
  return (
    <section className="survey m-4 p-1 sm:m-8 md:px-40">
      <div className=" mt-8 flex justify-center space-x-5 md:my-0 md:justify-end">
        <>
          <Image
            src={user.photoUrl}
            width={40}
            height={40}
            alt={user.name}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </>

        <FaRegCalendarAlt className="mt-1 text-2xl text-slate-700 dark:text-slate-600" />

        <p className="mt-1 text-sm font-semibold">
          {/* convert firebase timestamp to string */}
          {data.createdAt}
        </p>
      </div>
      <Survey model={survey} />
    </section>
  );
};

export default SurveyComponent;
