const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const port = process.env.PORT || 8000;
const viewPath = path.join(__dirname, "./templates/views");
const partialPath = path.join(__dirname, "./templates/partials");
const staticPath = path.join(__dirname, "./public");
const data = require("./config");
app.set("view engine", "hbs");
app.set("views", viewPath);
app.use(express.static(staticPath));
hbs.registerPartials(partialPath);
// console.log(viewPath);
app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App",
    });
})
app.get("/weather", (req, res) => {
    const city = req.query.city;
    if (!city) {
        res.status(404).send("enter the city whose temp u want to know");
    }
    data(city, (error, { temperature, names, condition }) => {
        if (error)
            return res.send(error);
        // console.log(
        //     temperature,
        //     names,
        //     condition
        // )
        res.send({
            temp: temperature,
            city: names,
            condition: condition
        })
    });
});
app.get("*", (req, res) => {
    res.send("invalid request");
})
app.listen(port, () => {
    console.log("server is listening");
})