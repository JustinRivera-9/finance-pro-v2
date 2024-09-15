"use client";

import { PRO_PRICE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import PlanSection from "./PlanSection";

const basicPlan = [
  "Institution level security",
  "Manually add and manage your expenses",
  "Basic spending overviews",
];
const proPlan = [
  "Seamlessly connect your bank accounts",
  "Import transactions automatically",
  "Advanced charts and data analytics",
  "Priorty customer support",
  "Help drive future features!",
];

const UpgradeAccountContent = () => {
  return (
    <div className="flex flex-col gap-4 px-4">
      <PlanSection
        current
        title="Basic Plan"
        price="Free"
        content={basicPlan}
      />
      <PlanSection title="Pro Plan" price={PRO_PRICE} content={proPlan} />
      <Button className="w-fit px-6 py-2 mx-auto">Upgrade</Button>
    </div>
  );
};

export default UpgradeAccountContent;
