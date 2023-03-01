const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trim().split("");

function updateLocation(location, direction) {
    if(direction === "^"){
      location[1]++;
    }
    if(direction === "v"){
      location[1]--;
    }
    if(direction === "<"){
      location[0]--;
    }
    if(direction === ">"){
      location[0]++;
    }
    return location;
}

function visitHouses(input, useBot) {
  let locationSanta = [0, 0];
  let locationBot = [0, 0];
  let visits = {
    "[0,0]": 2
  }

  input.forEach((direction, index) => {
    let currentLocation = [];
    if (useBot && (index % 2 !== 0)) {
      currentLocation = updateLocation(locationBot, direction);
    } else {
      currentLocation = updateLocation(locationSanta, direction);
    }

    if (!visits[JSON.stringify(currentLocation)]) {
      visits[JSON.stringify(currentLocation)] = 1;
    } else {
      visits[JSON.stringify(currentLocation)]++;
    }
  });
  return(Object.keys(visits).length);
}

console.log(`By himself, Santa visits ${visitHouses(input)} houses!`)
console.log(`Santa and his little helper visit ${visitHouses(input, true)} houses!`);
