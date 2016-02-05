function init(){
	$('#newAdventureButton').on('click', newGame);
	$('#replayButton').on('click', replayGame);
	//make nodes clickable and game winnable
		loadClickEventListeners();
}
// global variables
var hasStarted = false;
var hasWon = false;
var arrayOfFunctions = [
			setPretzelAdventure,
			setBeerAdventure,
			setBrownieAdventure,
			setBurgerAdventure,
			setBurritoAdventure,
			setCheeseAdventure,
			setChowderAdventure,
			setCoffeeAdventure,
			setDimsumAdventure,
			setHotdogAdventure,
			setLobsterAdventure,
			setPizzaAdventure,
			setSushiAdventure];
var winningStation;
var currentStation;
var yelpLink;
var newMouseLatitude;
var newMouseLongitude;
var currentAdventure;

function newGame() {
	hasStarted = true;
	hasWon = false;
	//make all food icons invisible with new game
	$('.food').css({'display': 'none'});
	//make all instruction text black with new game
	$('#adventureDetails').css({'color' : 'black'});
	//select new adventure
	selectNewAdventure();
	$('#mouse').css({'-webkit-animation-name': 'twitchSlow'});
	//display mouse at new location
	$('#mouse').css({'display' : 'block', 'position' : 'absolute'});
	//make mouse jump
	mouseJump();
	//clear moves made
	sessionStorage.clear();
	//make replay button disappear
	$('#replayButton').css({'display' : 'none'});
}
function replayGame() {
	hasStarted = true;
	hasWon = false;
	$('.food').css({'display': 'none'});
	$('#adventureDetails').css({'color' : 'black'});
	//set up board to replay previous adventure
	currentAdventure();
	$('#mouse').css({'-webkit-animation-name': 'twitchSlow'});
	$('#mouse').css({'display' : 'block', 'position' : 'absolute'});
	mouseJump();
	sessionStorage.clear();
	$('#replayButton').css({'display' : 'none'});
}

function selectNewAdventure() {
	for (var i = arrayOfFunctions.length-1; i >= 0; i--) {
		if (hasStarted) {
			currentAdventure = arrayOfFunctions[i];
			arrayOfFunctions[i]();
			arrayOfFunctions.pop();
			hasStarted = false;
		}
		if(arrayOfFunctions.length===0) {
			arrayOfFunctions.push(setPretzelAdventure,
				setBeerAdventure,
				setBrownieAdventure,
				setBurgerAdventure,
				setBurritoAdventure,
				setCheeseAdventure,
				setChowderAdventure,
				setCoffeeAdventure,
				setDimsumAdventure,
				setHotdogAdventure,
				setLobsterAdventure,
				setPizzaAdventure,
				setSushiAdventure);
		}
	}
}

