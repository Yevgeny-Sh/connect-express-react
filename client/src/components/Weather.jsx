import React, { useState, useEffect } from "react";
import axios from "axios";

function Weather() {
  const [dataState, setData] = useState([]);
  const [location, setLocation] = useState("");
  const [adress, setAdress] = useState("");

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (e) => {
    setAdress(location);
    e.preventDefault();
  };
  useEffect(() => {
    const callBackendAPI = async () => {
      const data = await axios.get(
        `http://localhost:3000/weather?address=${adress}`
      );
      if (data) {
        setData(data.data);
        console.log(data.data);
      }
    };
    callBackendAPI();
  }, [adress]);

  const renderData = () => {
    if (dataState.length > 0 && !adress)
      return <p className="App-intro">{dataState}</p>;
    else
      return (
        <div>
          <p>{dataState.location}</p>
          <p>{dataState.forecast}</p>
        </div>
      );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          location:
          <input type="text" value={location} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <div className="weather">{renderData()}</div>
    </div>
  );
}

export default Weather;
