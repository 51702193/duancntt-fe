import { Layout, Row, Col, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { memo, useCallback, useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

import "./styles.scss";
import HotNews from "./HotNews";
import useAPI from "../../hooks/useAPI";

const { Content } = Layout;
const { Option } = Select;

function MainPage() {
  const [curProvince, setCurProvince] = useState(null);
  const [curDistrict, setCurDistrict] = useState(null);
  const [curWard, setCurWard] = useState(null);

  const [
    { isLoading: isLoadingProvincesData, data: provinces = [] },
    onGetProvinceList,
  ] = useAPI({
    url: "/provinces",
  });
  const [
    { isLoading: isLoadingDistrictsData, data: districts = [] },
    onGetDistrictList,
  ] = useAPI({
    url: "/districts",
  });
  const [{ isLoading: isLoadingWardsData, data: wards = [] }, onGetWardList] =
    useAPI({
      url: "/wards",
    });

  useEffect(() => {
    onGetProvinceList();
    onGetDistrictList();
    onGetWardList();
  }, []);

  const [searchValue, setSearchValue] = useState({
    province: null,
    district: null,
    ward: null,
  });

  const handleSetProvince = useCallback(
    (province) => {
      setCurProvince(provinces?.find((p) => p.provinceId === province));
      setCurDistrict(null);
      setCurWard(null);
    },
    [provinces]
  );

  const handleSetDistrict = useCallback(
    (district) => {
      setCurDistrict(districts?.find((p) => p.districtId === district));
      setCurWard(null);
    },
    [districts]
  );

  const handleSetWard = useCallback(
    (ward) => {
      setCurWard(wards?.find((p) => p.wardId === ward));
    },
    [wards]
  );

  const { isLoading, data } = {
    isLoading: true,
    data: [
      {
        id: "1",
        tenduan: "tenduan",
        dientich: "dientich",
        vitri: "vitri",
        created_date: "created_date",
      },
      {
        id: "2",
        tenduan: "tenduan",
        dientich: "dientich",
        vitri: "vitri",
        created_date: "created_date",
      },
      {
        id: "3",
        tenduan: "tenduan",
        dientich: "dientich",
        vitri: "vitri",
        created_date: "created_date",
      },
    ],
  };
  return (
    <Content>
      <div
        style={{
          position: "absolute",
          top: "1rem",
          zIndex: 9999,
          left: "99%",
          transform: "translateX(-100%)",
        }}
      >
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            localStorage.setItem("auth", credentialResponse.credential);
          }}
          useOneTap
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>

      <div className="home-banner">
        <Row gutter={24} className="search-banner">
          <Col>
            <div className="container">
              <div className="title">Tỉnh / Thành Phố</div>
              <Select
                placeholder="Chọn Tỉnh / Thành Phố"
                onChange={handleSetProvince}
                loading={isLoadingProvincesData}
                disabled={isLoadingProvincesData}
              >
                {provinces.map((province) => (
                  <Option key={province.provinceId} value={province.provinceId}>
                    {province.province}
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
                onChange={handleSetDistrict}
                disabled={curProvince === null || isLoadingDistrictsData}
              >
                {districts.map((district) => (
                  <Option key={district.districtId} value={district.districtId}>
                    {district.district}
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
                onChange={handleSetWard}
                disabled={curDistrict === null || isLoadingWardsData}
              >
                {wards.map((ward) => (
                  <Option key={ward.wardId} value={ward.wardId}>
                    {ward.ward}
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
                href={`search?province=${curProvince}&district=${curDistrict}&ward=${curWard}}`}
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
        <div className="dailynews-banner__body">
          {!data ? (
            <div style={{ fontSize: "25px", fontWeight: 600 }}>
              Hiện không có tin tức
            </div>
          ) : (
            data?.map((tintuc, idx) => {
              const ViewDetailsUrl = `/view-details/${tintuc.id}`;
              return (
                <div className="home-product" key={tintuc.id}>
                  <div className="product-thumb">
                    <a href={ViewDetailsUrl}>
                      <img
                        className="ls-is-cached lazyloaded"
                        alt="first-img"
                        // src={`${BE_API_DEFAULT_ROUTE}/file/download/${
                        //   tintuc?.images?.split(",")?.[0]
                        // }`}
                        src={"https://picsum.photos/1000"}
                      />
                    </a>
                  </div>
                  <div className="home-product-bound">
                    <a href="/" className="product-address">
                      {tintuc.vitri}
                    </a>
                    <a href={ViewDetailsUrl} className="product-title">
                      {tintuc.tenduan}
                    </a>

                    <div class="product-desc">
                      Tiên phong mang đến trải nghiệm số lý tưởng giữa lòng đô
                      thị với những khu dân cư được quy hoạch chuyên nghiệp,
                      tiện ích dịch vụ đồng bộ.
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="dailynews-banner__footer">
          <a href="/cong-dong-du-an">
            <button class="btn btn-outline-primary">XEM TẤT CẢ</button>
          </a>
        </div>
      </div>
    </Content>
  );
}

export default memo(MainPage);
