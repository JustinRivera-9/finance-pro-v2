"use client";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";
import { ChartData } from "./CategoryCarousel";

export const description = "A chart showing category expenses";

type CategorySpendChartProps = {
  category: ChartData;
};

const chartConfig = {
  spent: {
    label: "Spent",
  },
} satisfies ChartConfig;

export function CategorySpendChart({ category }: CategorySpendChartProps) {
  const data = [{ ...category }];
  const budgetDifference = data[0].plannedAmount - data[0].spentAmount;

  return (
    <>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[200px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            startAngle={90}
            endAngle={data[0].angle + 90}
            data={data}
            dataKey="spentAmount"
            nameKey="category"
            innerRadius={55}
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
      <CardFooter className="flex justify-center text-md">
        <p className="font-medium leading-none text-secondary text-lg">
          {budgetDifference >= 0
            ? `${formatCurrency(budgetDifference, true)} left`
            : `$${Math.abs(budgetDifference)} over`}
        </p>
      </CardFooter>
    </>
  );
}
