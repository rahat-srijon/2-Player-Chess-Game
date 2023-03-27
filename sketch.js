let grid=[];
let started=0;
function setup() {
  createCanvas(windowWidth,windowHeight);
  textAlign(CENTER,CENTER);
  document.body.style.overflow='hidden';
}
var scale;
function draw() {
  background(40);
  if(started==0){
    initBoard();
    started=1;
  }
  board();
}
