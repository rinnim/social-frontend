// pages/_app.js

import { UserProvider } from "../context";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";
import "../public/css/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>{/* <link rel="stylesheet" href="/css/style.css" /> */}</Head>

      <Navbar />
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
