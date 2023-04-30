import { NextPage } from "next";

import { CreadorDeEncuestas, DashboardLayout } from "../../components";

type Props = {};

const MisEncuestas: NextPage<Props> = () => {
  return (
    <DashboardLayout
      title="Crear Encuesta"
      description="Dashboard de EncuestApp | Creador de Encuestas"
    >
      <CreadorDeEncuestas />
    </DashboardLayout>
  );
};

export default MisEncuestas;
