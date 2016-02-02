function init(){
	//things that you want to happen once page loads
	console.log('working');
	loadClickEventListeners();
}

function loadClickEventListeners() {
	$('#wharf').on('click', mouseJump);
}

function mouseJump() {
	$('#mouse').css();

}

  var mousePosition = $('#mouse').css(["top", "right"]);
  $.each( mousePosition, function( prop, value ) {
    html.push( prop + ": " + value )});

  var newMousePosition = $('#wharf').css({'top','right'});