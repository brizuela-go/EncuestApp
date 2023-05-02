import { NextPage } from "next";

import { CompMisEncuestas, DashboardLayout } from "../../../components";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

type Props = {};

const MisEncuestas: NextPage<Props> = () => {
  return (
    <DashboardLayout title="Mis Encuestas" description="Mis Encuestas Creadas">
      <CompMisEncuestas />
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

export default withAuthUser<any>()(MisEncuestas);
