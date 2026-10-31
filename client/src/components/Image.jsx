import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import axios from "axios";

export default function Image({
  photo,
  firstName = "",
  lastName = "",
  size = "w-10",
  textSize = "text-sm",
  settings = true,
  className = "",
  fetchOwn = false, // load the logged-in user's picture
}) {
  const [failedSrc, setFailedSrc] = useState(null); // which photo failed to load
  const [ownPhoto, setOwnPhoto] = useState(null);
  const closeMenu = () => document.activeElement?.blur();

  // Fetch the logged-in user's picture (only when fetchOwn is on)
  useEffect(() => {
    if (!fetchOwn) return;

    let ignore = false; // skip the result if we unmounted mid-request

    const loadPhoto = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/user/profile-picture",
          { withCredentials: true },
        );
        if (!ignore) setOwnPhoto(res.data.profilePicture);
      } catch (err) {
        console.log(err.response?.status, err.response?.data);
      }
    };

    loadPhoto();

    return () => {
      ignore = true;
    };
  }, [fetchOwn]);

  // A passed-in photo wins over the fetched one
  const src = photo || ownPhoto;

  // Derived, not stored: broken only if THIS exact photo failed
  const broken = failedSrc === src;

  const initials =
    `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "Log In";

  const hasPhoto =
    typeof src === "string" &&
    src.trim() !== "" &&
    src !== "null" &&
    src !== "undefined" &&
    !src.includes("default");

  const avatar =
    hasPhoto && !broken ? (
      <div className="avatar">
        <div className={`${size} rounded-full ${className}`}>
          <img
            src={src}
            alt={`${firstName} ${lastName}`}
            onError={() => setFailedSrc(src)}
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
        className="dropdown-content menu bg-base-200 rounded-box z-10 w-52 p-2 shadow-sm text-left pl-7"
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
