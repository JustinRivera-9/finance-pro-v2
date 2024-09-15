import { type PlannedCategories } from "@/lib/types";
import CategoryCard from "./CategoryCard";

type CategoryColumnProps = {
  category: PlannedCategories[];
  title: string;
};

const CategoryColumn: React.FC<CategoryColumnProps> = ({ category, title }) => {
  const isFixed = title === "FIXED EXPENSES";

  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="text-accent text-2xl font-semibold">{title}</p>
      <ul className="flex flex-col flex-wrap gap-4 justify-start mx-auto w-full px-8">
        {category.map((category) => (
          <li key={category.id}>
            <CategoryCard categoryData={category} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryColumn;
