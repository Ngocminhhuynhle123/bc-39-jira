import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { Form, Input } from "antd";

function MyProfile() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="container">
        <h2 className="text-uppercase">My Profile</h2>

        <div className="text-center">
          <div className="mw-50 p-3 mt-5">
            <Space size={16} wrap>
              <Avatar
                size={64}
                style={{
                  backgroundColor: "#87d068",
                }}
                icon={<UserOutlined />}
              />
            </Space>

            <h3>Tên User</h3>
            <a
              type="button"
              className="btn btn-secondary mx-2"
              data-toggle="modal"
              data-target="#EditMyProfile"
              href="/"
            >
              Edit My Profile
            </a>
            <div className="container">
              <div className="my-3">My ID: </div>
              <div className="my-3">Email:</div>
              <div className="my-3">Password: </div>
              <div className="my-3">Phone Number: </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          className="modal fade"
          id="EditMyProfile"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <Form
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    maxWidth: 600,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item label="Your ID" name="ID">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
