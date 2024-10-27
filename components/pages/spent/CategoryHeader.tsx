import { formatCurrency } from "@/lib/utils";
import React from "react";

const CategoryHeader = ({
  category,
  budget,
}: {
  category: string;
  budget: number;
}) => {
  return (
    <div className="flex justify-between w-full items-center">
      <h1 className="text-xl">{category}</h1>
      <p className="text-md text-secondary">{formatCurrency(budget, true)}</p>
    </div>
  );
};

export default CategoryHeader;
