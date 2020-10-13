const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let victimSchema = Schema({
    name: String,
    image: String,
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        default: "Male"
    },
    state: String,
    location: String,
    year_born: Number,
    year_killed: Number,
    story: String
});


module.exports = mongoose.model("Victim", victimSchema);