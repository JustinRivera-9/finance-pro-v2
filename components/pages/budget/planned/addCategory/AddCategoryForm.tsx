import { Button } from "@/components/ui/button";
import CategoryForm from "./CategoryForm";
import FormDrawer from "@/components/ui/FormDrawer";

const AddCategoryForm = () => {
  return (
    <FormDrawer
      description="Create a new budget category to track expenses."
      title="Add Category"
      triggerLabel={
        <p className="text-dark bg-secondary w-fit px-4 py-2 rounded-lg mx-auto font-bold">
          Add Category
        </p>
      }
    >
      <CategoryForm />
    </FormDrawer>
  );
};

export default AddCategoryForm;
