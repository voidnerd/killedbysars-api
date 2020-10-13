const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Storage = require("../services/storage");

let victimSchema = Schema(
  {
    name: String,
    image: String,
    gender: {
      type: String,
      enum: ["male", "female"],
      lowercase: true,
      default: "male",
    },
    state: String,
    location: String,
    year_born: String,
    year_killed: String,
    story: String,
  },
  { timestamps: true }
);

victimSchema.virtual("imageUrl").get(function () {
  return Storage.url(this.image);
});

victimSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Victim", victimSchema);
