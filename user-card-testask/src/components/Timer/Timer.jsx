import React, { useState, useEffect } from 'react';

function Timer() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function tick() {
        setCurrentTime(new Date());
    }

    return (
        <div>
            <div>{currentTime.toLocaleTimeString()}</div>
        </div>
    );
}

export default Timer;
