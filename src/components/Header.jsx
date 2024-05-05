import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  // Local State
  const [imgData, setImgData] = useState(null);
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
  }, [getLogoData]);

  return (
    <header className="header">
      <div className="container">
        <Link to="/">
          <img src={`http://naftalan-backend.uptodate.az${imgData}`} alt="logo" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
