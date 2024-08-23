import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import Loading from "../Loading/Loading";

export default function VerifyResetCode() {
  let navigate = useNavigate();

  const [isloadingVerify, setIsloadingVerify] = useState(false);
  const [isloadingForResend, setIsloadingForResend] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [timeLeft, setTimeLeft] = useState(10*60); // 10 minutes in seconds

  const initialValues = {
    resetCode: "",
  };

  const validationSchema = Yup.object({
    resetCode: Yup.string().required("Code is required"),
  });

  async function onSubmit() {
    setIsloadingVerify(true);
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .then(({ data }) => {
        setErrorMsg('')
        setSuccessMsg(data.status);
        setIsloadingVerify(false);
localStorage.removeItem('userEmail')
        setTimeout(() => {
          navigate("/resetPassword");
        }, 500);
      })
      .catch(({ response }) => {
        setIsloadingVerify(false);
        setErrorMsg(response.data.message);
        setSuccessMsg('')
      });
  }

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timerId); // Cleanup the interval on component unmount
    } else {
      // setIsloading(false); // Disable the button when time runs out
      setErrorMsg("Verification code expired. Please request a new one.");
    }
  }, [timeLeft]);

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  let { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });
const Values={
  'email': localStorage.getItem('userEmail')
}

async function sendResend(){
  setIsloadingForResend(true);
  await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
       Values
      )
      
      .then(({ data }) => {
        setIsloadingForResend(false)
        console.log(data);
        setTimeLeft(10*60)
setErrorMsg('')
        setSuccessMsg(data.message);
      })
      .catch(({ response }) => {
        setIsloadingForResend(false);
        setErrorMsg(response.data.message);
      });
}

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className=" h-96 flex flex-col justify-center items-center w-[90%] lg:w-[50%] mx-auto shadow-md p-2 rounded-md "
      >
        <div className="w-full flex items-start flex-col justify-start mb-3 ">
          <label
            htmlFor="resetCode"
            className=" text-main font-bold text-3xl dark:text-gray-200 mr-2 my-3 capitalize"
          >
            Please enter your verification code:
          </label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            type="string"
            id="resetCode"
            name="resetCode"
            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-main dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-main"
            disabled={timeLeft === 0} // Disable input when time is up
          />
          {touched.resetCode && errors.resetCode && (
            <p className="text-red-500">{errors.resetCode}</p>
          )}

          {errorMsg && (
            <p className="text-red-500 font-bold">
              <i className="fa-solid fa-circle-exclamation"></i>
              {errorMsg}
            </p>
          )}
          {successMsg && (
            <p className="text-green-500 font-bold">
              <i className="fa-solid fa-circle-check"></i>
              {successMsg}
            </p>
          )}
        </div>
        <div className="mb-4">
          {/* Display the countdown timer */}
          <p className="text-gray-700 dark:text-gray-200 font-bold">
            Time left: {formatTime(timeLeft)}
          </p>
        </div>
        <button
          type="submit"
          className="bg-main hover:bg-sec hover:text-main text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:text-white"
          disabled={isloadingVerify || timeLeft === 0} // Disable when loading or time runs out
        >
          Verify Code {isloadingVerify && <i className="fas fa-spinner fa-spin"></i>}
        </button>
        {timeLeft==0&& <button onClick={sendResend} disabled={isloadingForResend} className="bg-main  font-medium hover:bg-sec hover:text-main text-white py-2 px-4 mt-2  rounded-md shadow-sm capitalize disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:text-white">Resend code {isloadingForResend && <i className="fas fa-spinner fa-spin"></i>}
</button>}
      </form>
      
    </>
  );
}
