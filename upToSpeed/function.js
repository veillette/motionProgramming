xhistory = [];
yhistory = [];

function setup() {
  createCanvas(750, 500);

  graph1 = new Graph();
  graph1.colorFunction = color(255, 0, 0);
  graph1.xTitle = "time";

}

// Size of the ship
var r = 12;

var isrunning = false;
var showarrows = true;

iterations = 0;

// Draw the ship and other stuff
function display() {
  wrapEdges();
  background(255);
  textSize(12);
  textStyle(NORMAL);

  if (showarrows) {
    textSize(20);
    strokeWeight(0);
    fill(255, 0, 0);
    text("Velocity", 0.8 * width, 0.8 * height + 75);
    /*
            fill(0,0,255);
        text("Force",0.8*width,0.8*height+50);
        fill(204,0,204);
        text("Acceleration",0.8*width,0.8*height+75);
    */
  }

  strokeWeight(10);
  var tri_width = 7;
  if (showarrows) {
    var x_line = 5;
    var y_line = 5;
    var line_len = 100;
    drawLine(x_line, y_line, x_line, y_line + line_len);
    drawLine(x_line, y_line, x_line + line_len, y_line);
    fill(0);
    drawTriangle(x_line - tri_width / 2, y_line + line_len, x_line + tri_width / 2, y_line + line_len, x_line, y_line + line_len + 10);
    drawTriangle(x_line + line_len, y_line - tri_width / 2, x_line + line_len, y_line + tri_width / 2, x_line + line_len + 10, y_line);
    strokeWeight(0);
    drawText("+x", x_line + line_len + 15, y_line);
    drawText("+y", x_line, y_line + line_len + 15);
  }


  if (iterations % 5 == 1) {
    append(xhistory, x);
    append(yhistory, y);
  }

  iterations += 1;

  if (keyIsPressed) {
    isrunning = true;
  }

  MaxLength = 50;
  if (xhistory.length > MaxLength) {
    xhistory = subset(xhistory, xhistory.length - MaxLength, xhistory.length);
    yhistory = subset(yhistory, yhistory.length - MaxLength, yhistory.length);
  }

  fill(0, 0, 0); //If more text is written elsewhere make sure the default is black
  stroke(0, 0, 0); // If more lines are drawn elsewhere make sure the default is black
  strokeWeight(0);

  textSize(20);
  strokeWeight(1);
  drawText("Click this screen first!", 0.35 * width, 0.8 * height);
  drawText("then move the arrow keys!", 0.32 * width, 0.75 * height);
}

function wrapEdges() {
  var buffer = r * 2;
  if (x > width + buffer) x = -buffer;
  else if (x < -buffer) x = width + buffer;
  if (y > height + buffer) y = -buffer;
  else if (y < -buffer) y = height + buffer;
}

function drawDisk(_x, _y, _vx, _vy) {
  ellipseMode(RADIUS);
  strokeWeight(2);
  //    fill(255);
  noFill();
  stroke(0);
  ellipse(_x, height - _y, 25, 25);

  strokeWeight(10);
  var tri_width = 7;

  // Draw velocity arrow
  var v_scaling = 5.0;
  stroke(255, 0, 0); // makes the line red
  strokeWeight(3); // makes the line thicker

  if (((_vx !== 0) || (_vy !== 0)) && showarrows) {
    drawLine(_x, _y, _x + v_scaling * _vx, _y + v_scaling * _vy);
    var vel_angle = -atan2(_vy, _vx);
    fill(255, 0, 0); // makes the triangle red
    drawTriangle(_x + v_scaling * _vx + sin(vel_angle) * tri_width / 2, _y + v_scaling * _vy + cos(vel_angle) * tri_width / 2, _x + v_scaling * _vx - sin(vel_angle) * tri_width / 2, _y + v_scaling * _vy - cos(vel_angle) * tri_width / 2, _x + v_scaling * _vx + cos(vel_angle) * 10, _y + v_scaling * _vy - sin(vel_angle) * 10);
  }

  /*  
    append(xhistory,x);
    append(yhistory,y);
  
    for( i = 0; i < xhistory.length ; i+= 5) {
     drawPoint(xhistory[i],yhistory[i]); 
    }
*/
  fill(0, 0, 0); //If more text is written elsewhere make sure the default is black
  stroke(0, 0, 0); // If more lines are drawn elsewhere make sure the default is black
  strokeWeight(0);

}

/*
function drawBlob( _x,  _y, _r){
  strokeWeight(2);
  ellipse(_x, height - _y, _r, _r);  
}*/

function drawEllipse(_x, _y, _w, _h) {
  ellipse(_x, height - _y, _w, _h);
}

