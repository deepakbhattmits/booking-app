import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./assets/styles/_index.scss";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const rootElement = document.querySelector("#root")! as HTMLDivElement; //  rootElement
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>

  // <App />
);
