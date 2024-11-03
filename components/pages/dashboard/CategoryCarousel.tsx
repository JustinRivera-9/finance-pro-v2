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

// const under = "rgb(132 204 22 / 0.5)";
// const warning = "rgb(251 189 35 / 0.5)";
// const over = "rgb(248 114 114 / 0.7)";

const calcAngle = (planned: number, spent: number): number =>
  (spent / planned) * 360;

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

const updatedData = tempData.map((item) => {
  const under = "rgb(132 204 22 / 0.5)";
  const warning = "rgb(251 189 35 / 0.5)";
  const over = "rgb(248 114 114 / 0.7)";

  let percentToBudget = item.spent / item.planned;
  let fillColor =
    percentToBudget > 0.99 ? over : percentToBudget > 0.74 ? warning : under;

  return {
    ...item,
    angle: calcAngle(item.planned, item.spent),
    fill: fillColor,
  };
});

const CategoryCarousel = async () => {
  return (
    <SectionContainer>
      <SectionTitle>Spend by Category</SectionTitle>
      <Carousel className="w-full max-w-sm overflow-hidden">
        <CarouselContent className="-ml-1">
          {updatedData.map((category) => (
            <CarouselItem key={category.id} className="basis-1/2">
              <CategorySpendChart category={category} />
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
