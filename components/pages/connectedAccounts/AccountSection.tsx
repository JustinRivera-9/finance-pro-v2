import { AccountBase } from "plaid";
import AccountCard from "./AccountCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const AccountSection = ({ accounts }: { accounts: AccountBase[] }) => {
  return (
    <Carousel>
      <CarouselContent className="-ml-1">
        {accounts.map((account) => (
          <CarouselItem key={account.account_id} className="basis-1/2">
            <AccountCard account={account} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default AccountSection;
