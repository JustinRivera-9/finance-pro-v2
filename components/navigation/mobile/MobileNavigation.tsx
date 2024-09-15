import Link from "next/link";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PaidIcon from "@mui/icons-material/Paid";

const MobileNavigation = () => {
  return (
    <ul className="fixed bottom-0 left-0 right-0 flex justify-between mt-6 px-8 py-4 bg-[#313233] border-t-2 border-slate-500">
      <Link
        href="/dashboard"
        className="hover:text-secondary transition-colors"
      >
        <SpaceDashboardIcon fontSize="large" />
      </Link>
      <Link href="/planned" className="hover:text-secondary transition-colors">
        <AppRegistrationIcon fontSize="large" />
      </Link>
      <Link href="/spent" className="hover:text-secondary transition-colors">
        <PaidIcon fontSize="large" />
      </Link>
    </ul>
  );
};
export default MobileNavigation;
