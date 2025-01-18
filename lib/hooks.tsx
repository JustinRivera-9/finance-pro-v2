import { useSearchParams } from "next/navigation";
import { formatMonthAndYear } from "./utils";

export const useParamFilters = () => {
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const formattedFilter = formatMonthAndYear(month!, year!);

  return { month, year, formattedFilter };
};
