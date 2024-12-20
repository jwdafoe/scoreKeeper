"use strict";

//JQUERY EVENT HANDLERS
$(document).ready(function() {
	$("#instructions, #updateForm").hide();

	$("#playerForm").on("submit", function(e) {
		scoreManager.scoreSheet.addPlayer($("#newPlayer").val());
		$("#instructions").show();
		$("#playerForm")[0].reset();
	});
	$("#names").on("click", function(e) {
		name = e.target.textContent;
		$("#playerName").text(name);
		$("#instructions, #updateForm, .table").toggle();
		$("#plusScore").focus();
	});
	$("#clear").on("click", function(e) {
		if (confirm("About to clear all names and scores.")) {
			location.reload();
		};
	});
	$("#updateForm").on("submit", function(e) {
		scoreManager.scoreSheet.updateScore(name, Number($("#plusScore").val()));
		$("#instructions, #updateForm, .table").toggle();
		$("#updateForm")[0].reset();
		name = null; //RESET THE GLOBAL VARIABLE
	});
});

//DECLARE GLOBAL VARIABLES IN THIS SECTION
var name; //VARIABLE TO HOLD THE CURRENT PLAYERNAME

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
document.getElementById('pageTitle').innerHTML += ' v1.0';
