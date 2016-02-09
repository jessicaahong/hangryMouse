// I didn't test this out, so its just an example. 

function Food(options){
	this.defaultMessage = "there has been an error"
	this.name           = options.name           || this.defaultMessage;
	this.message        = options.message        || this.defaultMessage;
	this.winningStation = options.winningStation || this.defaultMessage;
	this.yelpLink       = options.yelpLink       || this.defaultMessage;
	this.mouseStart     = options.mouseStart     || this.defaultMessage;
};

var beerOptions = {
	name:           'beer',
	massage:        '<br>Direct mouse to Dogpatch to grab some beers with friends!',
	winningStation: '#dogpatch',
	yelpLink:       'http://www.yelp.com/search?find_desc=restaurants&find_loc=Dogpatch,+San+Francisco,+CA',
	mouseStart:     '#nineteenthSt'
};

var beer = new Food(beerOptions);

setAdventure(beer);

function setAdventure(food) {
	$('#adventureDetails').html(food.message);
	winningStation = document.querySelector(food.winningStation);
	yelpLink = food.yelpLink;
	moveMouse(food.mouseStart);
	adjustClasses(document.querySelector(food.mouseStart));
	$('#' + food.name).css({'display': 'block'});
}
