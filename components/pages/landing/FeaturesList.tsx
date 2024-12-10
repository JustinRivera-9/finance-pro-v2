import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FeatureItem from "./FeatureItem";

const features = [
  {
    title: "Bank Connectivity",
    description:
      "Connect your bank accounts and automatically track your expenses in one place.",
    img: "/features/bank-connectivity.png",
    size: 200,
    id: 1,
  },
  {
    title: "Key Budget Insights",
    description:
      "Acquire essential knowledge about your budget to aid in staying on course.",
    img: "/features/budget-analytics.png",
    size: 179,
    id: 2,
  },
  {
    title: "Investment Tracking",
    description:
      "Easily monitor investments and track performance from various accounts.",
    img: "/features/investing-analytics.png",
    size: 200,
    id: 3,
  },
];

const FeaturesList = () => {
  return (
    <div className="flex flex-col gap-4">
      <Carousel
        opts={{
          dragFree: true,
        }}
        className="w-full max-w-sm overflow-hidden"
      >
        <CarouselContent className="-ml-1">
          {features.map((feature) => (
            <CarouselItem key={feature.id} className="basis-3/4">
              <FeatureItem data={feature} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FeaturesList;
