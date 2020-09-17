

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const thirty = '14 Oct 2021';

function countdown(){
    const thirtyBDay = new Date(thirty);
    const currentDate = new Date();

    const totalSeconds = (thirtyBDay - currentDate) / 1000; // 1 second = 1000 milliseconds

    const seconds = Math.floor(totalSeconds) % 60;
    
    const minutes = Math.floor(totalSeconds/60) % 60;

    const hours = Math.floor(totalSeconds/3600) % 24;

    const days = Math.floor(totalSeconds/3600/24);

    daysElement.innerHTML = formatTime(days); 
    hoursElement.innerHTML = formatTime(hours);
    minutesElement.innerHTML = formatTime(minutes);
    secondsElement.innerHTML = formatTime(seconds);


    //console.log(days, hours, minutes, seconds)
}


function formatTime(time){
    return time < 10 ? `0${time}` : time;
}

// initial call
countdown();

setInterval(countdown, 1000)