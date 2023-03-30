let grid=[];
let started=0;
function setup() {
	createCanvas(windowWidth,windowHeight);
	document.body.style.overflow='hidden';
	textFont(loadFont('assets/prstart.ttf'));
	textAlign(CENTER,CENTER);
}
var scale;
var startX;
var startY;
var clickedX;
var clickedY;
var click;
var sz;
var turn;
var restart=0;
var rsClick=0;
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
	if(turn)background(150,0,0);
	else background(0,0,150);
	if(started==0){
		initBoard();
		started=1;
		restart=0;
		rsClick=0;
	}
	else{
		if(restart&&rsClick){
			started=0;
		}
	}
	board();
	if(isGameOver()){
		restart=1;
		rsClick=0;
	}
}
function mouseClicked(){
	if(restart){
		rsClick=1;
		return;
	}
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
	else background(0,0,255,150);
	textSize(sz/9.5);
	fill(0, 0, 0, 150);
	strokeWeight(0);
	rect(startX,sz/2-scale,sz,2*scale);
	fill(255,255,255);
	if(winner!=-1){
		text('CHECKMATE',sz+scale/3,sz/2.3);
		textSize(sz/8.5);
		if(turn){
			fill(0, 0, 255,175);
			text('BLUE WON',sz+scale/3,sz/1.8);
		}
		else{
			fill(255, 0, 0,175);
			text('RED WON',sz+scale/3,sz/1.8);
		}
	}
	else{
		text('STALEMATE',sz+scale/3,sz/2.3);
		textSize(sz/8.5);
		fill(0, 255, 0,175);
		text('DRAW',sz+scale/3,sz/1.8);
	}
	textSize(sz/21);
	fill(255, 255, 255);
	text('CLICK TO START AGAIN',sz+scale/3,sz/2.3+scale*1.8);
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
