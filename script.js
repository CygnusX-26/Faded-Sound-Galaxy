let fft

let Particle = function(position) {
  this.position = position
  this.startPos = position.copy()
  this.speed = createVector(random(-1, 1), 1)
  this.color = [255*((this.position.x)/windowWidth), random(0, 255), 255*((this.position.x)/windowWidth)]
  

  this.draw = function() {
    circle(this.position.x, this.position.y, this.diameter)
    fill(this.color)
  }

  this.update = function(energy){
    if (energy > 0.55 && this.color[0] > 50){
      this.diameter = 5 * energy * 27
    }
    else{
      this.diameter = 5 * energy * 20
    }
    
    this.position.y += this.speed.y * (this.diameter/20)
    this.position.x += this.speed.x * (this.diameter/20)
    if (this.position.y > height){
        this.position.y = 0
    }
    if (this.position.x > width){
        this.speed.x = -1 * this.speed.x
    }
    if (this.position.x <= 0){
        this.speed.x = -1 * this.speed.x
    }

  }
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()

  // let mic = new p5.AudioIn()
  // mic.start()

  sound.play()
  fft = new p5.FFT()
  fft.setInput(sound)

  positionParticles()
}

function draw() {
  background(0,0,0)
  let spectrum = fft.analyze()
  updateParticles(spectrum)
}
function preload()
{
  sound = loadSound('faded.mp3');
}