import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/styles/index.css"

import DataProvider from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
      <DataProvider>
          <App />
      </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
