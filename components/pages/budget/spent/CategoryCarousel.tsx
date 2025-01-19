"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CategorySpendChart } from "./CategorySpendChart";
import {
  calcAngle,
  filterExpensesByMonthYear,
  groupExpenseByCategory,
  reduceArr,
  sortCategoryOverview,
} from "@/lib/utils";
import { CategoryData, Expense } from "@/types/types";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";
import { useParamFilters } from "@/lib/hooks";

type CategoryCarouselProps = {
  expenses: Expense[];
  categories: CategoryData[];
};

export type ChartData = {
  category: string;
  expenses: Expense[];
  budget: number;
  id: number;
  angle: number;
  fill: string;
  spentAmount: number;
};

const emptyCategoryMessage = (
  <p className="text-lg text-center px-6 mx-auto py-2">
    Add categories to see charts for each category.
  </p>
);

const CategoryCarousel = ({ expenses, categories }: CategoryCarouselProps) => {
  const { formattedFilter } = useParamFilters();
  const filteredExpenses = filterExpensesByMonthYear(expenses, formattedFilter);
  const categoryExpenses = groupExpenseByCategory(
    filteredExpenses,
    categories
  ).filter((category) => !category.isFixed && category.type === "expense");

  // Adds chart specific properties like fill and angle
  const rawData = categoryExpenses.map((item) => {
    const spentAmount = reduceArr(item.expenses);

    const under = "rgb(132 204 22 / 0.5)";
    const warning = "rgb(251 189 35 / 0.5)";
    const over = "rgb(248 114 114 / 0.7)";

    // changes color of chart. 0-75% is green and 76-100% if yellow.
    const percentToBudget = spentAmount / item.budget;
    const fillColor =
      percentToBudget > 1 ? over : percentToBudget > 0.74 ? warning : under;

    const chartData: ChartData = {
      ...item,
      angle: calcAngle(item.budget, spentAmount),
      fill: fillColor,
      spentAmount,
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
            {chartData.map((category) => {
              let selectedCategory = categoryExpenses.find(
                (expenseCategory) =>
                  expenseCategory.category === category.category
              );

              return (
                <CarouselItem key={category.id} className="basis-1/2">
                  <CategorySpendChart
                    expenses={selectedCategory?.expenses}
                    category={category}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </SectionContainer>
  );
};

export default CategoryCarousel;
