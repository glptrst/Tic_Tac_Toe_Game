window.onload = function() {
    // buttons for chose 'O' or 'X'
    var choiceBtns = document.querySelectorAll('.choicebtn');
    // squares of the game
    var gameBtns = document.querySelectorAll('.gamebtn');
    // store sign chosen by user ('O' or 'X')
    var chosen = null;
  
    for (let i = 0; i < choiceBtns.length; i++) {
	choiceBtns[i].addEventListener('click', setChosen);
    }

    for (let i = 0; i < gameBtns.length; i++) {
	gameBtns[i].addEventListener('click', markSquare);
    }
    
    function setChosen() {
	if (chosen == null)
	    chosen = this.firstChild.nodeValue;
    }

    // insert sign into square
    function markSquare() {
	if (chosen !== null) {
	    if (this.childNodes.length === 0) { //If the square hasn't been marked already
		var mark = document.createElement('span');
		var markText = document.createTextNode(chosen);
		mark.appendChild(markText);
		this.appendChild(mark);
	    }
	}
    }
};
