var updating = false;
var updatingId = null;
var capital;
var population;
var languages;
$(document).ready(function () {

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });

  // This function does an API call to delete posts
  $(document).on("click", ".delete-trip", function () {
    var id = $(this).attr("id");
    console.log(id);

    // Send the DELETE request.
    $.ajax("/api/trips/" + id, {
      method: "DELETE"
    }).then(
      location.reload()
    );
  });


  getAllTrips();

  $(".submit").on("click", function (event) {
    event.preventDefault();
    if (!updating) {
      // Here we grab the form elements
      var newTrip = {
        destination: $("#destination").val().trim(),
        activity: $("#activity").val().trim(),
        date: $("#date").val().trim(),
        time: $("#time").val().trim(),
      };
      console.log(newTrip);
      var $capital = $(".capital");
      var $population = $(".population");
      var $language = $(".language");

      $.post("/api/trips", newTrip,
        function (response) {
          capital = response.capital;
          population = response.population;
          languages = response.languages;

          // Clear the form when submitting
          $("#destination").val("");
          $("#activity").val("");
          $("#time").val("");
        }).then(function () {
        $capital.text(capital);
        $population.text(population);
        $language.text(languages);
        getAllTrips();
      });
    }
    else {
      var updatingTrip = {
        id: updatingId,
        destination: $("#destination").val().trim(),
        activity: $("#activity").val().trim(),
        date: $("#date").val().trim(),
        time: $("#time").val().trim(),
      };
      updating = false;
      createFormText();
      $.ajax({ url: "/api/trips", method: "PUT", data: updatingTrip })
        .then(function (data) {
          console.log(data);
          location.reload();
        }
        );
    }
  });
  //Put request (update activity details)

  $(document).on("click", ".update-trip", function (event) {
    event.preventDefault();
    updatingId = $(this).attr("id");
    updating = true;
    updatingFormText();
  });
});
function updatingFormText() {
  $("#create-update-trip").text("Update Your Adventure");
  $(".btn-primary").text("Update Activity");
}
function createFormText() {
  $("#create-update-trip").text("Add Your Adventure");
  $(".btn-primary").text("Add Activity");
}
function getAllTrips() {
  $.ajax({ url: "/api/members", method: "GET" })
    .then(function (data) {
      console.log("Data:", data);
      if (data.length !== 0) {
        $("#itinerary-area").empty();
        for (var i = 0; i < data.length; i++) {
          $("#itinerary-area").prepend(`<div class="card" class="nested-card" style="width: 18rem;">        
          <div class="card-body new-trip">
            <h5 class="card-title">Destination: ${data[i].destination}</h5>
            <p class="card-text">Activity: ${data[i].activity}</p>
            <p class="card-text">Date: ${data[i].date}</p>
            <p class="card-text">Time: ${data[i].time}</p>
            
            <button class="delete-trip btn btn-danger" id=${data[i].id}>Delete</button>
            <button class="update-trip btn btn-success" id=${data[i].id}>Update</button>
          </div>
        </div>`);
        }
      }
    });
}