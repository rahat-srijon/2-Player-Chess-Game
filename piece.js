function isKingInCheck(color){
	var pos=null;
	for(let i=0;i<8;i++){
		for(let j=0;j<8;j++){
			const king=grid[i][j];
			if(king!=null&&king instanceof King&&king.color==color){
				pos=king.position;
				break;
			}
		}
		if(pos!=null)break;
	}
	const enemy=color=='white'?'black':'white';
	for(let i=0;i<8;i++){
		for(let j=0;j<8;j++){
			const cur=grid[i][j];
			if(cur!=null&&cur.color==enemy){
				if(cur.isMoveLegal(pos)){
					return 1;
				}
			}
		}
	}
	return 0;
}
function ifMove(old_position,new_position){
	const [ox,oy]=old_position;
	const [nx,ny]=new_position;
	if(grid[nx][ny]!=null)grid[nx][ny].move([0,8]);
	grid[ox][oy].move([nx,ny]);
	let can=isKingInCheck(grid[nx][ny].color);
	grid[nx][ny].move([ox,oy]);
	if(grid[0][8]!=null)grid[0][8].move([nx,ny]);
	return can;
}
class Piece{
	clicked=0;
	moves=[];
	continuous=0;
	constructor(color,position){
		this.color=color;
		this.position=position;
	}
	isMoveLegal(position){
		const [x,y]=this.position;
		const [tx,ty]=position;
		for(let j=0;j<this.moves.length;j++){
			var cx=x+this.moves[j][0];
			var cy=y+this.moves[j][1];
			if(this.continuous){
				while(cx>=0&&cy>=0&&cx<8&&cy<8){
					if(cx==tx&&cy==ty){
						if(grid[tx][ty]===null)return 1;
						else if(grid[tx][ty].color!=this.color)return 2;
					}
					if(grid[cx][cy]!==null)break;
					cx+=this.moves[j][0];
					cy+=this.moves[j][1];
				}
			}
			else{
				if(cx>=0&&cy>=0&&cx<8&&cy<8){
					if(cx==tx&&cy==ty){
						if(grid[tx][ty]===null)return 1;
						else if(grid[tx][ty].color!=this.color)return 2;
					}
				}
			}
		}
		return 0;
	}
	getValidMoves(){
		const [x,y]=this.position;
		var moveList=[];
		for(let j=0;j<this.moves.length;j++){
			var cx=x+this.moves[j][0];
			var cy=y+this.moves[j][1];
			if(this.continuous){
				while(cx>=0&&cy>=0&&cx<8&&cy<8){
					let can=this.isMoveLegal([cx,cy]);
					if(can)can=!ifMove([x,y],[cx,cy])?can:0;
					if(can)moveList.push([cx,cy,can]);
					if(can!=1)break;
					cx+=this.moves[j][0];
					cy+=this.moves[j][1];
				}
			}
			else{
				if(cx>=0&&cy>=0&&cx<8&&cy<8){
					let can=this.isMoveLegal([cx,cy]);
					if(can)can=!ifMove([x,y],[cx,cy])?can:0;
					if(can)moveList.push([cx,cy,can]);
				}
			}
		}
		return moveList;
	}
	move(position){
		const [px,py]=this.position;
		const [nx,ny]=position;
		grid[nx][ny]=grid[px][py];
		grid[nx][ny].position=position;
		grid[px][py]=null;
	}
	draw(){}
}
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
		if(dx===dr&&!dy&&grid[nx][ny]===null)return 1;
		if(dx===2*dr&&!dy){
			if(this.color==='white'&&x===6&&grid[nx][ny]===null&&grid[x+dr][y]===null)return 1;
			if(this.color==='black'&&x===1&&grid[nx][ny]===null&&grid[x+dr][y]===null)return 1;
		}
		if(dx===dr&&Math.abs(dy)===1&&grid[nx][ny]!==null&&grid[nx][ny].color!==this.color){
			return 2;
		}
		return 0;
	}
	getValidMoves(){
		const [x,y]=this.position;
		var moveList=[];
		for(let i=max(0,x-2);i<=min(x+2,7);i++){
			for(let j=max(0,y-1);j<=min(y+1,7);j++){
				let can=this.isMoveLegal([i,j]);
				markCell(i,j,can);
				if(can!=0){
					moveList.push([i,j]);
				}
			}
		}
		return moveList;
	}
	draw(x,y){
		if(this.color=='black')fill(255,100,100);
		else fill(100,100,255);
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
	moves=[
		[0,1],
		[0,-1],
		[1,0],
		[-1,0]
	];
	continuous=1;
	draw(x,y){
		if(this.color=='black')fill(255,100,100);
		else fill(100,100,255);
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
	moves=[
		[2,1],
		[2,-1],
		[1,2],
		[-1,2],
		[-2,1],
		[-2,-1],
		[1,-2],
		[-1,-2]
	];
	continuous=0;
	draw(x,y){
		if(this.color=='black')fill(255,100,100);
		else fill(100,100,255);
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
	moves=[
		[1,1],
		[-1,-1],
		[1,-1],
		[-1,1],
	];
	continuous=1;
	draw(x,y){
		if(this.color=='black')fill(255,100,100);
		else fill(100,100,255);
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
	moves=[
		[1,1],
		[-1,-1],
		[1,-1],
		[-1,1],
		[0,1],
		[0,-1],
		[1,0],
		[-1,0]
	];
	continuous=1;
	draw(x,y){
		if(this.color=='black')fill(255,100,100);
		else fill(100,100,255);
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
	moves=[
		[1,1],
		[-1,-1],
		[1,-1],
		[-1,1],
		[0,1],
		[0,-1],
		[1,0],
		[-1,0]
	];
	continuous=0;
	draw(x,y){
		if(this.color=='black')fill(255,100,100);
		else fill(100,100,255);
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