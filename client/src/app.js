var ExplorersList = require("./models/explorersList")
var MapView = require("./views/mapView")
var QuizView = require("./views/quizView")
var TimelineView = require("./views/timelineView")
var Quiz = require("./models/quiz")
var VideoView = require("./views/videoView")
var TileGame = require("./models/tileGame")
var TextInfoView = require("./views/textInfoView")
var CanvasView = require("./views/canvasView")
var TileGameView = require("./views/tileGameView")


var app = function(){

  var mapContainer = document.querySelector('#map')
  var center = {lat:0, lng:0}
  var zoom = 2

  var mapView = new MapView(mapContainer, center, zoom)
  var explorersList = new ExplorersList("http://localhost:3000/api/explorers")
  var timelineView = new TimelineView(document.querySelector('#timeline-list'))
  var videoView = new VideoView(document.querySelector('#video'))

  
  var textInfoView = new TextInfoView(document.querySelector('#info-box'))

// ------------------------TILE GAME-----------------------
  explorersList.makeRequest(function(explorers){  
    var tileGameView = new TileGameView(document.querySelector('#memory-game'), explorers)
    tileGameView.render()

    timelineView.render(explorers, mapView, videoView, textInfoView)
  })


// ------------------------QUIZ---------------------------
  var quiz = new Quiz("http://localhost:3000/api/quiz")
  var quizWindow = document.getElementById("quiz-window")
  var quizContent = document.getElementById("quiz-content")
  var quizButton = document.getElementById("quiz-button")
  var closeButton = document.getElementById("close")

  var quizView = new QuizView(quizWindow, quizContent, closeButton, quiz)

  quiz.makeRequest(function(questions){
    quizButton.addEventListener('click', function(){
      quizView.beginQuiz(quiz)
    })
  })


// --------------CANVAS--------------------------------
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')

  var canvasView = new CanvasView(canvas, context)
  canvasView.render()


}

window.onload = app