import { Form, Input, Button, Select, Upload, message } from "antd";
import { memo, useEffect, useState } from "react";
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
  const [
    { isLoading: isLoadingProvincesData, data: provinces = [] },
    onGetProvinceList,
  ] = useAPI({
    url: "/provinces",
  });
  console.log(
    "🚀 ~ file: index.js:35 ~ PostNews ~ isLoadingProvincesData:",
    isLoadingProvincesData
  );
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

  const [imageList, setImageList] = useState([]);

  const [form] = Form.useForm();
  // form.setFieldValue("mota", "Mario");

  useEffect(() => {
    onGetProvinceList();
    onGetDistrictList();
    onGetWardList();
  }, []);

  if (!authUser && !isLoadingFetchAuthUser) {
    toast.error("Login Required", {
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
    console.log("values finish", values);
    console.log("form 2", form.getFieldsValue());

    // var reader = new FileReader();
    // reader.onloadend = function () {
    //   // console.log("RESULT", reader.result);
    //   setImageList(reader.result);
    // };
    // reader.readAsDataURL(file);
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
          >
            <Select placeholder="Chọn Tỉnh" loading={isLoadingProvincesData}>
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
              disabled={!form.getFieldValue("province")}
              loading={isLoadingDistrictsData}
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
              disabled={!form.getFieldValue("district")}
              loading={isLoadingWardsData}
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
          <Form.Item
            name="baiviet"
            label="Bài viết"
            rules={[{ required: true }]}
            initialValue=""
          >
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
                setImageList((prev) => [...prev, file]);
                return false;
              }}
              onRemove={(file) => {
                setImageList((prev) => prev.filter((e) => e.uid !== file.uid));
              }}
              multiple
              accept={["image/png", "image/jpeg", "image/png"]}
              defaultFileList={[]}
              fileList={imageList}
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
        <Button type="primary" htmlType="submit">
          Đăng Tin Tức
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(PostNews);
