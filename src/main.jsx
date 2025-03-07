import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Update from "./components/Update.jsx";
import NotFound from "./components/NotFound.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/update/:id" element={<Update />}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
