import { HashRouter, Route, Routes } from "react-router";

import { NewConnection } from "@/components/pages/new-connection";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<NewConnection />} />
      </Routes>
    </HashRouter>
  );
}
