/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, Row, Col, Select, Button, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { memo, useCallback, useEffect, useState } from "react";

import "./styles.scss";
import useAPI from "../../hooks/useAPI";
import useFetch from "react-fetch-hook";
import { useSearchParams } from "react-router-dom";

const { Content } = Layout;
const { Option } = Select;

function ViewAll() {
  const [curProvince, setCurProvince] = useState(null);
  const [curDistrict, setCurDistrict] = useState(null);
  const [curWard, setCurWard] = useState(null);

  const [searchParams] = useSearchParams();
  const filter = JSON.parse(atob(searchParams.get("filter") || "e30="));

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
  const { isLoadingTopDuAn, data: topDuAn } = useFetch(
    "https://dacntt2-n092-be.netlify.app/.netlify/functions/api/top-du-an"
  );

  useEffect(() => {
    onGetProvinceList();
    onGetDistrictList();
    onGetWardList();
  }, []);

  const handleSetProvince = useCallback(
    (province) => {
      setCurProvince(
        provinces?.find((p) => p.provinceId === province)?.provinceId
      );
      setCurDistrict(null);
      setCurWard(null);
    },
    [provinces]
  );

  const handleSetDistrict = useCallback(
    (district) => {
      setCurDistrict(
        districts?.find((p) => p.districtId === district)?.districtId
      );
      setCurWard(null);
    },
    [districts]
  );

  const handleSetWard = useCallback(
    (ward) => {
      setCurWard(wards?.find((p) => p.wardId === ward)?.wardId);
    },
    [wards]
  );

  return (
    <Content className="view-all-page">
      <div className="home-banner">
        <Row gutter={24} className="search-banner">
          {/* <Col span={24}>
            <input
              className="search-input"
              type="search"
              name="cd_ser"
              placeholder="Hãy nhập từ khóa cần tìm kiếm."
              onChange={(e) => setFilter((prev) => ({ ...prev, keyword: e }))}
            />
          </Col> */}
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
                  <Option
                    key={`district${district.districtId}`}
                    value={district.districtId}
                  >
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
                  <Option key={`ward${ward.wardId}`} value={ward.wardId}>
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
                href={`cong-dong-du-an?filter=${btoa(
                  JSON.stringify({
                    province: curProvince,
                    district: curDistrict,
                    ward: curWard,
                  })
                )}`}
                icon={<SearchOutlined />}
              >
                Search
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <div className="dailynews-banner">
        <div className="dailynews-banner__top">
          <h2 className="title">Cộng Đồng Dự Án</h2>
        </div>
        <div className="dailynews-banner__body">
          {!topDuAn ? (
            <div style={{ fontSize: "25px", fontWeight: 600 }}>
              Hiện không có tin tức
            </div>
          ) : (
            topDuAn?.map((tintuc, idx) => {
              const ViewDetailsUrl = `/duan/${tintuc.id}`;
              return (
                <div className="home-product" key={tintuc.id}>
                  <div className="product-thumb">
                    <a href={ViewDetailsUrl}>
                      <img
                        className="ls-is-cached lazyloaded"
                        alt="first-img"
                        src={tintuc.image}
                      />
                    </a>
                  </div>
                  <div className="home-product-bound">
                    <a href={ViewDetailsUrl} className="product-address">
                      {tintuc.vitri}
                    </a>
                    <a href={ViewDetailsUrl} className="product-title">
                      {tintuc.tenduan}
                    </a>

                    <div className="product-desc">{tintuc.mota}</div>
                  </div>
                </div>
              );
            })
          )}
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
