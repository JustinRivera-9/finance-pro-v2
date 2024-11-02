import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";
import { formatCurrency } from "@/lib/utils";

const tempData = [
  {
    category: "Misc",
    planned: 500,
    spent: 200,
    id: 1,
  },
  {
    category: "Eating Out",
    planned: 125,
    spent: 175,
    id: 2,
  },
  {
    category: "Groceries",
    planned: 225,
    spent: 89,
    id: 3,
  },
  {
    category: "Date Night",
    planned: 100,
    spent: 84,
    id: 4,
  },
  {
    category: "Zoe",
    planned: 100,
    spent: 85,
    id: 5,
  },
];

const CategoryCarousel = async () => {
  return (
    <SectionContainer>
      <SectionTitle>Spend by Category</SectionTitle>
      <Carousel className="w-full max-w-sm overflow-hidden">
        <CarouselContent className="-ml-1">
          {tempData.map((category) => (
            <CarouselItem key={category.id} className="basis-1/2">
              <div className="">
                <Card className="bg-neutral-900">
                  <CardContent className="flex flex-col gap-4 text-center aspect-square items-center justify-around ">
                    <p className="text-3xl font-semibold text-accent">
                      {category.category}
                    </p>
                    <div className="flex flex-col gap-4 items-center">
                      <p className="text-2xl font-semibold">
                        Spent: {formatCurrency(category.spent, true)}
                      </p>
                      <p className="text-2xl font-semibold">
                        Planned: {formatCurrency(category.planned, true)}
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
    </SectionContainer>
  );
};

export default CategoryCarousel;
