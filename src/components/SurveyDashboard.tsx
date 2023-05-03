import { Table } from "../components";

type Props = {
  surveyID: string;
};

const SurveyDashboard: React.FC<Props> = ({ surveyID }) => {
  return (
    <>
      <div>{surveyID}</div>

      <div className="container px-12 pt-5">
        <Table />
      </div>
    </>
  );
};

export default SurveyDashboard;
