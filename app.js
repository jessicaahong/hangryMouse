function init(){
	$('button').on('click', newGame);
}

var hasStarted = false;
var arrayOfFunctions = [
			setBeerAdventure,
			setBrownieAdventure,
			setBurgerAdventure,
			setBurritoAdventure,
			setCheeseAdventure,
			setChowderAdventure,
			setCoffeeAdventure,
			setCrabAdventure,
			setDimsumAdventure,
			setHotdogAdventure,
			setPizzaAdventure,
			setPretzelAdventure,
			setSushiAdventure];

function newGame() {
	hasStarted=true;
	//make exclamation point invisible with new game
	$('#exclamationPointDiv').css({'display' : 'none'});
	//make all food icons invisible with new game
	$('.food').css({'display': 'none'});
	//make nodes clickable
	loadClickEventListeners();
	//select new gameboard randomly, and generates new gameboard
	selectRandomAdventure();
	//then display mouse at new location
	$('#mouse').css({'display' : 'block', 'position' : 'absolute'});
}

function selectRandomAdventure() {
	for (var i = arrayOfFunctions.length-1; i >= 0; i--) {
		if (hasStarted) {
			arrayOfFunctions[i]();
			arrayOfFunctions.pop();
			hasStarted = false;
			console.log(arrayOfFunctions);
		}
		if(arrayOfFunctions.length===0) {
			arrayOfFunctions.push(setBeerAdventure,
				setBrownieAdventure,
				setBurgerAdventure,
				setBurritoAdventure,
				setCheeseAdventure,
				setChowderAdventure,
				setCoffeeAdventure,
				setCrabAdventure,
				setDimsumAdventure,
				setHotdogAdventure,
				setPizzaAdventure,
				setPretzelAdventure,
				setSushiAdventure);
		}
	} 
}

// adventure functions below

function setBeerAdventure() {
	$('#adventureDetails').html('Direct mouse to dogpatch to grab some beers!');
	moveMouse('#nineteenthSt');
	adjustClasses(document.querySelector('#nineteenthSt'));
	$('#beer').css({'display': 'block'});
}
function setBrownieAdventure() {
	$('#adventureDetails').html('Direct mouse to the Haight to pick up some brownies!');
	moveMouse('#hudson');
	adjustClasses(document.querySelector('#hudson'));
	$('#brownie').css({'display': 'block'});
}
function setBurgerAdventure() {
	$('#adventureDetails').html('Direct mouse to dividadero street for a NOPA burger!');
	moveMouse('#glenPark');
	adjustClasses(document.querySelector('#glenPark'));
	$('#burger').css({'display': 'block'});
}
function setBurritoAdventure() {
	$('#adventureDetails').html('Direct mouse to 24th St for la taqueria!');
	moveMouse('#landsEnd');
	adjustClasses(document.querySelector('#landsEnd'));
	$('#burrito').css({'display': 'block'});
}
function setCheeseAdventure() {
	$('#adventureDetails').html('Direct mouse to 16th St to get some cheese at BiRite!');
	moveMouse('#union');
	adjustClasses(document.querySelector('#union'));
	$('#cheese').css({'display': 'block'});
}
function setChowderAdventure() {
	$('#adventureDetails').html('Direct mouse to the wharf for some clam chowder!');
	moveMouse('#bayview');
	adjustClasses(document.querySelector('#bayview'));
	$('#chowder').css({'display': 'block'});
}
function setCoffeeAdventure() {
	$('#adventureDetails').html('Direct mouse the castro for a cup of coffee!');
	moveMouse('#union');
	adjustClasses(document.querySelector('#union'));
	$('#coffee').css({'display': 'block'});
}
function setCrabAdventure() {
	$('#adventureDetails').html('Direct mouse Land\'s End for some seafood!');
	moveMouse('#designDistrict');
	adjustClasses(document.querySelector('#designDistrict'));
	$('#crab').css({'display': 'block'});
}
function setDimsumAdventure() {
	$('#adventureDetails').html('Direct mouse the richmond for some dim sum!');
	moveMouse('#civicCenter');
	adjustClasses(document.querySelector('#civicCenter'));
	$('#dimsum').css({'display': 'block'});
}
function setHotdogAdventure() {
	$('#adventureDetails').html('Direct mouse to the ballpark for a hot dog!');
	moveMouse('#balboaPark');
	adjustClasses(document.querySelector('#balboaPark'));
	$('#hotdog').css({'display': 'block'});
}
function setPizzaAdventure() {
	$('#adventureDetails').html('Direct mouse to North Beach for a slice of pizza!');
	moveMouse('#taraval');
	adjustClasses(document.querySelector('#taraval'));
	$('#pizza').css({'display': 'block'});
}
function setPretzelAdventure() {
	$('#adventureDetails').html('Direct mouse to Stonestown Galleria for a soft pretzel!');
	moveMouse('#candlestick');
	adjustClasses(document.querySelector('#candlestick'));
	$('#pretzel').css({'display': 'block'});
}
function setSushiAdventure(){
	$('#adventureDetails').html('Direct mouse to Japantown for some sushi!');
	moveMouse('#stonestown');
	adjustClasses(document.querySelector('#stonestown'));
	$('#sushi').css({'display' : 'block'});	
}

