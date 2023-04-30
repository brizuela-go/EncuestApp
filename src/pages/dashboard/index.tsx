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

export default Dashboard;
