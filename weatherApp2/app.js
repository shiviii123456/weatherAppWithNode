const conn = require("./conn/conn");
const Data = require("./conn/schema");
const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const request = require("request");
// const { request } = require("express");
const port = process.env.PORT || 8000;
const viewPath = path.join(__dirname, "./templates/views");
const partialPath = path.join(__dirname, "./templates/partials");
console.log(partialPath);
const staticPath = path.join(__dirname, "./public");
app.set("view engine", "hbs");
app.set("views", viewPath);
app.use(express.static(staticPath));
hbs.registerPartials(partialPath);
// console.log(viewPath);
let y = [];
const getDocument = async () => {
    try {
        const x = await Data.find().limit(4).sort({ timestamp: -1 });
        // console.log(x);
        for (let i = 0; i < 4; i++) {
            const element = x[i];
            y.push(x[i]);
            // console.log(element);
        }
    }
    catch (err) {
        console.log("error");
    }
}
getDocument();
app.get("/api", async (req, res) => {

    const result = await Data.find().limit(4).sort({ timestamp: -1 });
    console.log(result);
    res.json(result);
})
app.get("/", (req, res) => {
    res.render("index", {
        title: "hell weather",
        city: y,
        // condition: x.condition,
    });
})
app.get("/weather/:city", async (req, res) => {
    try {
        const x = req.params;
        request(`https://api.openweathermap.org/data/2.5/weather?q=${x.city}&appid=4f1a9977f3c7ace69b91556a75a91e86`, { json: true }, (error, response, body) => {
            if (error) {
                return console.log(error);
            }
            else {
                // console.log(body);
                const date = new Date();
                const day = date.getDate();
                const week = ["Mon", "Tues", "Wed", "Thrus", "Fri", "Sat", "Sun"];
                const weekDay = week[date.getDay()];
                console.log(weekDay);
                const time = `${day}${weekDay}`;
                const timestamp = Date.now();
                const x = {
                    temperature: body.main.temp,
                    names: body.name,
                    condition: body.weather[0].main,
                }
                const temp = body.main.temp - 273.15;
                const temps = temp.toFixed(2);
                const data = new Data({
                    temperature: temps,
                    names: body.name,
                    condition: body.weather[0].main,
                    date: time,
                    timestamp: timestamp,
                })
                data.save();
                res.json(x);
            }
        });
    }
    catch (err) {
        console.log(err);
    }
})

app.get("*", (req, res) => {
    res.send("invalid request");
})
app.listen(port, () => {
    console.log("server is listening");
});