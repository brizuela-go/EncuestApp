import { NextPage } from "next";

import { CreadorDeEncuestas, DashboardLayout } from "../../components";
import Head from "next/head";

type Props = {};

const MisEncuestas: NextPage<Props> = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Crear Encuesta</title>
        <meta name="description" content="Dashboard | Mis encuestas" />
      </Head>
      <main className="dark:bg-[#0E1320]">
        <DashboardLayout component={<CreadorDeEncuestas />} />
      </main>
    </>
  );
};

export default MisEncuestas;
