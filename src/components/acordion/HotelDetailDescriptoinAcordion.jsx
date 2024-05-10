// React
import { useCallback, useEffect, useState } from "react";

// React Hook Form && yup
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
// Toastify
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icon
import down from "../../assets/images/icon/arrow-down.svg";
import axios from "axios";
import { useParams } from "react-router-dom";
const HotelDetailDescriptoinAcordion = ({ active }) => {
  // Local State
  const [acordionVisible, setAcordionVisible] = useState("az");
  const [descriptionData, setDescriptionData] = useState([]);
  const [renderData, setRenderData] = useState(false);

  const { hotelId } = useParams();

  useEffect(() => {
    if (active === "Description") {
      setRenderData(true);
    }
  }, [active]);

  // Yup schema
  const descriptionAzSchema = object({
    description_short_az: string().required().trim(),
    description_long_az: string().required().trim(),
  });
  const descriptionEnSchema = object({
    description_short_en: string().required().trim(),
    description_long_en: string().required().trim(),
  });
  const descriptionRuSchema = object({
    description_short_ru: string().required().trim(),
    description_long_ru: string().required().trim(),
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
        ? descriptionAzSchema
        : acordionVisible === "en"
        ? descriptionEnSchema
        : descriptionRuSchema
    ),
  });

  const getDescriptionData = useCallback(async () => {
    await axios
      .get(
        `http://naftalan-backend.uptodate.az/private/hotel-description/read/by-hotel/${hotelId}`
      )
      .then((res) => {
        setDescriptionData(res.data);
        res.data.map((item) => {
          setValue(
            `description_short_${item.description_locale}`,
            item.description_short
          );
          setValue(
            `description_long_${item.description_locale}`,
            item.description_long
          );
          return true;
        });
      })
      .catch((err) => console.log(err));
  }, [hotelId, setValue]);

  useEffect(() => {
    if (renderData) {
      getDescriptionData();
      setRenderData(false);
    }
  }, [getDescriptionData, renderData]);

  const editDescription = async (data) => {
    const body = new FormData();

    const checkVisibility = () => {
      // Eğer template_associated_descriptions boş ise, true döndür
      if (descriptionData.length === 0) {
        return true;
      } else {
        // Eğer herhangi bir öğenin locale değeri acordionVisible ile aynı ise, false döndür
        for (const item of descriptionData) {
          if (item.description_locale === acordionVisible) {
            return false;
          }
        }
        return true;
      }
    };
    if (checkVisibility()) {
      console.log("post");
      body.append(
        "description_short",
        data[`description_short_${acordionVisible}`]
      );
      body.append(
        "description_long",
        data[`description_long_${acordionVisible}`]
      );
      body.append("description_associated_hotel", hotelId);

      body.append("description_locale", acordionVisible);

      try {
        const res = await axios.post(
          "http://naftalan-backend.uptodate.az/private/hotel-description/create",
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
      } catch (err) {
        // setEmailErrorText(err.response?.data.errors);
      }
    } else {
      let descriptionId = descriptionData.find(
        (item) => item.description_locale === acordionVisible && item.id
      );
      body.append(
        "description_short",
        data[`description_short_${acordionVisible}`]
      );
      body.append(
        "description_long",
        data[`description_long_${acordionVisible}`]
      );
      body.append("description_associated_hotel", hotelId);

      body.append("description_locale", acordionVisible);
      try {
        const res = await axios.put(
          `http://naftalan-backend.uptodate.az/private/hotel-description/update/${descriptionId.id}`,
          body,
          { crossdomain: true }
        );

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
      } catch (err) {
        // setEmailErrorText(err.response?.data.errors);
      }
    }
  };

  return (
    <div className="description-acordion-area">
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
          style={{ height: acordionVisible === "az" ? 480 : 0 }}
          onSubmit={handleSubmit(editDescription)}
        >
          <div className="form-group">
            <label htmlFor="description_short_az">Short Description</label>
            <textarea
              name="description_short_az"
              id="description_short_az"
              cols="30"
              rows="10"
              className={
                errors.description_short_az ? "scrool error" : "scrool"
              }
              {...register("description_short_az")}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="description_long_az">Long description</label>
            <textarea
              name="description_long_az"
              id="description_long_az"
              cols="30"
              rows="10"
              className={errors.description_long_az ? "scrool error" : "scrool"}
              {...register("description_long_az")}
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
          style={{ height: acordionVisible === "en" ? 480 : 0 }}
          onSubmit={handleSubmit(editDescription)}
        >
          <div className="form-group">
            <label htmlFor="description_short_en"> Short Description</label>
            <textarea
              name="description_short_en"
              id="description_short_en"
              cols="30"
              rows="10"
              className={
                errors.description_short_en ? "scrool error" : "scrool"
              }
              {...register("description_short_en")}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="description_long_en">Long description</label>
            <textarea
              name="description_long_en"
              id="description_long_en"
              cols="30"
              rows="10"
              className={errors.description_long_en ? "scrool error" : "scrool"}
              {...register("description_long_en")}
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
          style={{ height: acordionVisible === "ru" ? 480 : 0 }}
          onSubmit={handleSubmit(editDescription)}
        >
          <div className="form-group">
            <label htmlFor="description_short_ru">Short description</label>
            <textarea
              name="description_short_ru"
              id="description_short_ru"
              cols="30"
              rows="10"
              className={
                errors.description_short_ru ? "scrool error" : "scrool"
              }
              {...register("description_short_ru")}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="description_long_ru">Long description</label>
            <textarea
              name="description_long_ru"
              id="description_long_ru"
              cols="30"
              rows="10"
              className={errors.description_long_ru ? "scrool error" : "scrool"}
              {...register("description_long_ru")}
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
  );
};

export default HotelDetailDescriptoinAcordion;
