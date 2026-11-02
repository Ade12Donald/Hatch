import { NavLink } from "react-router";

const Group = () => {
  const projects = [
    { id: 1, name: "Health Care", bio: "Stable Health care" },
    { id: 2, name: "Water Care", bio: "Stable Water care" },
    { id: 3, name: "Animal Care", bio: "Stable Animal care" },
  ];

  return (
    <section className="card w-screen max-w-full my-3.5 m-1 bg-base-100 card-sm border border-base-300 rounded-2xl shadow-sm">
      <div className="card-body">
        <h2 className="card-title font-bold text-lg tracking-wide">Groups</h2>
        <div>
          {projects.map((value) => (
            <NavLink
              key={value.id}
              to={`/groups/${value.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border-2 mb-2 p-4 px-6 rounded-4xl flex"
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
  );
};

export default Group;
