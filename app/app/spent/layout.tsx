import MonthFilter from "@/components/pages/spent/MonthFilter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyFi | Expenses",
  description: "View and manage budget expenses",
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`h-screen w-full flex flex-col bg-page text-light`}>
      <MonthFilter />
      <main className="pb-20">{children}</main>
    </div>
  );
}
