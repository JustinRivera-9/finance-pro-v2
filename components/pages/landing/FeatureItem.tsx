import Image from "next/image";

type FeatureItemProps = {
  title: string;
  description: string;
  img: string;
  size: number;
};

const FeatureItem = ({ data }: { data: FeatureItemProps }) => {
  const { title, description, img, size } = data;

  return (
    <div className="flex flex-col gap-2 items-center text-center py-2 px-2 rounded-xl">
      <Image alt={title} src={img} width={size} height={size} />
      <h2 className="text-2xl text-light">{title}</h2>
      <p className="text-light/60 text-lg">{description}</p>
    </div>
  );
};

export default FeatureItem;
