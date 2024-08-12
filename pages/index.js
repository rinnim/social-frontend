import { useContext } from "react";
import { UserContext } from "../context";

const Home = () => {
  const [state, setState] = useContext(UserContext);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="text-center p-1">{JSON.stringify(state)}</p>
          <h1 className="display-1 text-center">Home Page</h1>
          <img src="/images/home.png" alt="image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
