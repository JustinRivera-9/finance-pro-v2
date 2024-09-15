import Link from "next/link";

const DesktopNavigation = () => {
  return (
    <ul className="flex gap-20">
      <Link href="/dashboard" className="hover:text-lime-500 transition-colors">
        Dashboard
      </Link>
      <Link href="/planned" className="hover:text-lime-500 transition-colors">
        Planned
      </Link>
      <Link href="/spent" className="hover:text-lime-500 transition-colors">
        Spent
      </Link>
      <Link href="/account" className="hover:text-lime-500 transition-colors">
        Account
      </Link>
    </ul>
  );
};

export default DesktopNavigation;
