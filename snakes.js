
var ctrl = confirm("Control snake 1?");
var reflect = prompt("Number of reflections?", "1");
reflect = reflect === null? 1 : parseInt(reflect);
var spawn = confirm("Spawn snakes?");

var pi = Math.PI;
var phi=0.381966
var rotTick = pi/36;

var canvas = document.createElement("canvas");
var ww,wh,gfx = canvas.getContext("2d"),tick=0,elapsed=0;
ww = canvas.width  = window.innerWidth;
wh = canvas.height = window.innerHeight;

function rFloat(x){return Math.random()*x;}
function rInt(x){return Math.floor(Math.random()*x);}
Number.prototype.mod = function(n){return((this%n)+n)%n;};


function text(string,y,size,spacing){
	gfx.textBaseline = "alphabetic";
	gfx.font = "800 "+size*1.37+"px helvetica";
	var x = (ww-(gfx.measureText(string).width+(spacing*(string.length-1))))/2;
	for(var i=0;i<string.length;++i){
		gfx.fillText(string.charAt(i),x,y+size);
		x += gfx.measureText(string.charAt(i)).width+spacing;
	}
}
//==  MISC RENDERING  ========================================================//

function rgb(r,g,b){return gfx.fillStyle=gfx.strokeStyle="rgb("+Math.floor(255*r)+","+Math.floor(255*g)+","+Math.floor(255*b)+")";};
function rgba(r,g,b,a){return gfx.fillStyle=gfx.strokeStyle="rgba("+Math.floor(255*r)+","+Math.floor(255*g)+","+Math.floor(255*b)+","+a+")";};
var offset = rInt(5000) + 2;
function hue(h){
	h = (offset + h)*phi+.3;
	var r,g,b,i=Math.floor(h*6),q=1-(h*6-i),t=1-q;
	switch(i.mod(6)){
		case 0:r=1,g=t,b=0;break;
		case 1:r=q,g=1,b=0;break;
		case 2:r=0,g=1,b=t;break;
		case 3:r=0,g=q,b=1;break;
		case 4:r=t,g=0,b=1;break;
		case 5:r=1,g=0,b=q;break;
	}return gfx.fillStyle=gfx.strokeStyle="rgb("+Math.floor(255*(1-r))+","+Math.floor(255*(1-g))+","+Math.floor(255*(1-b))+")";
}

//============================================================================//
function line(x1,y1, x2,y2)
{
	this.x1 = x1;
	this.y1 = y1;
	this.y2 = y2;
	this.x2 = x2;
}

function polygon()
{
	var lineList
	function addPoint()
	{
		
	}
	function drawPolygon()
	{
		gfx.moveTo(this.lineList[0].x1, this.lineList[0].y1);
		gfx.beginPath();
		for(line of this.lineList)
			gfx.lineTo(line.x2, line.y2);
		
		gfx.fill();
	}
}

var ctlX  = 0,ctlY  = 0;
var plyX  = 0,plyY  = 0;
var plyGX = 0,plyGY = 0;
var camX  = 0,camY  = 0;
var camRot = 0;
var aimX  = 0,aimY  = 0;
var aimGX = 0,aimGY = 0;
var aimDX = 0,aimDY = 0;

//==  MAIN LOOP  =============================================================//
var Snake = function snake(){	
	"use strict"
	this.ctlRot = 0;
	this.ctlFor = 0;
	
	this.list = [];
	var x = 0;
	var y = 0;
	var rot = rFloat(pi);
	for(var i = 0; i < 50; i++)
		this.list.push({x,y, rot});
	
}

var snakeList = [];
snakeList.push(new Snake());

var plNum = 0;
randomizeMove = function(snake){	
	snake.ctlFor = 1;
	if(rInt(5) !== 0) return;
	switch(rInt(3)){
		case(0): snake.ctlRot = 0; break;
		case(1): snake.ctlRot = -1; break;
		case(2): snake.ctlRot = 1; break;
	}
		
}

