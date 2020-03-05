// CRUD for trip table accepts get, post, put, delete

var db = require("../models");

module.exports = function (app) {

  // getting all trips
  app.get("/api/members", function (req, res) {
    console.log(db);
    // console.log(req);
    db.Trips.findAll({
      where: {
        UserId: req.user.id
      }
    })
      .then(function (dbTrips) {
        res.json(dbTrips);
      });
  });

  // post
  app.post("/api/trips", function (req, res) {
    console.log(req.body);
    console.log(res);
    db.Trips.create({
      destination: req.body.destination,
      activity: req.body.activity,
      time: req.body.time,
      UserId: req.user.id
    })
      .then(function (dbTrip) {
        // res.json(dbTrip);
        console.log(dbTrip);
      });
  });

  // put



  // DELETE route for deleting posts
  app.delete("/api/trips/:id", function (req, res) {
    db.Trips.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbTrip) {
        res.json(dbTrip);
      });
  });

};