type FeatureItemProps = {
  title: string;
  description: string;
  img: string;
};

const FeatureItem = ({ title, description, img }: FeatureItemProps) => {
  return (
    <div className="flex flex-col gap-2 items-center text-center bg-card/50 py-2 px-4 rounded-xl">
      <h2 className="text-xl text-light">{title}</h2>
      <p className="text-light/70">{description}</p>
    </div>
  );
};

export default FeatureItem;
