import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
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
  const navigate = useNavigate();
  const [loadingPhoto, setLoadingPhoto] = useState(fetchOwn);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/user/logout",
        {},
        { withCredentials: true },
      );
    } finally {
      navigate("/login", { replace: true });
    }
  };

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
        const pic = res.data.profilePicture;
        if (!ignore)
          setOwnPhoto(typeof pic === "string" ? pic : (pic?.url ?? null));
      } catch (err) {
        console.log(err.response?.status, err.response?.data);
      } finally {
        if (!ignore) setLoadingPhoto(false);
      }
    };

    loadPhoto();

    return () => {
      ignore = true;
    };
  }, [fetchOwn]);

  // A passed-in photo wins over the fetched one
  const rawPhoto = photo || ownPhoto;
  const src = typeof rawPhoto === "string" ? rawPhoto : rawPhoto?.url;

  // Derived, not stored: broken only if THIS exact photo failed
  const broken = failedSrc === src;

  const initials =
    `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "?";
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

  const shownAvatar = loadingPhoto ? (
    <div
      className={`skeleton aspect-square rounded-full ${size} ${className}`}
    />
  ) : (
    avatar
  );

  return settings ? (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="cursor-pointer">
        {shownAvatar}
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
          <button className="p-0 pt-1" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  ) : (
    <div>{shownAvatar}</div>
  );
}
