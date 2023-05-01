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
      <SurveyDashboard surveyID={router?.query?.surveyID as string} />
    </DashboardLayout>
  );
};

export default Survey;
