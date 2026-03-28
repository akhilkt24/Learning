// script.js
// JavaScript Clock Functionality

let is24HourFormat = true;

function toggleFormat() {
    is24HourFormat = !is24HourFormat;
    updateClock();
}

function updateClock() {
    const now = new Date();
    let hours = now.getUTCHours();
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    const dateString = now.toISOString().split('T')[0];

    let displayHours = is24HourFormat ? hours : (hours % 12) || 12;
    const period = is24HourFormat ? '' : (hours >= 12 ? ' PM' : ' AM');

    const timeString = `${displayHours}:${minutes}:${seconds}${period}`;
    document.getElementById('clock').innerHTML = `Date: ${dateString} - Time: ${timeString}`;
}

setInterval(updateClock, 1000);
// Initial call to display the clock immediately
updateClock();

// HTML element handler
// Assuming there's a button with id 'toggle-format' to toggle the format
document.getElementById('toggle-format').addEventListener('click', toggleFormat);
