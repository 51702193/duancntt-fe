/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, Row, Col, Select, Button } from "antd";
import { memo, useCallback, useEffect, useState } from "react";

import "./styles.scss";
import HotNews from "./HotNews";
import useAPI from "../../hooks/useAPI";
import ListDuAn from "../../components/ListDuAn";
import SearchBanner from "../../components/SearchBanner";
import { TINTUC_STATUS } from "../../constants";

const { Content } = Layout;

function MainPage() {
  return (
    <Content className="landing-page">
      <div className="home-banner">
        <SearchBanner />
      </div>

      <HotNews />

      <div className="dailynews-banner">
        <div className="dailynews-banner__top">
          <h2 className="title">Bất động sản dành cho bạn</h2>
        </div>
        <div className="dailynews-banner__body">
          <ListDuAn
            filter={{
              status: TINTUC_STATUS.APPROVED,
            }}
          />
        </div>
        <div className="dailynews-banner__footer">
          <a href="/cong-dong-du-an">
            <button className="btn btn-outline-primary">XEM TẤT CẢ</button>
          </a>
        </div>
      </div>
    </Content>
  );
}

export default memo(MainPage);
