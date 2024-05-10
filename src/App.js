import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import SideBarMainMenu from "./components/SideBarMainMenu";
import { GeneralControl } from "./utils/MainContext";
import Reservation from "./pages/Reservation";
import AllHotelList from "./pages/AllHotelList";
import Discount from "./pages/Discount";
import HotelDetail from "./pages/HotelDetail";
import ExchangeRate from "./pages/ExchangeRate";
import CouponCodeOverview from "./pages/CouponCodeOverview";
import EmailTemplates from "./pages/EmailTemplates";
import Setting from "./pages/Setting";
import FileManager from "./pages/FileManager";
import ContactUs from "./pages/ContactUs";
import NewsLetter from "./pages/NewsLetter";
import Comment from "./pages/Comment";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <GeneralControl>
      <Header />
      <SideBarMainMenu />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/hotel" element={<AllHotelList />} />
        <Route path="/hotel-detail/:hotelId?" element={<HotelDetail/>} />
        <Route path="/home-page" element={<HomePage/>} />
        <Route path="/comment" element={<Comment/>} />

        <Route path="/exchange-rate" element={<ExchangeRate/>} />
        <Route path="/email-templates" element={<EmailTemplates/>} />
        <Route path="/coupon-code-overview" element={<CouponCodeOverview/>} />
        <Route path="/discount" element={<Discount />} />
        <Route path="/photos" element={<FileManager />} />
        <Route path="/newsletter" element={<NewsLetter />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/settings" element={<Setting />} />
      </Routes>
    </GeneralControl>
  );
};

export default App;
