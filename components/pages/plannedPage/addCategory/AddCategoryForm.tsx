import { Button } from "@/components/ui/button";
import FormDrawer from "../../../ui/FormDrawer";
import CategoryForm from "./CategoryForm";

const AddCategoryForm = () => {
  return (
    <FormDrawer
      description="Create a new budget category to track expenses."
      title="Add Category"
      triggerLabel={
        <Button className="text-md" variant="secondary">
          Add Category
        </Button>
      }
      color="accent"
    >
      <CategoryForm />
    </FormDrawer>
  );
};

export default AddCategoryForm;
