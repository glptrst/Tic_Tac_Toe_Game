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

	if (
	    //horizontal rows
	    evaluateRow(s1, s2, s3) ||
	    evaluateRow(s4, s5, s6) ||
	    evaluateRow(s7, s8, s9) ||
	    //vertical rows
	    evaluateRow(s1, s4, s7) ||
	    evaluateRow(s2, s5, s8) ||
	    evaluateRow(s3, s6, s9) ||
	    //oblique rows
	    evaluateRow(s1, s5, s9) ||
	    evaluateRow(s3, s5, s7)
	)
	    declareWinner();
    }

    // Evaluate single row. Gets the tree squares (nodes) as arguments.
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

    // Declare winner
    function declareWinner() {
	gameIsOver = true;
	console.log('game over');
    }
};
