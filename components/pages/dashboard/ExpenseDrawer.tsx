import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { SelectedCategory } from "./CategorySpendChart";
import { Separator } from "@/components/ui/separator";
import { ReactNode, useState } from "react";
import { formatCurrency, reduceArr } from "@/lib/utils";

type ExpenseDrawerProps = {
  expenses: SelectedCategory;
  drawerOpen: boolean;
  setDrawerOpen: (boolean: boolean) => void;
  children: ReactNode;
  plannedAmount: number;
};

const ExpenseDrawer = ({
  expenses,
  drawerOpen,
  setDrawerOpen,
  children,
  plannedAmount,
}: ExpenseDrawerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(drawerOpen);
  const handleClick = () => {
    setIsOpen(false);
    setDrawerOpen(false);
  };

  const totalSpent = formatCurrency(reduceArr(expenses?.expenses!));
  return (
    <div onClick={handleClick}>
      <Drawer open={isOpen}>
        <DrawerContent className="border-dark pt-2 pb-6">
          <DrawerHeader className="text-light mx-auto">
            <DrawerTitle className="flex gap-10 justify-between items-center font-semibold text-center">
              <div className="flex flex-col">
                <p className="text-lg text-light/50">Spent</p>
                <p className="text-2xl">{totalSpent}</p>
              </div>
              <p className="text-2xl text-accent">{expenses?.category}</p>
              <div className="flex flex-col item">
                <p className="text-lg text-light/50">Budget</p>
                <p className="text-2xl">{formatCurrency(plannedAmount)}</p>
              </div>
            </DrawerTitle>
          </DrawerHeader>
          {children}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ExpenseDrawer;
