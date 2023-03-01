const fs = require("fs");
const directions = fs.readFileSync("./input.txt", "utf8").trim().split("");

function updateLocation(location, direction) {
    if(direction === "^") {
      location[1]++;
    }
    if(direction === "v") {
      location[1]--;
    }
    if(direction === "<") {
      location[0]--;
    }
    if(direction === ">") {
      location[0]++;
    }
    return location;
}

function visitHouses(directions, useBot = false) {
  const locationSanta = [0, 0];
  const locationBot = [0, 0];
  const visits = {
    "[0,0]": 2
  };

  directions.forEach((direction, index) => {
    let currentLocation = [];
    if (useBot && (index % 2 !== 0)) {
      currentLocation = updateLocation(locationBot, direction);
    } else {
      currentLocation = updateLocation(locationSanta, direction);
    }

    let visit = visits[JSON.stringify(currentLocation)];
    if (!visit) {
      visits[JSON.stringify(currentLocation)] = 1;
    } else {
      visit++;
    }
  });
  return(Object.keys(visits).length);
}

console.log(`By himself, Santa visits ${visitHouses(directions)} houses!`);
console.log(`Santa and his little helper visit ${visitHouses(directions, true)} houses!`);
