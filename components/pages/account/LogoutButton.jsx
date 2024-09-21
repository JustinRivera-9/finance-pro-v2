// components/LogoutButton.tsx
"use client"; // Ensure this is at the top to mark it as a client component

import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/supabase/utils";
import { useRouter } from "next/navigation"; // Import useRouter

const LogoutButton = () => {
  const router = useRouter(); // Initialize the router

  const handleLogout = async () => {
    await logoutUser(); // Perform the logout
    router.push("/auth/login"); // Redirect to the login page
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
