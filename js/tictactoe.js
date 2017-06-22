window.onload = function() {
    // buttons for chose 'O' or 'X'
    var choiceBtns = document.querySelectorAll('.choicebtn');
    // squares of the game
    var gameBtns = document.querySelectorAll('.gamebtn');
    // store user and computer sign ('O' or 'X')
    var userSign = null;
    var computerSign = null;

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

		++moves;

		if (moves < 9)
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
	} else
	    computerPlay();
    }

    function restart() {
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
    
};
