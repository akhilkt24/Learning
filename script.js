// Professional Digital Clock Timer - Enterprise Edition
// Features: Timezone support, 12/24 hour format, error handling, performance optimization

let is24HourFormat = true;
let currentTimezone = 'UTC';

// Timezone list
const timezones = ['UTC', 'US/Eastern', 'US/Central', 'US/Mountain', 'US/Pacific', 'Europe/London', 'Asia/Kolkata', 'Asia/Tokyo'];
let timezoneIndex = 0;

// Initialize localStorage for preferences
function initializePreferences() {
  const saved24Hour = localStorage.getItem('clock24HourFormat');
  const savedTimezone = localStorage.getItem('clockTimezone');  
  
  if (saved24Hour !== null) is24HourFormat = JSON.parse(saved24Hour);
  if (savedTimezone !== null) currentTimezone = savedTimezone;
}

// Save preferences
function savePreferences() {
  localStorage.setItem('clock24HourFormat', is24HourFormat);
  localStorage.setItem('clockTimezone', currentTimezone);
}

// Format time based on 12/24 hour preference
function formatTime(date) {
  const options = {
    timeZone: currentTimezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: !is24HourFormat
  };  
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Format date
function formatDate(date) {
  const options = {
    timeZone: currentTimezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };  
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Update clock display
function updateClock() {
  try {
    const now = new Date();
    const timeString = formatTime(now);
    const dateString = formatDate(now);
    
    document.getElementById('clock').textContent = timeString;
    document.getElementById('date').textContent = dateString;
    
    // Update timezone info
    document.getElementById('timezone-info').textContent = `Timezone: ${currentTimezone} | Format: ${is24HourFormat ? '24-Hour' : '12-Hour'}`;
  } catch (error) {
    console.error('Error updating clock:', error);
  }
}

// Toggle between 12 and 24 hour format
function toggleFormat() {
  is24HourFormat = !is24HourFormat;
  savePreferences();
  updateClock();
}

// Toggle timezone
function toggleTimezone() {
  timezoneIndex = (timezoneIndex + 1) % timezones.length;
  currentTimezone = timezones[timezoneIndex];
  savePreferences();
  updateClock();
}

// Event listeners
document.getElementById('toggle-format').addEventListener('click', toggleFormat);
document.getElementById('toggle-timezone').addEventListener('click', toggleTimezone);

// Initialize and start clock
initializePreferences();
updateClock();
setInterval(updateClock, 1000);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  savePreferences();
});