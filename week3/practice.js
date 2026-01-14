console.log("Hello");



let something = 100;



var message = "Hi there!";
console.log(message);




let age = 25;
let name = "Alice";
let alive = true;
let nothing = null;
let notAssigned;




let x = 5 + 3;
let isEqual = 10 == "10";
let andCheck = (x > 5) && (x < 10);





let score = 85;
if (score >= 90) {
    console.log("A");
} else {
    console.log("Keep practicing");
}




for (var i = 0; i < 3; i++) {
    console.log("i", i);
}




var j = 0;
while (j < 3) {
    console.log("j", j);
    j++;
}





function greet(name) {
    return "Hello, " + name;
}
console.log(greet("Bob"));




var colors = ["red", "green", "blue"];
console.log(colors[0]);
colors.push("yellow");




var person = { name: "Ali", age: 30 };
console.log(person.name);




var globalVar = "I am global";
function test() {
    var localVar = "I am local";
    console.log(globalVar, localVar);
}
test();




let a = 5;
let b = a;
b = 10;




let arr1 = [1, 2];
let arr2 = arr1;
arr2.push(3);




let text = "hello";
console.log(text.length);
console.log(text.toUpperCase());




let nums = [1, 2, 3];
nums.push(4);
nums.pop();




try {
    console.log(notDefined);
} catch (err) {
    console.log("Error occurred");
}




// ES6




let number = 25;
number = 26;

const PI = 3.14;
// PI = 3;




const add = (a, b) => a + b;
console.log(add(3, 4));







const person1 = "Abdullah";
const msg = `Hello, ${person1}!`;
console.log(msg);






function greet(name = "Guest") {
    console.log(`Hello, ${name}!`);
}
greet();






// Array
const [m, n] = [10, 20];
console.log(m, n);

// Object
const human = { human_name: "Abdullah", human_age: 30 };
const { human_name, human_age } = human;
console.log(human_name, human_age);






// Spread
const nums1 = [1,2,3];
const nums2 = [...nums1, 4, 5];
console.log(nums2);

// Rest
function sum(...values) {
  return values.reduce((a, b) => a + b, 0);
}
console.log(sum(1,2,3));






class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hi, Im ${this.name}`);
  }
}
const p = new Person("Ali");
p.greet();









const pr = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done!"), 1000);
});
pr.then(msg => console.log(msg));








const set = new Set([1,2,2,3]);
console.log([...set]); // [1,2,3]

const map = new Map();
map.set("a", 1);
console.log(map.get("a"));






for (const val of [10,20,30]) {
  console.log(val);
}
