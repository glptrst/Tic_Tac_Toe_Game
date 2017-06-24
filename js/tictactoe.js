window.onload = function() {
    // buttons for chose 'O' or 'X'
    var choiceBtns = document.querySelectorAll('.choicebtn');
    // squares of the game
    var gameBtns = document.querySelectorAll('.gamebtn');
    // store user and computer sign ('O' or 'X')
    var userSign = null;
    var computerSign = null;

    var gameIsOver = false;

    // keep track of how many moves have been made
    var moves = 0;
    
    document.getElementById('restart').addEventListener('click', restart);
  
    for (let i = 0; i < choiceBtns.length; i++) {
	choiceBtns[i].addEventListener('click', setUserSign);
    }

    for (let i = 0; i < gameBtns.length; i++) {
	gameBtns[i].addEventListener('click', markSquare);
    }
    
    function setUserSign() {
	if (userSign == null) {
	    userSign = this.firstChild.nodeValue;
	    if (userSign === 'X')
		computerSign = 'O';
	    else
		computerSign = 'X';
	}
    }

    // insert sign into square
    function markSquare() {
	if (userSign !== null) {
	    if (this.childNodes.length === 0) { //If the square hasn't been marked already
		var mark = document.createElement('span');
		var markText = document.createTextNode(userSign);
		mark.appendChild(markText);
		this.appendChild(mark);

		evaluate();

		++moves;

		if (moves < 9 && !gameIsOver)
		    computerPlay();
	    }
	}
    }

    function computerPlay() {
	// select a random square
	var squareId = randomRange(1, 9);

	var square = document.getElementById(squareId);

	if (square.firstChild === null) {
	    var mark = document.createElement('span');
	    var markText = document.createTextNode(computerSign);
	    mark.appendChild(markText);
	    square.appendChild(mark);

	    ++moves;

	    evaluate();
	} else
	    computerPlay();
    }

    function restart() {
	gameIsOver = false;
	userSign = null;
	moves = 0;
	for (let i = 0; i < gameBtns.length; i++) {
	    //remove colors
	    gameBtns[i].setAttribute('style', ' ');
	    //enable buttons
	    gameBtns[i].removeAttribute('disabled');
	    if (gameBtns[i].firstChild !== null)
		gameBtns[i].firstChild.remove();
	}
    }

    // generate a random number between a range
    function randomRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // check if someone won
    function evaluate() {
	// square nodes
	var s1 = document.getElementById('1');
	var s2 = document.getElementById('2');
	var s3 = document.getElementById('3');
	var s4 = document.getElementById('4');
	var s5 = document.getElementById('5');
	var s6 = document.getElementById('6');
	var s7 = document.getElementById('7');
	var s8 = document.getElementById('8');
	var s9 = document.getElementById('9');

	if (evaluateRow(s1, s2, s3))//orizontal rows
	    declareWinner(s1, s2, s3);
	else if (evaluateRow(s4, s5, s6))
	    declareWinner(s4, s5, s6);
	else if (evaluateRow(s7, s8, s9))
	    declareWinner(s7, s8, s9);
	else if (evaluateRow(s1, s4, s7))//vertical rows
	    declareWinner(s1, s4, s7);
	else if (evaluateRow(s2, s5, s8))
	    declareWinner(s2, s5, s8);
	else if (evaluateRow(s3, s6, s9))
	    declareWinner(s3, s6, s9);
	else if (evaluateRow(s1, s5, s9))//oblique rows
	    declareWinner(s1, s5, s9);
	else if (evaluateRow(s3, s5, s7))
	    declareWinner(s3, s5, s7);
    }

    // Gets the tree squares (nodes) as arguments.
    // Return true if row is a winning one, false otherwise.
    function evaluateRow(first, second, third) {
	// check that all three squares have been signed before checking it
	if (first.firstChild !== null  && second.firstChild !== null && third.firstChild !== null) {
	    if (first.firstChild.firstChild.nodeValue === second.firstChild.firstChild.nodeValue && second.firstChild.firstChild.nodeValue === third.firstChild.firstChild.nodeValue)
		return true;
	    else
		return false;
	} else
	    return false;
    }

    // Declare winner. Get the winner squares (nodes) as arguments
    function declareWinner(square1, square2, square3) {
	gameIsOver = true;
	
	console.log('game over. Winner row: ' + square1.id + ' ' + square2.id + ' ' + square3.id);
	
	// color winner squares
	square1.setAttribute('style', 'background-color: red');
	square2.setAttribute('style', 'background-color: red');
	square3.setAttribute('style', 'background-color: red');

	// disable buttons
	for (let i = 0; i < gameBtns.length; i++) {
	    gameBtns[i].setAttribute('disabled', 'disabled');
	}

    }
};
