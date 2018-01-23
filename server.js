'use strict';
const express = require('express');
const app = express();
app.use(express.static('public'));
const{PORT} = require('./config');
console.log('App is listening on port 8080');

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});

app.get("/profile", (request, response) => {
  response.sendFile(__dirname + '/public/profile.html');
});

app.get("/question", (request, response) => {
  response.sendFile(__dirname + '/public/question.html');
});

let questions = [
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
      author: "John",
      content: "Lorem ipsum dolor sit Lore srem ipsum dolor sit Lorem ipsum dolor sit",
      published_date: "4 February 1998",
      typeOfAnswer: "yes"
    },
    {
      author: "Jennifer",
      content: "Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum ",
      published_date: "6 May 2016",
      typeOfAnswer: "no"
    }
    ]
  },
  {
    text: "Is earth flat?",
    answers: [
    {
      author: "Lois",
      content: "Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum ",
      published_date: "4 May 2016",
      typeOfAnswer: "no"
    },
    {
      author: "Terry",
      content: "Lorem ipsum dolor sit",
      published_date: "2 March 2002",
      typeOfAnswer: "yes"
    },
    {
      author: "Lisa",
      content: "Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum ",
      published_date:"6 February 2011",
      typeOfAnswer: "yes"
    },
    {
      author: "Marcy",
      content: "Lorem ipsum dolor sitLorem ipsum dolor um ",
      published_date: "4 May 2016",
      typeOfAnswer: "no"
    },
    ]
  }
];

let mock_answers = [
  {
   question1: "Did we land on the moon?",
   question2: "Is earth flat?",
   question3: "Is Elvis Presley still alive?",
   question4: "Does god exist?",
   question5: "Do we live in a matrix?" 
  },
  {
    author: "Max",
    content: "Lorem ipsum dolor sit Lorem ipsum dolor sit",
    published_date: "6 May 1998",
    typeOfAnswer: "yes"
  },
  {
    author: "John",
    content: "Lorem ipsum dolor sit Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum dolor sit",
    published_date: "4 February 1998",
    typeOfAnswer: "yes"
  },
  {
    author: "Jennifer",
    content: "Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum ",
    published_date: "6 May 2016",
    typeOfAnswer: "no"
  },
  {
    author: "Lois",
    content: "Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum ",
    published_date: "4 May 2016",
    typeOfAnswer: "no"
  },
  {
    author: "Terry",
    content: "Lorem ipsum dolor sit",
    published_date: "2 March 2002",
    typeOfAnswer: "yes"
  }
];


function getAnswers(){
  //fetch the list of books from the server
//   $.ajax({
//     url:"http://localhost:8000/answers",
//     method:"GET"
//   }).done(function(answers){
//     return answers;
//   });
  

  return Promise.resolve(mock_answers);
}

$(function(){
  getAnswers()
     .then(function(answers){
       let yes_answers = answers.filter(answer =>answer.typeOfAnswer === "yes" 
       ).map(answers => `<div class="box">
      <div class="boxName">${answers.author}</div>
      <div class="content">${answers.content}</div>
      <div class="date">${answers.published_date}</div>
      <div class="showMore">Show More</div>
      <div class="showLess invisible">Show less</div>
      </div>`);
       $('.ansYes').html(yes_answers);
      let no_answers = answers.filter(answer =>answer.typeOfAnswer === "no" 
       ).map(answers => `<div class="box">
      <div class="boxName">${answers.author}</div>
      <div class="content">${answers.content}</div>
      <div class="date">${answers.published_date}</div>
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









module.exports = app;