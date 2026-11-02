import { useEffect, useState } from "react";
import Image from "./Image.jsx";

// placeholder data, swap for your friends list from the API later
const friends = [
  {
    id: 1,
    firstName: "Ada",
    lastName: "Obi",
    photo: null,
    story: "Teaching React basics this week. Ask me anything!",
  },
  {
    id: 2,
    firstName: "Tunde",
    lastName: "Bello",
    photo: null,
    story: "Looking for someone to swap Blender tips for JavaScript help.",
  },
  {
    id: 3,
    firstName: "Mira",
    lastName: "Khan",
    photo: null,
    story: "Just hatched my first Unity game jam project.",
  },
];

const ring = (seen) =>
  `ring-2 ring-offset-2 ring-offset-base-100 ${
    seen ? "ring-base-300" : "ring-primary"
  }`;

const Story = () => {
  const [active, setActive] = useState(null); // index of the open story, or null
  const [seen, setSeen] = useState(new Set()); // ids already opened

  const open = (index) => {
    setActive(index);
    setSeen((prev) => new Set(prev).add(friends[index].id));
  };
  const close = () => setActive(null);
  const next = () => (active + 1 < friends.length ? open(active + 1) : close());
  const prev = () => active > 0 && open(active - 1);

  // Escape closes the viewer
  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const current = active !== null ? friends[active] : null;

  return (
    <section className="card w-96 max-w-full m-3.5 bg-base-100 card-sm border border-base-300 rounded-2xl shadow-sm">
      <div className="card-body">
        <h2 className="font-bold text-lg tracking-wide">Friends</h2>

        {/* the row of circles */}
        <div className="flex gap-4 overflow-x-auto p-2">
          {friends.map((f, i) => (
            <button
              key={f.id}
              type="button"
              onClick={() => open(i)}
              aria-label={`View ${f.firstName}'s story`}
              className="shrink-0 flex flex-col items-center gap-2 cursor-pointer"
            >
              <Image
                photo={f.photo}
                firstName={f.firstName}
                lastName={f.lastName}
                size="w-14"
                settings={false}
                className={ring(seen.has(f.id))}
              />
              <span className="text-xs w-16 truncate text-center">
                {f.firstName}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* the viewer */}
      {current && (
        <div role="dialog" aria-modal="true" className="modal modal-open">
          <div className="modal-box max-w-sm text-center">
            <button
              type="button"
              onClick={close}
              aria-label="Close story"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>

            {/* progress dots */}
            <div className="flex justify-center gap-1 mb-4">
              {friends.map((f, i) => (
                <span
                  key={f.id}
                  className={`h-1 w-6 rounded-full ${
                    i <= active ? "bg-primary" : "bg-base-300"
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-center mb-3">
              <Image
                photo={current.photo}
                firstName={current.firstName}
                lastName={current.lastName}
                size="w-24"
                textSize="text-2xl"
                settings={false}
              />
            </div>
            <h3 className="font-bold text-lg">
              {current.firstName} {current.lastName}
            </h3>
            <p className="mt-2 opacity-80">{current.story}</p>

            <div className="modal-action justify-between">
              <button
                type="button"
                className="btn btn-sm"
                onClick={prev}
                disabled={active === 0}
              >
                Prev
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={next}
              >
                {active === friends.length - 1 ? "Done" : "Next"}
              </button>
            </div>
          </div>

          {/* clicking outside closes it */}
          <div className="modal-backdrop" onClick={close} />
        </div>
      )}
    </section>
  );
};

export default Story;
