import { Suspense } from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar.jsx";
import Loader from "./Loader.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
