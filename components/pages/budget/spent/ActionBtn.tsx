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
import { useToast } from "@/hooks/use-toast";
import { deleteExpenseAction } from "@/app/app/budget/actions";

type ActionBtnProps = {
  expense: Expense;
  expenseToEdit: (expense: Expense) => void;
};

const ActionBtn = ({ expense, expenseToEdit }: ActionBtnProps) => {
  const { id, description } = expense;
  const { toast } = useToast();

  const handleDelete = () => {
    deleteExpenseAction(id);
    toast({
      title: `Successfully deleted the ${description} expense`,
    });
  };

  const handleEdit = (expense: Expense) => {
    expenseToEdit(expense);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleEdit(expense)}>
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
