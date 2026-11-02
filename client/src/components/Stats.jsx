import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, GraduationCap } from "lucide-react";

import Avatar from "./Avatar";

const StatsSkeleton = () => (
  <div
    className="skeleton h-28 w-full rounded-box"
    role="status"
    aria-busy="true"
    aria-label="Loading stats"
  />
);

const countLevel = (list, level) =>
  list.filter((s) => s.level === level).length;

const Stats = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/get", {
          withCredentials: true,
        });
        if (!ignore) setUser(res.data.data);
      } catch (err) {
        if (!ignore)
          setError(
            err.response?.data?.message ||
              err.response?.data?.ERROR ||
              err.message,
          );
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchUser();
    return () => {
      ignore = true;
    };
  }, []);

  const teach = user?.skillToTeach ?? [];
  const learn = user?.skillToLearn ?? [];
  const joined = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div className="border-t border-base-300">
      <h2 className="text-3xl font-extrabold ml-6 mt-6 mb-3">Stats</h2>

      {loading ? (
        <StatsSkeleton />
      ) : error ? (
        <div
          role="alert"
          className="alert alert-error alert-soft rounded-xl mx-4"
        >
          <span>{error}</span>
        </div>
      ) : (
        <div className="stats stats-vertical md:stats-horizontal shadow w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <GraduationCap size={32} />
            </div>
            <div className="stat-title">Skills to Teach</div>
            <div className="stat-value text-primary">{teach.length}</div>
            <div className="stat-desc">
              {countLevel(teach, "expert")} at expert level
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <BookOpen size={32} />
            </div>
            <div className="stat-title">Skills to Learn</div>
            <div className="stat-value text-secondary">{learn.length}</div>
            <div className="stat-desc">
              {countLevel(learn, "beginner")} at beginner level
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure">
              <Avatar
                firstName={user.firstName}
                lastName={user.lastName}
                size="w-16"
                settings={false}
              />
            </div>
            <div className="stat-title">Welcome back</div>
            <div className="stat-value">{user.firstName}</div>
            <div className="stat-desc">Member since {joined}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
