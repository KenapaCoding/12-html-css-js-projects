// Getting the HTML elements
const countdownElement = document.getElementById('countdown')
const daysElement = document.getElementById('days')
const hoursElement = document.getElementById('hours')
const minutesElement = document.getElementById('minutes')
const secondsElement = document.getElementById('seconds')
const inputHours = document.getElementById('inputHours')
const inputMinutes = document.getElementById('inputMinutes')
const inputSeconds = document.getElementById('inputSeconds')
const startButton = document.getElementById('startButton')

// varible countdownInterval
let countdownInterval;

// function to start the timer
function startTimer(){
    // Get the input values from user
    let hours = parseInt(inputHours.value) || 0
    let minutes = parseInt(inputMinutes.value) || 0
    let seconds = parseInt(inputSeconds.value) || 0

    // convert the total time into seconds
    let totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds

    // if no time is input, stop the function
    if (totalTimeInSeconds <=0){
        alert("Please enter a valid time.")
        return
    }
    // clear the input after the timer starts
    inputHours.value = ''
    inputMinutes.value = ''
    inputSeconds.value = ''

    // function to update the time display every seconds
    countdownInterval = setInterval(()=> {
        // calculate remaining days, hours, minutes, and seconds
        const days = Math.floor(totalTimeInSeconds/86400)
        const hours = Math.floor((totalTimeInSeconds % 86400) / 3600)
        const minutes = Math.floor((totalTimeInSeconds%3600)/60)
        const seconds = Math.floor((totalTimeInSeconds % 60))

        //Update the HTML element display
        daysElement.textContent = days.toString().padStart(2,'0')
        hoursElement.textContent = hours.toString().padStart(2,'0')
        minutesElement.textContent = minutes.toString().padStart(2,'0')
        secondsElement.textContent = seconds.toString().padStart(2,'0')

        // Decrease the total time by one seconds
        totalTimeInSeconds--

        // Stop the timer if time runs out
        if(totalTimeInSeconds < 0) {
            clearInterval(countdownInterval)
            alert("Time's up!")
        }
            
    }, 1000 //miliseconds
)
}

// add Event Listener for the start button
startButton.addEventListener('click', ()=> {
    // stop any running timer
    clearInterval(countdownInterval)
    // start a new timer
    startTimer()
})