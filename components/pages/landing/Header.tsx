import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full sticky top-0 z-30 flex bg-page justify-between pl-8 pr-4 py-4 items-center text-slate-100">
      <div>LOGO</div>
      <div className="flex gap-2 items-center">
        <Link
          href="/auth/signup"
          className="text-light border border-light rounded-md py-2 px-3 text-xs font-semibold"
        >
          Signup
        </Link>
        <Link
          href="/auth/login"
          className="text-dark bg-accent rounded-md py-2 px-4 font-semibold text-xs"
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
