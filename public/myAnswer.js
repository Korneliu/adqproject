$(function(){

  $(".answer_form").submit(function(event){
    event.preventDefault();
    const myAnswer = $('#my_answer').val(); 
    const newAnswer = {
      content: myAnswer,
      typeOfAnswer: typeOfAnswer

    }

    fetch(SERVER_URL + '/answers', {
      method: 'POST',
      body: JSON.stringify(newAnswer),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
      .then(answer => {
        console.log(answer);
          //redirect the user window.location....
        if( answer.code === 422) {
          $('.error_message').html(answer.message);  
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
$(".answer_form_button").click(function () {
  window.location = '/';
});

