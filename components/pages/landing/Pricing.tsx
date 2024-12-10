import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PricingCard from "./PricingCard";
import { PRO_PRICE } from "@/lib/constants";

const pricingTiers = [
  {
    title: "Standard",
    price: "Free",
    features: [
      "Institution level security",
      "Manually add and manage your expenses",
      "Basic spending overviews",
      "Help drive future features!",
    ],
  },
  {
    title: "Pro Plan",
    price: PRO_PRICE,
    features: [
      "Seamlessly connect your bank accounts",
      "Import transactions automatically",
      "Advanced charts and data analytics",
      "Priorty customer support",
    ],
  },
];

const Pricing = () => {
  return (
    <Carousel
      opts={{
        dragFree: true,
      }}
      className="w-full max-w-sm overflow-hidden"
    >
      <CarouselContent className="-ml-1">
        {pricingTiers.map((item) => (
          <CarouselItem key={item.title} className="basis-3/4">
            <PricingCard data={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Pricing;
