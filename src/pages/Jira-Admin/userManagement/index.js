import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loading from "_components/loading";
import { useForm } from "react-hook-form";
import { actFetchDataListUser } from "./duck/action/action-listUser";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { FetchDeleteUser } from "./duck/action/action-deleteUser";
import { FetchEditUser } from "./duck/action/action-editUser";
import { FetchAddUser } from "./duck/action/action-createUser";
import { actFetchUserById } from "./duck/action/action-getUserById";

export default function UserManagement() {
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      email: "@gmail.com",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
  });
  const user = useSelector((state) => state.listUserReducer.data);
  const [titleForm, setTitleForm] = useState("Sign up");
  const [isEditForm, setisEditForm] = useState(false);

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
        dispatch(FetchDeleteUser(userId), []);
      },
    });
  };

  const handleEditUser = (record) => {
    dispatch(actFetchUserById(record.userId));
    setTitleForm("Edit User");
    setisEditForm(true);
  };

  const handleAPI = (user) => {
    if (isEditForm) {
      // FetchEdit
      dispatch(FetchEditUser(user), [dispatch(actFetchDataListUser())]);
    } else {
      // Fetch Add
      dispatch(FetchAddUser(user), [dispatch(actFetchDataListUser())]);
    }
  };

  if (!user) return <Loading />;

  return (
    <div className="container">
      <div className="renderListUser">
        <h2 className="title text-center py-2 text-uppercase">
          User Management
        </h2>
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
              <div className="container-fuild px-3">
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
                <div className="form">
                  <form
                    className="register-form text-center my-3"
                    onSubmit={handleSubmit((data) => handleAPI(data))}
                  >
                    <div
                      className="form-group text-center"
                      hidden={!isEditForm}
                    >
                      <div className="row">
                        <label className="col-lg-4 col-md-6 col-xs-12">
                          User ID
                        </label>
                        <div className="col-lg-8 col-md-6 col-12">
                          <input
                            className=" form-control"
                            {...register("id")}
                            disabled
                          />{" "}
                        </div>
                      </div>
                    </div>

                    <div className="form-group text-center">
                      <div className="row">
                        <label className="col-lg-4 col-md-6 col-12">
                          User Name
                        </label>

                        <div className="col-lg-8 col-md-6 col-12 ">
                          <input
                            className="form-control"
                            {...register("name", {
                              required: true,
                            })}
                            placeholder="Name"
                          />
                          {errors.name && errors.name.type === "required" && (
                            <span className="text-danger">
                              Vui lòng nhập tên User
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-group text-center">
                      <div className="row">
                        <label className="col-lg-4 col-md-6 col-xs-12">
                          Email
                        </label>
                        <div className="col-lg-8 col-md-6 col-xs-12">
                          <input
                            className="form-control"
                            placeholder="Email"
                            {...register("email", {
                              required: true,
                              pattern:
                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i,
                            })}
                          />
                          {errors.email && errors.email.type === "required" && (
                            <span className="text-danger">
                              Vui lòng nhập Email
                            </span>
                          )}
                          {errors.email && errors.email.type === "pattern" && (
                            <span className="text-danger">
                              Vui lòng nhập đúng form Email (Exam:
                              abc@gmail.com)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-group text-center" hidden={isEditForm}>
                      <div className="row">
                        <label className="col-lg-4 col-md-6 col-12">
                          Password
                        </label>
                        <div className="col-lg-8 col-md-6 col-12 ">
                          <input
                            className="form-control"
                            {...register("passWord", {
                              required: !isEditForm,
                            })}
                            placeholder="Password"
                          />
                          {errors.passWord &&
                            errors.passWord.type === "required" && (
                              <span className="text-danger">
                                Vui lòng nhập Password User
                              </span>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="form-group text-center">
                      <div className="row">
                        <label className="col-lg-4 col-md-6 col-12">
                          Phone Number
                        </label>
                        <div className="col-lg-8 col-md-6 col-12">
                          <input
                            className="form-control"
                            {...register("phoneNumber", {
                              required: true,
                            })}
                            placeholder="Phone Number"
                          />
                          {errors.phoneNumber &&
                            errors.phoneNumber.type === "required" && (
                              <span className="text-danger">
                                Vui lòng nhập tên Số điện thoại
                              </span>
                            )}
                        </div>
                      </div>
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
    </div>
  );
}
