const ExpenseTableHeader = () => {
  return (
    <div className="grid grid-cols-[1fr_1fr_2fr] gap-2 justify-between px-2 text-secondary">
      <p>Date</p>
      <p>Amount</p>
      <p>Description</p>
    </div>
  );
};

export default ExpenseTableHeader;
