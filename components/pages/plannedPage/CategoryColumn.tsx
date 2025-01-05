import type { CategoryData } from "@/types/types";
import CategoryCard from "./CategoryCard";
import EmptyMessage from "@/components/ui/EmptyMessage";
import { formatCurrency, reduceArr } from "@/lib/utils";

type CategoryColumnProps = {
  category: CategoryData[];
  title: string;
};

const CategoryColumn: React.FC<CategoryColumnProps> = ({ category, title }) => {
  const isEmpty = !category.length;
  const total = reduceArr(category);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex w-full px-10 mx-auto justify-between items-baseline font-semibold">
        <p className="text-accent text-2xl">{title}</p>
        <p className="text-light/70 text-xl">{formatCurrency(total)}</p>
      </div>
      <ul className="flex flex-col flex-wrap gap-4 justify-start mx-auto w-full">
        {isEmpty ? (
          <EmptyMessage description={`Add your first ${title} catgory`} />
        ) : (
          category.map((category) => (
            <li key={category.id}>
              <CategoryCard categoryData={category} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CategoryColumn;
