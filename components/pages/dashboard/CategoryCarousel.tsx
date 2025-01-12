"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";
import { CategorySpendChart } from "./CategorySpendChart";
import {
  calcAngle,
  filterExpensesByMonthAndYear,
  getCurrentMonthAndYear,
  groupExpenseByCategory,
  sortCategoryOverview,
} from "@/lib/utils";
import { CategoryData, Expense } from "@/types/types";
import { useSearchParams } from "next/navigation";

type CategoryCarouselProps = {
  expenses: Expense[];
  categories: CategoryData[];
};

export type PieChartCategory = {
  category: string;
  plannedAmount: number;
  spentAmount: number;
  id: number;
};

export type ChartData = PieChartCategory & {
  angle: number;
  fill: string;
};

const emptyCategoryMessage = (
  <p className="text-lg text-center px-6 mx-auto py-2">
    Add categories to see charts for each category.
  </p>
);

const CategoryCarousel = ({ expenses, categories }: CategoryCarouselProps) => {
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  const filteredExpenses = filterExpensesByMonthAndYear(
    expenses,
    categories,
    month!,
    year!
  );

  const catgeoryExpenses = groupExpenseByCategory(expenses, categories);

  const rawData = filteredExpenses.map((item: PieChartCategory) => {
    const under = "rgb(132 204 22 / 0.5)";
    const warning = "rgb(251 189 35 / 0.5)";
    const over = "rgb(248 114 114 / 0.7)";

    // changes color of chart. 0-75% is green and 76-100% if yellow.
    const percentToBudget = item.spentAmount / item.plannedAmount;
    const fillColor =
      percentToBudget > 1 ? over : percentToBudget > 0.74 ? warning : under;

    const chartData: ChartData = {
      ...item,
      angle: calcAngle(item.plannedAmount, item.spentAmount),
      fill: fillColor,
    };

    return chartData;
  });

  const chartData = sortCategoryOverview(rawData);

  return (
    <SectionContainer>
      <SectionTitle>Spend by Category</SectionTitle>
      {!chartData.length ? (
        emptyCategoryMessage
      ) : (
        <Carousel
          opts={{
            dragFree: true,
          }}
          className="w-full max-w-sm overflow-hidden"
        >
          <CarouselContent className="-ml-1">
            {chartData.map((category) => (
              <CarouselItem key={category.id} className="basis-1/2">
                <CategorySpendChart
                  expenses={catgeoryExpenses}
                  category={category}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </SectionContainer>
  );
};

export default CategoryCarousel;
