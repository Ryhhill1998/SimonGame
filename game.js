
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var firstKeyPressed = false;

var level = 0;


// Add next colour to sequence, flash colour and play sound
function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  level++;
  $("h1").text("Level " + level);

}


// Check which button clicked by user
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});


//  Create function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// Create function to animate user clicks
function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");
  setTimeout( function () {
    $("#" + currentColour).removeClass("pressed")
  }, 100);

};


// Create start over function
function startOver() {

  firstKeyPressed = "false";
  gamePattern = [];
  level = 0;

}


// Start game
$(document).keydown(function() {

  if (!firstKeyPressed) {
    nextSequence();
    firstKeyPressed = true;
  }

});


// Create function to check if user input is correct
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}
