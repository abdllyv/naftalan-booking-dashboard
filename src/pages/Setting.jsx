// React
import { useCallback, useContext, useEffect, useRef, useState } from "react";

// Context
import { MainContext } from "../utils/MainContext";

// Axios
import axios from "axios";

// Component
import ImageCard from "../components/ImageCard";

// Icon
import menuIcon from "../assets/images/icon/burger-menu.svg";
import addFile from "../assets/images/icon/add-btn.svg";

// React Hook Form && yup
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

// Toastify
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Setting = () => {
  // Global State
  const { mainMneuVisible, setMainMneuVisible } = useContext(MainContext);

  /* ------------------------------- Local State ------------------------------ */
  // Back Datas
  const [imgData, setImgData] = useState(null);
  const [settingData, setSettingData] = useState([]);
  const [imgError, setImgError] = useState(null);

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const fileInputRef = useRef(null);

  //Photo Choose
  const handleImg = (e) => {
    console.log(e);
    // Check if files were selected
    if (!e.target.files || e.target.files.length === 0) {
      console.error("No file selected.");
      return;
    }

    let file = e.target.files[0];
    setImage(file);

    let reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result);
    };

    reader.onerror = (err) => {
      console.error("FileReader error:", err);
    };

    reader.readAsDataURL(file);
  };

  // Set Logo
  const handleLogoSubmit = async (e) => {
    e.preventDefault();
    const logo = new FormData();
    logo.append("logo", image);
    await axios
      .put(`http://naftalan-backend.uptodate.az/private/site-logo/update`, logo)
      .then((res) => {
        setImgData(res.data.logo);
        setPreview("");
        window.location.reload();
        toast.info("Data Update!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      })
      .catch((err) => {
        console.log(err);
        setImgError(err);
      });
  };

  // Yup schema
  const settingSchema = object({
    site_address: string().required().trim(),
    site_city: string().required().trim(),
    site_zip: string().required().trim(),
    site_country: string().required().trim(),
    site_email: string().required().trim(),
    site_phone: string().required().trim(),
    site_fax: string().required().trim(),
  });

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(settingSchema),
  });

  //Setting Form Submit
  const onSubmit = async (data) => {
    const body = new FormData();
    body.append("site_email", data.site_email);
    body.append("site_phone", data.site_phone);
    body.append("site_fax", data.site_fax);
    body.append("site_address", data.site_address);
    body.append("site_city", data.site_city);
    body.append("site_zip", data.site_zip);
    body.append("site_country", data.site_country);

    await axios
      .put(
        `http://naftalan-backend.uptodate.az/private/site-settings/update`,
        body
      )
      .then((res) => {
        if (res.status === 200) {
          toast.info("Data Update!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  // Get Setting Data
  const getSettingData = useCallback(async () => {
    await axios
      .get(`http://naftalan-backend.uptodate.az/site-settings/read`, {
        crossdomain: true,
      })
      .then((res) => {
        setValue("site_email", res.data.site_email);
        setValue("site_phone", res.data.site_phone);
        setValue("site_fax", res.data.site_fax);
        setValue("site_address", res.data.site_address);
        setValue("site_city", res.data.site_city);
        setValue("site_zip", res.data.site_zip);
        setValue("site_country", res.data.site_country);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setValue]);

  // Get Logo Data
  const getLogoData = useCallback(async () => {
    await axios
      .get(`http://naftalan-backend.uptodate.az/site-logo/read`, {
        crossdomain: true,
      })
      .then((res) => {
        setImgData(res.data.logo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getLogoData();
    getSettingData();
  }, [getLogoData, getSettingData]);

  return (
    <main>
      <section className="setting">
        <div className="sub-header">
          <div className="container">
            <div className="row">
              <div className="info">
                <button onClick={() => setMainMneuVisible(true)}>
                  <img src={menuIcon} alt="menu" />
                </button>
                <h2 className="caption">Setting</h2>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            mainMneuVisible ? "overlay-sub-menu active" : "overlay-sub-menu"
          }
          onClick={() => mainMneuVisible && setMainMneuVisible(false)}
        ></div>
        <div className="container">
          <form
            action=""
            className="main-input-area "
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="main-caption">Agency</h2>
            <div className="inp-area">
              <div className="form-group">
                <label htmlFor="site_address">Address</label>
                <input
                  type="text"
                  className={errors.site_address ? "inp error" : "inp"}
                  id="site_address"
                  name="site_address"
                  {...register("site_address")}
                />
              </div>

              <div className="form-group">
                <label htmlFor="site_city">City</label>
                <input
                  type="text"
                  className={errors.site_city ? "inp error" : "inp"}
                  id="site_city"
                  name="site_city"
                  {...register("site_city")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="site_zip">ZIP code</label>
                <input
                  type="text"
                  className={errors.site_zip ? "inp error" : "inp"}
                  id="site_zip"
                  name="site_zip"
                  {...register("site_zip")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="site_country">Country</label>
                <input
                  type="text"
                  className={errors.site_country ? "inp error" : "inp"}
                  id="site_country"
                  name="site_country"
                  {...register("site_country")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="site_email">Email</label>
                <input
                  type="email"
                  className={errors.site_email ? "inp error" : "inp"}
                  id="site_email"
                  name="site_email"
                  {...register("site_email")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="site_phone">Telephone</label>
                <input
                  type="number"
                  className={errors.site_phone ? "inp error" : "inp"}
                  id="site_phone"
                  name="site_phone"
                  {...register("site_phone")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="site_fax">Fax</label>
                <input
                  type="text"
                  className={errors.site_fax ? "inp error" : "inp"}
                  id="site_fax"
                  name="site_fax"
                  {...register("site_fax")}
                />
              </div>
            </div>
            <div className="form-footer">
              <p className="error-text">asdasd</p>
              <button>Save</button>
            </div>
          </form>
          <form className="image-area">
            <h2 className="main-caption">Main</h2>
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
                ret={fileInputRef}
              />
            </div>
            <div className="img-cards-area">
              {/* <ImageCard
                img={preview ? preview : imgData}
                type={preview ? "new logo" : "logo"}
              /> */}

              <div className="img-card">
                <div className="top"></div>
                <div className="middle">
                  <img
                    src={
                      preview
                        ? preview
                        : `http://naftalan-backend.uptodate.az${imgData}`
                    }
                    alt="logo"
                  />
                </div>
                <div className="bottom">
                  {/* <h6 className="img-title">Filename.jpg</h6> */}
                </div>
              </div>
            </div>
            <div className="form-footer">
              {preview && (
                <>
                  {imgError && (
                    <p className="error-text">
                      Update failed, please check again
                    </p>
                  )}

                  <button
                    onClick={() => {
                      setPreview("");
                    }}
                  >
                    Cancel
                  </button>
                  <button onClick={(e) => handleLogoSubmit(e)}>Save</button>
                </>
              )}
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
      </section>
    </main>
  );
};

export default Setting;
