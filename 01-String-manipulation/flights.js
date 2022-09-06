"use strict";
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

/*
Write a function that receives the string flights as argument and transform it to display this message to the console:

  🔴 Delayed Departure from FAO to TXL (11h25)
              Arrival from BRU to FAO (11h45)
  🔴 Delayed Arrival from HEL to FAO (12h05)
           Departure from FAO to LIS (12h30)
*/

function displayFlights (text) {
  const cityArray = [...text.matchAll(/([a-z]{3})\d+/g)];
  cityArray.forEach(city => text = text.replace(city[0], city[1].toUpperCase()));

  const timeArray = [...text.matchAll(/\d{2}:\d{2}/g)];
  timeArray.forEach(time => text = text.replace(time[0], `(${time[0]})`));

  return text.split('+').map(s => { return s.startsWith('_Delayed') ? `\uD83D\uDD34${s}`.padStart(38) : `${s.padStart(38)}` })
                        .map(s => s.replace(';', ' from '))
                        .map(s => s.replace(';', ' to '))
                        .map(s => s.replace(';', ' '))
                        .map(s => s.replace(':', 'h'))
                        .map(s => s.replaceAll('_', ' '))
                        .join('\n');
}

console.log(displayFlights(flights));
