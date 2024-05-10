// React
import { useContext, useEffect, useState } from "react";

// Context
import { MainContext } from "../../utils/MainContext";

// React Hook Form && yup
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

// Toastify
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icon
import arrow from "../../assets/images/icon/arrow-left.svg";
import arrowDown from "../../assets/images/icon/arrow-down.svg";
import addFile from "../../assets/images/icon/add-btn.svg";

// Axios
import axios from "axios";

const CommentSideBar = () => {
  // Global State
  const {
    commentSideBarVisible,
    setCommentSideBarVisible,
    selectCoupon,
    setSelectCoupon,
    couponData,
    setCouponData,
  } = useContext(MainContext);

  // Local State
  const [errorText, setErrorText] = useState("");
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [currentImg, setCurrentImg] = useState("");

  //Photo Choose
  const handleImg = (e) => {
    let file = e.target.files[0];
    setImage(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.onerror = (err) => console.log(err);
  };

  const locale = [
    { id: 1, local: "az" },
    { id: 2, local: "en" },
    { id: 2, local: "ru" },
  ];

  // Yup schema
  const schema = object({
    review_reviewer_name: string().required().trim(),
    review_star_rating: string().required().trim(),
    review_reviewer_title: string().required().trim(),
    review_reviewer_origin: string().required().trim(),
    review_short_text: string().required().trim(),
    review_text: string().required().trim(),
    review_locale: string().required().trim(),
  });

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // useEffect(() => {
  //   if (type === "edit") {
  //     setValue("coupon_name", selectCoupon.coupon_name);
  //   }
  // }, []);

  //Setting Form Submit
  const commentRequest = async (data) => {
    const body = new FormData();
    body.append("coupon_name", data.coupon_name);
    console.log(data);
    // if (selectCoupon === null) {
    //   try {
    //     const res = await axios.post(
    //       "http://naftalan-backend.uptodate.az/private/coupon/create",
    //       body
    //     );

    //     toast.info("Data Create!", {
    //       position: "top-right",
    //       autoClose: 1000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "dark",
    //       transition: Bounce,
    //     });

    //     const timer = setTimeout(() => {
    //       setCouponData([res.data, ...couponData]);
    //       setSelectCoupon({
    //         coupon_name: "",
    //         coupon_codeL: "",
    //         coupon_activeL: "",
    //         coupon_startL: "",
    //         coupon_endL: "",
    //         coupon_percentage_valueL: "",
    //       });
    //       setCommentSideBarVisible(false);
    //       reset();
    //     }, 1000);
    //     return () => clearTimeout(timer);
    //   } catch (err) {
    //     setErrorText(err.response.data.errors);
    //   }
    // } else {
    //   try {
    //     const res = await axios.put(
    //       `http://naftalan-backend.uptodate.az/private/coupon/update/${selectCoupon.id}`,
    //       body
    //     );

    //     setCouponData((prevData) => {
    //       return prevData.map((item) => {
    //         if (item.id === res.data.id) {
    //           return res.data;
    //         }
    //         return item;
    //       });
    //     });
    //     toast.info("Data Create!", {
    //       position: "top-right",
    //       autoClose: 1000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "dark",
    //       transition: Bounce,
    //     });
    //     const timer = setTimeout(() => {
    //       setCommentSideBarVisible(false);
    //       setSelectCoupon({
    //         coupon_name: "",
    //         coupon_codeL: "",
    //         coupon_activeL: "",
    //         coupon_startL: "",
    //         coupon_endL: "",
    //         coupon_percentage_valueL: "",
    //       });
    //     }, 1000);
    //     return () => clearTimeout(timer);
    //   } catch (err) {
    //     setErrorText(err.response.data.errors);
    //   }
    // }
  };
  return (
    <div
      className={
        commentSideBarVisible
          ? " isOpenMenu comment-sidebar-menu scrool "
          : "comment-sidebar-menu scrool  "
      }
    >
      <div className="head ">
        <h4 className="caption">Comment</h4>
        <div className="icon" onClick={() => setCommentSideBarVisible(false)}>
          <img src={arrow} alt=" close" />
        </div>
      </div>
      <div className="body ">
        <form
          action=""
          className="comment-form"
          onSubmit={handleSubmit(commentRequest)}
        >
          <div className="form-group">
            <label htmlFor="review_reviewer_name" className="inp-caption">
              Name
            </label>
            <input
              type="text"
              className={errors.review_reviewer_name ? "inp error" : "inp"}
              id="review_reviewer_name"
              name="review_reviewer_name"
              onChange={() => errorText !== "" && setErrorText("")}
              {...register("review_reviewer_name")}
            />
          </div>
          <div
            className={`form-group ${
              dropDownVisible ? "select open" : "select"
            } `}
          >
            <label htmlFor=" review_locale" className="inp-caption">
              Suite Pricing Types
            </label>
            <input
              type="text"
              id="review_locale"
              name="review_locale"
              readOnly
              className={
                errors.review_locale ? "inp select-inp error" : "inp select-inp"
              }
              placeholder="Select"
              onClick={() =>
                setDropDownVisible(dropDownVisible ? null : "pricing_types")
              }
              onChange={() => errorText !== "" && setErrorText("")}
              {...register("review_locale")}
            />
            <div
              className="icon"
              onClick={() =>
                setDropDownVisible(dropDownVisible ? null : "pricing_types")
              }
            >
              <img src={arrowDown} alt="open-close-dropdown" />
            </div>
            <div
              className="select-area"
              style={{
                height: dropDownVisible ? 120 : 0,
              }}
            >
              <ul className="select-list scrool">
                {locale.map((item) => (
                  <li
                    className="select-item"
                    onClick={(e) => {
                      setValue("review_locale", item.local);
                      setDropDownVisible(false);
                    }}
                    key={item.id}
                  >
                    {item.local}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="review_star_rating" className="inp-caption">
              Rating
            </label>
            <input
              type="number"
              className={errors.review_star_rating ? "inp error" : "inp"}
              id="review_star_rating"
              name="review_star_rating"
              onChange={() => errorText !== "" && setErrorText("")}
              {...register("review_star_rating")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="review_reviewer_title" className="inp-caption">
              Title
            </label>
            <input
              type="number"
              className={errors.review_reviewer_title ? "inp error" : "inp"}
              id="review_reviewer_title"
              name="review_reviewer_title"
              onChange={() => errorText !== "" && setErrorText("")}
              {...register("review_reviewer_title")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="review_reviewer_origin" className="inp-caption">
              Origin
            </label>
            <input
              type="text"
              className={errors.review_reviewer_origin ? "inp error" : "inp"}
              id="review_reviewer_origin"
              name="review_reviewer_origin"
              onChange={() => errorText !== "" && setErrorText("")}
              {...register("review_reviewer_origin")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="review_text" className="inp-caption">
              Text
            </label>
            <textarea
              type="number"
              className={errors.review_text ? "inp error" : "inp"}
              id="review_text"
              name="review_text"
              onChange={() => errorText !== "" && setErrorText("")}
              {...register("review_text")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="review_short_text" className="inp-caption">
              Short Text
            </label>
            <textarea
              type="number"
              className={errors.review_short_text ? "inp error" : "inp"}
              id="review_reviewer_origin"
              name="review_short_text"
              onChange={() => errorText !== "" && setErrorText("")}
              {...register("review_short_text")}
            />
          </div>
          <div className="image-area">
            <h2 className="main-caption">Profil Photo</h2>
            <div className="form-group">
              <label htmlFor="add-main-photo" className="add">
                <div className="icon">
                  <img src={addFile} alt="addfile" />
                </div>
                Choose file
              </label>
              <input
                type="file"
                name="add-main-photo"
                id="add-main-photo"
                onChange={handleImg}
              />
            </div>
          </div>
          <div className="folder-img">
            <img
              src={preview ? preview : `http://naftalan-backend.uptodate.az`}
              alt="img"
            />
          </div>

          <div className="form-footer">
            <p className="error-text">{errorText}</p>
            <div className="btn-area">
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

export default CommentSideBar;
