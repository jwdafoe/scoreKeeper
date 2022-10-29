"use strict";

//JQUERY EVENT HANDLERS
$(document).ready(function() {
	$("#playerForm").on("submit", function(e) {
		scoreManager.scoreSheet.addPlayer($("#newPlayer")[0].value);
		$("#newPlayer")[0].value = null;
	});
	$("#names").on("click", function(e) {
		const name = e.target.textContent;
		const score = Number(prompt("Add to " + name + "'s score:"));
		scoreManager.scoreSheet.updateScore(name, score);
	});
});

//DECLARE GLOBAL MODULES IN THIS SECTION
const scoreManager = (function() { //IMEDIATELY INVOKED MODULE THAT EXPOSES THE 'scoreSheet'
	class ScoreSheet {
		constructor() {
			this.scoreMap = {};
		}
		
		addPlayer(name) {
			this.scoreMap[name] = 0;
			manageUiDisplay.updateNames(Object.keys(this.scoreMap));
		}
		getScores() {
			return this.scoreMap;
		}
		updateScore(name, score) {
			if (!this.scoreMap[name]) {
				this.addPlayer(name);
			}
			this.scoreMap[name] += score;
			manageUiDisplay.updateScores(Object.values(this.scoreMap))
		}
		removePlayer(name) {
			delete this.scoreMap[name];
		}
	}
	
	return {
		scoreSheet: new ScoreSheet()
	}
})();

const manageUiDisplay = (function() { //IMEDIATELY INVOKED MODULE THAT EXPOSES 'updateNames' & 'updateScores'
	//const nameField = document.getElementById('newPlayer'); //REFERENCE THE NEW PLAYER INPUT FIELD
	const namesRow = document.getElementById('names'); //REFERENCE THE TABLE HEADER HOLDING THE NAMES
	const scoresRow = document.getElementById('scores'); //REFERENCE THE TABLE BODY HOLDING THE SCORES

	function addTableCell(data) {
		const td = document.createElement('td');
		td.textContent = data;
		return td;
	}
	
	return {
		updateNames: function(namesArr) {
			while (namesRow.firstChild) { //CLEAR OUT ANY EXISTING ELEMENTS IN THE ROW
				namesRow.removeChild(namesRow.firstChild);
			}
			namesArr.forEach(function(name) {
				namesRow.appendChild(addTableCell(name));
			});
		},
		updateScores: function(scoresArr) {
			while (scoresRow.firstChild) { //REMOVE ANY EXISTING ELEMENTS IN THE ROW
				scoresRow.removeChild(scoresRow.firstChild);
			}
			scoresArr.forEach(function(score) {
				scoresRow.appendChild(addTableCell(score));
			});
		}
	}
})();

//MAIN EXECUTION BEGINS HERE
document.getElementById('pageTitle').innerHTML += ' v0.4';