function loadClickEventListeners() {
	$('.munistop').on('click', function() {
		//if the mouse has won, he can no longer make moves on the board
		if (!hasWon) {
			completeMove(event.target);
		}
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
			//lets mouse win if the current station it navigated to is the winning station
			letMouseWin(targetElement);
	//else if they do not belong to the same line, alert that they go to transfer station
	} else {
		//play indignant mouse sound (placed here so it plays sooner)
		playSound('http://www.bigwood.pwp.blueyonder.co.uk/media/sounds/WAVS/animals/mouse%20squeak.wav');
		//display text and animation alerts
		invalidMoveAlert();
	}
} 

function moveMouse(targetElement) {
	//set mouse position so that it hovers over desired muni station
	newMouseLatitude = (parseInt($(targetElement).css('top'))-15).toString() + "px";
	newMouseLongitude = (parseInt($(targetElement).css('right'))-8).toString() + "px";
	$('#mouse').css({'top' : newMouseLatitude, 'right' : newMouseLongitude});
	//count number moves made
	countMovesMade();
}

function adjustClasses(targetElement) {
			var classList = targetElement.classList.toString();
			$('#mouse').removeClass();
			$('#mouse').addClass(classList);
			$('#mouse').removeClass('munistop');
}

function letMouseWin(targetElement){
	var currentStation = targetElement;
	if (currentStation == winningStation) {
		$('.food').css({'display' : 'none'});
		showWinnerMessage();
		hasWon = true;
		$('#mouse').css({'-webkit-animation-name': 'twitchFast'});
		playSound('http://www.flan4u.com/downloads/Wave-files/sound-effects/mouse2.wav');
	}
}

function showWinnerMessage(){
	$('#replayButton').css({'display' : 'inline-block'});
	$('#adventureDetails').html("<span id='congratulations'>Congratulations! You won the game with " + sessionStorage.movesMade + " moves!<br>Can you get him there even faster?</span> Click the replay adventure button to find out!<br>Pssst... click <a id='yelpLink' target='_blank' href='#'>here</a> to find out about other restaurants in the area.");
	$('#congratulations').css({'color' : '#EA242F'});
	$('#yelpLink').attr('href', yelpLink);
}

function invalidMoveAlert() {
		$('#invalidMove').css({'color' : '#EA242F', 'font-size' : '16px'});
		mouseShake();
}

function countMovesMade(){
	if (sessionStorage.movesMade) {
				sessionStorage.movesMade = Number(sessionStorage.movesMade)+1;
			} else {
				sessionStorage.movesMade = 1;
			}
}

// sound effect function
function playSound(soundfile) {
  document.getElementById("dummy").innerHTML= "<embed src='" + soundfile + "' hidden='true' autostart='true' loop='false'/>";
}

//animation functions 
function mouseJump(){
	var jumpHeight = ((parseInt(newMouseLatitude) - 60).toString()) + "px";
	$('#mouse').animate({'top' : jumpHeight}, 75); 
	$('#mouse').animate({'top' : newMouseLatitude}, 75);
	$('#mouse').animate({'top' : jumpHeight}, 75); 
	$('#mouse').animate({'top' : newMouseLatitude}, 75); 
}

function mouseShake(){
	var shakeRight = ((parseInt(newMouseLongitude) - 30).toString()) + "px";
	var shakeLeft = ((parseInt(newMouseLongitude) + 30).toString()) + "px";
	$('#mouse').animate({'right' : shakeRight}, 75); 
	$('#mouse').animate({'right' : shakeLeft}, 150);
	$('#mouse').animate({'right' : newMouseLongitude}, 75); 
}

// adventure functions below
function setBeerAdventure() {
	$('#adventureDetails').html('<br>Direct mouse to Dogpatch to grab some beers with friends!');
	winningStation = document.querySelector('#dogpatch');
	yelpLink = 'http://www.yelp.com/search?find_desc=restaurants&find_loc=Dogpatch,+San+Francisco,+CA';
	moveMouse('#nineteenthSt');
	adjustClasses(document.querySelector('#nineteenthSt'));
	$('#beer').css({'display': 'block'});
}
function setBrownieAdventure() {
	$('#adventureDetails').html('<br>Direct mouse to the Haight to pick up some brownies!');
	winningStation = document.querySelector('#haightAshbury');
	yelpLink = 'http://www.yelp.com/search?find_desc=restaurants&find_loc=San+Francisco,+CA&start=0&l=g:-122.43932247161865,37.77416323052168,-122.45219707489014,37.76398604059808';
	moveMouse('#hudson');
	adjustClasses(document.querySelector('#hudson'));
	$('#brownie').css({'display': 'block'});
}
function setBurgerAdventure() {
	$('#adventureDetails').html('<br>Direct mouse to Divisadero for a NOPA burger!');
	winningStation = document.querySelector('#divisadero');
	yelpLink = 'http://www.yelp.com/search?find_desc=restaurants&find_loc=NoPa,+San+Francisco,+CA&start=0&l=g:-122.43170499801636,37.78258620984929,-122.44457960128784,37.77241017934441';
	moveMouse('#glenPark');
	adjustClasses(document.querySelector('#glenPark'));
	$('#burger').css({'display': 'block'});
}
function setBurritoAdventure() {
	$('#adventureDetails').html('<br>Direct mouse to 24th St for a La Taqueria burrito!');
	winningStation = document.querySelector('#twentyFourthSt');
	yelpLink = 'http://www.yelp.com/search?find_desc=burrito&find_loc=Mission,+San+Francisco,+CA';
	moveMouse('#landsEnd');
	adjustClasses(document.querySelector('#landsEnd'));
	$('#burrito').css({'display': 'block'});
}
function setCheeseAdventure() {
	$('#adventureDetails').html('<br>Direct mouse to 16th St to pick up some cheese at Bi-Rite!');
	winningStation = document.querySelector('#sixteenthSt');
	yelpLink = 'http://www.yelp.com/search?find_desc=restaurants&find_loc=Mission,+San+Francisco,+CA&start=0&l=g:-122.41496801376343,37.766980290256306,-122.42784261703491,37.756802111778526';
	moveMouse('#union');
	adjustClasses(document.querySelector('#union'));
	$('#cheese').css({'display': 'block'});
}
function setChowderAdventure() {
	$('#adventureDetails').html('<br>Direct mouse to Fisherman\'s Wharf for some clam chowder!');
	winningStation = document.querySelector('#wharf');
	yelpLink = 'http://www.yelp.com/search?find_desc=chowder&find_loc=Fisherman%27s+Wharf,+San+Francisco,+CA';
	moveMouse('#bayview');
	adjustClasses(document.querySelector('#bayview'));
	$('#chowder').css({'display': 'block'});
}
function setCoffeeAdventure() {
	$('#adventureDetails').html('<br>Direct mouse the Castro for a cup of fair trade coffee!');
	winningStation = document.querySelector('#castro');
	yelpLink = 'http://www.yelp.com/search?find_desc=restaurants&find_loc=Castro,+San+Francisco,+CA,+USA';
	moveMouse('#union');
	adjustClasses(document.querySelector('#union'));
	$('#coffee').css({'display': 'block'});
}
function setDimsumAdventure() {
	$('#adventureDetails').html('<br>Direct mouse the Outer Richmond for some dim sum!');
	winningStation = document.querySelector('#theAvenues');
	yelpLink = 'http://www.yelp.com/search?find_desc=dim+sum&find_loc=san+francisco&start=0&l=g:-122.47189521789551,37.78925681551992,-122.49764442443848,37.76890519045137';	
	moveMouse('#civicCenter');
	adjustClasses(document.querySelector('#civicCenter'));
	$('#dimsum').css({'display': 'block'});
}
function setHotdogAdventure() {
	$('#adventureDetails').html('<br>Direct mouse to the ballpark for a hot dog!');
	winningStation = document.querySelector('#fourthAndKing');
	yelpLink = 'http://www.yelp.com/search?find_desc=restaurants&find_loc=San+Francisco,+CA&start=0&l=g:-122.37825393676758,37.790105203510535,-122.40400314331055,37.769753812051114';
	moveMouse('#balboaPark');
	adjustClasses(document.querySelector('#balboaPark'));
	$('#hotdog').css({'display': 'block'});
}
function setLobsterAdventure() {
	$('#adventureDetails').html('<br>Direct mouse Land\'s End for some seafood!');
	winningStation = document.querySelector('#landsEnd');	
	yelpLink = 'http://www.yelp.com/search?find_desc=restaurants&find_loc=san+francisco&start=0&l=g:-122.49176502227783,37.78369529480428,-122.5175142288208,37.7633421384456';
	moveMouse('#designDistrict');
	adjustClasses(document.querySelector('#designDistrict'));
	$('#lobster').css({'display': 'block'});
}
function setPizzaAdventure() {
	$('#adventureDetails').html('<br>Direct mouse to North Beach for a slice of pizza!');
	winningStation = document.querySelector('#northBeach');
	yelpLink = 'http://www.yelp.com/search?find_desc=pizza&find_loc=North+Beach,+San+Francisco,+CA';
	moveMouse('#taraval');
	adjustClasses(document.querySelector('#taraval'));
	$('#pizza').css({'display': 'block'});
}
function setPretzelAdventure() {
	$('#adventureDetails').html('Direct mouse to Stonestown Galleria for a soft pretzel! <br>Because who doesn\'t love soft pretzels??');
	winningStation = document.querySelector('#stonestown');
	yelpLink = 'http://www.yelp.com/search?find_desc=restaurants&find_loc=San+Francisco,+CA&start=0&l=g:-122.44945049285889,37.74243970293853,-122.50094890594482,37.70170508361123';
	moveMouse('#candlestick');
	adjustClasses(document.querySelector('#candlestick'));
	$('#pretzel').css({'display': 'block'});
}
function setSushiAdventure(){
	$('#adventureDetails').html('<br>Direct mouse to Japantown for some sushi!');
	winningStation = document.querySelector('#japantown');
	yelpLink = 'http://www.yelp.com/search?find_desc=sushi&find_loc=Japantown%2C+San+Francisco%2C+CA&ns=1';
	moveMouse('#stonestown');
	adjustClasses(document.querySelector('#stonestown'));
	$('#sushi').css({'display' : 'block'});	
}