var t = 0;
var FPS = 0;
var interval = 1000/30;
function render(){
	requestAnimationFrame(render);
	var currentTick = window.performance.now();
	elapsed = currentTick-tick;
	FPS = 1000/elapsed;
	if(elapsed < interval) return;
	t++;
	if(spawn && t === 300){
		t = 0;
		snakeList.push(new Snake());
	}
	tick = currentTick;// - (elapsed % interval);
	rgba(0.1,0.1,0.2,0.01);
	gfx.fillRect(0,0,ww,wh);
	gfx.save();
	gfx.translate(ww/2+.1,wh/2+.1);
	

	//plyGX += ctlX*elapsed*0.1;
	//plyGY += ctlY*elapsed*0.1;
	//plyX += (plyGX-plyX)*elapsed*0.01;
	//plyY += (plyGY-plyY)*elapsed*0.01;
	var ply = snakeList[plNum].list[0];
	//camX += (ply.x-camX)*elapsed*0.001;
	//camY += (ply.y-camY)*elapsed*0.001;
	//camRot += (ply.rot - camRot)*elapsed*0.001;
	//aimX += (aimGX-ww/2+camX-aimX)*elapsed*0.01;
	//aimY += (aimGY-wh/2+camY-aimY)*elapsed*0.01;
	//aimDX = aimX-plyX;aimDY = aimY-plyY;
	//var aimNorm = 20/Math.sqrt(aimDX*aimDX+aimDY*aimDY);
	//aimDX *= aimNorm;aimDY *= aimNorm;

	//gfx.rotate(-camRot - pi/2);
	//gfx.translate(-camX,-camY);
    //==========================GRID=============================//
	/*
	rgb(0.1,0.1,0.1);
	gfx.beginPath();
	for(var i=Math.floor(camX/10)*10-distFromEdge;i<=Math.floor(camX/10)*10+distFromEdge;i+=10){
		gfx.moveTo(i,camY-distFromEdge);gfx.lineTo(i,camY+distFromEdge);
	}for(var i=Math.floor(camY/10)*10-distFromEdge;i<=Math.floor(camY/10)*10+distFromEdge;i+=10){
		gfx.moveTo(camX-distFromEdge,i);gfx.lineTo(camX+distFromEdge,i);
	}gfx.stroke();
	//*/
	
	for(var k = 0; k < snakeList.length; k++){
		var snake = snakeList[k];
		if((!ctrl) || k !== plNum)
			randomizeMove(snake);
			
		//Calculate movement and collision with the edge of the screen
		var head = snake.list[0];
		head.rot += snake.ctlRot*rotTick;
		if(snake.ctlFor === 1)
		{
			var nX = head.x + Math.cos(head.rot)*8;
			var nY = head.y + Math.sin(head.rot)*8;
			var recalc = 0;
			if(Math.abs(nX) > ww/2) {
				head.rot = pi - 2*(head.rot - pi) + head.rot;
				recalc = 1;
			}
			else if (Math.abs(nY) > wh/2) {
				head.rot = pi - 2*(head.rot - pi/2) + head.rot;
				recalc = 1;
			}
			if (recalc == 1){
				head.x +=  Math.cos(head.rot)*8;
				head.y += Math.sin(head.rot)*8;
			}
			else{
				head.x = nX;
				head.y = nY;
			}
		}
		
		for( var r = 0; r < reflect; r++){
		
			gfx.translate(camX,camY);
			gfx.rotate(pi/(reflect/2));//+.001));
			gfx.translate(-camX,-camY);
		
			gfx.beginPath();
			rgb(1,0,0);
			gfx.lineWidth = 2;
			gfx.moveTo(head.x,head.y);
			gfx.lineTo(head.x+Math.cos(head.rot)*15,head.y+Math.sin(head.rot)*15);
			gfx.stroke();
			
			gfx.beginPath();
			hue(k);
			gfx.arc(head.x,head.y,10,-Math.PI,Math.PI);
			gfx.fill();
				
			for(var i = snake.list.length -1; i > 0; i--){
				var body = snake.list[i];
				
				if(snake.ctlFor === 1 && r == 0){
					
					body.x = snake.list[i-1].x;
					body.y = snake.list[i-1].y;
					body.rot = snake.list[i-1].rot;
				}
				
				gfx.beginPath();
				//rgb(1 - i*.01, i*.01, 0);
				hue(k- i*.01);
				gfx.arc(body.x,body.y,10,-Math.PI,Math.PI);
				gfx.fill();
			}
			
		}
	}
	
	gfx.restore();
	//rgb(0,0,0);
	//gfx.fillRect(0,0,ww,15);
	//rgb(1,1,1);
	//text(String(FPS),0,10,1);
}

//==  CONTROLS HANDLING  =====================================================//

function getMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	return{x:evt.clientX-rect.left,y:evt.clientY-rect.top};
}

document.addEventListener("keydown",function(e){
	if(ctrl){
		var snake = snakeList[plNum];
		switch(e.keyCode){
			case 87:snake.ctlFor=1;break; // w
			//case 83:ctlY= 1;break; // s
			case 65:snake.ctlRot=-1;break; // a
			case 68:snake.ctlRot= 1;break; // d
		}
	}
});

document.addEventListener("keyup",function(e){
	if(ctrl){
		var snake = snakeList[plNum];
		switch(e.keyCode){
			case 87:snake.ctlFor--;break; // w
			//case 83:--ctlY;break; // s
			case 65:snake.ctlRot++;break; // a
			case 68:snake.ctlRot--;break; // d
		}
	snakeList[plNum]
	}
});

canvas.addEventListener("mousemove",function(e){
	var m=getMousePos(e);
	aimGX = m.x;
	aimGY = m.y;
});

var distFromEdge = 0;
window.onresize = function(){
	ww = canvas.width  = window.innerWidth;
	wh = canvas.height = window.innerHeight;
	rgb(0.1,0.1,0.2);
	gfx.fillRect(0,0,ww,wh);
	requestAnimationFrame(render);
	distFromEdge = Math.sqrt((ww/2 * ww/2) + (wh/2 * wh/2));
};canvas.oncontextmenu = function(){return false;};

//==  PROGRAM ENTRY  =========================================================//
	rgb(0.1,0.1,0.2);
	gfx.fillRect(0,0,ww,wh);
(function main(){document.body.appendChild(canvas);window.onresize();render();})();

