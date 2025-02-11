"use client";
import { Label, Pie, PieChart } from "recharts";
import { DollarSign } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { formatCurrency, sortExpenses } from "@/lib/utils";
import { ChartData } from "./CategoryCarousel";
import { Expense } from "@/types/types";
import CategoryDrawer from "./CategoryDrawer";

type CategorySpendChartProps = {
  category: ChartData;
  expenses: Expense[] | undefined;
};

type NoExpenseMessageProps = {
  category: string;
  plannedAmount: number;
};

export type SelectedCategory =
  | {
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
  <CategoryDrawer
    category={category}
    plannedAmount={plannedAmount}
    totalSpent={0}
    triggerLabel={
      <div className="flex items-center justify-center py-[17px]">
        <div className="pt-3 relative flex flex-col gap-2 items-center justify-center w-[115px] h-[115px] rounded-full border-[6px] border-light/50">
          <p className=" text-light text-sm font-semibold text-center truncate w-20">
            {category}
          </p>
          <p className=" text-light/70 text-wrap font-bold text-center text-xs">
            {formatCurrency(plannedAmount)}
          </p>
        </div>
      </div>
    }
  />
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
  const { category: categoryName, budget, spentAmount, angle } = category;
  const budgetDifference = budget - spentAmount;

  // Sort expenses by date
  const sortedExpenses = sortExpenses(expenses);

  if (!category.angle) {
    return <NoExpenseMessage category={categoryName} plannedAmount={budget} />;
  }

  return (
    <>
      <CategoryDrawer
        category={categoryName}
        plannedAmount={budget}
        totalSpent={spentAmount}
        expenses={sortedExpenses}
        triggerLabel={
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[200px]"
          >
            <PieChart>
              <Pie
                startAngle={90}
                endAngle={angle + 90}
                data={[{ ...category }]}
                dataKey="spentAmount"
                nameKey="category"
                innerRadius={49}
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
                          dominantBaseline="top"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-light text-md font-semibold"
                          >
                            {categoryName}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-light/70 text-wrap font-bold"
                          >
                            {formatCurrency(spentAmount, true)}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        }
      />
      <CardFooter className="flex justify-center text-md">
        <p className="font-medium leading-none text-light/70 text-md">
          {budgetDifference >= 0
            ? `${formatCurrency(budgetDifference, true)} left`
            : `${formatCurrency(Math.abs(budgetDifference))} over`}
        </p>
      </CardFooter>
    </>
  );
}
