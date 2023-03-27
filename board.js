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
function board(){
	sz=min(windowWidth,windowHeight);
	scale=sz/8;
	startX=max(0,windowWidth/2-sz/2);
	startY=max(0,windowHeight/2-sz/2);
	strokeWeight(0);
	for(let i=0;i<8;i++){
		for(let j=0;j<8;j++){
			let color=i%2==j%2;
			if(color)fill(255,255,255);
			else fill(10,100,10);
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
}