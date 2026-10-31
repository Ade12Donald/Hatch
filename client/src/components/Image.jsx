import { useState } from "react";
import { NavLink } from "react-router";

export default function Image({
  photo,
  firstName = "",
  lastName = "",
  size = "w-10",
  textSize = "text-sm",
  settings = true,
  className = "",
}) {
  const [broken, setBroken] = useState(false);
  const closeMenu = () => document.activeElement?.blur();

  const initials =
    `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "Log In";

  const hasPhoto =
    typeof photo === "string" &&
    photo.trim() !== "" &&
    photo !== "null" &&
    photo !== "undefined" &&
    !photo.includes("default");

  const avatar =
    hasPhoto && !broken ? (
      <div className="avatar">
        <div className={`${size} rounded-full ${className}`}>
          <img
            src={photo}
            alt={`${firstName} ${lastName}`}
            onError={() => setBroken(true)}
          />
        </div>
      </div>
    ) : (
      <div className="avatar avatar-placeholder">
        <div
          className={`${size} rounded-full bg-neutral text-neutral-content ${className}`}
        >
          <span className={textSize}>{initials}</span>
        </div>
      </div>
    );

  return settings ? (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="cursor-pointer">
        {avatar}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-10 w-52 p-2 shadow-sm text-left pl-7 "
      >
        <NavLink to="/profile" onClick={closeMenu} className="py-1">
          Profile
        </NavLink>
        <NavLink to="/settings" onClick={closeMenu} className="pb-1">
          Settings
        </NavLink>
        <li>
          <button className="p-0 pt-1">Logout</button>
        </li>
      </ul>
    </div>
  ) : (
    <div>{avatar}</div>
  );
}
