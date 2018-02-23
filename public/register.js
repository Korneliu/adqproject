
$(function(){

  $(".register_form").submit(function(event){
    event.preventDefault();
    //get all the data from the form
    const username = $('#username').val(); 
    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const password = $('#password').val();
    //validate the data
    //send to the server
    const newUser = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password
    }

    fetch(SERVER_URL + '/api/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'content-type': 'application/json'
      }
    })
        .then(res => res.json())
        .then(user => {
          console.log(user);
          //redirect the user window.location....
          if( user.code === 422) {
            $('.error_message').html(user.message);  
          } else {
            //valid user
            $('.aprove_message').html("Success!");
          }

        })
    .catch(err => {
      console.log(err);
      $('.error_message').html(err.message);
    })
  });
});
$(".submit_red").click(function () {
  window.location = '/';
});
