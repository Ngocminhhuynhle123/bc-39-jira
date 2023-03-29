// import { useState } from "react";
// import { api } from "Utils/apiUtils";

// export const FetchEditUser = (user) => {
//   const [user, setUser] = useState({
//     id: "",
//     name: "",
//     passWord: "",
//     email: "",
//     phoneNumber: "",
//   });
//   return (dispatch) => {
//     dispatch(actListUserRequest());

//     api
//       .get("api/Users/getUser")
//       .then((res) => {
//         dispatch(actListUserSuccess(res.data.content));
//       })
//       .catch((error) => {
//         dispatch(actListUserFail(error));
//       });
//   };
// };
