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
const birthday = new Date(today.getFullYear(), 11, 5);
const diff = birthday - today;

const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
console.log("Days left until Birthday:", daysLeft);





let a = 5, b = 6, c = 7;
let s = (a + b + c) / 2;
let area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

console.log("Area:", area);





function diff13(n) {
  if (n > 13) return (n - 13) * 2;
  return 13 - n;
}

console.log(diff13(20));





function addWithoutCarry(a, b) {
  let result = "";
  while (a > 0 || b > 0) {
    let sum = (a % 10 + b % 10) % 10;
    result = sum + result;
    a = Math.floor(a / 10);
    b = Math.floor(b / 10);
  }
  return Number(result);
}

console.log(addWithoutCarry(456, 789));





function sumAbsDiff(arr) {
  let sum = 0;
  for (let i = 1; i < arr.length; i++) {
    sum += Math.abs(arr[i] - arr[i - 1]);
  }
  return sum;
}

console.log(sumAbsDiff([1, 2, 3, 8, 9]));





let str = "w3resource";

setInterval(() => {
  str = str[str.length - 1] + str.slice(0, -1);
  // console.log(str);
}, 1000);





function reverse(str) {
  return str.split("").reverse().join("");
}

console.log(reverse("hello"));





function capitalize(sentence) {
  return sentence
    .split(" ")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

console.log(capitalize("javascript is awesome"));





function nextChar(str) {
  return str.split("").map(ch => {
    return String.fromCharCode(ch.charCodeAt(0) + 1);
  }).join("");
}

console.log(nextChar("abcd"));






function longestWord(arr) {
  let longest = "";
  for (let word of arr) {
    if (word.length > longest.length) longest = word;
  }
  return longest;
}

console.log(longestWord(["apple", "banana", "strawberry"]));






let person = {
  name: "Ali",
  age: 25,
  city: "Lahore"
};

for (let key in person) {
  console.log(key + ":", person[key]);
}
