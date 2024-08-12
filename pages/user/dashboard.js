import { useContext } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";



const Dashboard = () => {
  const { state } = useContext(UserContext);


  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 bg-secondary text-light">
          <div className="col text-center">
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Dashboard;
