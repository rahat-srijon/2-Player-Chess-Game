let grid=[];
let started=0;
function setup() {
	createCanvas(windowWidth,windowHeight);
	textAlign(CENTER,CENTER);
	document.body.style.overflow='hidden';
}
var scale;
var startX;
var startY;
var clickedX;
var clickedY;
var click;
var sz;
var cursor;
function getPosition(){
	let [x,y]=[mouseX,mouseY];
	if(x>=startX&&x<=startX+sz*8 && y>=startY&&y<=startY+sz*8){
		x-=startX;
		y-=startY;
		x=Math.floor(x/scale);
		y=Math.floor(y/scale);
		return [y,x];
	}
	return null;
}
function draw() {
	background(40);
	if(started==0){
		initBoard();
		started=1;
	}
	board();
}
function mouseClicked(){
	const p=getPosition();
	if(click){
		const moveList=grid[clickedX][clickedY].getValidMoves();
		for(let i=0;i<moveList.length;i++){
			if(moveList[i][0]===p[0]&&moveList[i][1]===p[1]){
				console.log(clickedX,clickedY,p);
				grid[clickedX][clickedY].clicked=0;
				grid[clickedX][clickedY].move(p);
				click=0;
				return;
			}
		}
	}
	moveList=null;
	if(p===null)return;
	const [i,j]=p;
	if(grid[i][j]!=null){
		if(!grid[i][j].clicked){
			for(let i=0;i<8;i++){
				for(let j=0;j<8;j++){
					if(grid[i][j]!=null){
						grid[i][j].clicked=0;
					}
				}
			}
		}
		grid[i][j].clicked=1;
		clickedX=i;
		clickedY=j;
		click=1;
	}
	else{
		for(let i=0;i<8;i++){
			for(let j=0;j<8;j++){
				if(grid[i][j]!=null){
					grid[i][j].clicked=0;
				}
			}
		}
		click=0;
	}
}
