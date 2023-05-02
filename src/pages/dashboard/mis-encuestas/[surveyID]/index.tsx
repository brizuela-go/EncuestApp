import { NextPage } from "next";

import { DashboardLayout, SurveyDashboard } from "../../../../components";
import { useRouter } from "next/router";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import firebase from "../../../../firebase/firebaseClient";

type Props = {
  surveyID: string;
};

const Survey: NextPage<Props> = () => {
  const router = useRouter();

  return (
    <DashboardLayout
      title={`Encuesta 
      ${router.query.surveyID}`}
      description="Encuesta 
      "
    >
      <SurveyDashboard surveyID={router?.query?.surveyID as string} />
    </DashboardLayout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, params }) => {
  // Optionally, get other props.
  const isPremium = AuthUser.claims?.stripeRole ? true : false;
  const surveyID = params?.surveyID as string;

  // check if survey belongs to user
  const db = firebase.firestore();
  const encuestasRef = db.collection("encuestas").doc(surveyID);
  const encuesta = await encuestasRef.get();
  const belongsTo = encuesta.data()?.belongsTo;

  if (belongsTo !== AuthUser.id) {
    return {
      redirect: {
        destination: "/dashboard/mis-encuestas",
        permanent: false,
      },
    };
  }

  if (!isPremium) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
});

export default withAuthUser<any>({
  whenAuthed: AuthAction.RENDER,
})(Survey);
