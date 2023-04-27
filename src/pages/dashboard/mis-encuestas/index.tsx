import { NextPage } from "next";

import { CompMisEncuestas, DashboardLayout } from "../../../components";
import Head from "next/head";

type Props = {};

const MisEncuestas: NextPage<Props> = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Mis Encuestas</title>
        <meta name="description" content="Dashboard | Mis encuestas" />
      </Head>
      <main className="dark:bg-[#0E1320]">
        <DashboardLayout component={<CompMisEncuestas />} />
      </main>
    </>
  );
};

export default MisEncuestas;
