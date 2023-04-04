import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actFetchDataListUser } from "./duck/action/action-listUser";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Loading from "_components/loading";
import { FetchDeleteUser } from "./duck/action/action-deleteUser";
import { FetchEditUser } from "./duck/action/action-editUser";
import { FetchAddUser } from "./duck/action/action-createUser";
import { actFetchUserById } from "./duck/action/action-getUserById";

import { useForm } from "react-hook-form";

export default function UserManagement() {
  const dispatch = useDispatch();
  // const [form] = Form.useForm();
  const { register, setValue, handleSubmit, reset } = useForm({
    defaultValues: {
      id: "",
      email: "@gmail.com",
      passWord: "",
      name: "BC39-QH",
      phoneNumber: "09884546513",
    },
  });
  const user = useSelector((state) => state.listUserReducer.data);
  const userById = useSelector((state) => state.getUserByIdReducer.data);

  useEffect(() => {
    dispatch(actFetchDataListUser());
  }, [dispatch]);

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
      render: (_text, record) => (
        <Space>
          <button
            type="button"
            className="btn btn-warning btn-sm mx-2"
            data-toggle="modal"
            data-target="#User"
            style={{ size: 8 }}
            onClick={() => {
              handleEditUser(record);
              setValue("id", record.userId);
              setValue("email", record.email);
              setValue("name", record.name);
              setValue("phoneNumber", record.phoneNumber);
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
        </Space>
      ),
    },
  ];

  const handleDeleteUser = (userId) => {
    Modal.confirm({
      title: "Do you want to delete this user?",
      onOk: () => {
        console.log(userId);
        // tạm thời cancel
        // dispatch(FetchDeleteUser(userId), []);

        // reset lại list
        // dispatch(actFetchDataListUser());
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

  const handleEditUser = (record) => {
    dispatch(actFetchUserById(record.userId));
    setTitleForm("Edit User");
    setisEditForm(true);
  };

  const handleAPI = (user) => {
    if (isEditForm) {
      console.log("Là edit", isEditForm);
      console.log(user);

      // FetchEdit
      // dispatch(FetchEditUser(user), []);
    } else {
      // Fetch Add
      console.log("Không phải edit", isEditForm);
      console.log(user);

      //tạm thời cancel
      // dispatch(FetchAddUser(user), []);
    }
  };

  if (!user) return <Loading />;

  return (
    <div className="container">
      <div className="renderListUser">
        <h1 className="title text-center py-2 text-uppercase">
          User Management
        </h1>
        <button
          className="btn btn-primary btn-sm my-2 text-uppercase"
          data-toggle="modal"
          data-target="#User"
          onClick={() => {
            setTitleForm("Sign up");
            setisEditForm(false);
            reset();
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

                <form
                  className="register-form text-center my-3"
                  onSubmit={handleSubmit((data) => handleAPI(data))}
                >
                  <div className="form-group row " hidden={!isEditForm}>
                    <label className="col-5 text-right">User ID</label>

                    <input className="col-7" {...register("id")} disabled />
                  </div>
                  <div className="form-group row">
                    <label className="col-5 text-right">Email</label>
                    <input
                      className="col-7"
                      {...register(
                        "email",
                        {
                          required: true,
                        },
                        { pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" },
                        {
                          onChange: (e) => console.log(e.target),
                          onBlur: (e) => console.log(e),
                        }
                      )}
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group row" hidden={isEditForm}>
                    <label className="col-5 text-right">Password</label>

                    <input
                      className="col-7"
                      {...register(
                        "passWord",
                        {
                          // pattern: "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$",
                        },
                        {
                          onChange: (e) => console.log(e),
                        }
                      )}
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group row" hidden={isEditForm}>
                    <label className="col-5 text-right">Comfirm Password</label>
                    <input className="col-7" placeholder="Password" />
                  </div>
                  <div className="form-group row">
                    <label className="col-5 text-right">Name</label>

                    <input
                      className="col-7"
                      {...register(
                        "name",
                        {
                          required: true,
                        },
                        {
                          onChange: (e) => console.log(e),
                        }
                      )}
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group row">
                    <label className="col-5 text-right">Phone Number</label>
                    <input
                      className="col-7"
                      {...register(
                        "phoneNumber",
                        {
                          required: true,
                        },
                        {
                          onChange: (e) => console.log(e),
                        }
                      )}
                      placeholder="Phone Number"
                    />
                  </div>

                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Submit"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// accessToken:"eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJwaHF1b2Nob2lAZ21haWwuY29tIiwibmJmIjoxNjgwMzUzNDg1LCJleHAiOjE2ODAzNTcwODV9.GvQvXpqpD14iwYPjZFo864Zh7vqgq1NTTTAyDIZ3Id0";
