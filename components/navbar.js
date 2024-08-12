import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";
const Navbar = () => {
  const [state, setState] = useContext(UserContext);
  const [currentLink, setCurrentLink] = useState("");

  useEffect(() => {
    process.browser && setCurrentLink(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  return (
    <>
      <p className="text-center">{JSON.stringify(currentLink)}</p>
      <nav className="nav bg-info-subtle d-flex justify-content-center gap-5 p-3">
        <Link
          href="/"
          className={`${currentLink === "/" && "active"} nav-link text-black`}
        >
          Home
        </Link>
        {state !== null ? (
          <>
            <Link
              href="/user/dashboard"
              className={`${
                currentLink === "/user/dashboard" && "active"
              } nav-link text-black`}
            >
              {state && state.user && state.user.name}
            </Link>
            <a onClick={logout} className="nav-link text-black">
              Logout
            </a>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={`${
                currentLink === "/login" && "active"
              } nav-link text-black`}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={`${
                currentLink === "/register" && "active"
              } nav-link text-black`}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