function drawLine(_x1, _y1, _x2, _y2) {
  strokeWeight(2);
  line(_x1, height - _y1, _x2, height - _y2);
  //  strokeWeight(0);
}

function drawPoint(_x, _y) {
  strokeWeight(2);
  stroke(0);
  point(_x, height - _y);
  strokeWeight(0);
}

function drawQuad(_x1, _y1, _x2, _y2, _x3, _y3, _x4, _y4) {
  quad(_x1, height - _y1, _x2, height - _y2, _x3, height - _y3, _x4, height - _y4);
}

function drawRect(_x, _y, _w, _h) {
  rect(_x, height - _y, _w, _h);
}

function drawRect(_x, _y, _w, _h, _r) {
  rect(_x, height - _y, _w, _h, _r);
}

function drawRect(_x, _y, _w, _h, _tl, _tr, _br, _bl) {
  rect(_x, height - _y, _w, _h, _tl, _tr, _br, _bl);
}

function drawTriangle(_x1, _y1, _x2, _y2, _x3, _y3) {
  triangle(_x1, height - _y1, _x2, height - _y2, _x3, height - _y3);
}

function drawText(_str, _x, _y) {
  if (isNumeric(_str)) {
    _str = round(100 * _str) / 100;
  }
  textSize(20);
  strokeWeight(1);
  text(_str, _x, height - _y);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function Graph() {

  m_x = 450;
  m_y = 290;

  m_size_x = 200;
  m_size_y = 200;

  fontSize = 25;

  this.DataArray = [];
  this.PlotArray = [];

  this.colorFunction = color(0, 0, 0);

  this.xTitle = "";
  this.yTitle = "";

  this.minY = 0;
  this.maxY = 0;

  this.increaseMarginFactor = 1.4;

  this.display = function() {
    this.setTitle();
    this.setAxes();
    this.calcPlotArray();
    this.drawPoints();
    //print(this.DataArray);
  }

  this.setTitle = function() {
    textSize(fontSize);
    fill(0, 0, 0);
    noStroke();
    text(this.xTitle, (m_x + m_size_x - this.xTitle.length * fontSize / 2), (m_y + m_size_y / 2 + 25));
    text(this.yTitle, (m_x - 25), (m_y + fontSize));
  }

  this.setAxes = function() {
    stroke(0);
    strokeWeight(2);
    //      line(m_x,m_y,m_x,m_y+m_size_y);
    line(m_x, m_y, m_x, m_y + m_size_y);
    //            line(m_x,m_y-m_size_y,m_x,m_y);
    line(m_x, m_y + m_size_y / 2, m_x + m_size_x, m_y + m_size_y / 2);
  }

  this.addPoint = function(newpoint) {
    if (isrunning) {
      append(this.DataArray, newpoint);
    }
  }

  this.calcPlotArray = function() {

    //   this.minY = 0; 
    this.minY = this.increaseMarginFactor * min(this.DataArray);
    this.maxY = this.increaseMarginFactor * max(this.DataArray);

    if (this.maxY > 0) {
      this.minY = -this.maxY;
    }
    if (this.maxY < 0) {
      this.maxY = -this.minY;
    }

    // this.PlotArray = m_size_y*this.DataArray/this.maxY;
    //this.PlotArray = this.DataArray;
    for (var i = 0; i < this.DataArray.length; i++) {
      //	this.PlotArray[i] = m_size_y*this.DataArray[i]/this.maxY;
      this.PlotArray[i] = 0.5 * m_size_y * (this.DataArray[i] - 0.5 * (this.maxY + this.minY)) / (0.5 * abs(this.maxY - this.minY));
    }
  }

  this.drawPoints = function() {
    for (var i = 1; i < this.PlotArray.length; i++) {
      //print(i);
      xi = m_size_x * i / this.PlotArray.length;
      xi_previous = m_size_x * (i - 1) / this.PlotArray.length;
      //print(xi);
      strokeWeight(2);
      //stroke(0);
      stroke(this.colorFunction);
      //    point(m_x+xi,m_y+m_size_y-this.PlotArray[i]);
      line(m_x + xi, m_y + m_size_y / 2 - this.PlotArray[i], m_x + xi_previous, m_y + m_size_y / 2 - this.PlotArray[i - 1]);
      stroke(0);
    }
  }

  /*  
  this.drawPoints = function () {
   this.minY = min(this.Array);
   this.maxY = increaseMarginFactor*max(this.Array);
    
   for(var xi = 0; xi < this.m_size_x ; xi++ ) {
     pos = this.Array.length*xi/m_size_x;
     
        x1 = oxi + m_x;
        y1 = oyi + m_y + m_size_y;
        x2 = xi + m_x;
        y2 = yi + m_y + m_size_y; 
   }
    
  }
*/

}