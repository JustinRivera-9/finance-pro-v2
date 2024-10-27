"use client";

import FormDrawer from "@/components/ui/FormDrawer";
import React from "react";
import ExpenseForm from "./ExpenseForm";
import { Expense } from "@/types/types";

type EditComponentProps = {
  expenseData: Expense;
};

const EditComponent = ({ expenseData }: EditComponentProps) => {
  return (
    <FormDrawer title={`Edit Expense`} color="light" open>
      <ExpenseForm expenseData={expenseData} />
    </FormDrawer>
  );
};

export default EditComponent;
