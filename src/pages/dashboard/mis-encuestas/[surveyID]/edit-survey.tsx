import { NextPage } from "next";

import { DashboardLayout, SurveyDashboard } from "../../../../components";
import Head from "next/head";

type Props = {};

const EditSurvey: NextPage<Props> = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Editar Encuesta</title>
        <meta name="description" content="Dashboard | Mis encuestas" />
      </Head>
      <main className="dark:bg-[#0E1320]">
        <DashboardLayout component={<>Editar</>} />
      </main>
    </>
  );
};

export default EditSurvey;
