class Body {
  constructor(x, y, m, name) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r   = sqrt(m) * 2;
    this.m   = m;
    
    this.surface = [random()*255, 
                   random()*255,
                   random()*255];
    
    this.name = name;
    this.hovered = false;
  }
  
  attract(body, Gforce) {
    let force = p5.Vector.sub(this.pos, body.pos);
    let distSq = constrain(force.magSq(),10,50);
    let G = Gforce || 0.01;
    let strength = G * (this.m * body.m)/distSq;
    force.setMag(strength);
    body.applyForce(force);
  }
  
  applyForce(force) {
    let f = p5.Vector.div(force, this.m);
    this.acc.add(f);
  }
  
  hover(mx, my) {
    let d = sqrt(
      (this.pos.x - mx) * (this.pos.x - mx) +
      (this.pos.y - my) * (this.pos.y - my)
    );
    
    if (d<this.r*4) {
      this.hovered = true;
    } else {
      this.hovered = false;
    }
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }
  
  show() {
    fill(
      this.surface[0], 
      this.surface[1],                     
      this.surface[2]
    );
    
    circle(this.pos.x, this.pos.y, this.r);
  
    if (this.hovered) {
      fill(255);
      text(this.name, this.pos.x, this.pos.y - this.r/2);
    }
  }
}