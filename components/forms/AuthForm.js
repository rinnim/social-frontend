// import { SyncOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
const SyncOutlined = dynamic(() =>
  import("@ant-design/icons").then((mod) => mod.SyncOutlined)
);

const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
}) => (
  <form onSubmit={handleSubmit}>
    {/* name */}
    {page !== "login" && (
      <div className="form-group py-2">
        <label className="text-muted form-label">Your Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Enter your name"
        />
      </div>
    )}

    {/* email */}
    <div className="form-group py-2">
      <label className="text-muted form-label">Email address</label>
      <input
        type="email"
        className="form-control"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Enter your email"
      />
    </div>

    {/* password */}
    <div className="form-group py-2">
      <label className="text-muted form-label">Password</label>
      <input
        type="password"
        className="form-control"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter your password"
      />
    </div>

    {/* secret */}
    {page !== "login" && (
      <div className="form-group py-2">
        <label className="text-muted form-label">Pick a question</label>
        <select className="form-control form-label">
          <option>What is your favorite color?</option>
          <option>What is your best friend's name?</option>
          <option>What city you were born?</option>
        </select>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setSecret(e.target.value)}
          value={secret}
          placeholder="Enter your answer"
        />
      </div>
    )}

    {/* submit button */}
    <div className="form-group py-2">
      <button
        disabled={
          page === "login"
            ? !email || !password
            : !name || !email || !password || !secret
        }
        className="btn btn-primary col-12 "
      >
        {/* {loading ? "Loading" : "Submit"} */}
        {loading ? <SyncOutlined spin /> : "Submit"}
      </button>
    </div>
  </form>
);

export default AuthForm;
