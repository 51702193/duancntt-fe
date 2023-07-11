import React from "react";

import { ReactComponent as Logo } from "./logo.svg";

import "./styles.scss";
import { useGoogleLogin } from "@react-oauth/google";
import useFetch from "react-fetch-hook";
import { toast } from "react-toastify";

// onSuccess={(credentialResponse) => {
//   console.log(
//     "🚀 ~ file: index.js:111 ~ MainPage ~ credentialResponse:",
//     credentialResponse
//   );
//   localStorage.setItem("auth", credentialResponse.credential);
//   setaccess_token(credentialResponse.credential);
//   toast.success("Login Successfully", {
//     position: "top-right",
//     autoClose: 3000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//   });
// }}
// onError={() => {
//   toast.error("Login Failed", {
//     position: "top-right",
//     autoClose: 3000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//   });
// }}

const TopNav = () => {
  const googleLogin = useGoogleLogin({
    scope:
      "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    onSuccess: (codeResponse) => {
      localStorage.setItem("auth", JSON.stringify(codeResponse));
      window.location.reload();
      // toast.success("Login Successfully", {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    },
    onError: () => {
      toast.error("Login Failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });

  // localStorage.removeItem("auth");

  const authUserLocalStorage = JSON.parse(localStorage.getItem("auth"));
  var url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${authUserLocalStorage?.access_token}`;
  const { isLoading: isLoadingFetchAuthUser, data: authUser } = useFetch(url);
  console.log("🚀 ~ file: index.js:17 ~ TopNav ~ authUser:", authUser);

  return (
    <div className="top-nav-container">
      <Logo className="top-nav-logo" />
      <div className="top-nav-chart">
        <div className="chart_img ht_flex">
          <img
            src="https://vinhomes.vn/themes/porto/img/vinhomes/ht/chart.svg"
            alt="vinhomes_chart"
          />
        </div>
        <div className="chart_info_wrapper">
          <span className="chart_text">VHM : HOSE</span>
          <span className="chart_value">
            <div
              id="block-hosevhm"
              className="block block-ht-custom block-hose-vhms"
            >
              <span className="hose_vhm_value">53.900 VNĐ</span>
            </div>
          </span>
        </div>
      </div>
      {authUser ? (
        <span className="top-nav-welcome" onClick={googleLogin}>
          Welcome <b className="top-nav-welcome__username">{authUser?.name}</b>
        </span>
      ) : (
        <img
          className="top-nav-user"
          src="https://vinhomes.vn/themes/porto/img/vinhomes/ht/user.svg"
          alt="vinhomes"
          onClick={googleLogin}
        />
      )}
    </div>
  );
};

export default TopNav;
