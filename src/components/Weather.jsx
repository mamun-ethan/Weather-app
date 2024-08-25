import React, { useEffect, useState } from "react";
import Weather_icon from "../assets/image/sun.png";
import moment from "moment";
import axios from "axios";
const api_keys = import.meta.env.VITE_api_keys
const Weather = () => {
  

const [weather_data,set_weather] = useState()
const [change_value,set_Change] = useState(" ")
const [time,setTime] = useState(moment().format("hh:mm:ss a"))
const date =moment().format("MMM Do YY")


const timer = ()=>{
 return  setInterval(() => {
    const time = moment().format("hh:mm:ss a");
    setTime(time)
    
    },1000)
  

  }
  const fetch_data = async ()=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=dhaka&appid=${api_keys}&units=metric`
   
   try {
    const request_data = await axios.get(url)
    const result =request_data.data
   
    set_weather(result)
    console.log(result)
    
    
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
  
  const fetch_by_submit =  async(location)=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_keys}&units=metric`
   
   try {
    const request_data = await axios.get(url)
    const result =request_data.data
   
    set_weather(result)
    console.log(result)
    
    
   } catch (error) {
    console.log(error)
   }

  }

      const handle_change = (event)=>{
        set_Change(event.target.value)
      }
      
      const handle_submit = (event)=>{
        event.preventDefault()
         if(change_value === " "){
          alert("Enter the City")
         }
         fetch_by_submit(change_value)
      }
 

  return (
    <div className="container">
      <div className="search_bar">
        <input
          type="text"
          className="search_feild"
          placeholder="Search by City"
          name=""
          onChange={handle_change}
          id=""
        />
        <button className="search_btn" onClick={handle_submit}>Search</button>
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
            {weather_data ? weather_data.name : " "} ,
            {weather_data ? weather_data.sys.country : " "}
            


          </span>
          <div className="temp">
            <h1>{weather_data ? Math.floor( weather_data.main.temp) : " "}°</h1>

            <span className="day_status"> {weather_data ? weather_data.weather[0].main : " "}</span>
          </div>
        </div>
      </div>
      <div className="air_day_vibe">
        <div className="wine_status">
          <div>
            <span className="wind_speeds">
              <i className="fa-solid fa-wind"></i>
              {weather_data ? weather_data.wind.speed : " "}kmph
            </span>
          </div>
          <span className="wind_status">wine speed</span>
        </div>
        <div className="humandity">
          <div>
            <span className="humandity_rate">
              <i className="fa-solid fa-temperature-three-quarters"></i>
              {weather_data ? weather_data.main.humidity: " "}%
            </span>
          </div>
          <span className="humandity_status">Humanidty</span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
