import "./dashboard.css";
import Story from "../components/Story.jsx";
import Group from "../components/Group.jsx";
import Stats from "../components/Stats.jsx";

const Dashboard = () => {
  return (
    <div className=" overflow-y-auto no-vertical-scrollbar">
      <Story />
      <Group />
      <Stats />
    </div>
  );
};

export default Dashboard;
