"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const PreviewLog = ({ name, logs }: { name: string; logs: unknown }) => {
  const tabsTriggerClassName =
    "bg-white text-black data-[state=active]:bg-gray-800 data-[state=active]:text-white";
  const tabsContentClassName = "pt-2";

  const renderLog = () => JSON.stringify(logs, null, 2);

  return (
    <div className="p-4">
      <h4 className="text-md font-semibold mb-2">{name}:</h4>
      <div>
        <Tabs defaultValue="raw">
          <TabsList className="bg-white">
            <TabsTrigger value="raw" className={tabsTriggerClassName}>
              Raw
            </TabsTrigger>
            <TabsTrigger value="pretty" className={tabsTriggerClassName}>
              Pretty
            </TabsTrigger>
          </TabsList>
          <TabsContent value="raw" className={tabsContentClassName}>
            {renderLog()}
          </TabsContent>
          <TabsContent value="pretty" className={tabsContentClassName}>
            <pre>{renderLog()}</pre>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
