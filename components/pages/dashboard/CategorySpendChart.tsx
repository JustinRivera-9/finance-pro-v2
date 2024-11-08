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

export const description = "A chart showing category expenses";

type CategorySpendChartProps = {
  category: ChartData;
};

const chartConfig = {
  spent: {
    label: "Spent",
    icon: DollarSign,
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
          {/* <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel nameKey="spent" />}
          /> */}
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
                      {formatCurrency(+value, true)}
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
