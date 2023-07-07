import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";

import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";

Amplify.configure(awsconfig);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);
