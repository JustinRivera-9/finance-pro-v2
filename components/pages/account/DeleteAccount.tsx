"use client";
import { Button } from "@/components/ui/button";
import DrawerCard from "@/components/ui/DrawerCard";
import { useUser } from "@/context/UserContext";

const DeleteAccount = () => {
  const user = useUser();

  return (
    <DrawerCard
      title="This action cannot be undone"
      description="User information including budget categories, expense transactions and account information will be deleted and cannot be recovered."
      triggerLabel={<p className="text-error">Delete Account</p>}
    >
      <Button className="bg-error w-fit mx-auto hover:bg-error/70">
        Yes, delete my account
      </Button>
    </DrawerCard>
  );
};

export default DeleteAccount;
