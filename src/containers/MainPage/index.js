import { Layout, Row, Col, Carousel, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { memo, useEffect, useState } from "react";
// import useFetch from "react-fetch-hook";

// import { useDispatch, useSelector } from 'react-redux';
// import {
//   callProvinces,
//   callDistricts,
//   callStreets,
//   callWards,
// } from "redux/actions/mainPage";
// import {
//   getDistrictsmainPage,
//   getProvincesmainPage,
//   getStreetsmainPage,
//   getWardsmainPage,
// } from "redux/selectors";

import "./styles.scss";
import HotNews from "./HotNews";
import useAPI from "../../hooks/useAPI";

const { Content } = Layout;
const { Option } = Select;

function MainPage({ BE_API_DEFAULT_ROUTE }) {
  const instance = useAPI();
  // const dispatch = useDispatch()

  // useEffect(() => {
  //     dispatch(callProvinces())
  // }, [])

  // const districts = useSelector(getDistrictsmainPage);
  // const provinces = useSelector(getProvincesmainPage);
  // const streets = useSelector(getStreetsmainPage);
  // const wards = useSelector(getWardsmainPage);

  const districts = [];
  const provinces = [];
  const streets = [];
  const wards = [];

  const [curPorvince, setCurProvice] = useState(null);
  const [curDistrict, setCurDistrict] = useState(null);
  const [curWard, setCurWard] = useState(null);
  const [curStreet, setCurStreet] = useState(null);

  const [searchValue, setSearchValue] = useState({
    province: null,
    district: null,
    ward: null,
    street: null,
  });

  const handleSetProvince = (provice) => {
    // setCurProvice(provice);
    // dispatch(callDistricts(provice));
    // setCurDistrict(null);
    // setCurWard(null);
    // setCurStreet(null);
  };

  const handleSetDistrict = (district) => {
    // setCurDistrict(district);
    // dispatch(callStreets(district));
    // dispatch(callWards(district));
    // setCurWard(null);
    // setCurStreet(null);
  };

  //   const { isLoading, data } = useFetch(`${BE_API_DEFAULT_ROUTE}/tintuc/top`);
  const { isLoading, data } = { isLoading: true, data: undefined };
  return (
    <Content>
      <div className="home-banner">
        {/* <img
          alt="home-banner"
          src="https://storage.googleapis.com/vinhomes-data-01/3.jpg"
          style={{ width: "100%" }}
        /> */}
        <Row gutter={24} className="search-banner">
          <Col>
            <div className="container">
              <div className="title">Tỉnh / Thành Phố</div>
              <Select
                placeholder="Chọn Tỉnh / Thành Phố"
                onChange={handleSetProvince}
              >
                {provinces.map((province) => (
                  <Option key={province.code} value={province.code}>
                    {province.name}
                  </Option>
                ))}
              </Select>
            </div>
          </Col>
          <Col>
            <div className="container">
              <div className="title">Quận Huyện</div>
              <Select
                placeholder="Chọn Quận Huyện"
                value={curDistrict}
                onChange={handleSetDistrict}
                disabled={curPorvince === null}
              >
                {districts.map((district) => (
                  <Option key={district.id} value={district.id}>
                    {district.name}
                  </Option>
                ))}
              </Select>
            </div>
          </Col>
          <Col>
            <div className="container">
              <div className="title">Phường - Xã</div>
              <Select
                placeholder="Chọn Phường - Xã"
                value={curWard}
                onChange={setCurWard}
                disabled={curDistrict === null}
              >
                {wards.map((ward) => (
                  <Option key={ward.id} value={ward.id}>
                    {ward.name}
                  </Option>
                ))}
              </Select>
            </div>
          </Col>
          <Col>
            <div
              style={{ height: "100%", display: "flex", alignItems: "center" }}
            >
              <Button
                href={`search?province=${curPorvince}&district=${curDistrict}&ward=${curWard}&street=${curStreet}`}
                icon={<SearchOutlined />}
              >
                Search
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <HotNews autoplay />

      <div className="dailynews-banner">
        <div className="dailynews-banner__top">
          <h2 className="title">Bất động sản dành cho bạn</h2>
        </div>
        <Row gutter={[16, 24]} className="dailynews-banner__body">
          {!data ? (
            <div style={{ fontSize: "25px", fontWeight: 600 }}>
              Hiện không có tin tức
            </div>
          ) : (
            data?.map((tintuc) => {
              const ViewDetailsUrl = `/view-details/${tintuc.id}`;
              return (
                <Col className="home-product" span={6} key={tintuc.id}>
                  <div className="product-thumb ">
                    <a href={ViewDetailsUrl}>
                      <img
                        className=" ls-is-cached lazyloaded"
                        alt="first-img"
                        src={`${BE_API_DEFAULT_ROUTE}/file/download/${
                          tintuc.images.split(",")[0]
                        }`}
                      />
                    </a>
                  </div>
                  <div className="home-product-bound">
                    <a href={ViewDetailsUrl} className="product-title">
                      {tintuc.tenduan}
                    </a>
                    <div className="product-price">{tintuc.dientich}</div>
                    <a href="/" className="product-address">
                      {tintuc.vitri}
                    </a>
                    <div className="product-date">{tintuc.created_date}</div>
                  </div>
                </Col>
              );
            })
          )}
        </Row>
      </div>
    </Content>
  );
}

export default memo(MainPage);
