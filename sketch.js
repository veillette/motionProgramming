// declaration of variables
var x = 375;
var y = 250;

var vx = 0;
var vy = 0;

var dt = 0.1;

function draw() {

	// Update horizontal location
	x += vx * dt;

	// velocity is zero unless keys are pressed
	vx = 0;
   
	// Turn or thrust the ship depending on what key is pressed
	if (keyIsDown(LEFT_ARROW)) {
		// Do nothing
	}
	if (keyIsDown(RIGHT_ARROW)) {
		vx = 10;
	}
	if (keyIsDown(UP_ARROW)) {
		// Do nothing
	}
	if (keyIsDown(DOWN_ARROW)) {
		// Do nothing
	}

	// Draw axes and other stuff
	// This will clear the screen and re-draw it
	display();

	drawDisk(x, y, vx, vy);

	// Add more graphics here before the end of draw()

} // end draw()