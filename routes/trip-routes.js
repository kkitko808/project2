// CRUD for trip table accepts get, post, put, delete

var db = require("../models");
const axios = require("axios");
var persistRes = {
  capital: null,
  population: null,
  languages: null
};
module.exports = function (app) {

  app.get("/api/trip/:id", function (req, res) {
    console.log("got here with id of ", req.params.id)
    db.Trips.findAll({
      where: {
        id: req.params.id
      }
    }).then(function (dbTrip) {
      res.send(dbTrip[0])
    })
  })
  // getting all trips
  app.get("/api/members", function (req, res) {

    // console.log(req);
    db.Trips.findAll({
      where: {
        UserId: req.user.id
      },
      order: [
        ["date", "DESC"],
        ["time", "DESC"]
      ]
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
      date: req.body.date,
      time: req.body.time,
      UserId: req.user.id
    })
      .then(function () {
        // res.json(dbTrip);
        console.log("test");
        axios({
          "method": "GET",
          "url": "https://restcountries-v1.p.rapidapi.com/name/" + req.body.destination,
          "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
            "x-rapidapi-key": "17c7296748msh2331487f6775125p15f5e8jsn36e70eea3fb8"
          }
        }).then((response) => {
          persistRes.capital = response.data[0].capital;
          persistRes.population = response.data[0].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          persistRes.languages = response.data[0].languages[0];
          console.log("recieved data!");
          console.log(persistRes);
          res.send(persistRes);
        });

      })
      .catch((error) => {
        console.log(" error!");
        console.log(error);
      });
  });

  // put
  app.put("/api/trips", function (req, res) {
    console.log(req.body);
    db.Trips.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function () {
        axios({
          "method": "GET",
          "url": "https://restcountries-v1.p.rapidapi.com/name/" + req.body.destination,
          "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
            "x-rapidapi-key": "17c7296748msh2331487f6775125p15f5e8jsn36e70eea3fb8"
          }
        }).then((response) => {
          console.log(response);
          persistRes.capital = response.data[0].capital;
          persistRes.population = response.data[0].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          persistRes.languages = response.data[0].languages[0];
          res.send(persistRes);
        });
      });
  });

  // DELETE route for deleting posts
  app.delete("/api/trips/:id", function (req, res) {
    console.log(res);
    db.Trips.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (rowDeleted) { // rowDeleted will return number of rows deleted
        if (rowDeleted === 1) {
          console.log("Deleted successfully");
          return;
        }
        else {
          console.log("didnt delete anything");
          return;
        }
      }, function (err) {
        console.log(err);
      });
  });

};