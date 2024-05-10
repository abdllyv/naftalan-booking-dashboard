// React
import { useCallback, useContext, useEffect,  useState } from "react";

// Context
import { MainContext } from "../utils/MainContext";

// Axios
import axios from "axios";

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
  const [logoImgData, setLogoImgData] = useState(null);
  const [faviconImgData, setFaviconImgData] = useState(null);
  const [logoImgError, setLogoImgError] = useState(null);
  const [faviconImgError, setFaviconImgError] = useState(null);

  const [logoImage, setLogoImage] = useState("");
  const [faviconImage, setFaviconImage] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [faviconPreview, setFaviconPreview] = useState("");

console.log(faviconImgData)
  //Photo Choose Logo
  const handleLogoImg = (e) => {
    console.log(e);
    // Check if files were selected
    if (!e.target.files || e.target.files.length === 0) {
      console.error("No file selected.");
      return;
    }

    let file = e.target.files[0];
    setLogoImage(file);

    let reader = new FileReader();

    reader.onload = () => {
      setLogoPreview(reader.result);
    };

    reader.onerror = (err) => {
      console.error("FileReader error:", err);
    };

    reader.readAsDataURL(file);
  };

  //Photo Choose Favicon
  const handleFaviconImg = (e) => {
    console.log(e);
    // Check if files were selected
    if (!e.target.files || e.target.files.length === 0) {
      console.error("No file selected.");
      return;
    }

    let file = e.target.files[0];
    setFaviconImage(file);

    let reader = new FileReader();

    reader.onload = () => {
      setFaviconPreview(reader.result);
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
    logo.append("logo", logoImage);
    await axios
      .put(`http://naftalan-backend.uptodate.az/private/site-logo/update`, logo)
      .then((res) => {
        setLogoImgData(res.data.logo);
        setLogoPreview("");
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
        setLogoImgError(err);
      });
  };
  // Set Favicon
  const handleFavIconSubmit = async (e) => {
    e.preventDefault();
    const logo = new FormData();
    logo.append("icon", faviconImage);
    await axios
      .put(`http://naftalan-backend.uptodate.az/private/site-icon/update`, logo)
      .then((res) => {
        setFaviconImgData(res.data.logo);
        setFaviconPreview("");
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
        setFaviconImgError(err);
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
        setLogoImgData(res.data.logo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Get Favicon Data
  const getFaviconData = useCallback(async () => {
    await axios
      .get(`http://naftalan-backend.uptodate.az/site-icon/read`, {
        crossdomain: true,
      })
      .then((res) => {
        setFaviconImgData(res.data.icon);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Rendering Data
  useEffect(() => {
    getLogoData();
    getSettingData();
    getFaviconData();
  }, [getFaviconData, getLogoData, getSettingData]);

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
          {/* Setting */}
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
                  type="tel"
                  className={errors.site_phone ? "inp error" : "inp"}
                  id="site_phone"
                  name="site_phone"
                  placeholder="+994555555555"
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
          {/* Logo */}
          <form className="image-area">
            <h2 className="main-caption">Main</h2>
            <div className="form-group">
              <label htmlFor="add-logo-photo" className="add">
                <div className="icon">
                  <img src={addFile} alt="addfile" />
                </div>
                Choose file
              </label>
              <input
                type="file"
                name="add-logo-photo"
                id="add-logo-photo"
                onChange={handleLogoImg}
              />
            </div>
            <div className="img-cards-area">
              <div className="img-card">
                <div className="top"></div>
                <div className="middle">
                  <img
                    src={
                      logoPreview
                        ? logoPreview
                        : `http://naftalan-backend.uptodate.az${logoImgData}`
                    }
                    alt="logo"
                  />
                </div>
                <div className="bottom"></div>
              </div>
            </div>
            <div className="form-footer">
              {logoPreview && (
                <>
                  {logoImgError && (
                    <p className="error-text">
                      Update failed, please check again
                    </p>
                  )}

                  <button onClick={(e) => handleLogoSubmit(e)}>Save</button>
                </>
              )}
            </div>
          </form>

          {/* Favicon */}
          <form className="image-area">
            <h2 className="main-caption">Favicon</h2>
            <div className="form-group">
              <label htmlFor="add-favicon-photo" className="add">
                <div className="icon">
                  <img src={addFile} alt="addfile" />
                </div>
                Choose file
              </label>
              <input
                type="file"
                name="add-favicon-photo"
                id="add-favicon-photo"
                onChange={handleFaviconImg}
              />
            </div>
            <div className="img-cards-area">
              <div className="img-card">
                <div className="top"></div>
                <div className="middle">
                  <img
                    src={
                      faviconPreview
                        ? faviconPreview
                        : `http://naftalan-backend.uptodate.az${faviconImgData}`
                    }
                    alt="logo"
                  />
                </div>
                <div className="bottom"></div>
              </div>
            </div>
            <div className="form-footer">
              {faviconPreview && (
                <>
                  {faviconImgError && (
                    <p className="error-text">
                      Update failed, please check again
                    </p>
                  )}

                  <button onClick={(e) => handleFavIconSubmit(e)}>Save</button>
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
