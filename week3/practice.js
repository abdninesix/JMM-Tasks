const now = new Date();
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

console.log("Today is: " + days[now.getDay()]);
console.log("Current time is: " + now.toLocaleTimeString());





function isLeapYear(year) {
  if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
    return "Leap Year";
  }
  return "Not a Leap Year";
}

console.log(isLeapYear(2024));






const random = Math.floor(Math.random() * 10) + 1;
const guess = 5; // try changing

if (guess === random) {
  console.log("Good Work!");
} else {
  console.log("Not matched. Number was " + random);
}






const today = new Date();
const christmas = new Date(today.getFullYear(), 11, 25);
const diff = christmas - today;

const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
console.log("Days left until Christmas:", daysLeft);
