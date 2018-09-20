import Link from "next/link";
import { withRouter } from "next/router";

const Header = ({ router: { pathname } }) => (
  <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
    <div className="container">
      <a className="navbar-brand" href="#">
        Cassette Revival
      </a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link prefetch href="/">
              <a
                className={pathname === "/" ? "nav-link is-active" : "nav-link"}
              >
                Home
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link prefetch href="/about">
              <a
                className={
                  pathname === "/about" ? "nav-link is-active" : "nav-link"
                }
              >
                About
              </a>
            </Link>
          </li>
          {!process.browser || sessionStorage.getItem("token") === null && (
            <li className="nav-item">
              <Link prefetch href="/login">
                <a
                  className={
                    pathname === "/login" ? "nav-link is-active" : "nav-link"
                  }
                >
                  Login
                </a>
              </Link>
            </li>
          )}
          {process.browser && sessionStorage.getItem("token") !== null && (
            <li className="nav-item">
              <Link prefetch href="/logout">
                <a
                  className={
                    pathname === "/logout" ? "nav-link is-active" : "nav-link"
                  }
                >
                  Logout
                </a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  </nav>
);

export default withRouter(Header);
