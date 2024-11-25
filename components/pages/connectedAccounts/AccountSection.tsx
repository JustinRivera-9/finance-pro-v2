import { AccountBase } from "plaid";
import AccountCard from "./AccountCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const AccountSection = ({ accounts }: { accounts: AccountBase[] }) => {
  return (
    <Carousel
      opts={{
        dragFree: true,
      }}
    >
      <CarouselContent className="-ml-1">
        {accounts.map((account) => (
          <CarouselItem key={account.account_id} className="basis-9/12">
            <AccountCard account={account} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default AccountSection;