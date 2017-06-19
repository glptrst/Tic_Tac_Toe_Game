window.onload = function() {
    var choiceBtns = document.querySelectorAll('.choicebtn');
    var gameBtns = document.querySelectorAll('.gamebtn');
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

    function markSquare() {
	var mark = document.createElement('span');
	var markText = document.createTextNode(chosen);
	mark.appendChild(markText);
	this.appendChild(mark);
    }
};
