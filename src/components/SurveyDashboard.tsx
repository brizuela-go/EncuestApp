type Props = {
  surveyID: string;
};

const SurveyDashboard: React.FC<Props> = ({ surveyID }) => {
  return <div>{surveyID}</div>;
};

export default SurveyDashboard;
