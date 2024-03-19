import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const Timer = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [paused, setPaused] = useState(false);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            if (!paused) {
                setCurrentTime(prevTime => new Date(prevTime.getTime() + 1000));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [paused]);

    useEffect(() => {
        axios.get("http://worldtimeapi.org/api/timezone")
            .then(response => {
                setCountries(response.data);
                setSelectedCountry(response.data[0]);
            })
            .catch(error => {
                console.error("Error fetching countries and timezones:", error);
            });
    }, []);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handlePauseTimer = () => {
        setPaused(prevPaused => !prevPaused);
    };

    const countryOptions = useMemo(() => {
        return countries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
        ));
    }, [countries]);

    return (
        <div>
            <select value={selectedCountry} onChange={handleCountryChange}>
                {countryOptions}
            </select>

            <h2>Current Time: {currentTime && currentTime.toLocaleTimeString()}</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded" onClick={handlePauseTimer}>
                {paused ? "Start" : "Pause"}
            </button>
        </div>
    );
};

export default Timer;
