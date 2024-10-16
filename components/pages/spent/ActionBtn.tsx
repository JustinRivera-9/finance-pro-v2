import { Expense } from "@/types/types";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ActionBtn = ({ expense }: { expense: Expense }) => {
  const { id, date, amount, description } = expense;

  const handleClick = () => {
    console.log(id);
  };

  return (
    <button onClick={handleClick}>
      <MoreVertIcon />
    </button>
  );
};

export default ActionBtn;
