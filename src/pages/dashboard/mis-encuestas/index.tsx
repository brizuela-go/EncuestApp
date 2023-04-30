import { NextPage } from "next";

import { CompMisEncuestas, DashboardLayout } from "../../../components";

type Props = {};

const MisEncuestas: NextPage<Props> = () => {
  return (
    <DashboardLayout title="Mis Encuestas" description="Mis Encuestas Creadas">
      <CompMisEncuestas />
    </DashboardLayout>
  );
};

export default MisEncuestas;
