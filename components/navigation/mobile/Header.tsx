import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

///// TEMP DATA
const account = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@gmail.com",
  id: 1,
};

const Header = () => {
  return (
    <header className="w-full sticky top-0 z-30 flex bg-page justify-between px-12 py-4 items-center text-slate-100">
      <Link href="/#">LOGO</Link>
      <Link href="/account" className="hover:text-lime-500 transition-colors">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
    </header>
  );
};

export default Header;
