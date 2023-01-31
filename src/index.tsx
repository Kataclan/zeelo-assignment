import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { mswWorker } from "./__mocks__/msw-worker";
import App from "./App";

// Await for mswWorker to start before rendering the app in DEV mode
async function startApp() {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "development") {
    await mswWorker.start();
  }

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
startApp();
