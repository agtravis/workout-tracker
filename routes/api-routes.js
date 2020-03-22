`use strict`;

const mongoose = require(`mongoose`);
const db = require(`../models`);

module.exports = app => {
  app.get(`/api/workouts`, (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.post(`/api/workouts`, (req, res) => {
    console.log(req.body);
    db.Workout.create(req.body)
      .then(dbWorkout => {
        console.log(`-----dbWorkout------`);
        console.log(dbWorkout);
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.delete(`/api/workouts/:id`, (req, res) => {
    db.Workout.deleteOne({
      _id: mongoose.Types.ObjectId(req.params.id)
    })
      .then(deleted => {
        res.json(deleted);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.put(`/api/workouts/:id`, (req, res) => {
    console.log(req.body.type);
    if (req.body.type === 'cardio') {
      console.log(req.body);
      db.Cardio.create(req.body)
        .then(({ _id }) =>
          db.Workout.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.params.id) },
            {
              $push: { cardio: _id }
            },
            { new: true }
          )
        )
        .then(dbWorkout => {
          res.json(dbWorkout);
        })
        .catch(err => {
          res.json(err);
        });
    } else if (req.body.type === `resistance`) {
      console.log(req.body);
      db.Resistance.create(req.body)
        .then(({ _id }) =>
          db.Workout.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.params.id) },
            {
              $push: { resistance: _id }
            },
            { new: true }
          )
        )
        .then(dbWorkout => {
          res.json(dbWorkout);
        })
        .catch(err => {
          res.json(err);
        });
    }
    // db.Workout.updateOne(
    //   { _id: req.params.id },
    //   {
    //     $set: {
    //       workouts: []
    //     },
    //     $push: {
    //       workouts: req.body
    //     }
    //   }
    // )
    //   .then(dbWorkout => {
    //     res.json(dbWorkout);
    //   })
    //   .catch(err => {
    //     res.json(err);
    //   });
  });
};
