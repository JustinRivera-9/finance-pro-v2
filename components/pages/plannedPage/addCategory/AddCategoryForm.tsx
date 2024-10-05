import FormDrawer from "../../../ui/DrawerCard";
import CategoryForm from "./CategoryForm";

const AddCategoryForm = () => {
  return (
    <FormDrawer
      description="Create a new budget category to track expenses."
      title="Add Category"
      triggerLabel={<p className="text-xl font-semibold py-2">Add Category</p>}
      color="accent"
    >
      <CategoryForm />
    </FormDrawer>
  );
};

export default AddCategoryForm;
