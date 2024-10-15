"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MonthFilter = ({ month }: { month: string }) => {
  const [monthFilter, setMonthFilter] = useState<string>(month);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const url = pathname.split("/");
    url.pop();
    url.push(monthFilter);
    const updatedPath = url.join("/");
    router.push(updatedPath);
  }, [monthFilter]);

  const handleMonthChange = (month: string) => {
    setMonthFilter(month);
  };

  return (
    <Select
      onValueChange={(month) => handleMonthChange(month)}
      defaultValue={monthFilter}
    >
      <SelectTrigger className="mx-auto w-2/5">
        <SelectValue className="" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filter by Month</SelectLabel>
          <SelectItem value="january">January</SelectItem>
          <SelectItem value="february">February</SelectItem>
          <SelectItem value="march">March</SelectItem>
          <SelectItem value="april">April</SelectItem>
          <SelectItem value="may">May</SelectItem>
          <SelectItem value="june">June</SelectItem>
          <SelectItem value="july">July</SelectItem>
          <SelectItem value="august">August</SelectItem>
          <SelectItem value="september">September</SelectItem>
          <SelectItem value="october">October</SelectItem>
          <SelectItem value="november">November</SelectItem>
          <SelectItem value="december">December</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default MonthFilter;
