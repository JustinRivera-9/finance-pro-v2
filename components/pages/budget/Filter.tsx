"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
const years = Array.from(
  { length: 10 },
  (_, i) => new Date().getFullYear() - 5 + i
);

const Filter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getInitialMonth = () =>
    searchParams.get("month") ||
    new Date().toLocaleString("en-US", { month: "short" }).toLowerCase();
  const getInitialYear = () =>
    searchParams.get("year") || new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState<string>(getInitialMonth());
  const [selectedYear, setSelectedYear] = useState<string | number>(
    getInitialYear()
  );

  const createQueryString = useCallback(
    (values: { month: string; year: string | number }) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(values)) {
        params.set(key, value.toString());
      }

      return params.toString();
    },
    [searchParams]
  );

  const updateSearchParam = useCallback(
    (month: string, year: string | number) => {
      router.push(`${pathname}?${createQueryString({ month, year })}`);
    },
    [router, pathname, createQueryString]
  );

  useEffect(() => {
    updateSearchParam(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear, updateSearchParam]);

  const monthIdx = months.findIndex((month) => month === selectedMonth);

  return (
    <div className="flex flex-col items-center gap-4 pt-2">
      {/* Year Selector */}
      <div className="flex items-center gap-4">
        <button
          onClick={() =>
            setSelectedYear((prev) => (Number(prev) - 1).toString())
          }
          className="p-2 bg-card rounded"
        >
          &lt;
        </button>
        <span className="text-lg">{selectedYear}</span>
        {+selectedYear < new Date().getFullYear() && (
          <button
            onClick={() => setSelectedYear((prev) => +prev + 1)}
            className="p-2 bg-card rounded"
          >
            &gt;
          </button>
        )}
      </div>

      {/* Months */}
      <Carousel
        opts={{
          dragFree: true,
          startIndex: monthIdx,
        }}
        className="w-full max-w-sm overflow-hidden"
      >
        <CarouselContent className="-ml-1">
          {months.map((month, index) => (
            <CarouselItem key={index} className="basis-1/4">
              <button
                key={index}
                onClick={() => setSelectedMonth(months[index])}
                className={`px-6 py-2 rounded capitalize ${
                  monthIdx === index
                    ? "bg-card text-light"
                    : "bg-light/80 text-dark"
                }`}
              >
                {month}
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Filter;
