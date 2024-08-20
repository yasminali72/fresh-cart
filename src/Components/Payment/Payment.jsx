import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Payment() {
  const [isloadingCash, setIsloadingCash] = useState(false);
  const [isloadingOnline, setIsloadingOnline] = useState(false);

  const navgite = useNavigate();
  let { cartId } = useParams();
  const [isOnline, setIsOnline] = useState(false);

  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  const validationSchema = Yup.object({
    details: Yup.string().required("Details is requrie"),
    phone: Yup.string().required("Phone is requrie"),
    city: Yup.string().required("  City is requrie"),
  });

  let { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      onSubmit: detectAndCall,
      validationSchema,
    });

  function detectAndCall() {
    if (isOnline) {
      paymentOnline();
    } else {
      createCashOrder();
    }
  }
  async function createCashOrder() {
    setIsloadingCash(true);
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/orders/" + cartId,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )

      .then(({ data }) => {
        navgite("/allorders");
        setIsloadingCash(false);
      })
      .catch(({ response }) => {
        setIsloadingCash(false);
      });
  }

  async function paymentOnline() {
    setIsloadingOnline(true);
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" +
          cartId,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: { url: "http://localhost:5173" },
        }
      )

      .then(({ data }) => {
        location.href = data.session.url;
        setIsloadingOnline(false);
      })
      .catch(({ response }) => {
        setIsloadingOnline(false);
      });
  }
  return (
    <>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>

      <div className="py-16 flex justify-center items-center">
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center ">
          <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
            Add your address
          </h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="city"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                City:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                type="text"
                id="city"
                name="city"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.city && errors.city && (
                <p className="text-red-500">{errors.city}</p>
              )}
            </div>

            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="details"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                Details:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.details}
                type="text"
                id="details"
                name="details"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.details && errors.details && (
                <p className="text-red-500">{errors.details}</p>
              )}
            </div>
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="phone"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                Phone:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.phone && errors.phone && (
                <p className="text-red-500">{errors.phone}</p>
              )}
            </div>

            <button
              onClick={() => setIsOnline(false)}
              type="submit"
              className="bg-main hover:bg-sec hover:text-main text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed"
              disabled={isloadingCash || isloadingOnline}
            >
              Pay Cash{" "}
              {isloadingCash && <i className="fas fa-spinner fa-spin"></i>}
            </button>
            <button
              onClick={() => setIsOnline(true)}
              type="submit"
              className="bg-main hover:bg-sec hover:text-main text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed"
              disabled={isloadingOnline || isloadingCash}
            >
              Pay online{" "}
              {isloadingOnline && <i className="fas fa-spinner fa-spin"></i>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
