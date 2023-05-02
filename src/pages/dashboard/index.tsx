import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { DashboardLayout, CompDash } from "../../components";
import { NextPage } from "next";

type Props = {};

const Dashboard: NextPage<Props> = () => {
  return (
    <DashboardLayout
      title="Estadísticas Generales"
      description="Inicio. Estadísticas Generales de tus Encuestas"
    >
      <CompDash />
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

export default withAuthUser<any>()(Dashboard);
