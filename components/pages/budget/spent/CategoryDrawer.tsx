import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { type ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

type CategoryDrawerProps = {
  children: ReactNode;
  triggerLabel: string | ReactNode;
  totalSpent: number;
  plannedAmount: number;
  category: string;
};

const CategoryDrawer = ({
  children,
  category,
  totalSpent,
  plannedAmount,
  triggerLabel,
}: CategoryDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger className="" asChild>
        {triggerLabel}
      </DrawerTrigger>
      <DrawerContent className="border-dark pt-2 pb-6 h-[65%] z-50">
        <DrawerHeader className="text-light mx-auto w-full">
          <DrawerTitle className="flex justify-around items-center font-semibold text-center">
            <div className="flex flex-col">
              <p className="text-lg text-light/50">Spent</p>
              <p className="text-2xl">{formatCurrency(totalSpent)}</p>
            </div>
            <p className="text-2xl text-accent">{category}</p>
            <div className="flex flex-col item">
              <p className="text-lg text-light/50">Budget</p>
              <p className="text-2xl">{formatCurrency(plannedAmount)}</p>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="w-full mb-2">{children}</ScrollArea>
        <Button className="w-1/2 mx-auto mt-3">Add Expense</Button>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryDrawer;
