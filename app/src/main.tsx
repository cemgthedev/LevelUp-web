import React from "react";
import ReactDOM from "react-dom/client";

import "@/styles/globals.css";
import { RouterProvider } from "react-router-dom";
import Provider from "./providers/index.tsx";
import router from "./routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
