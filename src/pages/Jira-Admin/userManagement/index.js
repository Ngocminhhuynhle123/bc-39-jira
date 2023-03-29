import React, { useEffect, useState } from "react";
import { Form, Button, Input, Modal, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actFetchDataListUser } from "./duck/action/action-listUser";
import { FetchAddUser } from "./duck/action/action-createUser";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Loading from "_components/loading";
import { FetchDeleteUser } from "./duck/action/action-deleteUser";
import { FetchEditUser } from "./duck/action/action-editUser";
import FormUser from "./FormUser";

export default function UserManagement() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const props = useSelector((state) => state.listUserReducer);

  //Get data for list User Page Managerment
  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "id",
      sorter: (a, b) => a.userId - b.userId,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div>
          <button
            type="button"
            className="btn btn-warning btn-sm mx-2"
            data-toggle="modal"
            data-target="#User"
            style={{ size: 8 }}
            onClick={() => {
              handleEditUser(record);
            }}
          >
            <EditOutlined />
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => {
              handleDeleteUser(record.userId);
            }}
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];
  const user = useSelector((state) => state.listUserReducer.data);

  useEffect(() => {
    dispatch(actFetchDataListUser());
  }, []);

  const handleDeleteUser = (userId) => {
    Modal.confirm({
      title: "Do you want to delete this user?",
      onOk: () => {
        console.log(userId);
        // tạm thời cancel
        // dispatch(FetchDeleteUser(userId));
      },
    });
  };

  //Form css
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  //Set Form
  const [titleForm, setTitleForm] = useState("Sign up");
  const [isEditForm, setisEditForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleEditUser = (record) => {
    setTitleForm("Edit User");
    setisEditForm(true);
    console.log("dữ liệu vào", record);
    setEditingUser({ ...record });
  };
  console.log(isEditForm);
  console.log("sau khi spread", editingUser);

  const onFinish = (user) => {
    console.log(user);
    if (isEditForm) {
      console.log("editForm", isEditForm);
      // FetchEdit
      // dispatch(FetchEditUser(user));
    } else {
      // Fetch Add
      console.log("adduserlog", isEditForm);
      //tạm thời cancel
      // dispatch(FetchAddUser(user));
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  if (props.loading) return <Loading />;

  return (
    <div className="container">
      <div className="renderListUser">
        <h1 className="title text-center py-2">User Management</h1>
        <button
          className="btn btn-primary btn-sm my-2"
          data-toggle="modal"
          data-target="#User"
          onClick={() => {
            setTitleForm("Sign up");
            setisEditForm(false);
          }}
        >
          <UserAddOutlined /> Add New User
        </button>
        <Table
          rowKey={"userId"}
          columns={columns}
          dataSource={user}
          key={columns.id}
        />
      </div>
      {/* <FormUser user={user} /> */}

      <div className="action-button">
        <div
          className="modal fade"
          id="User"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="container-fuild mr-4">
                <div className="modal-header">
                  <h5 className="modal-title">{titleForm}</h5>
                  <Button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </div>
                <Form
                  {...layout}
                  form={form}
                  name="control-hooks"
                  onFinish={onFinish}
                  style={{
                    maxWidth: 600,
                  }}
                  className={"mt-3"}
                  valu
                >
                  <Form.Item name="id" label="ID" hidden={!isEditForm}>
                    <Input
                      disabled
                      value={() => {
                        if (isEditForm) {
                          return editingUser?.userId;
                        }
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter email",
                      },
                      {
                        type: "email",
                        message: "Please enter a valid email",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Email" value={editingUser?.email} />
                  </Form.Item>
                  <Form.Item
                    name="passWord"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter password",
                      },
                      {
                        min: 8,
                        max: 16,
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                  <Form.Item
                    name="confirm-passWord"
                    label="Confirm Password"
                    dependencies={["passWord"]}
                    rules={[
                      { required: true },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("passWord") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            "Please make sure password match"
                          );
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter User name",
                      },
                      { whitespace: true },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[
                      {
                        required: true,
                      },
                      { whitespace: true },
                    ]}
                  >
                    <Input placeholder="Phone Number" />
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className="mx-2">
                      Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                      Reset
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
