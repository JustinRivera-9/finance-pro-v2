"use client";
import { deleteCategoryAction } from "@/app/app/planned/actions";
import { useToast } from "@/hooks/use-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ToastActionResults } from "@/lib/types";

type DeleteButtonProps = {
  id: string;
  category: string;
};

const DeleteButton = ({ id, category }: DeleteButtonProps) => {
  const { toast } = useToast();

  const handleClick = async () => {
    const result = await deleteCategoryAction(id);
    console.log(category);
    if (result.success) {
      toast({
        title: `Successfully deleted the ${category} category.`,
        // description: "Friday, February 10, 2023 at 5:57 PM",
      });
    } else {
      toast({
        title: "Uh-Oh",
        description: `There was an error deleting the ${category} category. Please try again.`,
      });
    }
  };

  return (
    <button onClick={() => handleClick()}>
      <DeleteIcon />
    </button>
  );
};

export default DeleteButton;
