var buttonColor = ["red" , "blue" , "green" ,"yellow"];
var gamePattern  = []; 
var userClickedPattern = []
var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("h1").text("Level " + level);
        nextSeqence()
        started = true
    }
})


$(".btn").click(function handler ()
    {
        var userChosenColor = $(this).attr("id")
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor)
        animatePress(userChosenColor)
        checkAnswer(userClickedPattern.length-1)
    }
)



function playSound(color){
    var myaudio = new Audio("sounds/" + color + ".mp3")
    myaudio.play()
}

function nextSeqence(){
    userClickedPattern = []
    level++
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeToggle(100).fadeIn(100);
    playSound(randomChosenColor)
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed")
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    } , 100)
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Sucess")
    
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSeqence()
            },1000)
        }
    }
    else{
        console.log("Wrong")
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $("h1").text("Game Over, Press any key to restart")
        level = 0
        started = false
        gamePattern = []
    }
}
