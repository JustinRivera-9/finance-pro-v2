import { Expense } from "@/types/types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteExpenseAction } from "@/app/app/spent/[month]/actions";
import { useToast } from "@/hooks/use-toast";

const ActionBtn = ({ expense }: { expense: Expense }) => {
  const { id, date, amount, description } = expense;
  const { toast } = useToast();

  const handleEdit = () => {
    console.log(id);
    console.log("Edit Action");
  };

  const handleDelete = () => {
    deleteExpenseAction(id);
    toast({
      title: `Successfully deleted the ${description} expense`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleEdit}>
          <EditIcon fontSize="small" sx={{ marginRight: "8px" }} />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          <DeleteIcon
            fontSize="small"
            color="error"
            sx={{ marginRight: "8px" }}
          />
          <p className="text-[#ff4848]">Delete</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionBtn;
