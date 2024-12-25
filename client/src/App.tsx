import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CodeEd } from "./pages/CodeEd";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CodeEd />} />
      </Routes>
    </BrowserRouter>
  );
};
