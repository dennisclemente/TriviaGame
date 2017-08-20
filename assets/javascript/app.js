var startScreen;
var gameHTML;
var counter = 40;
var questionArray = 
					["They may take away our lives but they'll never take away our freedom!", 
					"Keyser Soshe!", 
					"Baby, you're going to miss that plane.", 
					"If you let my daughter go now, that'll be the end of it...But if you don't, I will look for you, I will find you, and I will kill you.", 
					"It's coming out of me like lava", 
					"They call it a Royale with cheese.", 
					"Wax on, wax off.", 
					"I'm having an old friend for dinner."];

var answerArray = 	[["Gladiator", "Braveheart", "Bridesmaids", "The Hangover"], 
					["Superman", "Dark Knight", "The Usual Suspects", "Godfather"], 
					["When Harry Met Sally", "Before Sunset", "My Cousin Vinny", "Ip Man"], 
					["Die Hard 3","Toy Story","Taken","The Avengers"], 
					["Eat Drink Man Woman", "Bridesmaids", "It Follows", "Inception"], 
					["Pulp Fiction","Inglorious Basterds","Terminator","Casino Royale"], 
					["Cars", "The Dragon", "Karate Kid", "Rocky"], 
					["Julie and Julia","Silence of the Lambs","Coming to America","Casablanca"]];
var imageArray 	   = ["<img class='center-block img-right' src='assets/images/braveheart.gif'>", 
					"<img class='center-block img-right' src='assets/images/usual-suspects.gif'>", 
					"<img class='center-block img-right' src='assets/images/before-sunset.gif'>", 
					"<img class='center-block img-right' src='assets/images/taken.gif'>", 
					"<img class='center-block img-right' src='assets/images/bridesmaids.gif'>", 
					"<img class='center-block img-right' src='assets/images/pulp-fiction.gif'>", 
					"<img class='center-block img-right' src='assets/images/karate-kid.gif'>", 
					"<img class='center-block img-right' src='assets/images/silence-of-the-lambs.gif'>"];
var correctAnswers = ["B. Braveheart", "C. The Usual Suspects", "B. Before Sunset", "C. Taken", "B. Bridesmaids", 
						"A. Pulp Fiction", "C. Karate Kid", "B. Silence of the Lambs"];
var questionCounter = 0;


var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

$(document).ready(function() {

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Trivia Game</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  
	generateHTML();

	timerWrapper();
}); 


$("body").on("click", ".answer", function(event){
	answeredQuestion = true;
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
	alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		clearInterval(theClock);
		generateLoss();
	}
});

$("body").on("click", ".reset-button", function(event){
	resetGame();
}); 

});  

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
	+ counter + "</span></p>" + 
	"<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] 
	+ "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
	+ counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] 
	+ "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] 
	+ "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" 
	+ "<p class='text-center'>You did it! See your score" + "</p>" + "<p class='summary-correct'>Correct Answers: " 
	+ correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally 
	+ "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" 
	+ "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset Game!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();  
}

