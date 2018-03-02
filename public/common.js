let gToken = null;

$(function(){
  let storage = window.localStorage;
  gToken = storage.getItem("token");
  if (gToken) {
    $(".logged_in").show();
    $(".logged_out").hide();
  } else {
    //user is not logged in
    $(".logged_in").hide();
    $(".logged_out").show();
  }

  $(".logout").click(function(event) {
    let storage = window.localStorage;
    storage.removeItem("token");
    window.location = "/";
  });


  $(".profile").click(function () {
    window.location = '/profile.html';
  });
  $(".sign_up").click(function () {
    window.location = '/register.html';
  });
  $(".about_us").click(function () {
    window.location = '/about.html';
  });

  $(".log_in").click(function () {
    window.location = '/login.html';
  });
  $(".submit_red").click(function () {
    window.location = '/';
  });
  $(".home").click(function () {
    window.location = '/';
  });
  $(".back_home").click(function () {
    window.location = '/';
  });

  $(".my_answers").click(function(){
    window.location = '/myAnswer.html';
  })


});
