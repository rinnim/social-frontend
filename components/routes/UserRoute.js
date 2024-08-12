import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "../../context";

// import { SyncOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
const SyncOutlined = dynamic(() =>
  import("@ant-design/icons").then((mod) => mod.SyncOutlined)
);

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [state] = useContext(UserContext);

  useEffect(() => {
    if (state && state.token) getCurrentUser();
  }, [state && state.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`/current-user`);
      if (data.ok) setOk(true);
      setLoading(false);
    } catch (err) {
      setOk(false);
      setLoading(false);
      router.push("/login");
    }
  };

  process.browser &&
    state === null &&
    setTimeout(() => {
      getCurrentUser();
    }, 1000);

  return !ok ? (
    <SyncOutlined
      spin
      className="d-flex justify-content-center display-1 text-primary p-5"
    />
  ) : (
    <>{children}</>
  );
};

export default UserRoute;
