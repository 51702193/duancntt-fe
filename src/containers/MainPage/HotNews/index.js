import { Carousel, Col, Row } from "antd";
import React from "react";

import "./styles.scss";

const HotNews = ({ autoplay }) => {
  return (
    <div className="hot-news">
      <div className="hot-news__title">DỰ ÁN MỚI NHẤT</div>
      <div className="hot-news__content">
        Tiên phong mang đến trải nghiệm sống lý tưởng giữa lòng đô thị với những
        khu dân cư được quy hoạch chuyên nghiệp, tiện ích dịch vụ đồng bộ, môi
        trường xanh sạch, giúp định hình phong cách sống mới cho người dân Việt
        Nam.
      </div>
      <div className="hot-news__carousel">
        <Carousel autoplay={autoplay} dots={false}>
          <div className="hot-news__content__carousel">
            <Row>
              <Col span={12}>
                <div className="slogan">Bất động sản quốc lộ 50</div>
                <h1 className="pj-title">
                  CÁC DỰ ÁN BẬC NHẤT <br /> Ở QUỐC LỘ 50
                </h1>
                <div className="desc">
                  Kiến tạo nên một Thành phố mới với Thiên nhiên – Cuộc sống và
                  Con người với một diện mạo mới mẻ và tinh thần hứng khởi, sẵn
                  sàng cho những trải nghiệm tưởng không thể mà lại là có thể.
                </div>
                <a href="/view-all" className="link">
                  KHÁM PHÁ DỰ ÁN
                </a>
              </Col>
              <Col span={12}>
                <a href="/view-all">
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src="https://storage.googleapis.com/vinhomes-data-01/styles/images_870_x_530/public/2021_02/Secton 1 (Headbanner)_2.jpg?itok=XlBvEIRS"
                    alt="VINHOMES <br> OCEAN PARK"
                  />
                </a>
              </Col>
            </Row>
          </div>
          <div className="hot-news__content__carousel">
            <Row>
              <Col span={12}>
                <div className="slogan">Bất động sản quốc lộ 50</div>
                <h1 className="pj-title">
                  CÁC DỰ ÁN BẬC NHẤT <br /> Ở QUỐC LỘ 50
                </h1>
                <div className="desc">
                  Kiến tạo nên một Thành phố mới với Thiên nhiên – Cuộc sống và
                  Con người với một diện mạo mới mẻ và tinh thần hứng khởi, sẵn
                  sàng cho những trải nghiệm tưởng không thể mà lại là có thể.
                </div>
                <a href="/view-all" className="link">
                  KHÁM PHÁ DỰ ÁN
                </a>
              </Col>
              <Col span={12}>
                <a href="/view-all">
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src="https://storage.googleapis.com/vinhomes-data-01/styles/images_870_x_530/public/2021_02/Secton 1 (Headbanner)_2.jpg?itok=XlBvEIRS"
                    alt="VINHOMES <br> OCEAN PARK"
                  />
                </a>
              </Col>
            </Row>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default HotNews;
