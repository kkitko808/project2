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
      type: "DELETE"
    }).then(
      function () {
        console.log("deleted trip plan", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });


  $.ajax({ url: "/api/members", method: "GET" })
    .then(function (data) {
      console.log(data);

      if (data.length !== 0) {

        for (var i = 0; i < data.length; i++) {

          var row = $("<div>");
          row.addClass("trip");

          row.append("<p>" + data[i].destination + "</p>");
          row.append("<p>" + data[i].activity + "</p>");
          row.append("<p>" + data[i].time + "</p>");
          row.append(`<button class="delete-trip" id=${i + 1}>Delete</button>`);
          row.append(`<button class="update-trip" id=${i + 1}>Update</button>`);

          $("#itinerary-area").prepend(row);

        }
      }
    });
});


$(".submit").on("click", function (event) {
  event.preventDefault();

  // Here we grab the form elements
  var newTrip = {
    destination: $("#destination").val().trim(),
    activity: $("#activity").val().trim(),
    time: $("#time").val().trim(),
  };
  console.log(newTrip);

  $.post("/api/trips", newTrip,
    function (response) {

      console.log(response);
      $capital.text(response[0].capital);
      $population.text(response[0].population);
      $language.text(response[0].languages[0]);
      // Clear the form when submitting
      $("#destination").val("");
      $("#activity").val("");
      $("#time").val("");
    });
});
//Put request (update activity details)

$(".update-trip").on("click", function (event) {
  event.preventDefault();

  var id = $(this).attr("id");

  // Send the update request.
  $.ajax("/api/trips/" + id, {
    type: "DELETE"
  }).then(
    function () {
      console.log("deleted trip plan", id);
      // Reload the page to get the updated list
      location.reload();
    }
  );

  // Here we grab the form elements
  var newTrip = {
    destination: $("#destination").val().trim(),
    activity: $("#activity").val().trim(),
    time: $("#time").val().trim(),
  };
  console.log(newTrip);

  $.post("/api/trips", newTrip,
    function (data) {
      console.log(data);
      // Clear the form when submitting
      $("#destination").val("");
      $("#activity").val("");
      $("#time").val("");

    });
  location.reload();

});

