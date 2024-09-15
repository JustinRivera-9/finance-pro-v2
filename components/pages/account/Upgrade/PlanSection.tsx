import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

type PlanSectionProps = {
  title: string;
  price: string;
  content: string[];
  current?: boolean;
};

const PlanSection = ({ title, price, content, current }: PlanSectionProps) => {
  const currentText = (
    <span className="font-light italic text-sm text-light">{`(Current)`}</span>
  );

  return (
    <section className="flex flex-col gap-1">
      <div className="flex justify-between text-xl font-semibold text-accent">
        <h2 className="text-xl font-semibold">
          {title} {current && currentText}
        </h2>
        <p>{price}</p>
      </div>
      {content.map((item) => (
        <p className="text-lg flex gap-1">
          <KeyboardArrowRightIcon />
          {item}
        </p>
      ))}
    </section>
  );
};

export default PlanSection;
