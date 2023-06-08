$(function () {
  $("#login-show").click(function () {
    $("#login-modal").fadeIn().css("display", "flex");
  });
});

$(function () {
  $("#close-modal").click(function () {
    $("#login-modal").fadeOut;
  });
});
