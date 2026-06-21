import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 h-screen">
      <h1 className="font-bold text-2xl">Hello World</h1>
      <Button variant="default">Click me!</Button>
    </div>
  );
}
