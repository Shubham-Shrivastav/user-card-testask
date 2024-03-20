import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const Timer = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [isRunning, setIsRunning] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get("http://worldtimeapi.org/api/timezone")
            .then(response => {
                setCountries(response.data);
                setSelectedCountry(response.data[0]);
                fetchCurrentTime(response.data[0]);
            })
            .catch(error => {
                console.error("Error fetching countries and timezones:", error);
            });
    }, []);

    const fetchCurrentTime = (region) => {
        axios.get(`http://worldtimeapi.org/api/timezone/${region}`)
            .then(response => {
                console.log("API Response:", response.data);
                setCurrentTime(response.data.datetime);
            })
            .catch(error => {
                console.error("Error fetching current time:", error);
            });
    };

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setCurrentTime(prevTime => moment(prevTime).add(1, 'seconds').format());
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);


    const handleStartStop = () => {
        setIsRunning(prevIsRunning => !prevIsRunning);
    };

    useEffect(() => {
        console.log(selectedCountry);
    }, [selectedCountry])

    return (
        <div className="flex justify-between items-center my-4 space-x-8">
            <div className="flex">
                <select className="h-8 w-28 text-xs rounded-md bg-[#31363F] text-[#EEEEEE] sm:px-2"
                    value={selectedCountry} onChange={(e) => { setSelectedCountry(e.target.value); fetchCurrentTime(e.target.value); }}>
                    {countries.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                    ))}
                </select>
                <h2 className="m-2 text-[#EEEEEE] text-xs">Time: {moment(currentTime).format('HH:mm:ss')}</h2>
            </div>
            <button className="text-xs px-2 py-1 bg-green-500 hover:bg-green-700 text-white sm:text-base sm:py-0 sm:px-4 rounded m-1" onClick={handleStartStop}>{isRunning ? 'Pause' : 'Start'}</button>
        </div>
    );
};

export default Timer;