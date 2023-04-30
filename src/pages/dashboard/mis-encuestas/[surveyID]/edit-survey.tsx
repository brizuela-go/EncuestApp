import { NextPage } from "next";

import { DashboardLayout } from "../../../../components";

type Props = {};

const EditSurvey: NextPage<Props> = () => {
  return (
    <DashboardLayout title="Editar Encuesta" description="Edición de Encuesta">
      Editar Encuesta
    </DashboardLayout>
  );
};

export default EditSurvey;
