import { PlugIcon } from "lucide-react";
import { useState } from "react";

import {
  type Engine,
  EngineSegmentedControl,
} from "@/components/features/connection/engine-segmented-control";
import { Button } from "@/components/ui/button";
import { Card, CardPanel } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type ConnectionInputMode = "hostname" | "connection-string";

export const NewConnection = () => {
  const [inputMode, setInputMode] = useState<ConnectionInputMode>("hostname");
  const [engine, setEngine] = useState<Engine>("postgresql");

  const toggleMode = () =>
    setInputMode((prev) => (prev === "hostname" ? "connection-string" : "hostname"));
  const changeEngine = (newEngine: Engine) => setEngine(newEngine);

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex w-full max-w-xl flex-col gap-3 px-2">
        <h2 className="font-cal text-2xl">New Database Connection</h2>
        <p className="font-inter text-[#71717A] text-sm">
          Enter your credentials to connect. Details are encrypted and stored locally on this
          device.
        </p>
      </div>
      <Card className="w-full max-w-xl">
        <CardPanel>
          <Form className="flex w-full flex-col gap-4">
            <EngineSegmentedControl value={engine} onChange={changeEngine} />
            <Field>
              <FieldLabel>Connection Name</FieldLabel>
              <Input size="lg" placeholder="e.g. production-db" type="text" required />
              <FieldError>Connection Name is required</FieldError>
            </Field>
            {inputMode === "hostname" ? (
              <>
                <div className="flex flex-row items-center gap-2">
                  <Field className="w-3/4">
                    <FieldLabel>Host</FieldLabel>
                    <Input
                      className="font-mono"
                      size="lg"
                      placeholder="db.example.internal"
                      type="text"
                      required
                    />
                    <FieldError>Host is required</FieldError>
                  </Field>
                  <Field>
                    <FieldLabel>Port</FieldLabel>
                    <Input
                      className="font-mono"
                      size="lg"
                      placeholder="5432"
                      type="number"
                      required
                    />
                    <FieldError>Port is required</FieldError>
                  </Field>
                </div>
                <Field>
                  <FieldLabel>Database</FieldLabel>
                  <Input
                    className="font-mono"
                    size="lg"
                    placeholder="acme_app"
                    type="number"
                    required
                  />
                  <FieldError>Database is required</FieldError>
                </Field>
                <div className="flex flex-row items-center gap-2">
                  <Field className="w-1/2">
                    <FieldLabel>User</FieldLabel>
                    <Input size="lg" placeholder="user123" type="text" required />
                    <FieldError>Username is required</FieldError>
                  </Field>
                  <Field className="w-1/2">
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      className="font-mono"
                      size="lg"
                      placeholder="••••••••••"
                      type="password"
                      required
                    />
                    <FieldError>Password is required</FieldError>
                  </Field>
                </div>
              </>
            ) : (
              <Field>
                <FieldLabel>Connection String</FieldLabel>
                <Input
                  className="font-mono"
                  size="lg"
                  placeholder={
                    engine === "postgresql"
                      ? "postgresql://username:password@localhost:5432/database"
                      : "mysql://username:password@hostname:3306/database"
                  }
                  type="url"
                  required
                />
                <FieldError>Connection String is required</FieldError>
              </Field>
            )}
            <div className="mt-5 flex flex-row items-center justify-between">
              <Button
                onClick={toggleMode}
                className="text-[#71717A] text-sm underline"
                variant="link"
              >
                {inputMode === "hostname" ? "Use a connection string" : "Use hostname"}
              </Button>
              <div className="flex flex-row items-center gap-3">
                <Button size="lg" variant="outline">
                  Test Connection
                </Button>
                <Button type="submit" size="lg" className="flex items-center">
                  <PlugIcon color="white" />
                  Connect
                </Button>
              </div>
            </div>
          </Form>
        </CardPanel>
      </Card>
    </main>
  );
};
