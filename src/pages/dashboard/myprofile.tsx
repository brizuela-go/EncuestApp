import { DashboardLayout } from "../../components";
import { NextPage } from "next";

type Props = {};

const MyProfile: NextPage<Props> = () => {
  return (
    <DashboardLayout title="Mi Perfil" description="Mi Perfil">
      <h1 className="dashboard-title">Mi Perfil</h1>
    </DashboardLayout>
  );
};

export default MyProfile;
