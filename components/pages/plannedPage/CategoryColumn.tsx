import { type PlannedCategories } from "@/types/types";
import CategoryCard from "./CategoryCard";
import EmptyMessage from "@/components/ui/EmptyMessage";

type CategoryColumnProps = {
  category: PlannedCategories[];
  title: string;
};

const CategoryColumn: React.FC<CategoryColumnProps> = ({ category, title }) => {
  const isFixed = title === "FIXED EXPENSES";
  const isEmpty = !category.length;

  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="text-accent text-2xl font-semibold">{title}</p>
      <ul className="flex flex-col flex-wrap gap-4 justify-start mx-auto w-full px-8">
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
