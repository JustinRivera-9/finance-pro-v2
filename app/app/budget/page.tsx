// import Filter from "@/components/pages/budget/Filter";
import SpentTab from "@/components/pages/budget/spent/SpentTab";
import PlannedTab from "@/components/pages/plannedPage/PlannedTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BudgetPage = () => {
  return (
    <div className="flex flex-col gap-2">
      {/* <Filter /> */}
      <Tabs defaultValue="spent" className="w-full px-6 pt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="spent">Spent</TabsTrigger>
          <TabsTrigger value="planned">Planned</TabsTrigger>
        </TabsList>
        <TabsContent value="spent">
          <SpentTab />
        </TabsContent>
        <TabsContent value="planned">
          <PlannedTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetPage;
