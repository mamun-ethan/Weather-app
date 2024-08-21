import React, { useEffect, useState } from "react";
import Weather_icon from "../assets/image/sun.png";
import moment from "moment";

const Weather = () => {
  
  
const [time,setTime] = useState(moment().format("hh:mm:ss a"))
const date =moment().format("MMM Do YY")

const timer = ()=>{
 return  setInterval(() => {
    const time = moment().format("hh:mm:ss a");
    setTime(time)
    
    },1000)
  

  }
  useEffect(()=>{
    let timerId = timer()
    return ()=>{
      clearInterval(timerId)
    }
    
  },[])
 

  return (
    <div className="container">
      <div className="search_bar">
        <input
          type="text"
          className="search_feild"
          placeholder="Search by City"
          name=""
          id=""
        />
        <button className="search_btn">Search</button>
      </div>
      <div className="weather_data">
        <div className="weather_status_icon">
          <img className="icon" src={Weather_icon} alt="" />
          <div className="date_time">
            <span>
              <i className="fa-solid fa-calendar-days"></i>
              {date}
            </span>
            <span>
              <i className="fa-solid fa-clock"></i> {time}
            </span>
          </div>
        </div>
        <div className="temperature_status">
          <span className="location">
            <i className="fa-solid fa-location-dot"></i>
            Tangail,Dhaka
          </span>
          <div className="temp">
            <h1>23°</h1>

            <span className="day_status"> cloudy</span>
          </div>
        </div>
      </div>
      <div className="air_day_vibe">
        <div className="wine_staus">
          <div>
            <span className="wind_speeds">
              <i className="fa-solid fa-wind"></i>
              23kmph
            </span>
          </div>
          <span className="wind_speed">wine speed</span>
        </div>
        <div className="humandity">
          <div>
            <span className="humandity_rate">
              <i className="fa-solid fa-temperature-three-quarters"></i>
              60%
            </span>
          </div>
          <span className="humandity_staus">Humanidty</span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
