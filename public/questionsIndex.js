

function getQuestions(){
	return fetch(SERVER_URL + '/question', {
  method: 'GET'
})
	.then(res => res.json())
	.catch(err => console.log(err));  
    }
    $(function(){
			getQuestions()
				.then(questions=> {
					const html_questions = questions.map(question=>`<div class="boxIndex" data-id="${question._id}">${question.text}</div>`)
					$('.mainIndex').html(html_questions);
				})
				$('.mainIndex').on("click", ".boxIndex", function(event) {
					$('.mainIndex').hide();
					$('.singleQuestion').show();
					let id = $(event.target).data("id");
					fetch(SERVER_URL + '/question/' + id, {
						method: 'GET'
					})
						.then(res => res.json())
						.then(question =>{
							$(".question").html(question.text);
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
    
						})
						.catch(err => console.log(err));  
				})
		});



		