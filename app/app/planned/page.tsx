import Summary from "../../../components/pages/plannedPage/Summary";
import CategorySection from "../../../components/pages/plannedPage/CategorySection";
import AddCategoryForm from "../../../components/pages/plannedPage/addCategory/AddCategoryForm";
import { getCategories } from "./actions";
import type { PlannedCategories } from "@/lib/types";

const PlannedPage = async () => {
  // const { categories } = planned;
  const categories: any = await getCategories();

  return (
    <div className="flex flex-col gap-4">
      <Summary categories={categories} />
      <CategorySection categories={categories} />
      <AddCategoryForm />
    </div>
  );
};

export default PlannedPage;
