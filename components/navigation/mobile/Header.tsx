import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  return (
    <header className="w-full sticky top-0 z-30 flex bg-page justify-between px-12 py-4 items-center text-slate-100">
      <Link href="/app/dashboard">LOGO</Link>
      {/* <Link
        href="/app/account"
        className="hover:text-lime-500 transition-colors"
      >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JR</AvatarFallback>
        </Avatar>
      </Link> */}
    </header>
  );
};

export default Header;
