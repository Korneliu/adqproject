let mock_question = 
  {
    text: "Did we land on the moon?",
    answers: [
    {
      author: "Max",
      content: "Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,",
      published_date: "6 May 1998",
      typeOfAnswer: "yes"
    },
    {
      author: "Kim",
      content: "Lorem ipsum dolor sit Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum doloLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,r sit",
      published_date: "4 February 1998",
      typeOfAnswer: "yes"
    },
    {
      author: "Tom",
      content: "Lorem ipsum dolor sit Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum doloLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,r sit",
      published_date: "4 February 1998",
      typeOfAnswer: "yes"
    },
    {
      author: "Edward",
      content: "Lorem ipsum dolor sit Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum doloLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,r sit",
      published_date: "4 February 1998",
      typeOfAnswer: "yes"
    },
    {
      author: "Amy",
      content: "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,sitLorem ipsum dolor sit Lorem ipsum ",
      published_date: "6 June 2016",
      typeOfAnswer: "no"
    },
    {
      author: "Natalie",
      content: "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,sitLorem ipsum dolor sit Lorem ipsum ",
      published_date: "6 December 2016",
      typeOfAnswer: "no"
    },
    {
      author: "Jennifer",
      content: "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,sitLorem ipsum dolor sit Lorem ipsum ",
      published_date: "6 May 2016",
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

