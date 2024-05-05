// React
import { useContext, useEffect, useState } from "react";

// Context
import { MainContext } from "../../utils/MainContext";

// React Hook Form && yup
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { boolean, number, object, string } from "yup";

// Toastify
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icon
import arrow from "../../assets/images/icon/arrow-left.svg";
import axios from "axios";

const CouponSideBarMenu = () => {
  // Global State
  const {
    couponVisible,
    setCouponVisible,
    selectCoupon,
    setSelectCoupon,
    couponData,
    setCouponData,
  } = useContext(MainContext);

  // Local State
  const [errorText, setErrorText] = useState("");

  // Yup schema
  const couponSchema = object({
    coupon_name: string().required().trim(),
    coupon_code: string().required().trim(),
    coupon_active: boolean().required(),
    coupon_start: string().required().trim(),
    coupon_end: string().required().trim(),
    coupon_percentage_value: number().test(
      "maxDigits",
      "Max Limit 100",
      (number) => number < 101
    ),
  });

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(couponSchema),
  });

  //Setting Form Submit
  const onSubmit = async (data) => {
    const body = new FormData();
    body.append("coupon_name", data.coupon_name);
    body.append("coupon_code", data.coupon_code);
    body.append("coupon_active", data.coupon_active);
    body.append("coupon_start", data.coupon_start);
    body.append("coupon_end", data.coupon_end);
    body.append("coupon_percentage_value", data.coupon_percentage_value);

    if (selectCoupon === null) {
      try {
        const res = await axios.post(
          "http://naftalan-backend.uptodate.az/private/coupon/create",
          body
        );

        toast.info("Data Create!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        const timer = setTimeout(() => {
          setCouponData([res.data, ...couponData]);
          setSelectCoupon(null);
          setCouponVisible(false);
          reset()
        }, 1000);
        return () => clearTimeout(timer);


      } catch (err) {
        setErrorText(err.response.data.errors);
      }
    } else {
      try {
        const res = await axios.post(
          "http://naftalan-backend.uptodate.az/private/coupon/create",
          body
        );
        setCouponData([res.data, ...couponData]);
        setSelectCoupon(null);
        setCouponVisible(false);
        toast.info("Data Create!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } catch (err) {
        setErrorText(err.response.data.errors);
      }
    }
  };



  return (
    <div
      className={
        couponVisible
          ? " isOpenMenu coupon-sidebar-menu scrool "
          : "coupon-sidebar-menu scrool  "
      }
    >
      <div className="head ">
        <h4 className="caption">Coupon code overview</h4>
        <div className="icon" onClick={() => setCouponVisible(false)}>
          <img src={arrow} alt=" close" />
        </div>
      </div>
      <div className="body ">
        <form
          action=""
          className="coupon-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <label htmlFor="coupon_name" className="inp-caption">
              Name
            </label>
            <input
              type="text"
              className={errors.coupon_name ? "inp error" : "inp"}
              id="coupon_name"
              name="coupon_name"
              {...register("coupon_name")}
              onChange={() => errorText !== "" && setErrorText("")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="coupon_start" className="inp-caption">
              Date from
            </label>
            <input
              type="date"
              className={errors.coupon_start ? "inp error" : "inp"}
              id="coupon_start"
              name="coupon_start"
              {...register("coupon_start")}
              onChange={() => errorText !== "" && setErrorText("")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="coupon_end" className="inp-caption">
              Date to
            </label>
            <input
              type="date"
              className={errors.coupon_end ? "inp error" : "inp"}
              id="coupon_end"
              name="coupon_end"
              {...register("coupon_end")}
              onChange={() => errorText !== "" && setErrorText("")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="coupon_code" className="inp-caption">
              Coupon code
            </label>
            <input
              type="text"
              className={errors.coupon_code ? "inp error" : "inp"}
              id="coupon_code"
              name="coupon_code"
              {...register("coupon_code")}
              onChange={() => errorText !== "" && setErrorText("")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="coupon_percentage_value" className="inp-caption">
              Coupon Percentage Value
            </label>
            <input
              type="number"
              className={errors.coupon_percentage_value ? "inp error" : "inp"}
              id="coupon_percentage_value"
              name="coupon_percentage_value"
              {...register("coupon_percentage_value")}
              onChange={() => errorText !== "" && setErrorText("")}
            />
          </div>
          <div className="form-group checkbox-group">
            <label htmlFor="coupon_active" className="inp-caption">
              Activated {""}
            </label>
            <label htmlFor="coupon_active" className="switch">
              <input
                type="checkbox"
                id="coupon_active"
                name="coupon_active"
                className="checkbox"
                {...register("coupon_active")}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="form-footer">
            <p className="error-text">{errorText}</p>
            <div className="btn-area">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Cancel
              </button>
              <button>Save</button>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};

export default CouponSideBarMenu;
