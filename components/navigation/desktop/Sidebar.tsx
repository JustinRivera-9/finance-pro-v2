import React from "react";
import Navigation from "./Navigation";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-full flex justify-between px-12 py-8 items-center text-slate-100 border-b-2 border-slate-500">
      <Link href="/#">LOGO</Link>
      <Navigation />
    </div>
  );
};

export default Sidebar;
