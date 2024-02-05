import React from "react";
import TopNavbar from "./TopNavbar";
import SideNavbar from "./SideNavbar";

const Navbar = () => {
  return (
    <div>
      {/* Mobile Navbar hidden on desktop  */}
      <div className=" lg:hidden">
        <TopNavbar />
      </div>

      {/* Sidebar hidden on mobile  */}
      <nav class=" w-72 flex-none ... hidden md:block">
        <SideNavbar />
      </nav>
    </div>
  );
};

export default Navbar;
