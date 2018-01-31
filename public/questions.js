

    function getQuestions(){
      return fetch('http://localhost:8080/question', {
  method: 'GET'
})
.then(res => res.json())
.catch(err => console.log(err));  
      }
    $(function(){
			getQuestions()
				.then(questions=> {
					const html_questions = questions.map(question=>`<div class="boxIndex">${question.text}</div>`)
					$('.mainIndex').html(html_questions);
				})	         
		});

		