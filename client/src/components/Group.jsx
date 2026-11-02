import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { NavLink } from "react-router";

const emptyForm = { name: "", members: "", bio: "" };

const Group = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Health Care", bio: "Stable Health care", members: [] },
    { id: 2, name: "Water Care", bio: "Stable Water care", members: [] },
    { id: 3, name: "Animal Care", bio: "Stable Animal care", members: [] },
  ]);
  const [form, setForm] = useState(emptyForm);
  const modalRef = useRef(null);

  const openModal = () => modalRef.current.showModal();
  const closeModal = () => {
    modalRef.current.close();
    setForm(emptyForm);
  };

  // One handler for all inputs: the input's `name` decides which field updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGroup = {
      id: Date.now(),
      name: form.name.trim(),
      bio: form.bio.trim() || "No bio yet",
      members: form.members
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean),
    };

    setProjects((prev) => [...prev, newGroup]);
    closeModal();
  };

  return (
    <>
      <section className="card w-screen max-w-full my-3.5 m-1 bg-base-100 card-sm border border-base-300 rounded-2xl shadow-sm">
        <div className="card-body">
          <div className="flex flex-row justify-between">
            <h2 className="card-title font-bold text-lg tracking-wide">
              Groups
            </h2>
            <button
              className="p-1 rounded-full transition active:scale-110 hover:bg-base-300 hover:ring-2 hover:ring-primary/40 focus-visible:ring-2 focus-visible:ring-primary"
              onClick={openModal}
              aria-label="Add group"
            >
              <Plus />
            </button>
          </div>

          <div>
            {projects.map((value) => (
              <NavLink
                key={value.id}
                to={`/groups/${value.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border-2 mb-2 p-4 px-6 rounded-4xl flex transition hover:ring-2 hover:ring-primary/40"
              >
                <div className="flex-1 flex flex-col min-w-0">
                  <p className="text-2xl font-bold truncate">{value.name}</p>
                  <p className="text-sm opacity-70 truncate">{value.bio}</p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          {/* method="dialog" lets this form close the modal with no JS */}
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setForm(emptyForm)}
            >
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg mb-5">Create Group</h3>

          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4 flex flex-col">
              <label className="label" htmlFor="groupName">
                Group Name:
              </label>
              <input
                type="text"
                className="input rounded-xl w-full"
                placeholder="Group 1"
                name="name"
                id="groupName"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label className="label" htmlFor="membersName">
                Members (comma separated):
              </label>
              <input
                type="text"
                className="input rounded-xl w-full"
                placeholder="me, Tola, Chidi"
                name="members"
                id="membersName"
                value={form.members}
                onChange={handleChange}
              />
              <p className="label text-warning whitespace-normal">
                Note: you can only add people who are already your friends.
              </p>

              <label className="label" htmlFor="groupBio">
                Bio
              </label>
              <textarea
                className="textarea h-24 w-full"
                placeholder="Bio"
                name="bio"
                id="groupBio"
                value={form.bio}
                onChange={handleChange}
              ></textarea>
              <div className="label">Optional</div>
            </fieldset>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>

        {/* Click outside the box to close */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setForm(emptyForm)}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Group;
