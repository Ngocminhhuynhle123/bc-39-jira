import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Loading from "_components/loading";
import { actFetchUserById } from "../userManagement/duck/action/action-getUserById";
import { useForm } from "react-hook-form";
import { FetchEditUser } from "../userManagement/duck/action/action-editUser";

function MyProfile() {
  const dispatch = useDispatch();
  const [isEditForm, setisEditForm] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
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

  const datJSON = JSON.parse(localStorage.getItem("@user")).id;
  const getUserById = useSelector((state) => state.getUserByIdReducer.data);
  useEffect(() => {
    dispatch(actFetchUserById(datJSON));
  }, [dispatch]);

  if (!getUserById) return <Loading />;

  const handleEdit = (e) => {
    e.preventDefault();

    setisEditForm(true);
    setValue("id", getUserById.userId);
    setValue("email", getUserById.email);
    setValue("name", getUserById.name);
    setValue("phoneNumber", getUserById.phoneNumber);
  };

  const handleAPI = (user) => {
    if (isEditForm) {
      dispatch(FetchEditUser(user), [dispatch]);
    }
  };

  const handleCancel = () => {
    setisEditForm(false);
  };

  const onSubmit = (data) => {
    handleAPI(data);
    setisEditForm(false);
  };

  return (
    <div className="container ">
      <h2 className="title text-center py-2 text-uppercase">My Profile</h2>
      <div className="my-3 text-center">
        <Space size={16} wrap>
          <Avatar
            size={64}
            style={{
              backgroundColor: "#87d068",
            }}
            icon={<UserOutlined />}
          />
        </Space>

        <h4 className="my-3">{getUserById.name}</h4>
        <button
          type="button"
          className="btn btn-secondary mx-2 btn-sm"
          href="/"
          onClick={handleEdit}
          hidden={isEditForm}
        >
          Edit My Profile
        </button>
      </div>

      <div className="mt-3">
        <div className="form w-50 m-auto">
          <form
            className="register-form text-center my-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-group">
              <div className="row">
                <label className="col-lg-4 col-md-6 col-12 text-right">
                  User ID
                </label>
                <div className="col-lg-8 col-md-6 col-12 text-left">
                  <input
                    className="form-control"
                    {...register("id")}
                    disabled
                    hidden={!isEditForm}
                  />
                  <span className="text-left" hidden={isEditForm}>
                    {getUserById.userId}
                  </span>
                </div>
              </div>
            </div>

            <div className="form-group text-center">
              <div className="row">
                <label className="col-lg-4 col-md-6 col-12 text-right">
                  Name
                </label>
                <div className="col-lg-8 col-md-6 col-12  text-left">
                  <input
                    className="form-control"
                    {...register("name", {
                      required: true,
                    })}
                    placeholder="Name"
                    hidden={!isEditForm}
                  />
                  <span className="text-left" hidden={isEditForm}>
                    {getUserById.name}
                  </span>
                  {errors.name && errors.name.type === "required" && (
                    <span className="text-danger">Vui lòng nhập tên User</span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-group text-center">
              <div className="row">
                <label className="col-lg-4 col-md-6 col-xs-12 text-right">
                  Email
                </label>
                <div className="col-lg-8 col-md-6 col-xs-12  text-left">
                  <input
                    className="form-control"
                    placeholder="Email"
                    {...register("email", {
                      required: true,
                      pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i,
                    })}
                    hidden={!isEditForm}
                  />
                  <span className="text-left" hidden={isEditForm}>
                    {getUserById.email}
                  </span>
                  {errors.email && errors.email.type === "required" && (
                    <span className="text-danger">Vui lòng nhập Email</span>
                  )}
                  {errors.email && errors.email.type === "pattern" && (
                    <span className="text-danger">
                      Vui lòng nhập đúng form Email (Exam: abc@gmail.com)
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-group text-center">
              <div className="row">
                <label className="col-lg-4 col-md-6 col-12 text-right">
                  Password
                </label>
                <div className="col-lg-8 col-md-6 col-12  text-left">
                  <input
                    className="form-control"
                    {...register("passWord", {
                      required: isEditForm,
                    })}
                    placeholder="Password"
                    hidden={!isEditForm}
                  />
                  <span className="text-left" hidden={isEditForm}>
                    {getUserById.passWord}
                  </span>
                  {errors.passWord && errors.passWord.type === "required" && (
                    <span className="text-danger">Vui lòng nhập Password</span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-group text-center">
              <div className="row">
                <label className="col-lg-4 col-md-6 col-12 text-right">
                  Phone Number
                </label>
                <div className="col-lg-8 col-md-6 col-12  text-left">
                  <input
                    className="form-control"
                    {...register("phoneNumber", {
                      required: true,
                    })}
                    placeholder="Phone Number"
                    hidden={!isEditForm}
                  />
                  <span className="text-left" hidden={isEditForm}>
                    {getUserById.phoneNumber}
                  </span>
                  {errors.phoneNumber &&
                    errors.phoneNumber.type === "required" && (
                      <span className="text-danger">
                        Vui lòng nhập tên Số điện thoại
                      </span>
                    )}
                </div>
              </div>
            </div>
            <div className="button-action m-auto">
              <button
                className="btn btn-secondary btn-sm mr-3"
                onClick={handleCancel}
                hidden={!isEditForm}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary btn-sm"
                type="submit"
                value="Submit"
                hidden={!isEditForm}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
