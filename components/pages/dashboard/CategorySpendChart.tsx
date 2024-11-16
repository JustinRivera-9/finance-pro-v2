"use client";
import { Label, Pie, PieChart } from "recharts";
import { DollarSign } from "lucide-react";

import { CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";
import { ChartData } from "./CategoryCarousel";
import { Expense } from "@/types/types";
import { useState } from "react";
import ExpenseDrawer from "./ExpenseDrawer";
import ReadOnlyExpenseRow from "./ReadOnlyExpenseRow";

type CategorySpendChartProps = {
  category: ChartData;
  expenses: {
    month: string;
    category: string;
    expenses: Expense[] | undefined;
    budget: number;
  }[];
};

type NoExpenseMessageProps = {
  category: string;
  plannedAmount: number;
};

export type SelectedCategory =
  | {
      month: string;
      category: string;
      expenses: Expense[] | undefined;
      budget: number;
    }
  | null
  | undefined;

export const description = "A chart showing category expenses";

// Fallback for categories with no expenses
const NoExpenseMessage = ({
  category,
  plannedAmount,
}: NoExpenseMessageProps) => (
  <div className="flex items-center justify-center py-[22px]">
    <div className="pt-4 relative flex flex-col items-center justify-center w-[130px] h-[130px] rounded-full border-8 border-light/50">
      <p className=" text-light text-md font-semibold text-center truncate w-24">
        {category}
      </p>
      <p className=" text-light/70 text-wrap font-bold text-center text-xs">
        {formatCurrency(plannedAmount)}
      </p>
    </div>
  </div>
);

const chartConfig = {
  spent: {
    label: "Spent",
    icon: DollarSign,
  },
} satisfies ChartConfig;

export function CategorySpendChart({
  expenses,
  category,
}: CategorySpendChartProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory>(null);
  const [showExpenses, setShowExpenses] = useState<boolean>(false);

  const data = [{ ...category }];
  const budgetDifference = data[0].plannedAmount - data[0].spentAmount;

  const setCategory = () => {
    const findCatgeory = expenses.find(
      (item) => item.category === category.category
    );

    setSelectedCategory(findCatgeory);
    setShowExpenses(true);
  };

  return (
    <>
      {/* If category has no expenses message will be shown */}
      {!data[0].angle ? (
        <NoExpenseMessage
          category={data[0].category}
          plannedAmount={data[0].plannedAmount}
        />
      ) : (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
          onClick={setCategory}
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name) => (
                    <div className="flex min-w-[130px] items-center text-sm text-dark">
                      <div className="flex items-center gap-2">
                        <DollarSign height={20} />
                        Spent
                      </div>
                      <div className="ml-auto flex gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {formatCurrency(+value)}
                      </div>
                    </div>
                  )}
                />
              }
              cursor={false}
              defaultIndex={1}
            />
            <Pie
              startAngle={90}
              endAngle={data[0].angle + 90}
              data={data}
              dataKey="spentAmount"
              nameKey="category"
              innerRadius={55}
              cornerRadius={10}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-light text-lg font-semibold"
                        >
                          {data[0].category}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-light/70 text-wrap font-bold"
                        >
                          {formatCurrency(data[0].plannedAmount, true)}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      )}
      <CardFooter className="flex justify-center text-md">
        <p className="font-medium leading-none text-secondary text-lg">
          {budgetDifference >= 0
            ? `${formatCurrency(budgetDifference, true)} left`
            : `${formatCurrency(Math.abs(budgetDifference))} over`}
        </p>
      </CardFooter>
      {showExpenses && (
        <ExpenseDrawer
          drawerOpen={showExpenses}
          setDrawerOpen={setShowExpenses}
          expenses={selectedCategory}
          plannedAmount={data[0].plannedAmount}
        >
          {selectedCategory?.expenses!.map((item) => (
            <ReadOnlyExpenseRow expense={item} key={item.id} drawer />
          ))}
        </ExpenseDrawer>
      )}
    </>
  );
}
