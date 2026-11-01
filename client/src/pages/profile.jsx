import axios from "axios";
import { useEffect, useState } from "react";

import ProfilePicture from "../components/profilePicture";

const Profile = () => {
  const [data, setData] = useState({});
  const [initial, setInitial] = useState({});
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState({ skill: "", level: "" });

  const addSkill = () => {
    const skill = draft.skill.trim();
    if (!skill || !draft.level) return;

    setData((prev) => ({
      ...prev,
      skillToLearn: [
        ...(prev.skillToLearn ?? []),
        { skill, level: draft.level },
      ],
    }));
    setDraft({ skill: "", level: "" });
  };

  const removeSkill = (index) => {
    setData((prev) => ({
      ...prev,
      skillToLearn: prev.skillToLearn.filter((_, i) => i !== index),
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const restoreDefault = () => setData(initial);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/get", {
          withCredentials: true,
        });
        console.log("resValue: ", res.data);
        setData(res.data.data);
        setInitial(res.data.data);
        console.log("dataValue: ", data);
      } catch (err) {
        console.log("full error:", err); // look at the red text and the message
        if (err.response) {
          setError(err.response.data.message || err.response.data.ERROR);
          setFieldErrors(err.response.data.errors || {});
        } else {
          setError(err.message); // shows the real reason, not a generic line
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  if (loading)
    return <span className="loading loading-spinner loading-lg m-auto mt-10" />;

  return (
    <div className="mb-14">
      {error && (
        <div role="alert" className="alert alert-error alert-soft rounded-xl">
          <span>{error}</span>
        </div>
      )}
      <ProfilePicture />
      <fieldset className="fieldset bg-transparent rounded-xl border-base-200 w-xs border p-4 m-auto mt-4 ">
        <legend className="fieldset-legend ml-4 text-xl">Update Profile</legend>
        <label htmlFor="FirstName" className="label">
          First Name
        </label>
        <input
          type="text"
          placeholder="John"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
          id="FirstName"
          className={`input rounded-xl border border-base-200 ${fieldErrors.firstName ? "input-error" : "border-base-200"}`}
        />
        {fieldErrors.firstName && (
          <p className="text-error text-sm">{fieldErrors.firstName}</p>
        )}
        <label htmlFor="LastName" className="label">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          id="LastName"
          value={data.lastName}
          onChange={handleChange}
          placeholder="Doe"
          className="input rounded-xl border border-base-200"
        />
        <label className="label" htmlFor="email">
          Email
        </label>
        <label className="input validator rounded-xl border border-base-200">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            id="email"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="mail@site.com"
            required
          />
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>{" "}
        <label htmlFor="age" className="label">
          Age
        </label>
        <input
          type="number"
          className="input validator rounded-xl border border-base-200"
          required
          id="age"
          name="age"
          value={data.age}
          onChange={handleChange}
          placeholder="Type a number between 1 to 10"
          min="11"
          max="120"
          title="Must be between be 1 to 10"
        />
        <p className="validator-hint hidden">Must be between be 1 to 10</p>
        <label htmlFor="password" className="label">
          Password
        </label>
        <label className="input validator rounded-xl border border-base-200">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
            placeholder="Password"
            minLength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
        <p className="validator-hint hidden">
          Must be more than 8 characters, including
          <br />
          At least one number <br />
          At least one lowercase letter <br />
          At least one uppercase letter
        </p>
        <label htmlFor="skillsLearn" className="mt-2 label">
          Skills to Learn
        </label>
        <div className="border border-base-300 p-2 rounded-3xl">
          <input
            type="text"
            id="skillsLearn"
            placeholder="Skills"
            className="input join-item mb-4 rounded-xl border border-base-200"
            value={draft.skill}
            onChange={(e) => setDraft((p) => ({ ...p, skill: e.target.value }))}
          />

          <div className="join">
            <select
              className="select rounded-xl border border-base-200 mr-3"
              value={draft.level}
              onChange={(e) =>
                setDraft((p) => ({ ...p, level: e.target.value }))
              }
            >
              <option value="" disabled>
                LEVEL
              </option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            <button
              type="button"
              className="btn btn-primary join-item rounded-2xl"
              onClick={addSkill}
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {(data.skillToLearn ?? []).map((s, i) => (
              <span key={s._id ?? i} className="badge badge-outline gap-1 p-3">
                {s.skill} · {s.level}
                <button
                  type="button"
                  onClick={() => removeSkill(i)}
                  aria-label={`Remove ${s.skill}`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button className="btn btn-primary hover:brightness-110 mt-4 mr-2 rounded-md border-0">
            Update Profile
          </button>
          <button
            className="btn btn-primary hover:brightness-110 mt-4 mr-2 rounded-md border-0"
            type="reset "
            onClick={restoreDefault}
          >
            Default
          </button>
        </div>
      </fieldset>
    </div>
  );
};

export default Profile;
