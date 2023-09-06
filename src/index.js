import React, { memo } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { ErrorBoundary } from "react-error-boundary";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.scss";

import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

import configs from "./configs";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <GoogleOAuthProvider clientId="188789041069-5p15dp7j6akls94ma73mb3v0gleptbpi.apps.googleusercontent.com">
      <App configs={configs} />
    </GoogleOAuthProvider>
    <ToastContainer />
  </ErrorBoundary>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
