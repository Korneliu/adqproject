$(function(){

  $(".login_form").submit(function(event){
    event.preventDefault();
    //get all the data from the form
    const login_username = $('#login_username').val(); 
    const login_password = $('#login_password').val();
    //validate the data
    //send to the server
    const newUser = {
      username: login_username,
      password: login_password
    }

    fetch(SERVER_URL + '/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'content-type': 'application/json'
      }
    })
        .then(res => res.json())
        .then(token => {
          console.log(token);
    let storage = window.localStorage
    storage.setItem("token",token.authToken);
    window.location = "/";
        })
    .catch(err => {
      console.log(err);
      $('.error_message').html(err.message);
    })
  });
});