"use client";

import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { pieChartColorArr } from "@/lib/constants";
import { PieChartCategory } from "./CategoryCarousel";
import {
  capitalize,
  filterExpensesByMonthAndYear,
  formatCurrency,
  reduceArr,
  sortBudgetOverview,
} from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { PostgrestError } from "@supabase/supabase-js";
import { Expense } from "@/types/types";

export const description = "A pie chart showing all category expenses";

type BudgetOverviewProps = {
  expenses: Expense[];
  categories: any[] | PostgrestError;
};

const noExpensesMessage = (
  <p className="mx-auto w-10/12 py-4 text-lg text-center">
    Add expenses to see your budget overview!
  </p>
);

const chartConfig = {
  spent: {
    label: "Category",
  },
} satisfies ChartConfig;

const BudgetOverview = ({ expenses, categories }: BudgetOverviewProps) => {
  // Used for highlighting selected pie chart item
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Gets month and year from search parrams for filtering
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  // filter by current month and year
  const budgetOverviewData = filterExpensesByMonthAndYear(
    expenses,
    // @ts-ignore
    categories,
    month,
    year
  );

  // Assigns the correct properties for the chart
  const rawData = budgetOverviewData.map((item, i) => {
    return {
      category: item.category,
      amount: item.spentAmount,
      fill: pieChartColorArr[i],
    };
  });

  // Sorts chart data by amount
  const chartData = sortBudgetOverview(rawData);

  const getActiveIndex = (e: any) => {
    const activeIndex = chartData.findIndex(
      (item) => item.category === e.category
    );

    setActiveIndex(activeIndex);
  };

  const spentTotal = reduceArr(chartData);

  return (
    <div className="flex-1 pb-0 pt-4 w-10/12 h-fit">
      {!spentTotal ? (
        noExpensesMessage
      ) : (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[275px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
              cornerRadius={5}
              onClick={getActiveIndex}
              paddingAngle={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 20} />
              )}
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
                          className="fill-accent text-2xl font-bold"
                        >
                          {formatCurrency(spentTotal, true)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-light text-lg italic capitalize"
                        >
                          {capitalize(month as string)}
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
    </div>
  );
};

export default BudgetOverview;
