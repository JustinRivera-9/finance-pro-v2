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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { deleteExpenseAction } from "@/app/app/budget/actions";

const ActionBtn = ({ expense }: { expense: Expense }) => {
  const { id, description } = expense;
  const { toast } = useToast();

  const path = usePathname();

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
        <DropdownMenuItem>
          <Link href={`${path}/${id}`}>
            <EditIcon fontSize="small" sx={{ marginRight: "8px" }} />
          </Link>
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
