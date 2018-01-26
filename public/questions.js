
let mock_questions = [    
	{
		text: "Did we land on the moon?",
		_id: "1234q23"
	},
	{
		text: "Is earth flat?",
		_id: "23541"
	},
	{
		text: "Did UFO crash in Roswell?",
		_id: "235235"
	}
	]

    function getQuestions(){
        //fetch the list of books from the server
      //   $.ajax({
      //     url:"http://localhost:8000/answers",
      //     method:"GET"
      //   }).done(function(questions){
      //     return questions;
      //   }); 
        return Promise.resolve(mock_questions);
      }
    $(function(){
			getQuestions()
				.then(questions=> {
					const html_questions = questions.map(question=>`<div class="boxIndex">${question.text}</div>`)
					$('.mainIndex').html(html_questions);
				})	         
		});