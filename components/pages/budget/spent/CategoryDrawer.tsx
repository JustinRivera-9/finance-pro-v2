import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState, type ReactNode } from "react";
import { formatCurrency } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ExpenseForm from "./ExpenseForm";
import { Expense } from "@/types/types";
import ExpenseRow from "./ExpenseRow";

type CategoryDrawerProps = {
  triggerLabel: string | ReactNode;
  totalSpent: number;
  plannedAmount: number;
  category: string;
  expenses: Expense[] | null;
};

const CategoryDrawer = ({
  category,
  totalSpent,
  plannedAmount,
  triggerLabel,
  expenses,
}: CategoryDrawerProps) => {
  // Add new expense state/handler
  const [showForm, setShowForm] = useState<boolean>(false);
  const handleNewExpense = () => setShowForm((prev) => !prev);

  // Edit expense state/handler
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);
  const handleEditExpense = (expense: Expense) => {
    setExpenseToEdit(expense);
    setShowForm((prev) => !prev);
  };

  console.log("showForm: ", showForm);
  console.log("expenseToEdit: ", expenseToEdit);

  // Expense form content
  if (showForm && !expenseToEdit) {
    return (
      <Drawer>
        <DrawerTrigger asChild>{triggerLabel}</DrawerTrigger>
        <DrawerContent className="border-dark pt-2 pb-6 h-[65%] z-50">
          <DrawerHeader className="text-light mx-auto w-full">
            <DrawerTitle className="flex justify-around items-center font-semibold text-center">
              <p className="text-2xl">Add {category} Expense</p>
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <ExpenseForm category={category} setShowForm={setShowForm} />
        </DrawerContent>
      </Drawer>
    );
  }

  // Edit expense form
  if (showForm && expenseToEdit) {
    return (
      <Drawer>
        <DrawerTrigger asChild>{triggerLabel}</DrawerTrigger>
        <DrawerContent className="border-dark pt-2 pb-6 h-[65%] z-50">
          <DrawerHeader className="text-light mx-auto w-full">
            <DrawerTitle className="flex justify-around items-center font-semibold text-center">
              <p className="text-2xl">Update {category} Expense</p>
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <ExpenseForm
            category={category}
            setShowForm={setShowForm}
            expenseData={expenseToEdit}
            setExpenseData={setExpenseToEdit}
          />
        </DrawerContent>
      </Drawer>
    );
  }

  // Category expenses view
  return (
    <Drawer>
      <DrawerTrigger asChild>{triggerLabel}</DrawerTrigger>
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
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="w-full mb-2">
          {expenses?.map((item) => (
            <ExpenseRow
              expense={item}
              key={item.id}
              setExpenseToEdit={handleEditExpense}
            />
          ))}
        </ScrollArea>
        <Button className="w-1/2 mx-auto mt-3" onClick={handleNewExpense}>
          New Expense
        </Button>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryDrawer;
