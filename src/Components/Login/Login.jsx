import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { Helmet } from "react-helmet";
export default function Login() {
  const [isloading, setIsloading] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");
  let [sucessMsg, setSucessMsg] = useState("");
  const navigate = useNavigate();
  const { setUserToken } = useContext(AuthContext);

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is requrie").email("Enter valid email"),
    password: Yup.string()
      .required("Password is requrie")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
      ),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  let { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  async function onSubmit() {
    setIsloading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({ data }) => {
        setIsloading(false);
        setSucessMsg(data.message);
        setUserToken(data.token);
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          if (location.pathname == "/login") {
            navigate("/");
          } else {
            navigate(location.pathname);
          }
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
                Password:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                type="password"
                id="password"
                name="password"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.password && errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-main hover:bg-sec hover:text-main text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500"
              disabled={isloading}
            >
              Login {isloading && <i className="fas fa-spinner fa-spin"></i>}
            </button>

            {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
            {sucessMsg && (
              <p className="text-green-500 text-center">{sucessMsg}</p>
            )}
            <Link to={"/forgetPassword"} className="text-center">
              forget password?
            </Link>
          </form>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500 dark:text-gray-300">
              Don't have an account?{" "}
            </span>
            <Link to={"/register"} className="text-main hover:text-four ">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
