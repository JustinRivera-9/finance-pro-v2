"use client";
import Link from "next/link";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PaidIcon from "@mui/icons-material/Paid";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ShowChartSharpIcon from "@mui/icons-material/ShowChartSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { usePathname } from "next/navigation";

const MobileNavigation = () => {
  const path = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 mt-6 py-4 bg-[#313233] border-t-2 border-slate-500">
      <ul className="flex justify-around">
        {/* <li>
          <Link
            href="/app/dashboard"
            className={path === "/app/dashboard" ? "text-accent" : ""}
          >
            <SpaceDashboardIcon fontSize="large" />
          </Link>
        </li> */}
        <li>
          <Link
            key="budget"
            href={`/app/budget`}
            className={path.startsWith("/app/budget") ? "text-accent" : ""}
          >
            <PaidIcon fontSize="large" />
          </Link>
        </li>
        <li>
          <Link
            key="investing"
            href="/app/investing"
            className={path.startsWith("/app/investing") ? "text-accent" : ""}
          >
            <ShowChartSharpIcon fontSize="large" />
          </Link>
        </li>
        <li>
          <Link
            key="connected-accounts"
            href="/app/connected-accounts"
            className={
              path.startsWith("/app/connected-accounts") ? "text-accent" : ""
            }
          >
            <AccountBalanceIcon fontSize="large" />
          </Link>
        </li>
        <li>
          <Link
            key="account"
            href="/app/account"
            className={path.startsWith("/app/settings") ? "text-accent" : ""}
          >
            <AccountCircleSharpIcon fontSize="large" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default MobileNavigation;
