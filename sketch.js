// Video about this little "universe"
// https://www.youtube.com/watch?v=EpgB3cNhKPM

let planets = [];
let stars   = [];
let moons   = [];

let globalScale = 1;

function setup() {
  createCanvas(600, 600);
  
  stars.push( new Body(0, 0, 250, "sun") );
  stars[stars.length-1].surface = [255, 235, 0];
  
  planets.push( new Body(-50, 0, 12, "mercury") );
  planets[planets.length-1].surface = [200, 135, 32];
  planets[planets.length-1].acc = createVector(0, -1);
  
  planets.push( new Body(-95, 0, 20, "venus") );
  planets[planets.length-1].surface = [200, 155, 63];
  planets[planets.length-1].acc = createVector(0, -1.5);
  
  planets.push( new Body(-135, 0, 50, "earth") );
  planets[planets.length-1].refMoon = "moon";
  planets[planets.length-1].surface = [32, 200, 100];
  planets[planets.length-1].acc = createVector(0, -2);

  moons.push( new Body(-135, -15, 10, "moon") );
  moons[moons.length-1].surface = [163, 163, 163];
  moons[moons.length-1].acc = createVector(1.5, -1);
  
  planets.push( new Body(-175, 0, 50, "mars") );
  planets[planets.length-1].refMoon = "phobos";
  planets[planets.length-1].surface = [225, 63, 0];
  planets[planets.length-1].acc = createVector(0, -3.5);

  moons.push(new Body(-175,-15,10,"phobos"));
  moons[moons.length-1].surface = [200, 200, 200];
  moons[moons.length-1].acc = createVector(1.5, -1);
  
  planets.push( new Body(-250,0,100,"jupiter") );
  planets[planets.length-1].surface = [200, 175, 63];
  planets[planets.length-1].acc = createVector(0, -4.5);
  
  planets.push( new Body(-300,0,90,"saturn") );
  planets[planets.length-1].surface = [170, 123, 52];
  planets[planets.length-1].acc = createVector(0, -5);
  
  planets.push( new Body(-350,0,30,"uranus") );
  planets[planets.length-1].surface = [12, 142, 200];
  planets[planets.length-1].acc = createVector(0, -6);
  
  planets.push( new Body(-400,0,25,"neptune") );
  planets[planets.length-1].surface = [32, 153, 215];
  planets[planets.length-1].acc = createVector(0, -7);
  
  planets.push( new Body(-450,0,5,"pluto") );
  planets[planets.length-1].surface = [120, 105, 96];
  planets[planets.length-1].acc = createVector(0, -8);
}

function mouseWheel(event) {
  background(10);
  let newScale = globalScale - event.delta/550;
  if (newScale > 0) {
  globalScale = lerp(globalScale, newScale, 0.5);
  }
}

function draw() {
  scale(globalScale);
  translate(
    width/(2*globalScale), 
    height/(2*globalScale)
  );
  background(20, 12);
  
  for (let star of stars) {
    star.show();
    
    for (let planet of planets) {
      star.attract(planet);
    }
  }
  
  for (let moon of moons) {
    moon.update();
    moon.show();
  }
  
  for (let planet of planets) {
    for (let moon of moons) {
      if (planet.refMoon == moon.name) {
        planet.attract(moon, 0.25);  
      }
    }
    
    planet.update();
    planet.show();
  }
}