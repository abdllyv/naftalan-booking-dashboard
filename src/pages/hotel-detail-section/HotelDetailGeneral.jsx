import { useContext, useEffect, useState } from "react";

// Icon
import arrowDown from "../../assets/images/icon/arrow-down.svg";
import { useNavigate, useParams } from "react-router-dom";

// Axios
import axios from "axios";

// React Hook Form && yup
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { boolean, number, object, string } from "yup";

// Toastify
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainContext } from "../../utils/MainContext";

const HotelDetailGeneral = () => {
  // Global State
  const { hotelGeneral, setHotelGeneral } = useContext(MainContext);

  // Local State
  const [dropDownVisible, setDropDownVisible] = useState(null);
  const [updateState, setUpdateState] = useState(true);

  //   List
  const hotel_types = [
    { id: 1, character: "sanatorium" },
    { id: 2, character: "hostel" },
    { id: 3, character: "resort" },
    { id: 4, character: "boutique" },
    { id: 5, character: "business" },
    { id: 6, character: "luxury" },
    { id: 7, character: "B&B" },
  ];
  const hotel_offer_categories = [
    { id: 1, character: "hot" },
    { id: 2, character: "new" },
    { id: 3, character: "standard" },
    { id: 4, character: "promotion" },
    { id: 5, character: "guest-favorite" },
  ];

  // // setList
  // const setList = useMemo(
  //   () => [
  //     {
  //       title: "hotel_active",
  //       value: "",
  //     },

  //     {
  //       title: "hotel_type",
  //       value: "",
  //     },

  //     {
  //       title: "hotel_name",
  //       value: "",
  //     },

  //     {
  //       title: "hotel_phone",
  //       value: "",
  //     },

  //     {
  //       title: "hotel_email",
  //       value: "",
  //     },

  //     {
  //       title: "hotel_address",
  //       value: "",
  //     },

  //     {
  //       title: "hotel_priority_rating",
  //       value: "",
  //     },

  //     {
  //       title: "hotel_star_rating",
  //       value: "",
  //     },

  //     {
  //       title: "hotel_infant_age",
  //       value: "",
  //     },

  //     {
  //       title: "hotel_fax",
  //       value: "",
  //     },

  //     {
  //       title: "hotel_map_url",
  //       value: "",
  //     },

  //     {
  //       title: "hotel_offer_category",
  //       value: "",
  //     },

  //     {
  //       title: "hotel_associated_images",
  //       value: "",
  //     },
  //     {
  //       title: "hotel_associated_main_image",
  //       value: "",
  //     },

  //     {
  //       title: "hotel_associated_coupons",
  //       value: "",
  //     },

  //     {
  //       title: "hotel_associated_attributes",
  //       value: [],
  //     },
  //   ],
  //   []
  // );

  // Params
  const { hotelId } = useParams();

  // Navigate
  const navigate = useNavigate();

  // Yup schema
  const hotelGeneralInfoSchema = object({
    hotel_name: string().required().trim(),
    hotel_type: string().required().trim(),
    hotel_active: boolean().nullable().optional(),
    hotel_offer_category: string().required().trim(),
    hotel_phone: string().required().trim(),
    hotel_email: string().required().trim().email(),
    hotel_address: string().required().trim(),
    hotel_priority_rating: number().test(
      "maxDigits",
      "number field must have exactly 3 digits",
      (number) => number < 11
    ),
    hotel_infant_age: number().test(
      "maxDigits",
      "number field must have exactly 3 digits",
      (number) => number < 18
    ),
    hotel_star_rating: number().test(
      "maxDigits",
      "number field must have exactly 3 digits",
      (number) => number < 6
    ),
    hotel_fax: string().nullable().optional(),
  });

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(hotelGeneralInfoSchema),
  });

  // getData
  useEffect(() => {
    if (hotelId) {
      axios
        .get(
          `http://naftalan-backend.uptodate.az/private/hotel/read/${hotelId}`
        )
        .then((res) => {
          setValue("hotel_name", res.data.hotel_name);
          setValue("hotel_type", res.data.hotel_type);
          setValue("hotel_active", res.data.hotel_active);
          setValue("hotel_offer_category", res.data.hotel_offer_category);
          setValue("hotel_phone", res.data.hotel_phone);
          setValue("hotel_email", res.data.hotel_email);
          setValue("hotel_address", res.data.hotel_address);
          setValue("hotel_priority_rating", res.data.hotel_priority_rating);
          setValue("hotel_infant_age", res.data.hotel_infant_age);
          setValue("hotel_star_rating", res.data.hotel_star_rating);
          setValue("hotel_fax", res.data.hotel_fax);
          var objKeys = Object.getOwnPropertyNames(res.data);

          if (updateState) {
            const updatedHotelGeneral = hotelGeneral.map((item) => {
              if (objKeys.includes(item.title)) {
                return { ...item, value: res.data[item.title] }; // value'sini "set" olarak güncelle
              }
              return item;
            });
            setHotelGeneral(updatedHotelGeneral);
            setUpdateState(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [hotelGeneral, hotelId, setHotelGeneral, setValue, updateState]);
  // useEffect(() => {
  //   if (hotelId) {
  //     axios
  //       .get(
  //         `http://naftalan-backend.uptodate.az/private/hotel/read/${hotelId}`
  //       )
  //       .then((res) => {
  //         setValue("hotel_name", res.data.hotel_name);
  //         setValue("hotel_type", res.data.hotel_type);
  //         setValue("hotel_active", res.data.hotel_active);
  //         setValue("hotel_offer_category", res.data.hotel_offer_category);
  //         setValue("hotel_phone", res.data.hotel_phone);
  //         setValue("hotel_email", res.data.hotel_email);
  //         setValue("hotel_address", res.data.hotel_address);
  //         setValue("hotel_priority_rating", res.data.hotel_priority_rating);
  //         setValue("hotel_infant_age", res.data.hotel_infant_age);
  //         setValue("hotel_star_rating", res.data.hotel_star_rating);
  //         setValue("hotel_fax", res.data.hotel_fax);
  //         var objKeys = Object.getOwnPropertyNames(res.data);

  //         const updatedHotelGeneral = hotelGeneral.map((item) => {
  //           // Eğer objKeys içinde ilgili title varsa, value'sini "set" olarak ayarla
  //           if (objKeys.includes(item.title)) {
  //             return { ...item, value: res.data[item.title] }; // value'sini "set" olarak güncelle
  //           }
  //           return item; // Değiştirilmesi gerekmeyen öğeleri olduğu gibi bırak
  //         });

  //         setHotelGeneral(updatedHotelGeneral);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [hotelId]);
  //   if (hotelId) {
  //     axios
  //       .get(
  //         `http://naftalan-backend.uptodate.az/private/hotel/read/${hotelId}`
  //       )
  //       .then((res) => {
  //         setValue("hotel_name", res.data.hotel_name);
  //         setValue("hotel_type", res.data.hotel_type);
  //         setValue("hotel_active", res.data.hotel_active);
  //         setValue("hotel_offer_category", res.data.hotel_offer_category);
  //         setValue("hotel_phone", res.data.hotel_phone);
  //         setValue("hotel_email", res.data.hotel_email);
  //         setValue("hotel_address", res.data.hotel_address);
  //         setValue("hotel_priority_rating", res.data.hotel_priority_rating);
  //         setValue("hotel_infant_age", res.data.hotel_infant_age);
  //         setValue("hotel_star_rating", res.data.hotel_star_rating);
  //         setValue("hotel_fax", res.data.hotel_fax);
  //         var objKeys = Object.getOwnPropertyNames(res.data);
  //         // for (let i = 0; i < hotelGeneral.length; i++) {
  //         //   const item = setHotelGeneral[i];

  //         //   // Eğer objKeys içinde ilgili title varsa, value'sini "set" olarak ayarla
  //         //   if (objKeys.includes(item.title)) {
  //         //     item.value = res.data[item.title];
  //         //   }
  //         // }
  //
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [hotelGeneral, hotelId]);

  //Setting Form Submit
  const onSubmit = async (data) => {
    const body = new FormData();
    // body.append("hotel_active", data.hotel_active);
    // body.append("hotel_type", data.hotel_type);
    // body.append("hotel_offer_category", data.hotel_offer_category);
    // body.append("hotel_name", data.hotel_name);
    // body.append("hotel_phone", data.hotel_phone);
    // body.append("hotel_email", data.hotel_email);
    // body.append("hotel_address", data.hotel_address);
    // body.append("hotel_priority_rating", data.hotel_priority_rating);
    // body.append("hotel_infant_age", data.hotel_infant_age);
    // body.append("hotel_fax", data.hotel_fax);
    // body.append("hotel_star_rating", data.hotel_star_rating);

    // // Adition
    // body.append("hotel_map_url", "");
    // body.append("hotel_associated_main_image", []);
    // body.append("hotel_associated_attributes", []);
    // setList.map(value=>{

    // })
    var objKeys = Object.getOwnPropertyNames(data);

    // for (let i = 0; i < hotelGeneral.length; i++) {
    //   const item = hotelGeneral[i];

    //   // Eğer objKeys içinde ilgili title varsa, value'sini "set" olarak ayarla
    //   if (objKeys.includes(item.title)) {
    //     item.value = data[item.title];
    //   }
    // }
    const updatedHotelGeneral = hotelGeneral.map((item) => {
      // Eğer objKeys içinde ilgili title varsa, value'sini "set" olarak ayarla
      if (objKeys.includes(item.title)) {
        return { ...item, value: data[item.title] }; // value'sini "set" olarak güncelle
      }
      return item; // Değiştirilmesi gerekmeyen öğeleri olduğu gibi bırak
    });
    updatedHotelGeneral.map((data) => body.append(data.title, data.value));
    if (hotelId) {
      putData(data);
    } else {
      createData(body);
    }
  };

  const createData = (body) => {
    axios
      .post(`http://naftalan-backend.uptodate.az/private/hotel/create`, body)
      .then((res) => {
        if (res.status === 200) {
          toast.info("Data Create!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          const timer = setTimeout(() => {
            navigate("/hotel");
          }, 3000);
          return () => clearTimeout(timer);
        }
      })
      .catch((err) => console.log(err));
  };

  const putData = (data) => {
    const body = new FormData();
    var objKeys = Object.getOwnPropertyNames(data);
    const updatedHotelGeneral = hotelGeneral.map((item) => {
      if (objKeys.includes(item.title)) {
        console.log(item);
        return { ...item, value: data[item.title] };
      }
      return item;
    });
    console.log(updatedHotelGeneral)

    updatedHotelGeneral.map((data) => body.append(data.title, data.value));
    // for (const pair of body.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    // body.delete("hotel_associated_attributes");

    axios
      .put(
        `http://naftalan-backend.uptodate.az/private/hotel/update/${hotelId}`,
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

  return (
    <div className="hotel-detail-general">
      <div className="container">
        <form
          action=""
          className="main-input-area"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="inp-area">
            <div className="form-group">
              <label htmlFor="hotel_name">Hotel Name*</label>
              <input
                type="text"
                className={errors.hotel_name ? "inp error" : "inp"}
                name="hotel_name"
                id="hotel_name"
                {...register("hotel_name")}
              />
            </div>
            <div
              className={`form-group ${
                dropDownVisible === "type" ? "select open" : "select"
              } `}
            >
              <label htmlFor="hotel_type" className="inp-caption">
                Hotel Type
              </label>
              <input
                type="text"
                id="hotel_type"
                name="hotel_type"
                // value={inpValue}
                readOnly
                className={
                  errors.hotel_type ? "inp select-inp error" : "inp select-inp"
                }
                placeholder="Search "
                onClick={() =>
                  setDropDownVisible(dropDownVisible === "type" ? null : "type")
                }
                {...register("hotel_type")}
              />
              <div className="icon">
                <img src={arrowDown} alt="open-close-dropdown" />
              </div>
              <div
                className="select-area"
                style={{ height: dropDownVisible ? 120 : 0 }}
              >
                <ul className="select-list scrool">
                  {hotel_types.map((item) => (
                    <li
                      className="select-item"
                      onClick={(e) => {
                        setValue("hotel_type", item.character);
                        setDropDownVisible(false);
                      }}
                      key={item.id}
                    >
                      {item.character}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className={`form-group ${
                dropDownVisible === "offer" ? "select open" : "select"
              } `}
            >
              <label htmlFor=" hotel_offer_category" className="inp-caption">
                Hotel Offer Category
              </label>
              <input
                type="text"
                id="hotel_offer_category"
                name="hotel_offer_category"
                readOnly
                className={
                  errors.hotel_offer_category
                    ? "inp select-inp error"
                    : "inp select-inp"
                }
                placeholder=" Select Character"
                onClick={() =>
                  setDropDownVisible(
                    dropDownVisible === "offer" ? null : "offer"
                  )
                }
                {...register("hotel_offer_category")}
              />
              <div className="icon">
                <img src={arrowDown} alt="open-close-dropdown" />
              </div>
              <div
                className="select-area"
                style={{ height: dropDownVisible === "offer" ? 120 : 0 }}
              >
                <ul className="select-list scrool">
                  {hotel_offer_categories.map((item) => (
                    <li
                      className="select-item"
                      onClick={(e) => {
                        // e.target.parentElement.parentElement.parentElement.children[1].setAttribute(
                        //   "value",
                        //   item.character
                        // );
                        // e.target.parentElement.parentElement.parentElement.children[1].classList.remove(
                        //   "error"
                        // );
                        setValue("hotel_offer_category", item.character);
                        setDropDownVisible(false);
                      }}
                      key={item.id}
                    >
                      {item.character}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="hotel_phone">Telephone</label>
              <input
                type="number"
                className={errors.hotel_phone ? "inp error" : "inp"}
                id="hotel_phone"
                name="hotel_phone"
                {...register("hotel_phone")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="hotel_email">Mail</label>
              <input
                type="email"
                className={errors.hotel_email ? "inp error" : "inp"}
                id="hotel_email"
                name="hotel_email"
                {...register("hotel_email")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="hotel_address">Adrees</label>
              <input
                type="text"
                className={errors.hotel_address ? "inp error" : "inp"}
                id="hotel_address"
                name="hotel_address"
                {...register("hotel_address")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="hotel_infant_age">İnfant Age</label>
              <input
                type="number"
                className={errors.hotel_infant_age ? "inp error" : "inp"}
                id="hotel_infant_age"
                name="hotel_infant_age"
                {...register("hotel_infant_age")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="hotel_priority_rating">Priority Rating</label>
              <input
                type="number"
                className={errors.hotel_priority_rating ? "inp error" : "inp"}
                id="hotel_priority_rating"
                name="hotel_priority_rating"
                {...register("hotel_priority_rating")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="hotel_star_rating">Rating</label>
              <input
                type="number"
                className={errors.hotel_star_rating ? "inp error" : "inp"}
                id="hotel_star_rating"
                name="hotel_star_rating"
                {...register("hotel_star_rating")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="hotel_fax">Fax Code</label>
              <input
                type="text"
                className={errors.hotel_fax ? "inp error" : "inp"}
                id="hotel_fax"
                name="hotel_fax"
                {...register("hotel_fax")}
              />
            </div>
            <div className="form-group checkbox-group">
              <label htmlFor="hotel_active" className="inp-caption">
                Activated {""}
              </label>
              <label htmlFor="hotel_active" className="switch">
                <input
                  type="checkbox"
                  id="  hotel_active"
                  name="  hotel_active"
                  className="checkbox"
                  {...register("hotel_active")}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="form-footer">
            <p className="error-text">asdasd</p>
            <button>Cancel</button>
            <button>Save</button>
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

export default HotelDetailGeneral;
