// CRUD for trip table accepts get, post, put, delete

var db = require("../models");

module.exports = function (app) {

  // getting all trips
  app.get("/api/members", function (req, res) {

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

    db.Trips.create({
      destination: req.body.destination,
      activity: req.body.activity,
      time: req.body.time,
      UserId: req.user.id
    })
      .then(function () {
        // res.json(dbTrip);
        console.log("test");
        const axios = require("axios");

        axios({
          "method": "GET",
          "url": "https://restcountries-v1.p.rapidapi.com/name/" + req.body.destination,
          "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
            "x-rapidapi-key": "17c7296748msh2331487f6775125p15f5e8jsn36e70eea3fb8"
          }
        }).then((response) => {
          console.log("recieved data!");
          res.send(response.data);
        });

      })
      .catch((error) => {
        console.log(" error!");
        console.log(error);
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