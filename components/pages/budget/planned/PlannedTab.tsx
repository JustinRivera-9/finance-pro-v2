import EmptyMessage from "@/components/ui/EmptyMessage";
import { getCategories } from "@/app/app/budget/actions";
import AddCategoryForm from "./addCategory/AddCategoryForm";
import Summary from "./Summary";
import CategorySection from "./CategorySection";

const PlannedTab = async () => {
  const categories: any = await getCategories();

  if (!categories.length) {
    return (
      <section className="flex flex-col items-center text-center gap-4">
        <EmptyMessage
          title="Set Up Your Categories"
          description="Here is where you can easily manage the categories you want to track."
        />
        <AddCategoryForm />
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Summary categories={categories} />
      <CategorySection categories={categories} />
      <AddCategoryForm />
    </div>
  );
};

export default PlannedTab;
