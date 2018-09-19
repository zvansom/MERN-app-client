import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// Line Chart testing
import Accordion from "./components/Accordion";
import Trade from "./components/Trade";

ReactDOM.render(<Trade />, document.getElementById("root"));
registerServiceWorker();
