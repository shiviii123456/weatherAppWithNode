const { urlencoded } = require("express");
const request = require("request");
const data = (city, callback) => {
    request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4f1a9977f3c7ace69b91556a75a91e86`, { json: true }, (error, response, body) => {
        // console.log(body);
        // console.log(body.main.temp);
        // console.log(body.name);
        // console.log(body.weather[0].main);
        if (error) {
            return console.log(error);
        }
        else {
            callback(undefined, {
                temperature: body.main.temp,
                names: body.name,
                condition: body.weather[0].main,
            })
        }
    })
}
module.exports = data;