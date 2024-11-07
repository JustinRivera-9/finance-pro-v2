"use client";

import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import { CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import SectionTitle from "./SectionTitle";
import { pieChartColorArr } from "@/lib/constants";

export const description = "A donut chart with an active sector";

const chartConfig = {
  spent: {
    label: "category",
  },
} satisfies ChartConfig;

export const OverviewChart = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const dirtyData = [
    { category: "Misc", spent: 243 },
    { category: "Eating Out", spent: 476 },
    { category: "Groceries", spent: 146 },
    { category: "Zoe", spent: 52 },
    { category: "Date Night", spent: 209 },
    { category: "Auto", spent: 214 },
    { category: "Beer", spent: 864 },
    { category: "Testing", spent: 567 },
  ];

  const chartData = dirtyData.map((category, i) => {
    return { ...category, fill: pieChartColorArr[i] };
  });

  const getActiveIndex = (e: any) => {
    const activeIndex = chartData.findIndex(
      (item) => item.category === e.category
    );

    setActiveIndex(activeIndex);
  };

  return (
    <div className="flex-1 pb-0 pt-4 bg-card rounded-xl">
      <SectionTitle>Budget Overview</SectionTitle>

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
            dataKey="spent"
            nameKey="category"
            innerRadius={60}
            strokeWidth={5}
            onClick={getActiveIndex}
            paddingAngle={5}
            activeIndex={activeIndex}
            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
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
                        $3,498
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-light text-md"
                      >
                        Nov
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none text-light/80">
          {`Trending up by $230 (5.2%) this month`}
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </div>
  );
};
