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
import axios from "axios";
const ExchangeRateSideBarMenu = ({ selectData }) => {
  // Global State
  const {
    exchangeRateVisible,
    setExchangeRateVisible,
    exchangeRateData,
    setExchangeRateData,
  } = useContext(MainContext);

  // Local State
  const [errorText, setErrorText] = useState("");

  // Yup schema
  const schema = object({
    currency_price: string().required().trim(),
  });

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (selectData) {
      setValue("currency_price", selectData?.currency_price);
    }
  }, [exchangeRateVisible, selectData, selectData.currency_price, setValue]);

  const submit = async (data) => {
    let newData = data.currency_price;
    const body = new FormData();
    body.append("currency_name", selectData.currency_name);
    body.append("currency_code", selectData.currency_code);
    body.append("currency_price", newData);

    axios
      .put(
        `http://naftalan-backend.uptodate.az/private/currency/update/${selectData.id}`,
        body,
        { crossdomain: true }
      )
      .then((res) => {
        toast.info("Send Newletter!", {
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
        setExchangeRateData(prevData => {
          return prevData.map(item => {
            if (item.id === selectData.id) {
              return { ...item, currency_price: data.currency_price }; // İçerik değiştirilir
            }
            return item;
          });
        });
        const timer = setTimeout(() => {
          setExchangeRateVisible(false);
        }, 1000);
        return () => clearTimeout(timer);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={
        exchangeRateVisible
          ? " isOpenMenu exchange-rate-sidebar-menu "
          : "exchange-rate-sidebar-menu  "
      }
    >
      <div className="head">
        <h4 className="caption">Exchange rate</h4>
        <div className="icon" onClick={() => setExchangeRateVisible(false)}>
          <img src={arrow} alt=" close" />
        </div>
      </div>
      <div className="body">
        <h4 className="form-caption">
          {selectData && selectData.currency_code}
        </h4>
        <form
          action=""
          className="exchange-rate-form"
          onSubmit={handleSubmit(submit)}
        >
          <div className="form-group">
            <label htmlFor="currency_price" className="inp-caption">
              Price
            </label>
            <input
              type="number"
              name="currency_price"
              id="currency_price"
              className={errors.currency_price ? "inp error" : "inp"}
              {...register("currency_price")}
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

export default ExchangeRateSideBarMenu;
