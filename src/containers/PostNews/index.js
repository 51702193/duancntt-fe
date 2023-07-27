import { Form, Input, Button, Select, Upload, message } from "antd";
import { memo, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";

import "./styles.scss";
import LexicalEditor from "../../components/LexicalEditor";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const user = null;
  const districts = [];
  const provinces = [];
  const streets = [];
  const wards = [];

  const [curPorvince, setCurProvice] = useState(null);
  const [curDistrict, setCurDistrict] = useState(null);

  const [form] = Form.useForm();
  // form.setFieldValue("mota", "Mario");

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

  const handleSetProvince = (provice) => {
    setCurProvice(provice);
    // dispatch(callDistricts(provice));
  };

  const handleSetDistrict = (district) => {
    setCurDistrict(district);
    // dispatch(callStreets(district));
    // dispatch(callWards(district));
  };

  const onFinish = (values) => {
    console.log("values finish", values);
    console.log("form 2", form.getFieldsValue());
  };

  // const draggerProps = {
  //   name: "file",
  //   multiple: true,
  //   action: `${BE_API_DEFAULT_ROUTE}/file/upload`,
  //   beforeUpload: (file) => {
  //     const fileType = ["image/png", "image/jpeg", "image/png"];
  //     if (!["image/png", "image/jpeg", "image/png"].includes(file.type)) {
  //       message.error(`please using PNG, jpg, jpeg file`);
  //     }
  //     return fileType.includes(file.type) ? true : Upload.LIST_IGNORE;
  //   },
  //   onChange(info) {
  //     const { status } = info.file;
  //     if (status === "done") {
  //       info.file.fileName = info.file.xhr.response;
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  // return <LexicalEditor />;

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
            name={["information1", "tenduan"]}
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
            <Select placeholder="Chọn Tỉnh" onChange={handleSetProvince}>
              {provinces.map((province) => (
                <Option key={province.code} value={province.code}>
                  {province.name}
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
              onChange={handleSetDistrict}
              disabled={curPorvince === null}
            >
              {districts.map((district) => (
                <Option key={district.id} value={district.id}>
                  {district.name}
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
              disabled={curDistrict === null}
            >
              {wards.map((ward) => (
                <Option key={ward.id} value={ward.id}>
                  {ward.name}
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
            <Upload.Dragger //{...draggerProps}
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
