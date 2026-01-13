console.log("Hello, JavaScript!");

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


