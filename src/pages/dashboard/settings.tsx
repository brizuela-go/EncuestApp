import { NextPage } from "next";
import { DashboardLayout } from "../../components";

type Props = {};

const Settings: NextPage<Props> = () => {
  return (
    <DashboardLayout title="Configuración" description="Configuración">
      <h1 className="dashboard-title">Configuración</h1>
    </DashboardLayout>
  );
};

export default Settings;
