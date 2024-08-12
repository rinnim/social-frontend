import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm";
import { useRouter } from "next/router";
import { UserContext } from "../context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(UserContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
    // prevent default form submission
    e.preventDefault();

    // post request to backend api
    try {
      setLoading(true);
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
        console.log(data.error);
        setLoading(false);
      } else {
        // update context
        setState({
          user: data.user,
          token: data.token,
        });

        // save in local storage
        window.localStorage.setItem("auth", JSON.stringify(data));

        // redirect to dashboard page
        setLoading(false);
        router.push("/user/dashboard");
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
        {/* login section */}
        <div className="row py-5 bg-secondary text-light">
          <div className="col text-center">
            <h1>Login</h1>
          </div>
        </div>

        {/* form section */}
        <div className="row py-5">
          <div className="col-md-6 offset-md-3">
            <AuthForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              page="login"
            />
          </div>
        </div>

        {/* register section */}
        <div className="row">
          <div className="col">
            <p className="text-center">
              Not yet registered? <Link href="/register">Register</Link>
            </p>
          </div>
        </div>

        {/* footer section */}
        <div className="row">
          <div className="col">
            <p className="text-center">
              <Link href="/forgot-password" className="text-danger">
                Forgot Password
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
