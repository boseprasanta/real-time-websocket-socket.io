// Unix Epic Jan 1st 1970 00:00:00 am
// -1000 goes to past from the time above
// 1000 goes 1 sec to fututre from the time above

// new Date().getTime(); // Gets UTC time
let moment = require("moment");



// console.log(date.format('MMM Do, YYYY'));
// date.add(100,'year').subtract(2,'month');
// console.log(date.format('MMM Do, YYYY'));
let timelapse = 1234*10;

let date = moment();//creates a date object that will have the current time
console.log(date.valueOf()); // prints the mili secs passed after 1970-01-01 00:00 
// new Date().getTime();
console.log(date.format());
console.log(date.format('hh:mm a'));