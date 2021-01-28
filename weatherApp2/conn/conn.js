const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/weatherData", {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.log("connection success");
}).catch((err) => {
    console.log(err);
})