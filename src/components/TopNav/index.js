import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { Dropdown, Space } from "antd";

import { ReactComponent as Logo } from "./logo.svg";

import "./styles.scss";

const TopNav = ({ authUser, isLoadingFetchAuthUser, isAdmin }) => {
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

  const items = [
    {
      key: "DropdownTopNav-1",
      label: <span onClick={googleLogin}>Đổi tài khoản</span>,
    },
    {
      key: "DropdownTopNav-2",
      label: (
        <span
          onClick={() => {
            localStorage.removeItem("auth");
            window.location.reload();
          }}
        >
          Đăng xuất
        </span>
      ),
    },
  ];

  return (
    <div className="top-nav-container">
      <Logo
        onClick={() => window.location.replace("/")}
        className="top-nav-logo"
      />
      <div className="top-nav-navigator">
        <a
          rel="nofollow"
          className="flex-vertical ht_relative ht_transition nav-link"
          href="/dang-tin-tuc"
        >
          Đăng tin tức
        </a>
        <a
          rel="nofollow"
          className="flex-vertical ht_relative ht_transition nav-link"
          href="/cong-dong-du-an"
        >
          Cộng đồng dự án
        </a>
        {isAdmin && (
          <a
            rel="nofollow"
            className="flex-vertical ht_relative ht_transition nav-link"
            href="/admin"
          >
            Duyệt bài đăng
          </a>
        )}
      </div>
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
        <Dropdown menu={{ items }}>
          <span className="top-nav-welcome" onClick={googleLogin}>
            Welcome{" "}
            <b className="top-nav-welcome__username">{authUser?.name}</b>
          </span>
        </Dropdown>
      ) : (
        <img
          className="top-nav-user"
          src="https://vinhomes.vn/themes/porto/img/vinhomes/ht/user.svg"
          alt="vinhomes"
          style={isLoadingFetchAuthUser ? { cursor: "not-allowed" } : {}}
          onClick={isLoadingFetchAuthUser ? () => {} : googleLogin}
        />
      )}
    </div>
  );
};

export default TopNav;
