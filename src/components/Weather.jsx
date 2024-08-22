import React, { useEffect, useState } from "react";
import Weather_icon from "../assets/image/sun.png";
import moment from "moment";
import axios from "axios";
const api_keys = import.meta.env.VITE_api_keys
const Weather = () => {
  

const [weather_data,set_weather] = useState()
const [time,setTime] = useState(moment().format("hh:mm:ss a"))
const date =moment().format("MMM Do YY")

const timer = ()=>{
 return  setInterval(() => {
    const time = moment().format("hh:mm:ss a");
    setTime(time)
    
    },1000)
  

  }
  const fetch_data = async ()=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=tangail&appid=${api_keys}&units=metric`
   
   try {
    const request_data = await axios.get(url)
    const result =request_data.data
   
    set_weather(result)
    
    
   } catch (error) {
    console.log(error)
   }
  }
  useEffect(()=>{
    let timerId = timer()
    fetch_data()
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
            <h1>{weather_data ? Math.floor( weather_data.main.temp) : " "}°</h1>

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
