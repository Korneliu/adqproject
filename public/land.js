let mock_question = 
  {
    text: "Did we land on the moon?",
    answers: [
    {
      author: "Max",
      content: "Lorem ipsum dolor sit Lorem ipsum dolor sit",
      published_date: "6 May 1998",
      typeOfAnswer: "yes"
    },
    {
      author: "Artur",
      content: "Lorem ipsum dolor sit Lorem or sitLorem ipsum dolor sit Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum dolor sit",
      published_date: "4 February 2019",
      typeOfAnswer: "yes"
    },
    {
      author: "Mark",
      content: "Lorem ipsum dolor siipsum dolor sit Lorem ipsum r sit Lorem ipsum dolor sit",
      published_date: "4 February 2001",
      typeOfAnswer: "yes"
    },
    {
      author: "John",
      content: " dolor sitLorem ipsum dolor sit Lorem ipsum dolor sit",
      published_date: "4 February 1998",
      typeOfAnswer: "yes"
    },
    {
      author: "Ken",
      content: "Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum ",
      published_date: "6 May 2017",
      typeOfAnswer: "no"
    },
    {
      author: "Amy",
      content: "Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum ",
      published_date: "6 May 2017",
      typeOfAnswer: "no"
    },
    {
      author: "Brian",
      content: "Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum ",
      published_date: "6 May 2017",
      typeOfAnswer: "no"
    }
   ]
  }
  
function getQuestion(){
  //fetch the list of books from the server
//   $.ajax({
//     url:"http://localhost:8000/answers",
//     method:"GET"
//   }).done(function(answers){
//     return answers;
//   });
 
  return Promise.resolve(mock_question);
}


$(function(){
  getQuestion()
     .then(function(question){
       let yes_answers = question.answers.filter(answer =>answer.typeOfAnswer === "yes" 
       ).map(answer => `<div class="box">
      <div class="boxName">${answer.author}</div>
      <div class="content">${answer.content}</div>
      <div class="date">${answer.published_date}</div>
      <div class="showMore">Show More</div>
      <div class="showLess invisible">Show less</div>
      </div>`);
       $('.ansYes').html(yes_answers);
      let no_answers = question.answers.filter(answer =>answer.typeOfAnswer === "no" 
       ).map(answer => `<div class="box">
      <div class="boxName">${answer.author}</div>
      <div class="content">${answer.content}</div>
      <div class="date">${answer.published_date}</div>
      <div class="showMore">Show more</div>
      <div class="showLess invisible ">Show less</div>
      </div>`);
    $('.ansNo').html(no_answers);
     })
    $('.questions').on('click','.showMore',e=>{
      $(e.target).closest('.box').addClass('popUp');
      $(e.target).closest('.showMore').addClass('invisible');
      $(e.target).siblings('.showLess').removeClass('invisible');
      $('.overlay').show();
    })
    $('.questions').on('click','.showLess',e=>{
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

