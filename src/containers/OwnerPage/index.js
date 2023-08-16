import { Layout } from "antd";
import { memo } from "react";

import "./styles.scss";
import ListDuAn from "../../components/ListDuAn";

const { Content } = Layout;

function OwnerPage({ userMail }) {
  return (
    <Content className="view-all-page">
      <div className="dailynews-banner">
        <div className="dailynews-banner__top">
          <h2 className="title">Danh sách dự án của bạn</h2>
        </div>
        <div className="dailynews-banner__body">
          <ListDuAn
            userMail={userMail}
            isOwnerView
            filter={{
              user: userMail,
              pageSize: 99,
            }}
          />
        </div>
      </div>
    </Content>
  );
}

export default memo(OwnerPage);
