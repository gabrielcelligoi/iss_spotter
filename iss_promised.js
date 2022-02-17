const request = require('request-promise-native');

const fetchMyIP = function(callback) {
  return request('https://api.ipify.org?format=json');
};


const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request (`https://api.freegeoip.app/json/${ip}?apikey=6220c5a0-9032-11ec-930c-0f81cd3d61a2`);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  return request (`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(data => {
    const { response } = JSON.parse(data);
    return response;
  });
}

module.exports = { nextISSTimesForMyLocation };
