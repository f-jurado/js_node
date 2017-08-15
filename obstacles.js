var canvas = $("#canvas").get(0);
var ROW_INTERVAL = 540;
console.log(canvas.width);
var NUM_ROWS = Math.floor((canvas.width + 100)/ROW_INTERVAL);
var x = 0;

var OBST_CHANCE = 0.03;  // probability of an obstacle spawning
var MIN_OB_SIZE = 40;  // min size for a single obstacle
var MAX_OB_SIZE = 250;  // max size for a single obstacle
var BUFF_AFTER_OB = 80; // space after each obstacle

var POW_CHANCE = 0.01; // probability of an obstacle spawning
var POW_SIZE = 50; // space allocated for a power up

var INCRMENT = 5; // size of each chunk

var pos = new Array() // Keep track of the positions of the rows
for (var i=0; i < NUM_ROWS; i++) pos.push(canvas.width + 200 + i*ROW_INTERVAL);
var obstacles = new Array(); // keep track of all obstacles
for (var i=0; i < NUM_ROWS; i++) obstacles.push(new Array());
//for (var i=0; i < NUM_ROWS; i++) generateRow(i);
var pow_ups = new Array(); // keep track of all powerups
for (var i=0; i < NUM_ROWS; i++) pow_ups.push(new Array());


// Obstacle Class
function Obs(x, y, height, width){
	this.topleft = new XY(x, y);
  this.bottomright = new XY(x+width, y+height);
  this.size = height;
  this.width = width;
}

// Randomizes obstacles on row n
function generateRow(n) {
  var rng;
  var set;
  var i = 0;
  
  while(i < canvas.height) {
    rng = Math.random();
    if (rng < OBST_CHANCE) { // spawn an obstacle
      // Create object
      // TO-DO
      var object;
      var start = i;
      var size = MIN_OB_SIZE;
      
      i += size;
      
      // use a diminishing probability algorithm to decide the size of the obstacle
      set = false;
      while (!set) {
        rng = Math.random();
        if (rng > (1 - size/MAX_OB_SIZE)) { 
          set = true;
          if (size < 75) {
            object = new Obs(pos[n], start, size, 50);
          } else {
            object = new Obs(pos[n], start, size, 100);
          }
          
        }
        else {
          size += INCRMENT*3;
          i += INCRMENT*3;
        }
      }
      obstacles[n].push(object);
      collision.push(new Boundaries(object.topleft, object.bottomright));
      i += BUFF_AFTER_OB; // keep some space after an obstacle open
    }
    // Power UP CODE
    /*else if (rng < OBST_CHANCE + POW_CHANCE) { //spawn a power up
      var pow_up = new Array(2);
      pow_up['start'] = i;
      pow_up['type'] = randomPowerUp();

      pow_ups.push(pow_up);
      i += POW_SIZE;
    }*/
    i += INCRMENT;
  }
}

function lop() {
  // draw road
  ctx.drawImage(road, x, 0);
  
  // draw obstacles
  for (n in obstacles) {
    for (i in obstacles[n]) {
      drawObject(obsImg, obstacles[n][i], n);
    }
  }
  
  // draw power ups
  /*for (i in pow_ups) {
    if (pow_ups[i]['type'] === "boost") {
      ctx.drawImage(powImg, 0,  pow_ups[i]['start'], 50, 50);
    } else if (pow_ups[i]['type'] === "rocket") {
      ctx.drawImage(missImg, 0,  pow_ups[i]['start'], 50, 50);
    }
  }*/
  
  x -= 12;
  if (x < -1*ROW_INTERVAL) x = 0;
  
  for (i in pos) {
    pos[i] -= 12;
    if (pos[i] < -200) {
      pos[i] = canvas.width;
      obstacles[i].splice(0, obstacles[i].length); // empty the obstacles row
      //pow_ups[j].splice(0, pow_ups.length); // empty the powerup row
      generateRow(i);
    }
    for (i in obstacles[n]) {
      obstacles[n][i].topleft.x = pos[i];
      obstacles[n][i].bottomright.x = pos[i]+obstacles[n][i].height;
    }
  }
}
        

function drawObject(img, object, n) {
  ctx.drawImage(img, pos[n], object.topleft.y, object.width, object.size);
}
      
        
function randomPowerUp() {
  rng = Math.random();
  if  (rng < 0.5) return 'rocket';
  else return 'boost';
}

