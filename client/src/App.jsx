import { lazy } from "react";
import { Routes, Route } from "react-router";
import Layout from "./components/layout.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const SignUp = lazy(() => import("./pages/signUp.jsx"));
const Customize = lazy(() => import("./pages/Customize.jsx"));
const LogIn = lazy(() => import("./pages/login.jsx"));
const Dashboard = lazy(() => import("./pages/dashboard.jsx"));
const Profile = lazy(() => import("./pages/profile.jsx"));

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
