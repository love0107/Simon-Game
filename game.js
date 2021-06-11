ColourBox=["red", "blue", "green", "yellow"];
 var gameColorBox=[];
 var buttonClick=0;
 var countForUser=0;
var score=0;
var flag=0;
//start the game by clicking A or a
document.addEventListener("keypress",function(event){
  if(event.keyCode==65||event.keyCode==97&& flag==0){

    nextcolor();
    flag++;
  }
 
  });

  //for mobile-view
  function ButtonA(){
    if(flag==0) {
      nextcolor(); flag++;
      $("#mobile-view").removeClass("Announce");
      $(".btn").removeClass("btn-change");
      $("#mobile-view").html("");
    }
  }
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
  $("#mobile-view").addClass("Announce");
  $(".btn").addClass("btn-change");
  $("#mobile-view").html("A");
}


 //generating next color 
  function nextcolor()
  {    $(".score").html("Level= "+score);
       var randomNumber=Math.floor(Math.random()*4);
       var randomColour = ColourBox[randomNumber];
       gameColorBox.push(randomColour);
       buttonClick=0;
       flag=0;
       score++;
       AIplaying();  
  }


// AI playing from gameColorBox
function AIplaying(){
  document.getElementById("level-title").innerHTML="AI playing..";
  countForUser=0;
  var GameColorBox_loop=setInterval(() => {
    if(buttonClick==gameColorBox.length-1) clearInterval(GameColorBox_loop); 
    Makingsounds(gameColorBox[buttonClick]);
    buttonClick++;
    setTimeout(() => {
      if(buttonClick<gameColorBox.length){
        document.getElementById("level-title").innerHTML="AI playing..";
      }
      else{
        document.getElementById("level-title").innerHTML="Your Turn To Play";
      }
    }, 1200);
    
  },1000);

}


//user Playinng game
function UserPlay(evt){
  if (buttonClick<gameColorBox.length) return;
  if(countForUser==gameColorBox.length) return;
if(evt==gameColorBox[countForUser]){
Makingsounds(evt);
}
else{
  Makingsounds('wrong');
 EndGame();
}
countForUser++;
if(countForUser==gameColorBox.length) nextcolor();
}


// making sounds
function Makingsounds(event){
  if(event!='wrong')
  $("#"+event).fadeOut(40).fadeIn(40);
  var audio=new Audio('sounds/'+event+'.mp3');
  audio.play();
}


// End Game
function EndGame()
{
  while (gameColorBox.length > 0) {gameColorBox.pop();} 
  $('body').addClass("wrong");
  setTimeout(function(){
$('body').removeClass("wrong");
  },1000);
  buttonClick=0;
  countForUser=0;
  score=0;
  flag=0;
  gameend=0;
  document.getElementById("level-title").innerHTML="Game Over Press A key to restart the game!!";
  if (isMobile) {
    $("#mobile-view").addClass("Announce");
    $(".btn").addClass("btn-change");
    $("#mobile-view").html("A");
  }
}

