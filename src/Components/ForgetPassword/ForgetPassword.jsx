import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function ForgetPassword() {
  let navigate = useNavigate();
  let [errorMsg, setErrorMsg] = useState("");
  let [sucessMsg, setSucessMsg] = useState("");

  const [isloading, setIsloading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is requrie").email("Enter valid email"),
  });

  const initialValues = {
    email: "",
  };

  let { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  async function onSubmit() {
    setIsloading(true);
    setErrorMsg("");
    setSucessMsg("");
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .then(({ data }) => {
        setIsloading(false);

        setSucessMsg(data.message);
        setTimeout(() => {
          navigate("/verifyResetCode");
        }, 500);
      })
      .catch(({ response }) => {
        setIsloading(false);
        setErrorMsg(response.data.message);
      });
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className=" h-96 flex flex-col justify-center items-center"
      >
        <div className="w-full flex items-start flex-col justify-start mb-3 ">
          <label
            htmlFor="email"
            className=" text-main font-bold text-3xl dark:text-gray-200 mr-2 my-3"
          >
            please enter your email:
          </label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-main dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-main"
          />
          {touched.email && errors.email && (
            <p className="text-red-500">{errors.email}</p>
          )}
          {errorMsg && (
            <p className="text-red-500">
              <i class="fa-solid fa-circle-exclamation"></i>
              {errorMsg}
            </p>
          )}
          {sucessMsg && (
            <p className="text-green-500 ">
              <i class="fa-solid fa-circle-check "></i>
              {sucessMsg}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-main hover:bg-sec hover:text-main text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:text-white"
          disabled={isloading}
        >
          Send code {isloading && <i className="fas fa-spinner fa-spin"></i>}
        </button>
      </form>
    </>
  );
}
