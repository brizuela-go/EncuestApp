import { NextPage } from "next";

import { DashboardLayout, SurveyDashboard } from "../../../../components";
import { useRouter } from "next/router";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

type Props = {};

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
})(async ({ AuthUser }) => {
  // Optionally, get other props.
  const isPremium = AuthUser.claims?.stripeRole ? true : false;

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
