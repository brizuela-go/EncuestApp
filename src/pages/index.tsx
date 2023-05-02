import { Layout } from "../components";
import { Hero } from "../components";

import { NextPage } from "next";

import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";

type Props = {};

const Home: NextPage<Props> = () => {
  const AuthUser = useAuthUser();

  const isUserSignedIn = Boolean(AuthUser?.id);

  const userIsPremium = Boolean(AuthUser.claims?.stripeRole);

  return (
    <>
      <Layout
        title="EncuestApp"
        description="EncuestApp. La mejor aplicación para gestionar tus encuestas"
        AuthUser={AuthUser}
      >
        <Hero user={isUserSignedIn} userIsPremium={userIsPremium} />
      </Layout>
    </>
  );
};

export default withAuthUser<any>()(Home);
