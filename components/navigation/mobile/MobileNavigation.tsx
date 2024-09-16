"use client";
import Link from "next/link";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PaidIcon from "@mui/icons-material/Paid";
import { usePathname } from "next/navigation";

const MobileNavigation = () => {
  const path = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 mt-6 py-4 bg-[#313233] border-t-2 border-slate-500">
      <ul className="flex justify-around">
        <li>
          <Link
            href="/dashboard"
            className={path.startsWith("/dashboard") ? "text-accent" : ""}
          >
            <SpaceDashboardIcon fontSize="large" />
          </Link>
        </li>
        <li>
          <Link
            href="/planned"
            className={path.startsWith("/planned") ? "text-accent" : ""}
          >
            <AppRegistrationIcon fontSize="large" />
          </Link>
        </li>
        <li>
          <Link
            href="/spent"
            className={path.startsWith("/spent") ? "text-accent" : ""}
          >
            <PaidIcon fontSize="large" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default MobileNavigation;
