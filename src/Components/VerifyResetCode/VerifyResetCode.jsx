import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import Loading from "../Loading/Loading";
export default function VerifyResetCode() {
  let navigate = useNavigate();

  const [isloading, setIsloading] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");
  let [sucessMsg, setSucessMsg] = useState("");

  const initialValues = {
    resetCode: "",
  };
  const validationSchema = Yup.object({
    resetCode: Yup.string().required("code is required"),
  });
  async function onSubmit() {
    setIsloading(true);
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .then(({ data }) => {
        setSucessMsg(data.status);

        setIsloading(false);

        setTimeout(() => {
          navigate("/resetPassword");
        }, 500);
      })
      .catch(({ response }) => {
        setIsloading(false);
        setErrorMsg(response.data.message);
      });
  }

  let { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className=" h-96 flex flex-col justify-center items-center"
      >
        <div className="w-full flex items-start flex-col justify-start mb-3 ">
          <label
            htmlFor="resetCode"
            className=" text-main font-bold text-3xl dark:text-gray-200 mr-2 my-3"
          >
            please enter your verification code:
          </label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            type="string"
            id="resetCode"
            name="resetCode"
            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-main dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-main"
          />
          {touched.resetCode && errors.resetCode && (
            <p className="text-red-500">{errors.resetCode}</p>
          )}

          {errorMsg && (
            <p className="text-red-500 font-bold">
              <i class="fa-solid fa-circle-exclamation"></i>
              {errorMsg}
            </p>
          )}
          {sucessMsg && (
            <p className="text-green-500 font-bold">
              <i class="fa-solid fa-circle-check"></i>
              {sucessMsg}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-main hover:bg-sec hover:text-main text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={isloading}
        >
          Verify code {isloading && <i className="fas fa-spinner fa-spin"></i>}
        </button>
      </form>
    </>
  );
}
