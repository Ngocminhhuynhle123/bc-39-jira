import React from "react";
import { useDispatch } from "react-redux";
import { FaFacebookF } from "react-icons/fa";
import { fetDataLogInReducer } from "./duck/action";
import { Navigate, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
function AuthPages() {
  // const [user, setUser] = useState({
  //   email: "",
  //   passWord: "",
  // });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(fetDataLogInReducer(data, navigate));
  };
  if (localStorage.getItem("@user")) {
    return <Navigate replace to="/" />;
  }
  return (
    <section id="logIn">
      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="login-title">Log In</h1>
            <input
              type="email"
              name="email"
              placeholder="email"
              {...register("email", {
                required: true,
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
              })}
            />
            {errors.email && errors.email.type === "required" && (
              <span>This is required</span>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <span>This is pattern</span>
            )}
            <input
              type="password"
              name="passWord"
              placeholder="passWord"
              {...register("passWord", {
                required: true,
                max: 16,
                min: 8,
                pattern:
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/i,
              })}
            />
            {errors.passWord && errors.passWord.type === "required" && (
              <span>This is required</span>
            )}
            {errors.passWord && errors.passWord.type === "pattern" && (
              <span>This is pattern</span>
            )}
            <button className="btn btn-success">login</button>
            <p className="message">
              Not registered? <a href="#">Create an account</a>
            </p>
            <button>
              <FaFacebookF /> login to Facebook
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AuthPages;
