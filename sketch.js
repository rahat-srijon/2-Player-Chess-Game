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
var turn;
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
	isGameOver();
}
function mouseClicked(){
	const p=getPosition();
	if(click){
		const moveList=grid[clickedX][clickedY].getValidMoves();
		for(let i=0;i<moveList.length;i++){
			if(moveList[i][0]===p[0]&&moveList[i][1]===p[1]){
				grid[clickedX][clickedY].clicked=0;
				grid[clickedX][clickedY].move(p);
				turn=!turn;
				click=0;
				return;
			}
		}
	}
	if(p===null)return;
	const [i,j]=p;
	if(grid[i][j]!=null&&((turn&&grid[i][j].color!='white')||(!turn&&grid[i][j].color=='white'))){
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
function isCheckMate(turn){
	const king=turn?'black':'white';
	if(!isKingInCheck(king))return 0;
	for(let i=0;i<8;i++){
		for(let j=0;j<8;j++){
			if(grid[i][j]==null)continue;
			if(grid[i][j].color!=king)continue;
			if(grid[i][j].getValidMoves().length)return 0;
		}
	}
	return 1;
}
function isStaleMate(turn){
	const king=turn?'black':'white';
	if(isKingInCheck(king))return 0;
	for(let i=0;i<8;i++){
		for(let j=0;j<8;j++){
			if(grid[i][j]==null)continue;
			if(grid[i][j].color!=king)continue;
			if(grid[i][j].getValidMoves().length)return 0;
		}
	}
	return 1;
}
function endScreen(winner){
	if(winner==-1)background(0,100,0,50);
	else if(!winner)background(255,0,0,50);
	else background(0,0,255,50);
	rect(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
	textSize(width/4);
	fill(255, 255, 255);
	text('CHECKMATE',windowWidth/2,windowHeight/2);
}
function isGameOver(){
	if(isCheckMate(turn)){
		endScreen(turn);
		return 1;
	}
	else if(isStaleMate(turn)){
		endScreen(-1);
		return 1;
	}
	return 0;
}