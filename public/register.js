
$(function(){

  $(".register_form").submit(function(event){
    event.preventDefault();
    //get all the data from the form
    const username = $('#username').val();
    console.log(nickname);

    //validate the data
    //send to the server
    const newUser = {
      username: username,
      firstName: "Harry",
      lastName: "James",
      password: "12345678910"
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
        })


  });

});
