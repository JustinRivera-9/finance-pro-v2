"use client";

import { logoutUser } from "@/app/app/account/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/"); // Redirect to the landing page
  };

  return (
    <Button
      variant="outline"
      className="mx-auto px-4 py-2 rounded-lg text-secondary border-secondary"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
