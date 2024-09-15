import Summary from "../../components/pages/plannedPage/Summary";
import CategorySection from "../../components/pages/plannedPage/CategorySection";
import AddCategoryForm from "../../components/pages/plannedPage/addCategory/AddCategoryForm";

///// TEMP DATA
const planned = {
  isSetUp: true,
  categories: [
    {
      id: 1,
      category: "Mortgage",
      amount: 1500,
      type: "expense",
      isFixed: true,
      date: "4",
    },
    {
      id: 2,
      category: "Going out",
      amount: 250,
      type: "expense",
      isFixed: false,
    },
    // {
    //   id: 3,
    //   category: "Income",
    //   amount: 1000,
    //   type: "income",
    // },
    {
      id: 4,
      category: "Going out",
      amount: 250,
      type: "expense",
      isFixed: false,
    },
    // {
    //   id: 5,
    //   category: "Income",
    //   amount: 1000,
    //   type: "income",
    // },
    {
      id: 6,
      category: "Going out",
      amount: 250,
      type: "expense",
      isFixed: false,
    },
    {
      id: 7,
      category: "Income",
      amount: 10000,
      type: "income",
    },
    {
      id: 8,
      category: "Going out",
      amount: 250,
      type: "expense",
      isFixed: false,
    },
    {
      id: 9,
      category: "Income",
      amount: 1000,
      type: "income",
    },
    {
      id: 10,
      category: "Car Payment",
      amount: 1500,
      type: "expense",
      isFixed: true,
      date: "17",
    },
    {
      id: 11,
      category: "Mortgage",
      amount: 1500,
      type: "expense",
      isFixed: true,
      date: "22",
    },
    {
      id: 14,
      category: "Mortgage",
      amount: 1500,
      type: "expense",
      isFixed: true,
      date: "22",
    },
    {
      id: 12,
      category: "Student Loans",
      amount: 1500,
      type: "expense",
      isFixed: true,
      date: "8",
    },
    {
      id: 13,
      category: "Youtube Music",
      amount: 1500,
      type: "expense",
      isFixed: true,
      date: "30",
    },
  ],
};

const PlannedPage = async () => {
  const { categories } = planned;

  return (
    <div className="flex flex-col gap-4">
      <Summary categories={categories} />
      <CategorySection categories={categories} />
      <AddCategoryForm />
    </div>
  );
};

export default PlannedPage;
