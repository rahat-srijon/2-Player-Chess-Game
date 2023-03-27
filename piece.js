class Piece{
	clicked=0;
	constructor(color,position){
		this.color=color;
		this.position=position;
	}
	getValidMoves(){}
	isMoveLegal(){}
	move(position){}
	draw(){}
}
var f=0;
class Pawn extends Piece{
	constructor(color,position){
		super(color,position);
	}
	isMoveLegal(position){
		const [nx,ny]=position;
		const [x,y]=this.position;
		const dx=nx-x;
		const dy=ny-y;
		const dr=this.color==='white'?-1:1;
		if(dx==dr&&!dy&&grid[nx][ny]===null)return 1;
		if(dx===2*dr&&!dy){
			if(this.color==='white'&&x===6&&grid[nx][ny]===null&&grid[x+dr][y]===null)return 1;
			if(this.color==='black'&&x===1&&grid[nx][ny]===null&&grid[x+dr][y]===null)return 1;
		}
		console.log(nx,ny,grid[nx][ny]);
		if(dy===dr&&Math.abs(dx)===1&&grid[nx][ny]!==null&&grid[nx][ny].color!==this.color){
			return 2;
		}
		return 0;
	}
	getValidMoves(){
		for(let i=0;i<8;i++){
			for(let j=0;j<8;j++){
				let can=this.isMoveLegal([i,j]);
				strokeWeight(0);
				if(can===1){
					fill(186,202,68,120);
					circle(startX+scale*j+scale*0.50,startY+scale*i+scale*0.5,scale*0.50);
				}
				else if(can===2){
					fill(202,68,186,120);
					circle(startX+scale*j+scale*0.50,startY+scale*i+scale*0.5,scale*0.50);
				}
				strokeWeight(scale/20);
			}
		}
		f=1;
	}
	markValidMoves(){
	}
	move(position){}
	draw(x,y){
		if(this.color=='black')fill(255,100,100);
		else if(this.color=='white')fill(100,100,255);
		triangle(
			x+scale*0.50,y+scale*0.20,
			x+scale*0.75,y+scale*0.75,
			x+scale*0.25,y+scale*.75
			);
		circle(x+scale*0.50,y+scale*0.50-scale*0.2,scale/3);
		rect(
			x+scale*0.10,y+scale*0.7,
			scale*0.8,scale*0.20,
			1000,1000,1000,1000
			);
	}
}
class Rook extends Piece{
	constructor(color,position){
		super(color,position);
	}
	getValidMoves(){}
	isMoveLegal(){}
	move(position){}
	draw(x,y){
		if(this.color=='black')fill(255,100,100);
		else if(this.color=='white')fill(100,100,255);
		triangle(
			x+scale*0.50,y+scale*0.25,
			x+scale*0.75,y+scale*0.75,
			x+scale*0.25,y+scale*0.75
			);
		rect(
			x+scale*0.20,y+scale*0.20,
			scale*0.15,scale*0.20,
			0,0,scale*0.10,scale*0.10
			);
		rect(
			x+scale*0.425,y+scale*0.20,
			scale*0.15,scale*0.20,
			0,0,scale*0.10,scale*0.10
			);
		rect(
			x+scale*0.65,y+scale*0.20,
			scale*0.15,scale*0.20,
			0,0,scale*0.10,scale*0.10
			);
		rect(
			x+scale*0.20,y+scale*0.30,
			scale*0.6,scale*0.20,
			0,0,scale*0.10,scale*0.10
			);
		rect(
			x+scale*0.10,y+scale*0.7,
			scale*0.8,scale*0.20,
			100,100,100,100
			);
	}
}
class Knight extends Piece{
	constructor(color,position){
		super(color,position);
	}
	getValidMoves(){}
	isMoveLegal(){}
	move(position){}
	draw(x,y){
		circle(x+scale*0.50,y+scale*0.6,scale*0.40);
		triangle(
			x+scale*0.75, y+scale*0.7,
			x+scale*0.40, y+scale*0.7,
			x+scale*0.40, y+scale*0.3
			);
		triangle(
			x+scale*0.25, y+scale*0.35,
			x+scale*0.50, y+scale*0.35,
			x+scale*0.50, y+scale*0.15
			);
		triangle(
			x+scale*0.65, y+scale*0.45,
			x+scale*0.50, y+scale*0.60,
			x+scale*0.45, y+scale*0.15
			);
		rect(
			x+scale*0.10,y+scale*0.7,
			scale*0.8,scale*0.20,
			100,100,100,100
			);
	}
}
class Bishop extends Piece{
	constructor(color,position){
		super(color,position);
	}
	getValidMoves(){}
	isMoveLegal(){}
	move(position){}
	draw(x,y){
		if(this.color=='black')fill(255,100,100);
		else if(this.color=='white')fill(100,100,255);
		triangle(
			x+scale*0.50,y+scale*0.20,
			x+scale*0.75,y+scale*0.75,
			x+scale*0.25,y+scale*0.75
			);
		circle(x+scale*0.50,y+scale*0.3,scale/3);
		triangle(
			x+scale*0.35,y+scale*0.25,
			x+scale*0.55,y+scale*0.35,
			x+scale*0.35,y+scale*0.25
			);
		rect(
			x+scale*0.25,y+scale*0.4,
			scale*0.5,scale*0.10,
			100,100,100,100
			);
		circle(x+scale*0.50,y+scale*0.15,scale/6);
		rect(
			x+scale*0.10,y+scale*0.70,
			scale*0.8,scale*0.20,
			100,100,100,100
			);
	}

}
class Queen extends Piece{
	constructor(color,position){
		super(color,position);
	}
	getValidMoves(){}
	isMoveLegal(){}
	move(position){}
	draw(x,y){
		if(this.color=='black')fill(255,100,100);
		else if(this.color=='white')fill(100,100,255);
		triangle(
			x+scale*0.50,y+scale*0.20,
			x+scale*0.75,y+scale*0.75,
			x+scale*0.25,y+scale*0.75
			);
		circle(x+scale*0.60,y+scale*0.3,scale*.30);
		circle(x+scale*0.40,y+scale*0.3,scale*.30);
		rect(
			x+scale*0.40,y+scale*0.20,
			scale*0.2,scale*0.20
			);
		rect(
			x+scale*0.25,y+scale*0.4,
			scale*0.5,scale*0.10,
			100,100,100,100
			);
		circle(x+scale*0.50,y+scale*0.15,scale/6);
		circle(x+scale*0.25,y+scale*0.25,scale/8);
		circle(x+scale*0.75,y+scale*0.25,scale/8);
		rect(
			x+scale*0.10,y+scale*0.70,
			scale*0.8,scale*0.20,
			100,100,100,100
			);
	}
}
class King extends Piece{
	constructor(color,position){
		super(color,position);
	}
	getValidMoves(){}
	isMoveLegal(){}
	move(position){}
	draw(x,y){
		if(this.color=='black')fill(255,100,100);
		else if(this.color=='white')fill(100,100,255);
		triangle(
			x+scale*0.50,y+scale*0.20,
			x+scale*0.75,y+scale*0.75,
			x+scale*0.25,y+scale*0.75
			);
		triangle(
			x+scale*0.70,y+scale*0.50,
			x+scale*0.75,y+scale*0.25,
			x+scale*0.35,y+scale*0.40
			);
		triangle(
			x+scale*0.30,y+scale*0.50,
			x+scale*0.25,y+scale*0.25,
			x+scale*0.65,y+scale*0.40
			);
		rect(
			x+scale*0.35,y+scale*0.20,
			scale*0.3,scale*0.10
			);
		rect(
			x+scale*0.45,y+scale*0.10,
			scale*0.10,scale*0.30
			);
		rect(
			x+scale*0.25,y+scale*0.4,
			scale*0.5,scale*0.10,
			100,100,100,100
			);
		rect(
			x+scale*0.10,y+scale*0.70,
			scale*0.8,scale*0.20,
			100,100,100,100
			);
	}
}