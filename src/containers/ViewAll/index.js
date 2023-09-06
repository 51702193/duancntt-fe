import { Layout } from "antd";
import { memo } from "react";

import "./styles.scss";
import { useSearchParams } from "react-router-dom";
import ListDuAn from "../../components/ListDuAn";
import SearchBanner from "../../components/SearchBanner";
import { TINTUC_STATUS } from "../../constants";

const { Content } = Layout;

function ViewAll() {
  const [searchParams] = useSearchParams();
  const filter = JSON.parse(atob(searchParams.get("filter") || "e30="));

  return (
    <Content className="view-all-page">
      <div className="home-banner">
        <SearchBanner filter={filter} />
      </div>

      <div className="dailynews-banner">
        <div className="dailynews-banner__top">
          <h2 className="title">Cộng Đồng Dự Án</h2>
        </div>
        <div className="dailynews-banner__body">
          <ListDuAn
            filter={{ ...filter, pageSize: 99, status: TINTUC_STATUS.APPROVED }}
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

export default memo(ViewAll);
