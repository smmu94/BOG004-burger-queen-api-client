import "bootstrap/dist/css/bootstrap.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Routercomponent from "./router/Router";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routercomponent />
  </Router>
);

reportWebVitals();
