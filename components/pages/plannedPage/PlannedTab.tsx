import Summary from "../../../components/pages/plannedPage/Summary";
import CategorySection from "../../../components/pages/plannedPage/CategorySection";
import AddCategoryForm from "../../../components/pages/plannedPage/addCategory/AddCategoryForm";
import EmptyMessage from "@/components/ui/EmptyMessage";
import { getCategories } from "@/app/app/planned/actions";

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
