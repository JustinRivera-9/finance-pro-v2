import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

type PricingCardProps = {
  title: string;
  price: string;
  features: string[];
};

const PricingCard = ({ data }: { data: PricingCardProps }) => {
  const { title, price, features } = data;
  return (
    <div className="flex flex-col gap-2 p-2 border border-light rounded-lg">
      <div className="flex px-2 justify-between items-center">
        <p className="text-xl text-light">{title}</p>
        <p className="text-2xl text-accent">{price}</p>
      </div>
      <ul className="flex flex-col gap-2">
        {features.map((feature, i) => (
          <li className="flex gap-2" key={i}>
            <KeyboardArrowRightIcon className="text-secondary" />
            <p key={i}>{feature}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
