import axios from "axios";
import { useEffect, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

import ProfilePicture from "../components/profilePicture";
import { userSchema } from "../schemas/userSchema";

// Only the fields this form is allowed to send
const profileSchema = userSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  age: true,
  skillToLearn: true,
  skillToTeach: true,
});

const EMPTY_DRAFT = { title: "", level: "" };

// Turns whatever the server sends into { fieldName: "message", form: "message" }
const parseServerError = (err) => {
  if (!err.response) return { form: err.message }; // no reply: network/CORS/server down

  const d = err.response.data;

  // old Zod shape: [{ field, message }]
  if (Array.isArray(d)) {
    const found = { form: "Please fix the highlighted fields" };
    for (const i of d) if (!found[i.field]) found[i.field] = i.message;
    return found;
  }

  return {
    ...(d?.errors ?? {}), // { firstName: "..." }
    ...(d?.field ? { [d.field]: d.message } : {}), // duplicate key shape
    form: d?.message || d?.ERROR || "Something went wrong",
  };
};

const inputClass = (error) =>
  `input rounded-xl border ${error ? "input-error" : "border-base-200"}`;

const Field = ({ label, id, error, children }) => (
  <>
    <label htmlFor={id} className="label">
      {label}
    </label>
    {children}
    {error && <p className="text-error text-sm">{error}</p>}
  </>
);

