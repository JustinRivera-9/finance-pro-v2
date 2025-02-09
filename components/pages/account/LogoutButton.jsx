"use client";

import { logoutUser } from "@/app/app/settings/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/"); // Redirect to the landing page
  };

  return (
    <Button
      variant="outline"
      className="flex gap-2 mx-auto px-4 py-2 rounded-lg text-secondary border-secondary"
      onClick={handleLogout}
    >
      <LogoutIcon />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;
