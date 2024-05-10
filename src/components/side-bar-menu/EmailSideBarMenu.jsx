// React
import { useContext, useEffect, useState } from "react";

// Context
import { MainContext } from "../../utils/MainContext";

// React Hook Form && yup
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string, tuple } from "yup";
// Toastify
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icon
import arrow from "../../assets/images/icon/arrow-left.svg";
import down from "../../assets/images/icon/arrow-down.svg";
import axios from "axios";

const EmailSideBarMenu = ({ selectEmail }) => {
  // Global State
  const {
    emailVisible,
    setEmailVisible,
    emailData,
    setEmailData,
    // selectEmail,
    setSelectEmail,
    emailErorText,
    setEmailErrorText,
  } = useContext(MainContext);
  const [acordionVisible, setAcordionVisible] = useState("az");
  const[editDescription,setEditDescription]=useState(0)
  // Yup schema
  const emailAzSchema = object({
    description_subject_az: string().required().trim(),
    description_text_az: string().required().trim(),
  });
  const emailEnSchema = object({
    description_subject_en: string().required().trim(),
    description_text_en: string().required().trim(),
  });
  const emailRuSchema = object({
    description_subject_ru: string().required().trim(),
    description_text_ru: string().required().trim(),
  });

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(
      acordionVisible === "az"
        ? emailAzSchema
        : acordionVisible === "en"
        ? emailEnSchema
        : emailRuSchema
    ),
  });

  useEffect(() => {
    reset();
    if (emailVisible) {
      selectEmail.template_associated_descriptions.map((email) => {
        setValue(
          `description_text_${email.description_locale}`,
          email.description_subject
        );
        setValue(
          `description_subject_${email.description_locale}`,
          email.description_text
        );
      });
    }
  }, [
    acordionVisible,
    emailVisible,
    reset,
    selectEmail.template_associated_descriptions,
    setValue,
  ]);
  

  // useEffect(()=>{
  //   if(acordionVisible){
  //     let descriptionId = selectEmail.template_associated_descriptions.find(
  //       (item) => item.description_locale === acordionVisible && item.id
  //     );
  //     setEditDescription(descriptionId.id)
  //   }
  // },[])

  const editEmail = async (data) => {
    const body = new FormData();
    // console.log(data[`description_subject_${acordionVisible}`]);

    const checkVisibility = () => {
      // Eğer template_associated_descriptions boş ise, true döndür
      if (selectEmail.template_associated_descriptions.length === 0) {
        return true;
      } else {
        // Eğer herhangi bir öğenin locale değeri acordionVisible ile aynı ise, false döndür
        for (const item of selectEmail.template_associated_descriptions) {
          if (item.description_locale === acordionVisible) {
            return false;
          }
        }
        return true;
      }
    };
    if (checkVisibility()) {
      body.append(
        "description_subject",
        data[`description_subject_${acordionVisible}`]
      );
      body.append(
        "description_text",
        data[`description_text_${acordionVisible}`]
      );
      body.append("description_associated_template", selectEmail.id);
      body.delete("descriptiotionId.in_locale")
      body.append("description_locale", acordionVisible);
      try {
        const res = await axios.post(
          "http://naftalan-backend.uptodate.az/private/public-email-template-description/create",
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
        console.log(res);
        const timer = setTimeout(() => {
          window.location.reload();
          reset();
        }, 1000);
        return () => clearTimeout(timer);
      } catch (err) {
        setEmailErrorText(err.response?.data.errors);
      }
    } else {
      let descriptionId = selectEmail.template_associated_descriptions.find(
        (item) => item.description_locale === acordionVisible && item.id
      );

      body.append("description_locale", acordionVisible);
      body.append(
        "description_subject",
        data[`description_subject_${acordionVisible}`]
      );
      body.append(
        "description_text",
        data[`description_text_${acordionVisible}`]
      );
      body.append("description_associated_template", selectEmail.id);
      try {
        const res = await axios.put(
          `http://naftalan-backend.uptodate.az/private/public-email-template-description/update/${descriptionId.id}`,
          body
        );
        // setCouponData(prevData => {
        //   return prevData.map(item => {
        //     if (item.id === res.data.id) {
        //       return res.data;
        //     }
        //     return item;
        //   });
        // });
        console.log(res);
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
          window.location.reload();
        }, 1000);
        return () => clearTimeout(timer);
      } catch (err) {
        setEmailErrorText(err.response?.data.errors);
      }
    }
  };

  return (
    <div
      className={
        emailVisible
          ? " isOpenMenu email-sidebar-menu scrool "
          : "email-sidebar-menu  scrool "
      }
    >
      <div className="head">
        <h4 className="caption">Email templates</h4>
        <div className="icon" onClick={() => setEmailVisible(false)}>
          <img src={arrow} alt=" close" />
        </div>
      </div>
      <div className="body">
        <div className="email-acordion-area">
          <div
            className={
              acordionVisible === "az"
                ? "acordion-group  active"
                : "acordion-group "
            }
          >
            <div
              className="axordion-head "
              onClick={() =>
                setAcordionVisible(acordionVisible === "az" ? "" : "az")
              }
            >
              <h3 className="acordion-caption">Azerbaijan</h3>
              <div className="icon">
                <img src={down} alt="down" />
              </div>
            </div>
            <form
              className="acrodion-body"
              style={{ height: acordionVisible === "az" ? 280 : 0 }}
              onSubmit={handleSubmit(editEmail)}
            >
              <div className="form-group">
                <label htmlFor="description_subject_az">Title</label>
                <input
                  className={
                    errors.description_subject_az ? "inp error" : "inp"
                  }
                  type="text"
                  name="description_subject_az"
                  id="description_subject_az"
                  {...register("description_subject_az")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description_text_az">Text</label>
                <textarea
                  className={
                    errors.description_text_az ? "scrool error" : "scrool"
                  }
                  name="description_text_az"
                  id="description_text_az"
                  cols="30"
                  rows="10"
                  {...register("description_text_az")}
                ></textarea>
              </div>
              <div className="form-footer">
                <div className="handle-area">
                  <p className="error-text">asd</p>
                  <button>Cancel</button>
                  <button>Save</button>
                </div>
              </div>
            </form>
          </div>
          <div
            className={
              acordionVisible === "en"
                ? "acordion-group  active"
                : "acordion-group "
            }
          >
            <div
              className="axordion-head "
              onClick={() =>
                setAcordionVisible(acordionVisible === "en" ? "" : "en")
              }
            >
              <h3 className="acordion-caption">English</h3>
              <div className="icon">
                <img src={down} alt="down" />
              </div>
            </div>
            <form
              className="acrodion-body"
              style={{ height: acordionVisible === "en" ? 280 : 0 }}
              onSubmit={handleSubmit(editEmail)}
            >
              <div className="form-group">
                <label htmlFor="description_subject_en">Title</label>
                <input
                  className={
                    errors.description_subject_en ? "inp error" : "inp"
                  }
                  type="text"
                  name="description_subject_en"
                  id="description_subject_en"
                  {...register("description_subject_en")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description_text_en">Text</label>
                <textarea
                  className={
                    errors.description_text_en ? "scrool error" : "scrool"
                  }
                  name="description_text_en"
                  id="description_text_en"
                  cols="30"
                  rows="10"
                  {...register("description_text_en")}
                ></textarea>
              </div>
              <div className="form-footer">
                <div className="handle-area">
                  <p className="error-text">asd</p>
                  <button>Cancel</button>
                  <button>Save</button>
                </div>
              </div>
            </form>
          </div>
          <div
            className={
              acordionVisible === "ru"
                ? "acordion-group  active"
                : "acordion-group "
            }
          >
            <div
              className="axordion-head "
              onClick={() =>
                setAcordionVisible(acordionVisible === "ru" ? "" : "ru")
              }
            >
              <h3 className="acordion-caption">Russian</h3>
              <div className="icon">
                <img src={down} alt="down" />
              </div>
            </div>
            <form
              className="acrodion-body"
              style={{ height: acordionVisible === "ru" ? 280 : 0 }}
              onSubmit={handleSubmit(editEmail)}
            >
              <div className="form-group">
                <label htmlFor="description_subject_ru">Title</label>
                <input
                  className={
                    errors.description_subject_ru ? "inp error" : "inp"
                  }
                  type="text"
                  name="description_subject_ru"
                  id="description_subject_ru"
                  {...register("description_subject_ru")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description_text_ru">Text</label>
                <textarea
                  className={
                    errors.description_text_ru ? "scrool error" : "scrool"
                  }
                  name="description_text_ru"
                  id="description_text_ru"
                  cols="30"
                  rows="10"
                  {...register("description_text_ru")}
                ></textarea>
              </div>
              <div className="form-footer">
                <div className="handle-area">
                  <p className="error-text">asd</p>
                  <button>Cancel</button>
                  <button>Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
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

export default EmailSideBarMenu;
