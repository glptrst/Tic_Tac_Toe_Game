window.onload = function() {
    // buttons for chose 'O' or 'X'
    var choiceBtns = document.querySelectorAll('.choicebtn');
    // squares of the game
    var gameBtns = document.querySelectorAll('.gamebtn');
    // store user and computer sign ('O' or 'X')
    var userSign = null;
    var computerSign = null;
    
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
	    }
	}
    }

    function restart() {
	userSign = null;
	for (let i = 0; i < gameBtns.length; i++) {
	    if (gameBtns[i].firstChild !== null)
		gameBtns[i].firstChild.remove();
	}
    }

    function computerPlay() {
	// select a random square
	var squareId = randomRange(1, 9);

    }

    // generate a random number between a range
    function randomRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
};
