import { type PlannedCategories } from "@/lib/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type CategoryCardProps = {
  categoryData: PlannedCategories;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ categoryData }) => {
  const { amount, id, category, isFixed, date, type } = categoryData;
  const isExpense = type === "expense" ? true : false;

  return isFixed ? (
    // FIXED EXPENSES
    <div className="flex justify-between items-center gap-2 bg-card text-light rounded-lg py-2 px-4">
      <div className="flex items-center gap-4">
        <p className="text-3xl text-secondary">{date}</p>
        <div className="flex flex-col text-xl text-left">
          <p className="font-semibold">{category}</p>
          <p>${amount}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <EditIcon />
        <DeleteIcon />
      </div>
    </div>
  ) : (
    // INCOME & EXPENSES
    <div
      className={`flex bg-card border-l-4 rounded-lg py-4 px-4 justify-between ${
        isExpense ? "border-l-red-500" : "border-l-accent"
      }`}
    >
      <div className="flex gap-4 text-xl">
        <p className="font-semibold">{category}</p>
        <p>${amount}</p>
      </div>
      <div className="flex gap-2">
        <EditIcon />
        <DeleteIcon />
      </div>
    </div>
  );
};

export default CategoryCard;
