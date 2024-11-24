import TransactionItem from "./TransactionItem";
import TransactionTableHeader from "./TransactionTableHeader";

const TransactionTable = () => {
  return (
    <div>
      <h1>Transactions Pending</h1>
      <TransactionTableHeader />
      <TransactionItem />
      <TransactionItem />
      <TransactionItem />
      <TransactionItem />
    </div>
  );
};

export default TransactionTable;
