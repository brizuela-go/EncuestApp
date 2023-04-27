import { NextPage } from "next";
import Image from "next/image";

import { useAuthState } from "react-firebase-hooks/auth";

import Head from "next/head";

import { useRouter } from "next/router";

import dynamic from "next/dynamic";

import firebase from "../../firebase/firebaseClient";

const SurveyComponent = dynamic(
  () => import("../../components/SurveyComponent"),
  {
    ssr: false,
  }
);

// return 1, 2, 3 with getServersideProps
export async function getServerSideProps(context: any) {
  const { id } = context.params;

  // retrieve from firebase based on id
  const db = firebase.firestore();

  const ref = db.collection("encuestas").doc(id);

  const res = await ref.get();

  const data = res.data();

  // check if user exists
  const userRef = db.collection("users").doc(data?.belongsTo);

  const userRes = await userRef.get();

  const user = userRes.data();

  return {
    props: {
      id: id,
      data: data,
      user: user,
    },
    // redirect to 404 if no data
    notFound: !user || !data || !id,
  };
}

type Props = {
  id: string;
  data: Survey;
  user: User;
};

type Survey = {
  id: string;
  title: string;
};

type User = {
  name: string;
  email: string;
  photoUrl: string;
};

const Survey: NextPage<Props> = ({ id, data, user }) => {
  return (
    <>
      <Head>
        <title>
          {data.title} por: {user.name}
        </title>
        <meta
          name="description"
          content={`
           ${data.title}. Una encuesta creada por ${user.name} | EncuestApp 
        `}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <nav className="navbar shadow-lg">
          <div className="btn-ghost btn space-x-2 text-xl normal-case">
            <Image
              src={"/logo.png"}
              alt={"EncuestApp"}
              width={45}
              height={45}
              priority={true}
              quality={100}
            />
            <span>EncuestApp</span>
          </div>
        </nav>
        <SurveyComponent id={id} data={data} user={user} />
      </main>
    </>
  );
};

export default Survey;
