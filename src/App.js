import React, { memo } from "react";

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

import "react-toastify/dist/ReactToastify.css";

import TopNav from "./components/TopNav";
import useUser from "./hooks/useUser";
import ViewDetails from "./containers/ViewDetails";

const router = (props) => {
  return createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/cong-dong-du-an" element={<ViewAll />} />
        <Route path="/duan/:id" element={<ViewDetails {...props} />} />
        <Route path="/admin" element={<AdminPage {...props} />} />
        <Route path="/dang-tin-tuc" element={<PostNews {...props} />} />
        <Route path="*" element={<div>404 not found</div>} />
      </>
    )
  );
};

const App = memo(() => {
  const { isLoadingFetchAuthUser, authUser, isAdmin } = useUser();

  return (
    <>
      <TopNav
        authUser={authUser}
        isLoadingFetchAuthUser={isLoadingFetchAuthUser}
        isAdmin={isAdmin}
      />
      <main className="main">
        <RouterProvider
          router={router({ isAdmin, authUser, isLoadingFetchAuthUser })}
        />
      </main>
    </>
  );
});

export default App;