// One reusable box, used for both "learn" and "teach"
const SkillsBox = ({
  id,
  label,
  levels,
  skills,
  draft,
  error,
  onDraftChange,
  onAdd,
  onRemove,
}) => (
  <>
    <label htmlFor={id} className="mt-2 label">
      {label}
    </label>
    <div
      className={`border p-2 rounded-3xl ${
        error ? "border-error" : "border-base-300"
      }`}
    >
      <input
        type="text"
        id={id}
        placeholder="e.g. react"
        className="input join-item mb-4 rounded-xl border border-base-200"
        value={draft.title}
        onChange={(e) => onDraftChange({ title: e.target.value })}
      />

      <div className="join">
        <select
          className="select rounded-xl border border-base-200 mr-3"
          value={draft.level}
          onChange={(e) => onDraftChange({ level: e.target.value })}
        >
          <option value="" disabled>
            LEVEL
          </option>
          {levels.map((l) => (
            <option key={l} value={l}>
              {l[0].toUpperCase() + l.slice(1)}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="btn btn-primary join-item rounded-2xl"
          onClick={onAdd}
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {skills.map((s, i) => (
          <span
            key={s._id ?? s.title}
            className="badge badge-outline gap-1 p-3"
          >
            {s.title} · {s.level}
            <button
              type="button"
              onClick={() => onRemove(i)}
              aria-label={`Remove ${s.title}`}
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
    {error && <p className="text-error text-sm mt-1">{error}</p>}
  </>
);

const ProfileSkeleton = () => (
  <div
    className="mb-14"
    role="status"
    aria-busy="true"
    aria-label="Loading profile"
  >
    {/* picture */}
    <div className="skeleton w-24 aspect-square rounded-full mx-auto mt-4" />

    <div className="rounded-xl border border-base-200 w-xs p-4 m-auto mt-4 flex flex-col gap-3">
      <div className="skeleton h-6 w-32 ml-4" /> {/* legend */}
      {/* label + input pairs: first name, last name, email, age */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="skeleton h-4 w-20" />
          <div className="skeleton h-10 w-full rounded-xl" />
        </div>
      ))}
      {/* the two skills boxes */}
      {[1, 2].map((i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="skeleton h-4 w-28" />
          <div className="skeleton h-24 w-full rounded-3xl" />
        </div>
      ))}
      {/* buttons */}
      <div className="flex justify-end gap-2 mt-2">
        <div className="skeleton h-10 w-32 rounded-md" />
        <div className="skeleton h-10 w-20 rounded-md" />
      </div>
    </div>
  </div>
);

const Profile = () => {
  const [data, setData] = useState({});
  const [initial, setInitial] = useState({});
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [drafts, setDrafts] = useState({
    skillToLearn: EMPTY_DRAFT,
    skillToTeach: EMPTY_DRAFT,
  });
  const [showPassword, setShowPassword] = useState(false);

  // load the logged-in user's profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/get", {
          withCredentials: true,
        });
        setData(res.data.data);
        setInitial(res.data.data);
      } catch (err) {
        setErrors(parseServerError(err));
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // typing in a field also clears that field's old error
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSuccess("");
  };

  // field is "skillToLearn" or "skillToTeach"
  const updateDraft = (field, patch) =>
    setDrafts((prev) => ({ ...prev, [field]: { ...prev[field], ...patch } }));

  const addSkill = (field) => {
    const draft = drafts[field];
    const title = draft.title.trim().toLowerCase();
    const list = data[field] ?? [];

    if (!title || !draft.level)
      return setErrors({ [field]: "Enter a skill and pick a level" });
    if (list.some((s) => s.title === title))
      return setErrors({ [field]: "Already added" });

    setData((prev) => ({
      ...prev,
      [field]: [...list, { title, level: draft.level }],
    }));
    setDrafts((prev) => ({ ...prev, [field]: EMPTY_DRAFT }));
    setErrors({});
    setSuccess("");
  };

  const removeSkill = (field, index) => {
    setData((prev) => ({
      ...prev,
      [field]: (prev[field] ?? []).filter((_, i) => i !== index),
    }));
  };

  const restoreDefault = () => {
    setData(initial);
    setErrors({});
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    // 1. validate in the browser first (same Zod rules as the server)
    const result = profileSchema.safeParse({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      age: data.age === "" || data.age == null ? undefined : Number(data.age),
      skillToLearn: data.skillToLearn ?? [],
      skillToTeach: data.skillToTeach ?? [],
    });

    const found = {};

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (!found[field]) found[field] = issue.message;
      }
    }

    // password is optional here: blank means "keep my current one"
    if (data.password) {
      const pw = userSchema.shape.password.safeParse(data.password);
      if (!pw.success) found.password = pw.error.issues[0].message;
    }

    if (Object.keys(found).length) return setErrors(found);

    setErrors({});
    setSaving(true);

    try {
      const payload = {
        ...result.data,
        ...(data.password ? { password: data.password } : {}),
      };

      const res = await axios.patch(
        "http://localhost:5000/api/user/update",
        payload,
        { withCredentials: true },
      );
      setData(res.data.data); // server doesn't send the password back, so the box empties
      setInitial(res.data.data);
      setShowPassword(false);
      setSuccess("Profile updated");
    } catch (err) {
      setErrors(parseServerError(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ProfileSkeleton />;
  return (
    <div className="mb-14">
      <ProfilePicture />

      {/* noValidate: Zod messages show instead of the browser's pop-ups */}
      <form onSubmit={handleSubmit} noValidate>
        <fieldset className="fieldset bg-transparent rounded-xl border-base-200 w-xs border p-4 m-auto mt-4">
          <legend className="fieldset-legend ml-4 text-xl">
            Update Profile
          </legend>

          <Field label="First Name" id="firstName" error={errors.firstName}>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="John"
              value={data.firstName ?? ""}
              onChange={handleChange}
              className={inputClass(errors.firstName)}
            />
          </Field>

          <Field label="Last Name" id="lastName" error={errors.lastName}>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Doe"
              value={data.lastName ?? ""}
              onChange={handleChange}
              className={inputClass(errors.lastName)}
            />
          </Field>

          <Field label="Email" id="email" error={errors.email}>
            <label className={inputClass(errors.email)}>
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
                placeholder="mail@site.com"
                value={data.email ?? ""}
                onChange={handleChange}
              />
            </label>
          </Field>

          <Field label="Age" id="age" error={errors.age}>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Age"
              value={data.age ?? ""}
              onChange={handleChange}
              className={inputClass(errors.age)}
            />
          </Field>
          <Field label="New Password" id="password" error={errors.password}>
            <label className={inputClass(errors.password)}>
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
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Leave blank to keep current"
                autoComplete="new-password"
                value={data.password ?? ""}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </label>
          </Field>
          <SkillsBox
            id="skillsTeach"
            label="Skills to Teach"
            levels={["intermediate", "expert"]}
            skills={data.skillToTeach ?? []}
            draft={drafts.skillToTeach}
            error={errors.skillToTeach}
            onDraftChange={(patch) => updateDraft("skillToTeach", patch)}
            onAdd={() => addSkill("skillToTeach")}
            onRemove={(i) => removeSkill("skillToTeach", i)}
          />

          <SkillsBox
            id="skillsLearn"
            label="Skills to Learn"
            levels={["beginner", "intermediate", "expert"]}
            skills={data.skillToLearn ?? []}
            draft={drafts.skillToLearn}
            error={errors.skillToLearn}
            onDraftChange={(patch) => updateDraft("skillToLearn", patch)}
            onAdd={() => addSkill("skillToLearn")}
            onRemove={(i) => removeSkill("skillToLearn", i)}
          />

          {/* general (server / network) message and success message */}
          {errors.form && (
            <div
              role="alert"
              className="alert alert-error alert-soft rounded-xl mt-4"
            >
              <span>{errors.form}</span>
            </div>
          )}
          {success && (
            <div
              role="alert"
              className="alert alert-success alert-soft rounded-xl mt-4"
            >
              <span>{success}</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary hover:brightness-110 mt-4 mr-2 rounded-md border-0"
            >
              {saving ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Update Profile"
              )}
            </button>
            <button
              type="button"
              onClick={restoreDefault}
              className="btn btn-primary hover:brightness-110 mt-4 mr-2 rounded-md border-0"
            >
              Default
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Profile;
