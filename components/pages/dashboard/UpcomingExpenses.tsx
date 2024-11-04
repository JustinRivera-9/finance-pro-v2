import { getExpenses } from "@/app/app/spent/[month]/actions";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";
import { getCategories } from "@/app/app/planned/actions";
import { FixedExpenseCarousel } from "./FixedExpenseCarousel";

const UpcomingExpenses = async () => {
  const categories = await getCategories();

  return (
    <SectionContainer>
      <SectionTitle>Upcoming Expenses</SectionTitle>
      <FixedExpenseCarousel categories={categories} />
    </SectionContainer>
  );
};

export default UpcomingExpenses;
