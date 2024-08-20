import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
export default function ResetPassword() {
  const [isloading, setIsloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sucessMsg, setSucessMsg] = useState("");

  const navigate = useNavigate();
  const { setUserToken } = useContext(AuthContext);

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is requrie").email("Enter valid email"),
    newPassword: Yup.string()
      .required("Password is requrie")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
      ),
  });

  const initialValues = {
    email: "",
    newPassword: "",
  };

  let { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  async function onSubmit() {
    setErrorMsg("");
    setSucessMsg("");
    setIsloading(true);
    await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then(({ data }) => {
        setIsloading(false);

        localStorage.setItem("token", data.token);

        setUserToken(data.token);

        setSucessMsg("Sucess");
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch(({ response }) => {
        setIsloading(false);
        setErrorMsg(response.data.message);
      });
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="py-16 flex justify-center items-center">
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center ">
          <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
            Welcome to FreshCart
          </h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="email"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                Email:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                type="email"
                id="email"
                name="email"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.email && errors.email && (
                <p className="text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="password"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                New Password:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.newPassword}
                type="password"
                id="password"
                name="newPassword"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.newPassword && errors.newPassword && (
                <p className="text-red-500">{errors.newPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-main hover:bg-sec hover:text-main text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:text-white"
              disabled={isloading}
            >
              Reset Password{" "}
              {isloading && <i className="fas fa-spinner fa-spin"></i>}
            </button>
            {errorMsg && (
              <p className="text-red-500">
                <i class="fa-solid fa-circle-exclamation me-1"></i>
                {errorMsg}
              </p>
            )}
            {sucessMsg && (
              <p className="text-green-500">
                <i class="fa-solid fa-circle-check"></i>
                {sucessMsg}
              </p>
            )}
          </form>
        </div>
      </div>
      {/* {isloading&&<Loading/>} */}
    </>
  );
}
