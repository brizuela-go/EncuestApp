import { NextPage } from "next";

import { DashboardLayout } from "../../../../components";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

type Props = {};

const EditSurvey: NextPage<Props> = () => {
  return (
    <DashboardLayout title="Editar Encuesta" description="Edición de Encuesta">
      Editar Encuesta
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
})(EditSurvey);
