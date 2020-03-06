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
    .then(function(data) {
      console.log("Data:",data);
      

      if (data.length !== 0) {
  
        for (var i = 0; i < data.length; i++) {

          $("#itinerary-area").prepend(`<div class="card" id="nested-card" style="width: 18rem;">        
          <div class="card-body" id="new-trip">
            <h5 class="card-title">${data[i].destination}</h5>
            <p class="card-text">${data[i].activity}</p>
            <p class="card-text">${data[i].date}</p>
            <p class="card-text">${data[i].time}</p>
            
            <button class="delete-trip btn btn-danger" id=${i+1}>Delete</button>
            <button class="update-trip btn btn-success" id=${i+1}>Update</button>
          </div>
        </div>`);
        }
      }
    });

        // <p class="card-text">${data[i].date}</p>
        
        //   var row = $("<div>");
        //   row.addClass("trip");
  
        //   row.append("<p>" + "You're going to: " + data[i].destination + "</p>");
        //   row.append("<p>" + "To do: " + data[i].activity + "</p>");
        //   row.append("<p>" + "At: " + data[i].time+ "</p>");
        //   row.append(`<button class="delete-trip" id=${i+1}>Delete</button>`);
        //   row.append(`<button class="update-trip" id=${i+1}>Update</button>`);
  
        //   $("#itinerary-area").prepend(row);
  
        // }



$(".submit").on("click", function(event) {
  event.preventDefault();

  // Here we grab the form elements
  var newTrip = {
    destination: $("#destination").val().trim(),
    activity: $("#activity").val().trim(),
    time: $("#time").val().trim(),
  };
  console.log(newTrip);

  $.post("/api/trips", newTrip,
    function(data) {
      console.log(data);
      

      // Clear the form when submitting
      $("#destination").val("");
      $("#activity").val("");
      $("#time").val("");

    });

  location.reload();

});

//Put request (update activity details)

$(".update-trip").on("click", function(event) {
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
    function(data) {
      console.log(data);
      

      // Clear the form when submitting
      $("#destination").val("");
      $("#activity").val("");
      $("#time").val("");

    });

  location.reload();

});

});