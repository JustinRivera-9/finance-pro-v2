"use client";
import Link from "next/link";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PaidIcon from "@mui/icons-material/Paid";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { usePathname } from "next/navigation";

const MobileNavigation = () => {
  const path = usePathname();

  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });

  return (
    <nav className="fixed bottom-0 left-0 right-0 mt-6 py-4 bg-[#313233] border-t-2 border-slate-500">
      <ul className="flex justify-around">
        <li>
          <Link
            href="/app/dashboard"
            className={path === "/app/dashboard" ? "text-accent" : ""}
          >
            <SpaceDashboardIcon fontSize="large" />
          </Link>
        </li>
        <li>
          <Link
            href="/app/planned"
            className={path.startsWith("/app/planned") ? "text-accent" : ""}
          >
            <AppRegistrationIcon fontSize="large" />
          </Link>
        </li>
        <li>
          <Link
            href={`/app/spent/${currentMonth}`}
            className={path.startsWith("/app/spent") ? "text-accent" : ""}
          >
            <PaidIcon fontSize="large" />
          </Link>
        </li>
        <li>
          <Link
            href="/app/connected-accounts"
            className={
              path.startsWith("/app/connected-accounts") ? "text-accent" : ""
            }
          >
            <AccountBalanceIcon fontSize="large" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default MobileNavigation;
