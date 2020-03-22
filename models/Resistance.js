`use strict`;
const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const ResistanceSchema = new Schema({
  type: String,
  name: String,
  weight: Number,
  sets: Number,
  reps: Number,
  duration: Number
});

module.exports = mongoose.model(`Resistance`, ResistanceSchema);
