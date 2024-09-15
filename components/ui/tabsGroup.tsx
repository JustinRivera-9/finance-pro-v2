import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const tabsGroup = () => {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">
        Make changes to your account here.
      </TabsContent>
    </Tabs>
  );
};

export default tabsGroup;
