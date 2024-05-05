import { createContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export const MainContext = createContext();

export const GeneralControl = ({ children }) => {
  const location = useLocation();

  /* ---------------------------------- State --------------------------------- */
  const [mainMneuVisible, setMainMneuVisible] = useState(false);
  const [hotelDEtailActiveTab, setHotelDEtailActiveTab] = useState("General");

  // SideBar Menu Visible
  const [atributeAddAreaVisible, setAtributeAddAreaVisible] = useState(false);
  const [priceListScheduleVisible, setPriceListScheduleVisible] =
    useState(false);
  const [priceListVisible, setPriceListVisible] = useState(false);
  const [exchangeRateVisible, setExchangeRateVisible] = useState(false);
  const [couponVisible, setCouponVisible] = useState(false);
  const [emailVisible, setEmailVisible] = useState(false);
  const [offerVisible, setOfferVisible] = useState(false);
  const[imgSideBarVisible,setImgSideBarVisible]=useState(false)
  const[folderSideBarVisible,setFolderSideBarVisible]=useState(false)

  const [user, setUser] = useState({});
  const [token, setToken] = useState(false);
  

 /* ------------------------------- Page State ------------------------------- */
//  Coupon
const [couponData,setCouponData]=useState([])
const [selectCoupon,setSelectCoupon]=useState(null)

  // Hotel
  const [hotelGeneral, setHotelGeneral] = useState([]);
  // Schema
  const hotelSchema = useMemo(
    () => [
      {
        title: "hotel_active",
        value: "",
      },

      {
        title: "hotel_type",
        value: "",
      },

      {
        title: "hotel_name",
        value: "",
      },

      {
        title: "hotel_phone",
        value: "",
      },

      {
        title: "hotel_email",
        value: "",
      },

      {
        title: "hotel_address",
        value: "",
      },

      {
        title: "hotel_priority_rating",
        value: "",
      },

      {
        title: "hotel_star_rating",
        value: "",
      },

      {
        title: "hotel_infant_age",
        value: "",
      },

      {
        title: "hotel_fax",
        value: "",
      },

      {
        title: "hotel_map_url",
        value: "",
      },

      {
        title: "hotel_offer_category",
        value: "",
      },

      {
        title: "hotel_associated_images",
        value: "",
      },
      {
        title: "hotel_associated_main_image",
        value: "",
      },

      {
        title: "hotel_associated_coupons",
        value: "",
      },

      {
        title: "hotel_associated_attributes",
        value: [],
      },
    ],
    []
  );
  useEffect(() => {
    if (location.pathname.substring(0, 13)==="/hotel-detail") {
      setHotelGeneral(hotelSchema);
    } else {
      setHotelGeneral([]);
    }
  }, [hotelSchema, location.pathname]);


  /* --------------------------------- Log Out -------------------------------- */
  const logOut = () => {
    setToken(false);
  };

  const globalStates = {
    // State
    mainMneuVisible,
    setMainMneuVisible,
    hotelDEtailActiveTab,
    setHotelDEtailActiveTab,
/* ------------------------------- Page State ------------------------------- */

//Coupon Data 
    couponData,setCouponData,
    selectCoupon,setSelectCoupon,
    

    // SideBar Menu Visible
    atributeAddAreaVisible,
    setAtributeAddAreaVisible,
    priceListScheduleVisible,
    setPriceListScheduleVisible,
    priceListVisible,
    setPriceListVisible,
    exchangeRateVisible,
    setExchangeRateVisible,
    couponVisible,
    setCouponVisible,
    emailVisible,
    setEmailVisible,
    offerVisible,
    setOfferVisible,
    imgSideBarVisible,setImgSideBarVisible,
    folderSideBarVisible,setFolderSideBarVisible,

    // Hotel
    hotelGeneral,
    setHotelGeneral,

    user,
    setUser,
    token,
    setToken,
    // Function
    logOut,

    // Schema
    hotelSchema,
  };
  return (
    <MainContext.Provider value={globalStates}>{children}</MainContext.Provider>
  );
};
