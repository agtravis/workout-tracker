`use strict`;

const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

const Workout = new Schema({
  resistance: [
    {
      type: Schema.Types.ObjectId,
      ref: `Resistance`
    }
  ],
  cardio: [
    {
      type: Schema.Types.ObjectId,
      ref: `Cardio`
    }
  ]
});

module.exports = mongoose.model(`Workout`, Workout);
