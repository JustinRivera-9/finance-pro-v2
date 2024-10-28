import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatCurrency, sortFixedExpenses } from "@/lib/utils";
import { CategoryData } from "@/types/types";

type FixedExpenseCarouselProps = {
  categories: CategoryData[];
};

export function FixedExpenseCarousel({
  categories,
}: FixedExpenseCarouselProps) {
  const fixedExpenses = sortFixedExpenses(
    categories.filter((expense) => expense.isFixed)
  );

  return (
    <Carousel className="w-full max-w-sm overflow-hidden">
      <CarouselContent className="-ml-1">
        {fixedExpenses.map((expense) => (
          <CarouselItem key={expense.id} className="basis-1/2">
            <div className="">
              <Card className="bg-neutral-900">
                <CardContent className="flex gap-4 text-center aspect-square items-center justify-around ">
                  <p className="text-3xl font-semibold text-accent">
                    {expense.date}
                  </p>
                  <div className="flex flex-col gap-4 items-center">
                    <p className="text-md font-semibold">{expense.category}</p>
                    <p className="text-2xl font-semibold">
                      {formatCurrency(expense.amount, true)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
