import FormDrawer from "@/components/ui/FormDrawer";
import React from "react";
import UpgradeAccountContent from "./UpgradeAccountContent";
import AccountOption from "../AccountOption";

const UpgradeAccount = () => {
  return (
    <FormDrawer
      title="Why upgrade to Pro?"
      description="Upgrade today to start tracking your budget effortlessly!"
      triggerLabel={
        <AccountOption style="text-accent">Upgrade to Pro</AccountOption>
      }
    >
      <UpgradeAccountContent />
    </FormDrawer>
  );
};

export default UpgradeAccount;
