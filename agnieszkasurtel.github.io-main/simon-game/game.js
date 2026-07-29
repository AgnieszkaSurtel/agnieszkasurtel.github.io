var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


if (window.matchMedia("(max-width: 768px)").matches) {
  $("#level-title").text("Tap Screen to Start");
}

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

document.addEventListener('touchstart', function f(ev) {

  if (started) return;

  if (ev.target.classList.contains("btn")) return;

  console.log("Wykryto zdarzenie typu: " + ev.type);

  var AudioContext = window.AudioContext || window.webkitAudioContext;
  if (AudioContext) {
    var context = new AudioContext();
  }

  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    if (window.matchMedia("(max-width: 768px)").matches) {
      $("#level-title").text("Game Over, Tap Screen to Restart");
    } else {
      $("#level-title").text("Game Over, Press Any Key to Restart");
    }
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    setTimeout(function () {
      startOver();
    }, 200);
  }
}
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}