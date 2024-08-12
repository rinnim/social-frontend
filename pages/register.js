import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { Modal } from "antd";
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("antd").then((mod) => mod.Modal), {
  ssr: false,
});
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [state, setState] = useContext(UserContext);

  const handleSubmit = async (e) => {
    // prevent default form submission
    e.preventDefault();

    // post request to backend api
    try {
      setLoading(true);
      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
        secret,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // clear form fields
        setName("");
        setEmail("");
        setPassword("");
        setSecret("");
        setOk(data.ok);
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.response.data);
      console.log(err.response.data);
      setLoading(false);
    }
  };

  // redirect if logged in
  if (state && state.token) router.push("/");

  return (
    <>
      <div className="contianer-fluid">
        {/* register section */}
        <div className="row py-5 bg-secondary text-light">
          <div className="col text-center">
            <h1>Register</h1>
          </div>
        </div>

        {/* form section */}
        <div className="row py-5">
          <div className="col-md-6 offset-md-3">
            <AuthForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              secret={secret}
              setSecret={setSecret}
              loading={loading}
            />
          </div>
        </div>

        {/* success message */}
        <div className="row">
          <div className="col">
            <Modal
              className="text-center"
              title="Congratulations!"
              open={ok}
              onOk={() => setOk(false)}
              onCancel={() => setOk(false)}
              footer={null}
            >
              <p>You have successfully registered.</p>
              <Link href="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
            </Modal>
          </div>
        </div>

        {/* login section */}
        <div className="row">
          <div className="col">
            <p className="text-center">
              Already registered? <Link href="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
