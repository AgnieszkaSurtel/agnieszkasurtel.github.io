const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

function startGame() {
    if (!started) {
        const title = document.getElementById("level-title");
        if (title) title.innerText = "Level " + level;
        nextSequence();
        started = true;
    }
}




document.addEventListener("keypress", function() {
    startGame();
});


document.addEventListener("touchstart", function(e) {

    if (e.target.classList.contains("btn")) {
        return;
    }
    

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
        const context = new AudioContext();
    }
    
    startGame();
}, { passive: true });

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("btn")) {
        return;
    }
    startGame();
});



document.querySelectorAll(".btn").forEach(button => {
   
    const handleInteraction = function(e) {
        e.preventDefault(); 
        
        if (!started) return; 

        const userChosenColour = button.getAttribute("id");
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);
    };

    button.addEventListener("touchstart", handleInteraction, { passive: false });
    button.addEventListener("click", handleInteraction);
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
        document.body.classList.add("game-over");
        
  
        const title = document.getElementById("level-title");
        if (title) title.innerText = "Game Over, Tap Anywhere to Restart";

        setTimeout(function () {
            document.body.classList.remove("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    
    const title = document.getElementById("level-title");
    if (title) title.innerText = "Level " + level;
    
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    const targetButton = document.getElementById(randomChosenColour);
    if (targetButton) {
        targetButton.style.opacity = "0.3";
        setTimeout(() => {
            targetButton.style.opacity = "1";
        }, 100);
    }
    
    playSound(randomChosenColour);
}


function animatePress(currentColor) {
    const pressedButton = document.getElementById(currentColor);
    if (pressedButton) {
        pressedButton.classList.add("pressed");
        setTimeout(function () {
            pressedButton.classList.remove("pressed");
        }, 100);
    }
}

function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    const playPromise = audio.play();
    
h
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Odtwarzanie audio zostało tymczasowo zablokowane przez przeglądarkę.");
        });
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}