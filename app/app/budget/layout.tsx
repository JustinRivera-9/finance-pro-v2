import Filter from "@/components/pages/budget/Filter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyFi | Budget",
  description: "View and manage budget",
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`h-screen w-full flex flex-col bg-page text-light`}>
      <Filter />

      <main className="pb-20">{children}</main>
    </div>
  );
}
