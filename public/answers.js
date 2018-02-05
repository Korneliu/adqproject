
function getAnswers(){
	return fetch('https://adqproject.herokuapp.com/answers', {
  method: 'GET'
})
	.then(res => res.json())
	.catch(err => console.log(err));  
    }
$(function(){
  getAnswers()
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

