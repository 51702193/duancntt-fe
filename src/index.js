import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainPage from "./containers/MainPage";
import ViewAll from "./containers/ViewAll";
import AdminPage from "./containers/AdminPage";
import PostNews from "./containers/PostNews";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainPage />}>
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        {/* ... etc. */}
      </Route>
      <Route path="/cong-dong-du-an" element={<ViewAll />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/dang-tin-tuc" element={<PostNews />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