//functions that make mouse mobile
function loadClickEventListeners() {
	$('.munistop').on('click', function() {
		completeMove(event.target);

	});
}

function completeMove(targetElement) {
	//if mouse and new muni station are part of the same line, move mouse and change its classes
	if (($('#mouse').hasClass('redLine') && $(targetElement).hasClass('redLine')) ||
		($('#mouse').hasClass('orangeLine') && $(targetElement).hasClass('orangeLine')) ||
		($('#mouse').hasClass('yellowLine') && $(targetElement).hasClass('yellowLine')) ||
		($('#mouse').hasClass('greenLine') && $(targetElement).hasClass('greenLine')) ||
		($('#mouse').hasClass('blueLine') && $(targetElement).hasClass('blueLine')) ||
		($('#mouse').hasClass('purpleLine') && $(targetElement).hasClass('purpleLine'))) {
			moveMouse(targetElement);
			adjustClasses(targetElement);
			//get rid of invalid move alerts
			$('#invalidMove').css({'color' : 'black', 'font-size' : '16px'});
			$('#exclamationPointDiv').css({'display' : 'none'});
	//else if they do not belong to the same line, alert that they go to transfer station
	} else {
		invalidMoveAlert();
	}
} 

function moveMouse(targetElement) {
	//set mouse position so that it hovers over desired muni station
	var newMouseLatitude = (parseInt($(targetElement).css('top'))-15).toString() + "px";
	var newMouseLongitude = (parseInt($(targetElement).css('right'))-8).toString() + "px";
	$('#mouse').css({'top' : newMouseLatitude, 'right' : newMouseLongitude});
}

function adjustClasses(targetElement) {
			var classList = targetElement.classList.toString();
			$('#mouse').removeClass();
			$('#mouse').addClass(classList);
			$('#mouse').removeClass('munistop');
}

function invalidMoveAlert() {
		//turn text in instructions red
		$('#invalidMove').css({'color' : '#EA242F', 'font-size' : '16px'});
		//have an exclamation point pop up over the mouse to alert an invalid move
		var exclamationPointLatitude = (parseInt($('#mouse').css('top'))-42).toString() + "px";
		var exclamationPointLongitude = (parseInt($('#mouse').css('right'))).toString() + "px";
		$('#exclamationPointDiv').css({'display' : 'block', 'top': exclamationPointLatitude, 'right' : exclamationPointLongitude});
}



	// function getRandomAdventure(){
	// 	var min = 0;
	// 	var max = arrayOfFunctions.length;
	// 	arrayOfFunctions[(Math.floor(Math.random() * (max-min)) + min)]();
	// }
	// getRandomAdventure();