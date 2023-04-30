import { NextPage } from "next";

import { DashboardLayout, SurveyDashboard } from "../../../../components";
import { useRouter } from "next/router";

type Props = {};

const Survey: NextPage<Props> = () => {
  const router = useRouter();

  return (
    <DashboardLayout
      title={`Encuesta 
      ${router.query.surveyID}`}
      description="Encuesta 
      "
    >
      <SurveyDashboard />
    </DashboardLayout>
  );
};

export default Survey;
