// import { Form } from "antd";
// import { Button, Input } from "antd";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { FetchAddUser } from "./duck/action/action-createUser";
// import { actFetchDataListUser } from "./duck/action/action-listUser";

// export default function FormUser(props) {
//   const dispatch = useDispatch();
//   const [form] = Form.useForm();

//   // console.log("Form", props.user);

//   const layout = {
//     labelCol: {
//       span: 8,
//     },
//     wrapperCol: {
//       span: 16,
//     },
//   };
//   const tailLayout = {
//     wrapperCol: {
//       offset: 8,
//       span: 16,
//     },
//   };

//   const [titleForm, setTitleForm] = useState("Sign up");
//   const [isEditForm, setisEditForm] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const handleEditUser = async (record) => {
//     setTitleForm("Edit User");
//     setisEditForm(true);
//     console.log(isEditForm);
//     console.log("dữ liệu vào", record);
//     setEditingUser((record) => ({ ...record }));

//     console.log("sau khi spread", editingUser);
//   };
//   const onFinish = (user) => {
//     console.log(user);
//     if (isEditForm) {
//       console.log("editForm", isEditForm);
//       // FetchEdit
//       // dispatch(FetchEditUser(user));
//     } else {
//       // Fetch Add
//       console.log("adduserlog", isEditForm);
//       //tạm thời cancel
//       // dispatch(FetchAddUser(user));
//     }
//   };

//   const onReset = () => {
//     form.resetFields();
//   };

//   return (
//     <div className="modal-dialog" role="document">
//       <div className="modal-content">
//         <div className="container-fuild mr-4">
//           <div className="modal-header">
//             <h5 className="modal-title">{titleForm}</h5>
//             <Button
//               type="button"
//               className="close"
//               data-dismiss="modal"
//               aria-label="Close"
//             >
//               <span aria-hidden="true">×</span>
//             </Button>
//           </div>
//           <Form
//             {...layout}
//             form={form}
//             name="control-hooks"
//             onFinish={onFinish}
//             style={{
//               maxWidth: 600,
//             }}
//             className={"mt-3"}
//           >
//             <Form.Item name="id" label="ID" hidden={!isEditForm}>
//               <Input disabled />
//             </Form.Item>
//             <Form.Item
//               name="email"
//               label="Email"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please enter email",
//                 },
//                 {
//                   type: "email",
//                   message: "Please enter a valid email",
//                 },
//               ]}
//               hasFeedback
//             >
//               <Input
//                 placeholder="Email"
//                 value={editingUser ? editingUser?.email : {}}
//               />
//             </Form.Item>
//             <Form.Item
//               name="passWord"
//               label="Password"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please enter password",
//                 },
//                 {
//                   min: 8,
//                   max: 16,
//                 },
//               ]}
//               hasFeedback
//             >
//               <Input.Password placeholder="Password" />
//             </Form.Item>
//             <Form.Item
//               name="confirm-passWord"
//               label="Confirm Password"
//               dependencies={["passWord"]}
//               rules={[
//                 { required: true },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (!value || getFieldValue("passWord") === value) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject("Please make sure password match");
//                   },
//                 }),
//               ]}
//               hasFeedback
//             >
//               <Input.Password placeholder="Password" />
//             </Form.Item>
//             <Form.Item
//               name="name"
//               label="Name"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please enter User name",
//                 },
//                 { whitespace: true },
//               ]}
//               hasFeedback
//             >
//               <Input placeholder="Name" />
//             </Form.Item>
//             <Form.Item
//               name="phoneNumber"
//               label="Phone Number"
//               rules={[
//                 {
//                   required: true,
//                 },
//                 { whitespace: true },
//               ]}
//             >
//               <Input placeholder="Phone Number" />
//             </Form.Item>

//             <Form.Item {...tailLayout}>
//               <Button type="primary" htmlType="submit" className="mx-2">
//                 Submit
//               </Button>
//               <Button htmlType="button" onClick={onReset}>
//                 Reset
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }
