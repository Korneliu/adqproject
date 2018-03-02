$(function(){

    if(!gToken){
      window.location = '/';
    }

    fetch(SERVER_URL + '/answers', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + gToken
      }
    })
    .then(res => res.json())
      .then(answers => {
        let html = answers.map(answer => {
          return `<div> <span>${moment(+answer.published_date).fromNow()}</span> ${answer.content} (${answer.typeOfAnswer})</div>`;
        })
        $('main').html(html);
      })
      .catch(err => {
        console.log(err);
        $('.error_message').html(err.message);
      })

});

