const ExpenseTableHeader = () => {
  return (
    <div className="grid grid-cols-[1fr_1fr_2fr] gap-2 justify-between text-secondary py-2">
      <p>Date</p>
      <p>Amount</p>
      <p>Description</p>
    </div>
  );
};

export default ExpenseTableHeader;
