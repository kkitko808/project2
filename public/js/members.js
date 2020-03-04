$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
  // jqeury ajax requests to routes.
  $.get("/api/trips", function(data) {

    if (data.length !== 0) {
  
      for (var i = 0; i < data.length; i++) {
  
        var row = $("<div>");
        row.addClass("trip");
  
        row.append("<p>" + data[i].destination + "</p>");
        row.append("<p>" + data[i].activity + "</p>");
        row.append("<p>" + data[i].time+ "</p>");
  
        $("#itinerary-area").prepend(row);
  
      }
  
    }
  
  });

});
