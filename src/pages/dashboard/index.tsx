import Head from "next/head";
import { DashboardLayout, CompDash } from "../../components";
import { NextPage } from "next";

type Props = {};

const Dashboard: NextPage<Props> = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Inicio</title>
        <meta name="description" content="Dashboard | Mis encuestas" />
      </Head>
      <main className=" dark:bg-[#0E1320]">
        <DashboardLayout component={<CompDash />} />
      </main>
    </>
  );
};

export default Dashboard;
