import { Layout } from "../components";
import { Hero } from "../components";

import { NextPage } from "next";

import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/firebaseClient";
import usePremiumStatus from "../stripe/usePremiumStatus";

type Props = {};

const Home: NextPage<Props> = () => {
  const [user, userLoading] = useAuthState(firebase.auth());
  const userIsPremium = usePremiumStatus(user as firebase.User);

  return (
    <>
      <Layout
        title="EncuestApp"
        description="EncuestApp. La mejor aplicación para gestionar tus encuestas"
      >
        <Hero
          user={user as firebase.User}
          userLoading={userLoading}
          userIsPremium={userIsPremium}
        />
      </Layout>
    </>
  );
};

export default Home;
