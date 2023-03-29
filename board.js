function initBoard(){
	grid=[
	  [
		new Rook('black',[0,0]),
		new Knight('black',[0,1]),
		new Bishop('black',[0,2]),
		new King('black',[0,3]),
		new Queen('black',[0,4]),
		new Bishop('black',[0,5]),
		new Knight('black',[0,6]),
		new Rook('black',[0,7]),
	  ],
	  [
		new Pawn('black',[1,0]),
		new Pawn('black',[1,1]),
		new Pawn('black',[1,2]),
		new Pawn('black',[1,3]),
		new Pawn('black',[1,4]),
		new Pawn('black',[1,5]),
		new Pawn('black',[1,6]),
		new Pawn('black',[1,7]),
	  ],
	  [null,null,null,null,null,null,null,null],
	  [null,null,null,null,null,null,null,null],
	  [null,null,null,null,null,null,null,null],
	  [null,null,null,null,null,null,null,null],
	  [
		new Pawn('white',[6,0]),
		new Pawn('white',[6,1]),
		new Pawn('white',[6,2]),
		new Pawn('white',[6,3]),
		new Pawn('white',[6,4]),
		new Pawn('white',[6,5]),
		new Pawn('white',[6,6]),
		new Pawn('white',[6,7]),
	  ],
	  [
		new Rook('white',[7,0]),
		new Knight('white',[7,1]),
		new Bishop('white',[7,2]),
		new Queen('white',[7,3]),
		new King('white',[7,4]),
		new Bishop('white',[7,5]),
		new Knight('white',[7,6]),
		new Rook('white',[7,7]),
	  ],
	];
}
function markCell(i,j,c){
	if(c==0)return;
	strokeWeight(0);
	fill(0,0,0,100);
	if(c===1){
		circle(startX+scale*j+scale*0.50,startY+scale*i+scale*0.5,scale*0.50);
	}
	else if(c===2){
		circle(startX+scale*j+scale*0.50,startY+scale*i+scale*0.5,scale*0.75);
	}
	strokeWeight(scale/20);
}
function markCells(cellList){
	for(let i=0;i<cellList.length;i++){
		const [x,y,c]=cellList[i];
		markCell(x,y,c);
	}
}
function board(){
	sz=min(windowWidth,windowHeight);
	scale=sz/8;
	startX=max(0,windowWidth/2-sz/2);
	startY=max(0,windowHeight/2-sz/2);
	strokeWeight(0);
	for(let i=0;i<8;i++){
		for(let j=0;j<8;j++){
			let color=i%2==j%2;
			if(color)fill(118,150,86);
			else fill(238,238,210);
			rect(startX+i*scale,startY+j*scale,scale,scale);
		}
	}
	strokeWeight(scale/20);
	for(let i=0;i<8;i++){
		for(let j=0;j<8;j++){
			if(grid[i][j]!=null){
				grid[i][j].draw(startX+j*scale,startY+i*scale);
			}
		}
	}
	if(click){
		markCells(grid[clickedX][clickedY].getValidMoves());
	}
}