import type { Metadata } from "next";

import Header from "@/components/navigation/mobile/Header";
import MobileNavigation from "@/components/navigation/mobile/MobileNavigation";
import { getUser } from "@/lib/supabase/actions";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "MyFi | Dashboard",
  description: "Generated by create next app",
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <UserProvider value={`${user}`}>
      <div className={`h-screen w-full flex flex-col bg-page text-light`}>
        <Header />
        <main className="pb-20">{children}</main>
        <MobileNavigation />
      </div>
    </UserProvider>
  );
}
