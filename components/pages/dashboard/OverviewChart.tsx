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

export const description = "A donut chart with an active sector";

const randomColorArr = [
  "#458f02",
  "#9a02ef",
  "#8a9add",
  "#d3fe1d",
  "#663521",
  "#312073",
  "#c283ea",
  "#f16807",
  "#8ae703",
  "#46c1f1",
  "#748eef",
  "#19c898",
  "#f03dac",
  "#522db0",
  "#2d7ea2",
  "#837dad",
  "#fcd696",
  "#8d5d95",
  "#e6e3f0",
  "#520e4e",
  "#c224b1",
  "#ad4ec2",
  "#968947",
  "#25bc25",
  "#87a66a",
  "#d18ec2",
  "#b81c9f",
  "#733c42",
  "#842374",
  "#cd3497",
  "#42b449",
  "#488427",
  "#5ec2f8",
  "#4074d7",
  "#60a41d",
  "#e35525",
  "#1d064e",
];

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
    return { ...category, fill: randomColorArr[i] };
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
