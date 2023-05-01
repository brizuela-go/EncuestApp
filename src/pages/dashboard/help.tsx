import { NextPage } from "next";
import { DashboardLayout } from "../../components";

type Props = {};

const help: NextPage<Props> = () => {
  return (
    <DashboardLayout
      title="FAQ y Ayuda"
      description="Preguntas Frecuentes y Ayuda"
    >
      <h1 className="dashboard-title">Ayuda</h1>
      
    </DashboardLayout>
  );
};

export default help;
