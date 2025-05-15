import React, { useEffect, useState } from "react";
import '../assets/weather.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from "axios";

const weather = () => {
    const [city, setCity] = useState('Frankfurt');
    const [data, setData] = useState([]);
    const api_key = import.meta.env.VITE_APP_API_KEY;

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`);
                setData(res.data);
                console.log(res.data)
            }
            catch (err) {
                console.log(err);
            }

        };

        fetchWeatherData();

    }, [city])

    return (
        <div className="container">
            <div className="navbar">
                <i className="fa-solid fa-cloud-sun-rain" />
                <p>weather.com</p>
            </div>

            <div className="container-textbox">
                <input className="txt-city"
                    placeholder="enter city here"
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value)
                    }}
                />
            </div>

            <div className="container-sub">
                <div className="left">
                    <img src={`${data?.current?.condition?.icon}`} />
                </div>

                <div className="right">
                    <h1 className="temp">{data?.current?.temp_c} °C</h1>
                    <p className="text-weather">{data?.current?.condition?.text}</p>
                    <p className="text-city">{data?.location?.name}, <b>{data?.location?.country}</b></p>

                    <div className="humd-container">
                        <div className="left">
                            <i className="fa fa-droplet"></i> {data?.current?.humidity} %
                        </div>
                        <div className="right">
                            <i className="fa fa-wind"></i> {data?.current?.wind_kph} km/h
                        </div>
                    </div>
                </div>

            </div>


            <div className="footer">
                &copy; {new Date().getFullYear()} | Made with 💚 by <a>hanannawaz.dev</a> | <i>Credit:</i> Photo by <a href="https://unsplash.com/@evgenievgenief?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Evgeni Evgeniev</a> on <a href="https://unsplash.com/photos/scenery-of-forest-trees-LPKk3wtkC-g?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
            </div>
        </div>
    )
};

export default weather;