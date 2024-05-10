import { useCallback, useContext, useEffect, useState } from "react";
import { MainContext } from "../utils/MainContext";

// Icon
import menuIcon from "../assets/images/icon/burger-menu.svg";
import trash from "../assets/images/icon/trash.svg";
import edit from "../assets/images/icon/edit.svg";
import add from "../assets/images/icon/add-plus.svg";
import arrow from "../assets/images/icon/arrow-left.svg";
import axios from "axios";

// React Hook Form && yup
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { boolean, object, string } from "yup";

// Toastify
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createRemoveAlert } from "../utils/SweetAlert";

const Discount = () => {
  // Global State
  const {
    mainMneuVisible,
    setMainMneuVisible,

    // Discount
    discountData,
    setDiscountData,
    selectDiscount,
    setSelectDiscount,
  } = useContext(MainContext);

  //   Local State
  const [currentTab, setCurrentTab] = useState("night");
  const [discountDetail, setDiscountDetail] = useState(false);
  const [errorText, setErrorText] = useState("");

  // LOcal State
  const [type, setType] = useState("");

  // Get Free Night Data
  const getFreeNight = useCallback(
    async (page_number) => {
      await axios
        .get(
          `http://naftalan-backend.uptodate.az/private/special-offer-free-night/read/all?page_length=20&page_number=${page_number}`
        )
        .then((res) => setDiscountData(res.data.page_data))
        .catch((err) => console.log(err));
    },
    [setDiscountData]
  );

  // Get Persentage Night
  const getPersentageNight = useCallback(
    async (page_number) => {
      await axios
        .get(
          `http://naftalan-backend.uptodate.az/private/special-offer-percentage/read/all?page_length=20&page_number=${page_number}`
        )
        .then((res) => setDiscountData(res.data.page_data))
        .catch((err) => console.log(err));
    },
    [setDiscountData]
  );

  // RenderingDAta
  useEffect(() => {
    if (currentTab === "persentage") {
      getPersentageNight(1);
    } else {
      getFreeNight(1);
    }
  }, [currentTab, getFreeNight, getPersentageNight]);

  // Yup schema
  const freeNightSchema = object({
    offer_active: boolean().nullable().optional(),
    offer_name: string().required().trim(),
    offer_start: string().required().trim(),
    offer_end: string().required().trim(),
    offer_travel_dates_must_be_within_offer_dates: boolean(),
    offer_recurring_period: string().required().trim(),
    offer_free_night_quantity: string().required().trim(),
  });
  const persentagetSchema = object({
    offer_active: boolean().nullable().optional(),
    offer_name: string().required().trim(),
    offer_start: string().required().trim(),
    offer_end: string().required().trim(),
    offer_travel_dates_must_be_within_offer_dates: boolean(),
    offer_percentage_value: string().required().trim(),
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
      currentTab === "night" ? freeNightSchema : persentagetSchema
    ),
  });

  useEffect(() => {
    if (selectDiscount && type === "edit") {
      if (currentTab === "night") {
        setValue("offer_active", selectDiscount.offer_active);
        setValue("offer_name", selectDiscount.offer_name);
        setValue("offer_start", selectDiscount.offer_start);
        setValue("offer_end", selectDiscount.offer_end);
        setValue(
          "offer_travel_dates_must_be_within_offer_dates",
          selectDiscount.offer_travel_dates_must_be_within_offer_dates
        );
        setValue(
          "offer_recurring_period",
          selectDiscount.offer_recurring_period
        );
        setValue(
          "offer_free_night_quantity",
          selectDiscount.offer_free_night_quantity
        );
    
      } else {
        setValue("offer_active", selectDiscount.offer_active);
        setValue("offer_name", selectDiscount.offer_name);
        setValue("offer_start", selectDiscount.offer_start);
        setValue("offer_end", selectDiscount.offer_end);
        setValue(
          "offer_travel_dates_must_be_within_offer_dates",
          selectDiscount.offer_travel_dates_must_be_within_offer_dates
        );
        setValue(
          "offer_percentage_value",
          selectDiscount.offer_percentage_value
        );
      }
    }
  }, [currentTab, selectDiscount, setValue, type]);

  // Create && Edit
  const submit = async (data) => {
    const freeNightbody = new FormData();
    const persentagebody = new FormData();

    // FreeNIghtBody
    freeNightbody.append("offer_active", data.offer_active);
    freeNightbody.append("offer_name", data.offer_name);
    freeNightbody.append("offer_start", data.offer_start);
    freeNightbody.append("offer_end", data.offer_end);
    freeNightbody.append(
      "offer_travel_dates_must_be_within_offer_dates",
      data.offer_travel_dates_must_be_within_offer_dates
    );
    freeNightbody.append("offer_recurring_period", data.offer_recurring_period);
    freeNightbody.append(
      "offer_free_night_quantity",
      data.offer_free_night_quantity
    );

    // PersentageBody
    persentagebody.append("offer_active", data.offer_active);
    persentagebody.append("offer_name", data.offer_name);
    persentagebody.append("offer_start", data.offer_start);
    persentagebody.append("offer_end", data.offer_end);
    persentagebody.append(
      "offer_travel_dates_must_be_within_offer_dates",
      data.offer_travel_dates_must_be_within_offer_dates
    );
    persentagebody.append(
      "offer_percentage_value",
      data.offer_percentage_value
    );

    /* ------------------------------ Check Procces ----------------------------- */
    // Edit
    if (type === "edit") {
      if (currentTab === "night") {
        // Free Night Edit Put Method
        try {
          const res = await axios.put(
            `http://naftalan-backend.uptodate.az/private/special-offer-free-night/update/${selectDiscount.id}            `,
            freeNightbody
          );
          setDiscountData((prevData) => {
            return prevData.map((item) => {
              if (item.id === res.data.id) {
                return res.data;
              }
              return item;
            });
          });

          toast.info("Data Update!", {
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
            setDiscountDetail(false);
            setSelectDiscount({
              offer_active: "",
              offer_name: "",
              offer_start: "",
              offer_end: "",
              offer_travel_dates_must_be_within_offer_dates: "",
              offer_recurring_period: "",
              offer_free_night_quantity: "",
              offer_percentage_value: "",
            });
          }, 1000);
          return () => clearTimeout(timer);
        } catch (err) {
          setErrorText(err.response?.data.errors);
        }
      }
      // Persentage Edit Put Method
      else {
        try {
          const res = await axios.put(
            `http://naftalan-backend.uptodate.az/private/special-offer-percentage/update/${selectDiscount.id}`,
            persentagebody
          );

          setDiscountData((prevData) => {
            return prevData.map((item) => {
              if (item.id === res.data.id) {
                return res.data;
              }
              return item;
            });
          });

          toast.info("Data Update!", {
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
            setDiscountDetail(false);
            setSelectDiscount({
              offer_active: "",
              offer_name: "",
              offer_start: "",
              offer_end: "",
              offer_travel_dates_must_be_within_offer_dates: "",
              offer_recurring_period: "",
              offer_free_night_quantity: "",
              offer_percentage_value: "",
            });
          }, 1000);
          return () => clearTimeout(timer);
        } catch (err) {
          setErrorText(err.response?.data.errors);
        }
      }
    } else {
      /* --------------------------------- Create --------------------------------- */
      /* ----------------------- Free Night Discount Create ----------------------- */
      if (currentTab === "night") {
        await axios
          .post(
            ` http://naftalan-backend.uptodate.az/private/special-offer-free-night/create`,
            freeNightbody,
            { crossdomain: true }
          )
          .then((res) => {
            setDiscountData([res.data, ...discountData]);
            reset();
            setDiscountDetail(false);
            setSelectDiscount({
              offer_active: "",
              offer_name: "",
              offer_start: "",
              offer_end: "",
              offer_travel_dates_must_be_within_offer_dates: "",
              offer_recurring_period: "",
              offer_free_night_quantity: "",
              offer_percentage_value: "",
            });
          })
          .catch((err) => setErrorText(err.response.data.errors));
      } else {
        /* ----------------------- Persantage Discount Create ----------------------- */
        await axios
          .post(
            ` http://naftalan-backend.uptodate.az/private/special-offer-percentage/create`,
            persentagebody,
            { crossdomain: true }
          )
          .then((res) => {
            setDiscountData([res.data, ...discountData]);
            reset();
            setDiscountDetail(false);
            setSelectDiscount({
              offer_active: "",
              offer_name: "",
              offer_start: "",
              offer_end: "",
              offer_travel_dates_must_be_within_offer_dates: "",
              offer_recurring_period: "",
              offer_free_night_quantity: "",
              offer_percentage_value: "",
            });
         
          })
          .catch((err) => setErrorText(err.response.data.errors));
      }
    }
  };

  // Delete Coupon
  const removeData = (dataId) => {
    createRemoveAlert(
      "Delete Coupon!",
      "Are you sure you want to delete the Discount?",
      "Yes, Remove",
      async () => {
        if (currentTab === "night") {
          await axios
          .delete(
            `http://naftalan-backend.uptodate.az/private/special-offer-free-night/delete/${dataId}`
          )
          .then((res) => {
   
            if (res.status === 200) {
              const updateCoupon = discountData.filter(
                (item) => item.id !== dataId
              );
              setDiscountData(updateCoupon);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        } else {
          await axios
            .delete(
              `http://naftalan-backend.uptodate.az/private/special-offer-percentage/delete/${dataId}`
            )
            .then((res) => {
        
              if (res.status === 200) {
                const updateCoupon = discountData.filter(
                  (item) => item.id !== dataId
                );
                setDiscountData(updateCoupon);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    );
  };

  return (
    <main>
      <section className="discount">
        <div className="sub-header">
          <div className="container">
            <div className="row">
              <div className="info">
                <button onClick={() => setMainMneuVisible(true)}>
                  <img src={menuIcon} alt="menu" />
                </button>
                <h2 className="caption">Discount</h2>
              </div>
              {/* <div className="search-form">
                <input type="text" placeholder="Search" />
              </div> */}
            </div>
          </div>
        </div>
        <div className="discount-header">
          <div className="container">
            <ul className="tab-list">
              <li
                className={
                  currentTab === "night" ? "tab-item active" : "tab-item"
                }
                onClick={() => setCurrentTab("night")}
              >
                Free night
              </li>
              <li
                className={
                  currentTab === "persentage" ? "tab-item active" : "tab-item"
                }
                onClick={() => setCurrentTab("persentage")}
              >
                Offer persentage
              </li>
            </ul>
            <div className="edit-area">
              <h6 className="title">Add discaunt</h6>
              <button
                className="add-btn"
                onClick={() => {
                  setDiscountDetail(true);
                  setType("create");
                }}
              >
                Add <img src={add} alt="add" />
              </button>
            </div>
          </div>
        </div>
        <div className="discount-info-area">
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Offer name</th>
                  <th>Period</th>
                  <th>
                    {currentTab === "night" ? "Free night quantity" : "Value"}
                  </th>
                  <th>Travel dates</th>
                  <th>Active</th>
                  <th>Edit && Delete </th>
                </tr>
              </thead>
              <tbody>
                {discountData &&
                  discountData.map((item) => (
                    <tr key={item.id}>
                      <td className="carImg">{item.id}</td>
                      <td>{item.offer_name}</td>
                      <td>
                        {item.offer_start}/{item.offer_end}
                      </td>
                      <td>
                        {item.offer_free_night_quantity}{" "}
                        {item.offer_percentage_value}
                      </td>

                      <td>
                        {" "}
                        {item.offer_travel_dates_must_be_within_offer_dates
                          ? "Active"
                          : "Disactive"}{" "}
                      </td>
                      <td> {item.offer_active ? "Active" : "Disactive"} </td>

                      <td className="edit">
                        <div className="btn-area">
                          <button onClick={() => removeData(item.id)}>
                            <img src={trash} alt="trash" />
                          </button>
                          <button
                            onClick={() => {
                              setType("edit");
                              setSelectDiscount(item);
                              setDiscountDetail(true);
                            }}
                          >
                            <img src={edit} alt="edit" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className={
            discountDetail || mainMneuVisible
              ? "overlay-sub-menu active"
              : "overlay-sub-menu"
          }
          onClick={() => {
            setMainMneuVisible(false);
            setDiscountDetail(false);
            setSelectDiscount({
              offer_active: "",
              offer_name: "",
              offer_start: "",
              offer_end: "",
              offer_travel_dates_must_be_within_offer_dates: "",
              offer_recurring_period: "",
              offer_free_night_quantity: "",
              offer_percentage_value: "",
            });
          }}
        ></div>
        <div
          className={
            discountDetail
              ? " isOpenMenu sidebar-discount-menu "
              : "sidebar-discount-menu  "
          }
        >
          <div className="head">
            <h4 className="caption">Discount</h4>
            <div
              className="icon"
              onClick={() => {
                setDiscountDetail(false);
                setSelectDiscount({
                  offer_active: "",
                  offer_name: "",
                  offer_start: "",
                  offer_end: "",
                  offer_travel_dates_must_be_within_offer_dates: "",
                  offer_recurring_period: "",
                  offer_free_night_quantity: "",
                  offer_percentage_value: "",
                });
              }}
            >
              <img src={arrow} alt=" close" />
            </div>
          </div>
          <div className="body">
            <form
              action=""
              className="discount-form"
              onSubmit={handleSubmit(submit)}
            >
              <div className="form-group">
                <label htmlFor="offer_name" className="inp-caption">
                  Offer name
                </label>
                <input
                  type="text"
                  className={errors.offer_name ? "inp error" : "inp"}
                  name="offer_name"
                  id="offer_name"
                  {...register("offer_name")}
                  onChange={() => errorText !== "" && setErrorText("")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="offer_start" className="inp-caption">
                  Offer start
                </label>
                <input
                  type="date"
                  className={errors.offer_start ? "inp error" : "inp"}
                  name="offer_start"
                  id="offer_start"
                  {...register("offer_start")}
                  onChange={() => errorText !== "" && setErrorText("")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="offer_end" className="inp-caption">
                  Offer end
                </label>
                <input
                  type="date"
                  className={errors.offer_end ? "inp error" : "inp"}
                  name="offer_end"
                  id="offer_end"
                  {...register("offer_end")}
                  onChange={() => errorText !== "" && setErrorText("")}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor={
                    currentTab === "night"
                      ? "offer_recurring_period"
                      : "offer_percentage_value"
                  }
                  className="inp-caption"
                >
                  {currentTab === "night" ? "Period" : "Percentage Value"}
                </label>
                <input
                  type="number"
                  className={
                    currentTab === "night"
                      ? errors.offer_recurring_period
                        ? "inp error"
                        : "inp"
                      : errors.offer_percentage_value
                      ? "inp error"
                      : "inp"
                  }
                  name={
                    currentTab === "night"
                      ? "offer_recurring_period"
                      : "offer_percentage_value"
                  }
                  id={
                    currentTab === "night"
                      ? "offer_recurring_period"
                      : "offer_percentage_value"
                  }
                  {...register(
                    currentTab === "night"
                      ? "offer_recurring_period"
                      : "offer_percentage_value"
                  )}
                  onChange={() => errorText !== "" && setErrorText("")}
                />
              </div>
              {currentTab === "night" && (
                <div className="form-group">
                  <label
                    htmlFor="offer_free_night_quantity"
                    className="inp-caption"
                  >
                    {currentTab === "night" ? "Free night quantity" : "Value"}
                  </label>
                  <input
                    type="text"
                    className={
                      errors.offer_free_night_quantity ? "inp error" : "inp"
                    }
                    name="offer_free_night_quantity"
                    id="offer_free_night_quantity"
                    {...register("offer_free_night_quantity")}
                    onChange={() => errorText !== "" && setErrorText("")}
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="offer_active" className="inp-caption">
                  Offer active
                </label>
                <label htmlFor="offer_active" className="switch">
                  <input
                    type="checkbox"
                    id="offer_active"
                    name="offer_active"
                    className="checkbox"
                    {...register("offer_active")}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="form-group">
                <label
                  htmlFor="offer_travel_dates_must_be_within_offer_dates"
                  className="inp-caption"
                >
                  Offer travel dates must be within offer dates
                </label>
                <label
                  htmlFor="offer_travel_dates_must_be_within_offer_dates"
                  className="switch"
                >
                  <input
                    type="checkbox"
                    id="offer_travel_dates_must_be_within_offer_dates"
                    name="offer_travel_dates_must_be_within_offer_dates"
                    className="checkbox"
                    {...register(
                      "offer_travel_dates_must_be_within_offer_dates"
                    )}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="form-footer">
                <p className="error-text">{errorText}</p>
                <div className="btn-area">
                  {/* <button>Cancel</button> */}
                  <button>Save</button>
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
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Discount;
