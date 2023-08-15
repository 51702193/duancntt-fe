import { Form, Input, Button, Select, Upload, message } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";

import "./styles.scss";
import LexicalEditor from "../../components/LexicalEditor";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAPI from "../../hooks/useAPI";

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const PostNews = ({ authUser, isLoadingFetchAuthUser }) => {
  const [curProvince, setCurProvince] = useState(null);
  const [curDistrict, setCurDistrict] = useState(null);
  const [curWard, setCurWard] = useState(null);
  const [imageList, setImageList] = useState([]);

  const [form] = Form.useForm();
  const province = Form.useWatch("province", form);
  const district = Form.useWatch("district", form);
  // form.setFieldValue("mota", "Mario");

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
  const [
    { isLoading: isLoadingPostFormData, data: formDataResponse = {} },
    onPostFormData,
  ] = useAPI({
    url: "/dang-tin-tuc",
    method: "post",
  });
  console.log(
    "🚀 ~ file: index.js:49 ~ PostNews ~ formDataResponse:",
    formDataResponse
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
      form.setFieldValue("district", null);
      form.setFieldValue("ward", null);
    },
    [provinces]
  );

  const handleSetDistrict = useCallback(
    (district) => {
      setCurDistrict(
        districts?.find((p) => p.districtId === district)?.districtId
      );
      setCurWard(null);
      form.setFieldValue("ward", null);
    },
    [districts]
  );

  const handleSetWard = useCallback(
    (ward) => {
      setCurWard(wards?.find((p) => p.wardId === ward)?.wardId);
    },
    [wards]
  );

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

  const onFinish = (values) => {
    // console.log("values finish", values, imageList);
    onPostFormData({
      data: { ...values, images: imageList?.map((e) => e.base64) },
      callback: () => {
        toast.success("Đăng tin tức thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
    });
  };

  return (
    <Form
      {...layout}
      onFinish={onFinish}
      validateMessages={validateMessages}
      form={form}
    >
      <div className="dangtin__container">
        <div className="title">Thông tin cơ bản</div>
        <div className="content">
          <Form.Item
            name="tenduan"
            label="Tên Dự Án"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="province"
            label="Tỉnh - Thành Phố"
            rules={[{ required: true }]}
            disabled={isLoadingProvincesData}
          >
            <Select
              placeholder="Chọn Tỉnh"
              loading={isLoadingProvincesData}
              disabled={isLoadingProvincesData}
              value={curProvince}
              onChange={handleSetProvince}
            >
              {provinces.map((province) => (
                <Option
                  key={`province${province.provinceId}`}
                  value={province.provinceId}
                >
                  {province.province}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="district"
            label="Quận - Huyện"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Chọn Quận"
              disabled={!province || isLoadingDistrictsData}
              loading={isLoadingDistrictsData}
              value={curDistrict}
              onChange={handleSetDistrict}
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
          </Form.Item>
          <Form.Item
            name="ward"
            label="Phường - Xã"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Chọn Phường - Xã"
              disabled={!district || isLoadingWardsData}
              loading={isLoadingWardsData}
              value={curWard}
              onChange={handleSetWard}
            >
              {wards.map((ward) => (
                <Option key={`ward${ward.wardId}`} value={ward.wardId}>
                  {ward.ward}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="motanhanh"
            label="Mô tả nhanh"
            rules={[{ required: true }]}
            initialValue=""
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="baiviet" label="Bài viết" initialValue="">
            <LexicalEditor
              onValuesChange={(value) => {
                form.setFieldValue("baiviet", value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="images"
            label="Hình Ảnh"
            rules={[{ required: true }]}
          >
            <Upload.Dragger
              beforeUpload={(file) => {
                if (imageList.length >= 5) {
                  return false;
                }

                var reader = new FileReader();
                reader.onloadend = function () {
                  // console.log("RESULT", reader.result);
                  setImageList((prev) => [
                    ...prev,
                    { file: file, base64: reader.result },
                  ]);
                };
                reader.readAsDataURL(file);
                return false;
              }}
              onRemove={(file) => {
                setImageList((prev) =>
                  prev.filter((e) => e.file.uid !== file.uid)
                );
              }}
              multiple
              accept={["image/png", "image/jpeg", "image/png"]}
              defaultFileList={[]}
              fileList={imageList?.map((e) => e.file)}
              maxCount={5}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </div>
      </div>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
        <Button
          disabled={isLoadingPostFormData}
          type="primary"
          htmlType="submit"
        >
          Đăng Tin Tức
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(PostNews);
