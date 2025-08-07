import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ResultsProvider } from "./content/ResultsContext"; // ✅ Correct path

createRoot(document.getElementById("root")).render(
  <ResultsProvider>
    <App />
  </ResultsProvider>
);
