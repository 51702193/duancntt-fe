import React, { useCallback, useEffect, useMemo, useState } from "react";
import useAPI from "../../hooks/useAPI";
import { Button, Col, Row, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const SearchBanner = ({ onChange, filter }) => {
  const [curProvince, setCurProvince] = useState(filter?.province);
  const [curDistrict, setCurDistrict] = useState(filter?.district);
  const [curWard, setCurWard] = useState(filter?.ward);

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
  }, []);

  useEffect(() => {
    onGetDistrictList({ data: { province: curProvince } });
  }, [curProvince]);

  useEffect(() => {
    onGetWardList({ data: { district: curDistrict } });
  }, [curDistrict]);

  const searchResult = useMemo(
    () => ({ province: curProvince, district: curDistrict, ward: curWard }),
    [curProvince, curDistrict, curWard]
  );

  useEffect(() => {
    if (onChange) {
      onChange(searchResult);
    }
  }, [searchResult, onChange]);

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
    <Row gutter={24} className="search-banner">
      <Col>
        <div className="container">
          <div className="title">Tỉnh / Thành Phố</div>
          <Select
            placeholder="Chọn Tỉnh / Thành Phố"
            onChange={handleSetProvince}
            loading={isLoadingProvincesData}
            disabled={isLoadingProvincesData}
            value={curProvince}
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
            value={curDistrict}
          >
            {districts?.map((district) => (
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
            value={curWard}
          >
            {wards?.map((ward) => (
              <Option key={`ward${ward.wardId}`} value={ward.wardId}>
                {ward.ward}
              </Option>
            ))}
          </Select>
        </div>
      </Col>
      <Col>
        <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
          <Button
            href={`cong-dong-du-an?filter=${btoa(
              JSON.stringify(searchResult)
            )}`}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default SearchBanner;
