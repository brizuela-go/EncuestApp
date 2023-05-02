import { NextPage } from "next";

import { CreadorDeEncuestas, DashboardLayout } from "../../components";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

type Props = {};

const CrearEncuesta: NextPage<Props> = () => {
  return (
    <DashboardLayout
      title="Crear Encuesta"
      description="Dashboard de EncuestApp | Creador de Encuestas"
    >
      <CreadorDeEncuestas />
    </DashboardLayout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.RENDER,
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
})(CrearEncuesta);
