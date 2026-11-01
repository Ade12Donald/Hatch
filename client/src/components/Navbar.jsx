import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { Sun, Moon } from "lucide-react";
import Avatar from "./Avatar";

const navLinks = {
  "/": [
    { to: "/login", label: "Login" },
    { to: "/signup", label: "Create an Account" },
  ],
  "/login": [{ to: "/signup", label: "Create an Account" }],
  "/signup": [{ to: "/login", label: "Login" }],
  "/customize": [],
  "/dashboard": [
    { to: "/connections", label: "Connections" },
    { to: "/inbox", label: "Inbox" },
  ],
  "/profile": [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
  ],
};

const defaultLinks = [{ to: "/", label: "Home" }];

const Navbar = () => {
  const { pathname } = useLocation();
  const isDashboard = pathname === "/dashboard";
  const links = navLinks[pathname] ?? defaultLinks;
  const user = { firstName: "Asher", lastName: "Ace", photo: "" };

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  return (
    <div className="sticky top-px z-50 bg-base-100/80 backdrop-blur px-6 py-2">
      <nav className="mt-2 ml-2 flex items-center">
        <div className="avatar avatar-placeholder flex-1 items-center">
          <div className="bg-neutral text-neutral-content w-10 rounded-full">
            <span className="text-xs">UI</span>
          </div>
          <NavLink to="/" className="ml-2 text-2xl  font-bold">
            Hatch
          </NavLink>
        </div>

        <div className="flex items-center gap-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className="btn btn-ghost rounded-2xl text-base-content"
            >
              {label}
            </NavLink>
          ))}
          {isDashboard !== true ? (
            <label className="toggle toggle-xs text-base-content ">
              <input
                type="checkbox"
                value="dark"
                className="theme-controller"
                checked={theme === "dark"}
                onChange={handleThemeChange}
              />

              <svg
                aria-label="sun"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </g>
              </svg>

              <svg
                aria-label="moon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </g>
              </svg>
            </label>
          ) : (
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                value="dark"
                className="theme-controller"
                checked={theme === "dark"}
                onChange={handleThemeChange}
              />

              <Sun className="swap-off size={24}" />
              <Moon className="swap-on size={24}" />
            </label>
          )}
        </div>
        <span className="ml-2">
          {isDashboard && user && <Avatar {...user} />}
        </span>
      </nav>
    </div>
  );
};
export default Navbar;
