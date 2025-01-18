import { useSearchParams } from "next/navigation";

export const useParamFilters = () => {
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  return { month, year };
};
