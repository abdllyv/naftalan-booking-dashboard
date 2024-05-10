import { createContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import BannerSideBAr from "../components/side-bar-menu/BannerSideBAr";

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

  // SideBarVisible
  const [couponVisible, setCouponVisible] = useState(false);
  const [offerVisible, setOfferVisible] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(false);

  /* ------------------------------- Page State ------------------------------- */
  //  Coupon Page
  const [couponData, setCouponData] = useState([]);
  const [selectCoupon, setSelectCoupon] = useState({
    coupon_name: "",
    coupon_codeL: "",
    coupon_activeL: "",
    coupon_startL: "",
    coupon_endL: "",
    coupon_percentage_valueL: "",
  });

  // Discount
  const [discountData, setDiscountData] = useState([]);
  const [selectDiscount, setSelectDiscount] = useState({
    offer_active: "",
    offer_name: "",
    offer_start: "",
    offer_end: "",
    offer_travel_dates_must_be_within_offer_dates: "",
    offer_recurring_period: "",
    offer_free_night_quantity: "",
    offer_percentage_value: "",
  });

  // ExchangeRate
  const [exchangeRateData, setExchangeRateData] = useState([]);

  // Newsletter
  const [newsletterData, setNewsletterData] = useState(null);
  const [selectnewsletter, setSelectNewsletter] = useState({
    member_email: "",
    member_locale: "",
  });
  const [newsletterVisible, setNewsletterVisible] = useState(false);

  // FIle Manage Page
  const [folderData, setFolderData] = useState([]);
  const [imgSideBarVisible, setImgSideBarVisible] = useState(false);
  const [folderSideBarVisible, setFolderSideBarVisible] = useState(false);
  const[folderErrorText,setFolderErrorText]=useState("")

  // Email Template Page
  const [emailData, setEmailData] = useState([]);
  const [selectEmail, setSelectEmail] = useState({
    template_associated_descriptions: [],
  });
  const [emailVisible, setEmailVisible] = useState(false);
  const [emailErorText, setEmailErrorText] = useState("");

  // Comment Page
  const [commentSideBarVisible, setCommentSideBarVisible] = useState(false);
  const [commentData, setCommentData] = useState(null);
  const [selectComent, setSelectComent] = useState(null);
  const [commentActiveTab, setCommentActiveTab] = useState("Main page comment");

  // Home Page
  const [homeActiveTab, setHomeActiveTab] = useState("Banner");
  const [bannerSideBarVisible, setBannerSideBarVisible] = useState(false);
  const [bannerData, setBannerData] = useState([]);
  const[errorBannerText,setErrorBannerText]=useState("")
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
    if (location.pathname.substring(0, 13) === "/hotel-detail") {
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
    couponData,
    setCouponData,
    selectCoupon,
    setSelectCoupon,

    // DiscountData
    discountData,
    setDiscountData,
    selectDiscount,
    setSelectDiscount,

    // ExchangeRate
    exchangeRateData,
    setExchangeRateData,

    // Newsletter
    newsletterData,
    setNewsletterData,
    selectnewsletter,
    setSelectNewsletter,
    newsletterVisible,
    setNewsletterVisible,

    // File Manager Page
    folderData,
    setFolderData,
    imgSideBarVisible,
    setImgSideBarVisible,
    folderSideBarVisible,
    setFolderSideBarVisible,
    folderErrorText,
setFolderErrorText,

    // Email Page
    emailData,
    setEmailData,
    selectEmail,
    setSelectEmail,
    emailVisible,
    setEmailVisible,
    emailErorText,
    setEmailErrorText,

    // Comment Page
    commentSideBarVisible,
    setCommentSideBarVisible,
    commentData,
    setCommentData,
    selectComent,
    setSelectComent,
    commentActiveTab,
    setCommentActiveTab,

    // Home Page
    homeActiveTab,
    setHomeActiveTab,
    bannerData,setBannerData,
    bannerSideBarVisible,setBannerSideBarVisible,
    errorBannerText,
    setErrorBannerText,

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
    offerVisible,
    setOfferVisible,

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
