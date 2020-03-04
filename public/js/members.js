$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });

  // This function does an API call to delete posts
  $(".delete-trip").on("click", function () {
    var id = $(this).data("id");

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


});
