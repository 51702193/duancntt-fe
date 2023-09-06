import { Layout, Spin } from "antd";
import { memo } from "react";

import "./styles.scss";
import ListDuAn from "../../components/ListDuAn";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const { Content } = Layout;

function OwnerPage({ authUser, isLoadingFetchAuthUser, userMail }) {
  if (!authUser && !isLoadingFetchAuthUser) {
    toast.error("Bạn hãy đăng nhập để trải nghiệm tính năng nha!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    return <Navigate to="/" replace />;
  }

  return (
    <Content className="view-all-page">
      <div className="dailynews-banner">
        <div className="dailynews-banner__top">
          <h2 className="title">Danh sách dự án của bạn</h2>
        </div>
        <div className="dailynews-banner__body">
          {isLoadingFetchAuthUser ? (
            <section className="loading-screen">
              <Spin size="large" />
            </section>
          ) : (
            <ListDuAn
              userMail={userMail}
              isOwnerView
              filter={{
                user: userMail,
                pageSize: 99,
              }}
            />
          )}
        </div>
      </div>
    </Content>
  );
}

export default memo(OwnerPage);
