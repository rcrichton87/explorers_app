var QuizView = function(quizWindow, quizContent, closeButton, quiz){
  this.quizWindow = quizWindow
  this.quizContent = quizContent
  this.closeButton = closeButton
  this.quiz = quiz
  this.questionsToAsk = []
  this.numberOfQuestions = 5
}

QuizView.prototype = {
  beginQuiz: function(questions){
    this.quizContent.innerHTML = ""
    var header = document.createElement("h3")
    header.innerText = "Quiz yourself on what you've learned!"
    var text = document.createElement("p")
    text.innerText = "Answer 5 questions about what you've leanred, try to beat your high score!"
    var beginButton = document.createElement("button")
    beginButton.innerText = "Begin"
    beginButton.className = "begin-quiz-button"
    this.quizContent.appendChild(this.closeButton)
    this.quizContent.appendChild(header)
    this.quizContent.appendChild(text)
    this.quizContent.appendChild(beginButton)
    beginButton.addEventListener('click', function(){
      this.questionsToAsk = this.quiz.randomiseArray(this.numberOfQuestions, this.quiz.questions)
      this.displayQuestion(this.questionsToAsk[0])
      // each question gets asked until the array is finished, show a score
    }.bind(this))
    this.quizWindow.style.display = "block"
  },

  displayQuestion: function(questionToAsk){
    this.quizContent.innerHTML = ""
    this.quizContent.appendChild(this.closeButton)

    var question = document.createElement("h4")
    question.innerText = questionToAsk.question
    this.quizContent.appendChild(question)

    var answerContainer = document.createElement('div')
    answerContainer.className = "quiz-answer-container"
    var randomisedAnswers = this.quiz.randomiseArray(questionToAsk.answers.length, questionToAsk.answers)
    randomisedAnswers.forEach(function(answer){
      var button = document.createElement('button')
      button.value = answer.correct
      button.innerText = answer.text
      button.className = "quiz-answer-button"
      var self = this
      button.addEventListener('click', function(){
        self.quiz.checkAnswer(this.value)

      })
      answerContainer.appendChild(button)
    })
    this.quizContent.appendChild(answerContainer)

  },

}

module.exports = QuizView