document.addEventListener("DOMContentLoaded", function () {
  const location = [35.691070569, 139.568922724];
  const map = L.map("map").setView(location, 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(location).addTo(map).bindPopup("Business Location").openPopup();

  $.ajax({
    url: "states.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      data.forEach(function (state) {
        $("#state").append(`<option value="${state.abbreviation}">${state.name}</option>`);
      });
    },
    error: function () {
      alert("AJAX Failed");
    }
  });

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    let errors = [];

    $("#contactForm input, #contactForm textarea, #contactForm select").each(function () {
      if (!$(this).val()) {
        errors.push($(this).attr("name") + " is required.");
      }
    });

    const zipCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
    if (!zipCodeRegex.test($("#zipcode").val())) {
      errors.push("Invalid ZIP Code.");
    }

    if (errors.length > 0) {
      alert("Errors:\n" + errors.join("\n"));
    } else {
      alert("Your contact information has been submitted.");
    }
  });
});
