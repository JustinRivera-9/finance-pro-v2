import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { ReactNode, useState } from "react";
import { formatCurrency, reduceArr } from "@/lib/utils";
import { Expense } from "@/types/types";

type ExpenseDrawerProps = {
  expenses: Expense[] | undefined;
  drawerOpen: boolean;
  setDrawerOpen: (boolean: boolean) => void;
  children: ReactNode;
  plannedAmount: number;
  category: string;
};

const ExpenseDrawer = ({
  expenses,
  drawerOpen,
  setDrawerOpen,
  children,
  plannedAmount,
  category,
}: ExpenseDrawerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(drawerOpen);

  const handleClick = () => {
    setIsOpen(false);
    setDrawerOpen(false);
  };

  const totalSpent = formatCurrency(reduceArr(expenses));
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
              <p className="text-2xl text-accent">{category}</p>
              <div className="flex flex-col item">
                <p className="text-lg text-light/50">Budget</p>
                <p className="text-2xl">{formatCurrency(plannedAmount)}</p>
              </div>
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          {children}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ExpenseDrawer;
