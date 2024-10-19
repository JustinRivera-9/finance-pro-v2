import FormDrawer from "@/components/ui/FormDrawer";
import React from "react";
import UpgradeAccountContent from "./UpgradeAccountContent";

const style = "px-6 py-2 font-bold bg-accent text-dark rounded-full";

const UpgradeAccount = () => {
  return (
    <section className="text-center">
      <FormDrawer
        title="Why upgrade to Pro?"
        description="Upgrade today to start tracking your budget effortlessly!"
        triggerLabel={<p className={style}>Upgrade to Pro</p>}
      >
        <UpgradeAccountContent />
      </FormDrawer>
    </section>
  );
};

export default UpgradeAccount;
