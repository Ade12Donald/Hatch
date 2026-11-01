const HomeCard = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(385px,1fr))] justify-center gap-2">
      <div className="card bg-base-300  shadow-sm mx-auto w-96">
        <div className="card-body">
          <h2 className="card-title">CONNECT</h2>
          <p className="leading-5.5">
            <span className="font-extrabold">Connect</span> with people who
            share your interests and goals. Find learning partners whose skills
            complement yours, send connection requests, and build meaningful
            relationships through mutual learning.
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-neutral rounded-xl">MORE INFO</button>
          </div>
        </div>
      </div>
      <div className="card shadow-sm bg-base-300 mx-auto w-96">
        <div className="card-body">
          <h2 className="card-title ">LEARN</h2>
          <p className="leading-5.5">
            <span className="font-extrabold">Learn </span> practical skills
            directly from other people. Whether it's programming, design,
            communication, or another skill, Hatch helps you exchange knowledge
            and learn through shared experience.
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-neutral rounded-xl">MORE INFO</button>
          </div>
        </div>
      </div>
      <div className="card w-96 bg-base-300  shadow-sm mx-auto">
        <div className="card-body">
          <h2 className="card-title ">GROW</h2>
          <p className="leading-5.5">
            Develop yourself personally and professionally by continuously
            learning, practising, and sharing what you know. Every skill you
            exchange is an opportunity to improve your abilities and become more
            confident.
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-neutral rounded-xl">MORE INFO</button>
          </div>
        </div>
      </div>
      <div className="card w-96 shadow-sm bg-base-300  mx-auto">
        <div className="card-body">
          <h2 className="card-title ">COLLABORATE</h2>
          <p className="leading-5.5">
            Work together with your learning partners, exchange ideas, solve
            problems, and support each other's progress. Hatch makes learning
            more interactive by encouraging people to learn with one another
            rather than alone.
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-neutral rounded-xl">MORE INFO</button>
          </div>
        </div>
      </div>
      <div className="card w-96 bg-base-300  shadow-sm mx-auto">
        <div className="card-body">
          <h2 className="card-title ">EXCHANGE</h2>
          <p className="leading-5.5">
            Turn the skills you already have into opportunities to learn
            something new. Teach what you know, learn what you don't, and create
            a community where everyone has something valuable to offer.
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-neutral rounded-xl">MORE INFO</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
