const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    temperature: Number,
    names: String,
    condition: String,
    date: String,
    timestamp: String,
});
const Data = new mongoose.model("data", schema);

module.exports = Data;