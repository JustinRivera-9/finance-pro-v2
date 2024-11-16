import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  daysToFixedExpense,
  formatCurrency,
  sortFixedExpenses,
} from "@/lib/utils";
import { CategoryData } from "@/types/types";
import { format } from "date-fns";

type FixedExpenseCarouselProps = {
  categories: CategoryData[];
};

const emptyExpenseMessage = (
  <p className="text-lg px-6 text-center mx-auto py-2">
    Add fixed expenses to start tracking when they are due.
  </p>
);

export function FixedExpenseCarousel({
  categories,
}: FixedExpenseCarouselProps) {
  const [currentMonth, day] = format(new Date(), "PP").split(" ");
  const currentDay = Number(day.slice(0, -1));

  const fixedExpenses = sortFixedExpenses(
    categories.filter((expense) => expense.isFixed)
  );

  if (!fixedExpenses.length) return emptyExpenseMessage;

  return (
    <Carousel
      opts={{
        dragFree: true,
      }}
      className="w-full max-w-sm overflow-hidden mt-4"
    >
      <CarouselContent>
        {fixedExpenses.map((expense) => {
          const daysRemaining = daysToFixedExpense(currentDay, expense.date);

          return (
            <CarouselItem key={expense.id} className="basis-1/2">
              <div className="bg-card rounded-xl flex-col gap-2 text-center items-center justify-center py-4">
                <p className="text-md font-semibold text-secondary">
                  {currentMonth}-{expense.date}
                </p>
                <p className="text-lg font-semibold text-light/70">
                  {expense.category}
                </p>
                <p className="text-xl">
                  {formatCurrency(expense.amount, true)}
                </p>
                <p className="text-md text-light/70">
                  {daysRemaining > 1
                    ? `In ${daysRemaining} days`
                    : daysRemaining === 1
                    ? "Tomorrow"
                    : daysRemaining === 0
                    ? "Today"
                    : "Completed"}
                </p>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
