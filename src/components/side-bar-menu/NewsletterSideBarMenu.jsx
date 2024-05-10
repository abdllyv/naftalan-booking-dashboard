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
import axios from "axios";

const NewsletterSideBarMenu = ({ type }) => {
  // Global State
  const {
    newsletterVisible,
    setNewsletterVisible,
    newsletterData,
    setNewsletterData,
    selectnewsletter,
    setSelectNewsletter,
  } = useContext(MainContext);

  // Local State
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [errorText, setErrorText] = useState("");
  //   Locale List
  const locale = [
    { id: 1, local: "az" },
    { id: 2, local: "en" },
    { id: 3, local: "ru" },
  ];

  // Yup schema
  const schema = object({
    member_email: string().required().trim().email(),
    member_locale: string().required(),
  });

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Current Data render
  useEffect(() => {
    setErrorText("")
    if (type === "edit") {
      setValue("member_email", selectnewsletter.member_email);
      setValue("member_locale", selectnewsletter.member_locale);
    } else {
      setValue("member_email", "");
      setValue("member_locale", "");
    }
  }, [
    selectnewsletter.member_email,
    selectnewsletter.member_locale,
    setValue,
    type,
  ]);

  //   Create Folder
  const newsletter = async (data) => {
    const body = new FormData();
    body.append("member_email", data.member_email);
    body.append("member_locale", data.member_locale);
    if (type !== "edit") {
      try {
        const res = await axios.post(
          "http://naftalan-backend.uptodate.az/private/newsletter-member/create",
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
          setNewsletterData((prevData) => {
            return {
              ...prevData,
              page_data: [res.data, ...prevData.page_data],
            };
          });
          setNewsletterVisible(false);
          setSelectNewsletter({
            member_email: "",
            member_locale: "",
          });
          reset();
        }, 1000);
        return () => clearTimeout(timer);
      } catch (err) {
        setErrorText(err.response.data.errors);
      }
    } else {
      try {
        const res = await axios.put(
          `http://naftalan-backend.uptodate.az/private/newsletter-member/update/${selectnewsletter.id}`,
          body
        );

        setNewsletterData((prevData) => {
          return {
            ...prevData,
            page_data: prevData.page_data.map((item) => {
              if (item.id === res.data.id) {
                return res.data;
              }
              return item;
            }),
          };
        });

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
          setNewsletterVisible(false);
          setSelectNewsletter({
            member_email: "",
            member_locale: "",
          });
          reset();
        }, 1000);
        return () => clearTimeout(timer);
      } catch (err) {
        setErrorText(err.response?.data.errors);
      }
    }
  };

  return (
    <div
      className={
        newsletterVisible
          ? " isOpenMenu atribute-sidebar-menu "
          : "atribute-sidebar-menu  "
      }
    >
      <div className="head">
        <h4 className="caption">NewsLetter Member</h4>
        <div className="icon" onClick={() => setNewsletterVisible(false)}>
          <img src={arrow} alt=" close" />
        </div>
      </div>
      <div className="body">
        <form
          action=""
          className="atribute-form"
          onSubmit={handleSubmit(newsletter)}
        >
          <div className="form-group ">
            <label htmlFor="member_email " className="inp-caption">
              Email
            </label>
            <input
              type="text"
              id="member_email"
              name="email"
              className={errors.member_email ? "inp error " : "inp "}
              placeholder="email"
              {...register("member_email")}
              onChange={()=>errorText && setErrorText("")}
            />
          </div>
          <div
            className={`form-group ${
              dropDownVisible ? "select open" : "select"
            } `}
          >
            <label htmlFor=" member_locale" className="inp-caption">
              Locale
            </label>
            <input
              type="text"
              id="member_locale"
              name="member_locale"
              readOnly
              className={
                errors.member_locale ? "inp select-inp error" : "inp select-inp"
              }
              placeholder="Select"
              onClick={() =>
                setDropDownVisible(dropDownVisible ? null : "pricing_types")
              }
              {...register("member_locale")}
            />
            <div
              className="icon"
              onClick={() => setDropDownVisible(!dropDownVisible)}
            >
              <img src={arrowDown} alt="open-close-dropdown" />
            </div>
            <div
              className="select-area"
              style={{
                height: dropDownVisible ? 112 : 0,
              }}
            >
              <ul className="select-list scrool">
                {locale.map((item) => (
                  <li
                    className="select-item"
                    onClick={(e) => {
                      setValue("member_locale", item.local);
                      setDropDownVisible(false);
                      setErrorText("")
                    }}
                    key={item.id}
                  >
                    {item.local}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="form-footer">
            <p className="error-text">{errorText}</p>
            <div className="btn-area">
              {/* <button>Cancel</button> */}
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

export default NewsletterSideBarMenu;
