import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  return (
    <Button
      variant="outline"
      className="mx-auto px-4 py-2 rounded-lg text-secondary border-secondary"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
