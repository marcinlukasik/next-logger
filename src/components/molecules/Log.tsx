"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { PreviewLog } from "@/components/atoms/PreviewLog";
import { LogType } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { ClearLogButton } from "@/components/atoms/ClearLogButton";

export const Log = () => {
  const [log, setLog] = useState<LogType[]>([]);

  useEffect(() => {
    handleRecivedMessage();
  }, []);

  const handleRecivedMessage = () => {
    const supabase = createClient();

    supabase
      .channel("next-logger")
      .on("broadcast", { event: "log" }, (response) => {
        setLog((prevLog) => [
          ...prevLog,
          { ...response.payload.log, id: new Date().getTime().toString() },
        ]);
      })
      .subscribe();
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-12 mb-4">
        <div className="font-semibold">Log:</div>
        {log.length > 0 && <ClearLogButton onClear={() => setLog([])} />}
      </div>
      {log.length === 0 && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Let&apos;s get started!</AlertTitle>
          <AlertDescription>
            You can send your first API request to your app using the cli.
          </AlertDescription>
        </Alert>
      )}
      {log.map((item) => (
        <Accordion type="single" key={item.id} collapsible>
          <AccordionItem value={`item-${item.id}`}>
            <AccordionTrigger className="hover:no-underline">
              {item.error ? (
                <Badge
                  variant="destructive"
                  className="min-w-20 justify-center"
                >
                  Error
                </Badge>
              ) : (
                <Badge className="bg-green-500 hover:bg-green-500 min-w-20 justify-center">
                  Success
                </Badge>
              )}{" "}
              <span className="ml-3 mr-auto">{item.url}</span>
            </AccordionTrigger>
            <AccordionContent className="bg-gray-50">
              <div className="pt-6 pb-2 px-4">
                <span className="font-semibold">Status Code:</span>{" "}
                <span className="font-medium">{item.statusCode}</span>
              </div>
              <div className="pb-2 px-4">
                <span className="font-semibold">Request Method:</span>{" "}
                <span className="font-medium">{item.method}</span>
              </div>
              {item.payload && (
                <PreviewLog name="Payload" logs={item.payload} />
              )}
              <PreviewLog
                name={item.error ? "Error" : "Response"}
                logs={item.error ?? item.response}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};
