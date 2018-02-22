function getQuestions() {
  return fetch(SERVER_URL + '/question', {
    method: 'GET'
  })
      .then(res => res.json())
      .catch(err => console.log(err));
}

$(function () { //where the code starts

let storage = window.localStorage;
let token = storage.getItem("token");
if (token) {
  $(".logged_in").show();
} else {
  //user is not logged in
  $(".logged_in").hide();
}

$(".logout").click(function(event) {
  let storage = window.localStorage;
  storage.removeItem("token");
  window.location = "/";
})

  //this happens as the page loads
  getQuestions()
      .then(questions => {
        const html_questions = questions.map(question => `<div class="boxIndex" data-id="${question._id}">${question.text}</div>`)
        $('.mainIndex').html(html_questions);
      })

  //this happens when you click on a question
  $('.mainIndex').on("click", ".boxIndex", function (event) {
    $('.mainIndex').hide();
    $('.singleQuestion').show();
    $('.adding_answers').removeClass('invisible');
    $('.adding_answers').addClass('logged_in');
    let id = $(event.target).data("id"); //id of question that was clicked

    //call the server to find the question details
    fetch(SERVER_URL + '/question/' + id, {
      method: 'GET'
    })
        .then(res => res.json())
        .then(question => {
          //You now have a full question from the server
          $(".question").html(question.text);

          //try to display the answers
          if(question.answers.length === 0){
            $('.message').html('No answers yet!');
          } else {
            $('.message').html('');
          }
          let yes_answers = question.answers
              .filter(answer => answer.typeOfAnswer.toLowerCase() === "yes")
              .map(answer => `
                <div class="box">
                <div class="boxName">${answer.author.firstName} ${answer.author.lastName}</div>
                <div class="content">${answer.content}</div>
                <div class="date">${answer.published_date}</div>
                <div class="showMore">Show More</div>
                <div class="showLess invisible">Show less</div>
                </div>`);
              $('.ansYes').html(yes_answers);
              let no_answers = question.answers
              .filter(answer => answer.typeOfAnswer.toLowerCase() === "no")
              .map(answer => `
                <div class="box">
                <div class="boxName">${answer.author.firstName} ${answer.author.lastName}</div>
                <div class="content">${answer.content}</div>
                <div class="date">${answer.published_date}</div>
                <div class="showMore">Show more</div>
                <div class="showLess invisible ">Show less</div>
                </div>`);
              $('.ansNo').html(no_answers);

        })
        .catch(err => console.log(err));
  })

  $('.singleQuestion').on('click','.showMore',e=>{
      $(e.target).closest('.box').addClass('popUp');
      $(e.target).closest('.showMore').addClass('invisible');
      $(e.target).siblings('.showLess').removeClass('invisible');
      $('.overlay').show();
    })
    $('.singleQuestion').on('click','.showLess',e=>{
      $(e.target).closest('.box').removeClass('popUp');
      $(e.target).closest('.showLess').addClass('invisible');
      $(e.target).siblings('.showMore').removeClass('invisible');
      $('.overlay').hide();
    })
    
    $('.overlay').on('click', function(e){
      e.stopPropagation();
      $('.popUp').removeClass('popUp');
      $('.overlay').hide();
    })
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
$(".adding_answers").click(function() {
  window.location = '/myAnswer';
})



