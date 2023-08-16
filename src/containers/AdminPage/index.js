import { Layout } from "antd";
import { memo } from "react";

import "./styles.scss";
import { useSearchParams } from "react-router-dom";
import ListDuAn from "../../components/ListDuAn";
import SearchBanner from "../../components/SearchBanner";
import { TINTUC_STATUS } from "../../constants";

const { Content } = Layout;

function AdminPage({ isAdmin }) {
  const [searchParams] = useSearchParams();
  const filter = JSON.parse(atob(searchParams.get("filter") || "e30="));

  return (
    <Content className="view-all-page">
      <div className="home-banner">
        <SearchBanner />
      </div>

      <div className="dailynews-banner">
        <div className="dailynews-banner__top">
          <h2 className="title">Danh sách dự án</h2>
        </div>
        <div className="dailynews-banner__body">
          <ListDuAn
            isAdmin={isAdmin}
            filter={{
              ...filter,
              pageSize: 99,
              status: TINTUC_STATUS.SUBMITTED,
            }}
          />
        </div>
        {/* <div className="dailynews-banner__footer">
          <Pagination
            pageSize={9}
            total={50}
            onChange={(e) => {
              console.log("asdasd", e);
            }}
          />
        </div> */}
      </div>
    </Content>
  );
}

export default memo(AdminPage);
