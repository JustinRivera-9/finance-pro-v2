import EditIcon from "@mui/icons-material/Edit";
import CategoryForm from "./addCategory/CategoryForm";
import FormDrawer from "@/components/ui/FormDrawer";
import type { CategoryData } from "@/types/types";

type EditButtonProps = {
  categoryData: CategoryData;
};

const EditButton = ({ categoryData }: EditButtonProps) => {
  return (
    <div>
      <FormDrawer
        title={`Edit ${categoryData.category} Category`}
        triggerLabel={<EditIcon />}
        color="light"
      >
        <CategoryForm categoryData={categoryData} />
      </FormDrawer>
    </div>
  );
};

export default EditButton;
