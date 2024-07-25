canvas       = document.getElementById("mycanvas");
context      = canvas.getContext("2d");

canvas = document.getElementById("mycanvas");
context = canvas.getContext("2d");


var cWidth = 1000;
var cHeight = 1400;
canvas.width = cWidth;
canvas.height = cHeight;

var sizeRatio=canvas.width/100;

var fps = 60, 
elapsed, 
mainCounter = 0;


game_running = true,
shipsMoving = false,
canPutItems=false,
canShoot=true,
show_vision = false;

var wave=1,
help=0;
if (localStorage.getItem("SpaceEscort13kbGame2") !== null)
	{	
	var strg=localStorage.getItem("SpaceEscort13kbGame2").split(" ");
	wave=parseInt(strg[0]);
	help=parseInt(strg[1]);
	}
	
if(help)
	{
	document.getElementById('helpb').style.boxShadow='0px 0px 5px 3px #044';
	}
else
	{
	document.getElementById('helpb').classList.add('blink_me2'); 
	document.getElementById('helpb').style.boxShadow='0px 0px 5px 3px #bf0';
	}


if(wave>1) 
	document.getElementById("bpTxt").innerHTML="Continue mission";

var mou=0,
AAtype=2,
AAsubtipo=2;


var CanvasSize;
function resize()
	{
	context.setTransform(1, 0, 0, 1, 0, 0);
	CanvasSize=document.getElementById("canvasDIV").clientWidth/cWidth;		
	context.scale(CanvasSize,CanvasSize);
	}

document.body.onresize = function(){resize();}


var TIS=0;
 AA = [], 
 SA = [], 
 SM = [], 
 Stars=[],
 SE=[];

var iniLife=100,
AAid=1,
SAid=1,
SMid=1,
Starsid=1,
ExplosionID=1,
iniR=20,
AiniXvel=1,
AiniYvel=0.5,
distance,
vision,
StarVel=0.7,

inipowerShoot=1.5,
inishootType=5,
iniCadence=20,
iniShootSpeed=10,
speedOffset=0;	


function tryagain()
	{
	speedOffset=0;
	document.getElementById('gameMSG').style.pointerEvents ="none";
	document.getElementById('gameMSG').style.opacity="0";
	setTimeout(function(){reset();play();},500);
	}
	
function nextWave()
	{
	canPutItems=true;
	document.getElementById('gameMSG').style.opacity="1";
	document.getElementById('gameMSG').style.pointerEvents ="none";
	document.getElementById('gameMSG').innerHTML="<font style='font-size:25px; color:cyan;'><br><br>Wave "+wave+"<br><br><br></font>";
	setTimeout("document.getElementById('gameMSG').style.opacity='0'; ",2000);
	}

function nextWave2()
	{
	document.getElementById('gameMSG').style.opacity='0';
	cost=0;
	tipos=wave%7;

	AA[0].l=500;
	setTimeout(function(){nextWave()},2000);
	}
	
	
	
	var zzfxV = 0.5;    
	var zzfx = null;

	let zzfxX, zzfxR;

	function play() {
			console.log("Play function called");

			if (typeof zzfx === 'undefined' || zzfx == null) {
					console.log("Initializing zzfx");
					zzfx = (p = 1, k = .05, b = 220, e = 0, r = 0, t = .1, q = 0, D = 1, u = 0, y = 0, v = 0, z = 0, l = 0, E = 0, A = 0, F = 0, c = 0, w = 1, m = 0, B = 0) => {
							let M = Math, R = 44100, d = 2 * M.PI, G = u *= 500 * d / R / R, C = b *= (1 - k + 2 * k * M.random(k = [])) * d / R, g = 0, H = 0, a = 0, n = 1, I = 0, J = 0, f = 0, x, h;
							e = R * e + 9; m *= R; r *= R; t *= R; c *= R; y *= 500 * d / R ** 3; A *= d / R; v *= d / R; z *= R; l = R * l | 0;
							for (h = e + m + r + t + c | 0; a < h; k[a++] = f) ++J % (100 * F | 0) || (f = q ? 1 < q ? 2 < q ? 3 < q ? M.sin((g % d) ** 3) : M.max(M.min(M.tan(g), 1), -1) : 1 - (2 * g / d % 2 + 2) % 2 : 1 - 4 * M.abs(M.round(g / d) - g / d) : M.sin(g), f = (l ? 1 - B + B * M.sin(d * a / l) : 1) * (0 < f ? 1 : -1) * M.abs(f) ** D * p * zzfxV * (a < e ? a / e : a < e + m ? 1 - (a - e) / m * (1 - w) : a < e + m + r ? w : a < h - c ? (h - a - c) / t * w : 0), f = c ? f / 2 + (c > a ? 0 : (a < h - c ? 1 : (h - a) / c) * k[a - c | 0] / 2) : f), x = (b += u += y) * M.cos(A * H++), g += x - x * E * (1 - 1E9 * (M.sin(a) + 1) % 2), n && ++n > z && (b += v, C += v, n = 0), !l || ++I % l || (b = C, u = G, n = n || 1);
							p = zzfxX.createBuffer(1, h, R); p.getChannelData(0).set(k); b = zzfxX.createBufferSource(); b.buffer = p; b.connect(zzfxX.destination); b.start(); return b
					};
					zzfxX = new (window.AudioContext || webkitAudioContext)();
			}	

			console.log("Calling reset");
			reset();
			
			StarVel = 0.1;
			console.log("Hiding and showing elements");
			document.getElementById('Gametitle').style.display = "none";
			document.getElementById('botonPlayInfo').style.display = "none";
			document.getElementById("mainMenu").style.display = "block";
			document.getElementById('botonPlay').style.display = "none";
			
			document.getElementById('shipMenuDIV').style.display = 'block';
			
			console.log("Placing ships");
			ponerNave(cWidth / 2, cHeight + 10, 1);
			canPutItems = true;
			ponerNave((cWidth / 2) + 150, cHeight - 400, -1);
			ponerNave((cWidth / 2) - 150, cHeight - 400, -1);
			canPutItems = false;
			
			document.getElementById('gameStartMSG').style.opacity = "0";
			document.getElementById("gameStartMSG").style.display = "block";
			setTimeout(function () { document.getElementById('gameStartMSG').style.opacity = "1"; }, 10);
			setTimeout(function () { document.getElementById('gameStartMSG').style.opacity = "0"; }, 6000);
			setTimeout(function () { document.getElementById('gameStartMSG').style.display = "none"; }, 9000);
			
			setTimeout(function () { nextWave2(); }, 8000);
			
			setTimeout(function () {
					document.getElementById("mainMenu").style.display = "none";
					canPutItems = true;
					mainCounter = 0;
					shipsMoving = true;
			}, 1000);
	}

	
function reset()
	{		
	mou=0;
	AAtype=2;
	AAsubtipo=2;
	selectShipmenu(document.getElementById('dflt'),1);
	cost=0;
	AA=[];
	SA=[];
	SM=[];
	SE=[];
	
	mainCounter=0;
	AAid=1;

	game_running=true;
	shipsMoving=true;
	canShoot=true;
	
	document.getElementById('botonPlay').style.display="block";
	document.getElementById('botonPlayInfo').style.display="block";
	document.getElementById("mainMenu").style.display="block";
	document.getElementById("gameStartMSG").style.display="none";
	
	vision=(sizeRatio*30)/2;

	context.fillStyle="#000000";
	context.fillRect(0, 0, CanvasSize, CanvasSize);	
	}
	

		
function selectShipmenu(a,b)
	{
	if(!b)zzfx(...[0.58,,293,,.09,.09,1,.14,-0.1,,,,.04,.4,,.4,.18,.59,.01,.24]);
	var mshp = document.getElementsByClassName("menuShips"); 
	for (var i=0; i < mshp.length ; ++i) 
		{
		mshp[i].style.borderColor='#445915';
		mshp[i].style.boxShadow="none";
		mshp[i].style.color="gray";
		}
	a.style.borderColor="#d3fc6f";
	a.style.boxShadow=" 0px 0px 10px 2px #d3fc6f";
	a.style.color="#c6d149";
	}
	
		
function newA(life,inilife,posx,posy,dx,dy,Xvel,Yvel,radio,distVis,tipo,subtipo,powerShoot,cadencia,lastShoot,shootSpeed,shootType,Yup)
	{    
	var coste=0;
	var lifeZ=life;
	var inilifeZ=inilife;
	var powerShootZ=inipowerShoot; 
	var cadenciaZ=iniCadence;
	var shootSpeedZ=iniShootSpeed;
	var shootTypeZ=inishootType;
			
	switch(subtipo)
		{
		case 1: coste=5; distVis=0; lifeZ=30; inilifeZ=30; break;
		case 2: coste=10; break;
		case 3: coste=20; break;
		case 4: coste=30; cadenciaZ=20; break;
		case 5: coste=40; distVis=vision*1.4; powerShootZ=15; cadenciaZ=60; shootSpeedZ=6; shootTypeZ=6; break; 	
		case 6: coste=50; lifeZ*=3.5; break;
		case 7: coste=60; lifeZ*=1.5; break;
		}
		
	if(tipo==1)
		{
		coste=0;
		}
		
	if(subtipo==8)
		{
		var A = {id : 0, l:520, inilife:520, x:posx, y:posy, dx:0, dy:0, Xvel:AiniXvel, Yvel:AiniYvel, r:radio, vision:distVis, tipo:tipo, subtipo:subtipo, powerShoot:powerShootZ, cadencia:cadenciaZ, lastShoot:0, shootSpeed:shootSpeedZ, shootType:shootTypeZ, Yup:Yup};
		AA.push(A); 
		}
	else
		{
		if(AA[0].l > coste)
			{
			AA[0].l-=coste;
			var A = {id : AAid, l:lifeZ, inilife:lifeZ, x:posx, y:posy, dx:0, dy:0, Xvel:AiniXvel, Yvel:AiniYvel, r:radio, vision:distVis, tipo:tipo, subtipo:subtipo, powerShoot:powerShootZ, cadencia:cadenciaZ, lastShoot:0, shootSpeed:shootSpeedZ, shootType:shootTypeZ, Yup:Yup};
			AA.push(A); 

			if(tipo==2)
				setTimeout("zzfx(...[.3,,329.6276,.03,.2,.78,,0,.1,,-60,.01,,,,,,1.2,.06]);",100);
			AAid++;
			}
		else
			{
			document.getElementById('gameMSG').style.opacity="1";
			document.getElementById('gameMSG').innerHTML="&#9888;<br><br>Cannot build this.<br>You will run out of Scriptium and mission will fail.";
			setTimeout("if(canPutItems) document.getElementById('gameMSG').style.opacity='0';",2000);
			if(tipo==2)
				setTimeout("zzfx(...[,,1031,,.07,.24,,1.61,,,,,,.1,27,.2,,.96,.1,.07])",100);
			}
		}
		 
	}
	
	
function newS(power,posx,posy,shootType,tipo,shootVel,ShootXdeviation) 
	{     
	var S = {id : SAid, power:power, x:(posx), y:(posy), shootType:shootType, tipo:tipo, shootVel:(shootVel), ShootXdeviation:ShootXdeviation};
	SA.push(S); 
	SAid++;  
	}
	
	
function newM(posx,posy,qtt,step) 
	{    
	var S = {id : SMid, x:posx, y:posy, qtt:qtt, step:step};
	SM.push(S); 
	SMid++;  
	}
	

function ExplosionXY(Ex,Ey,radio,tipo,sprite) 
	{
	var E = {id : ExplosionID, x:Ex, y:Ey, tipo:tipo, r:radio, shine:1, sprite:sprite};
	SE.push(E);   
	ExplosionID++;
	}
	

	

function newStar(a)
	{     
	var Yini=0;
	if(a==1)
		Yini=Math.floor(Math.random()*cHeight);
		
	var velocity=((Math.floor(Math.random()*8)+1)/3);
	var S = {id : Starsid, shine:(Math.floor(Math.random()*10)+1), color:Math.floor(Math.random()*13777215).toString(16), x:(Math.floor(Math.random()*cWidth)-2), y:Yini, tipo:1, Vel:velocity};
	Stars.push(S); 
	Starsid++;   
	}
	
  
	
function ponerNave(x,y,o)
	{
	if(o==1)
		newA(iniLife*2,iniLife*2,x,y,0,0,0,0,iniR,0,2,8,0,0,0,0,inishootType);
	if(canPutItems)	
		newA(iniLife,iniLife,x,cHeight+50,0,0,AiniXvel,AiniYvel,iniR,vision,AAtype,AAsubtipo,inipowerShoot,iniCadence,0,iniShootSpeed,inishootType,y);	
	}
		
	



var cost=0;
var maxCost=100;


context.imageSmoothingEnabled = false;
  
(function(window, document, undefined)
	{   
	function calcularDistancia(ax,ay,bx,by)
		{
		var a = (ax - bx);
		var b = (ay - by);
		var c = (Math.sqrt( a*a + b*b )); 
		return (c); 
		}


		
	function buscarEnemigo(i)
		{
		var closerE=-1;
		var distAB=999999999;

		for (ii=0; ii < AA.length; ii++) 
			{
			if(AA[i].tipo != AA[ii].tipo) 
				{
				var VisionOffset=AA[i].vision*((AA[i].tipo>1)?-1:1); 
				if(AA[i].subtipo==7)
					VisionOffset=0;
				var dx = (AA[i].x) - (AA[ii].x);
				var dy = ((AA[i].y) - (AA[ii].y))+(VisionOffset);
				var dr = (AA[i].vision) + (AA[ii].r);

				if (dx * dx + dy * dy < dr * dr) 
					{					
					var newDistancia=calcularDistancia(AA[i].x,AA[i].y,AA[ii].x,AA[ii].y);
					if(newDistancia < distAB)
						{
						closerE=ii; 
						distAB=newDistancia;
						}						
					}
				}
			}
		return closerE; 
		}

	for (i=0; i < 100; i++) 
		newStar(1);



	var requestAnimationFrame;
	(function() {
				  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
											  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
				  window.requestAnimationFrame = requestAnimationFrame;
				})();
						
						
	function request() 
		{			
		var fpsInterval, startTime, now, then;			
		function startAnimating(fps) 
			{
			fpsInterval = 1000 / fps;
			then = Date.now();
			startTime = then;
			animate();
			}

		function animate() 
			{
			requestAnimationFrame(animate);
			now = Date.now();
			elapsed = now - then;
			if (elapsed > fpsInterval) 
				{
				then = now - (elapsed % fpsInterval);
				if(game_running)
					render();
				}
			}
		startAnimating(fps);
		}
		
		
		
	request();	

			
	
	cost=0;
	
	function render()
		{
		mainCounter++;
		
		if(mainCounter%20)
			{
			maxCost=700+(wave*200); 
			var valor=AA.reduce((acc, cur) => cur.tipo === 1 ? acc+=cur.subtipo<7?cur.subtipo*10:5 : acc, 0);
			document.getElementById("alertSt").style.width=((100/maxCost)*valor)+"%";
			}
		

		if(canPutItems)
			{
			if(cost<maxCost)
				{
				var espaciado=150+(Math.floor(Math.random() * 201)); 
				if(mainCounter==1 || mainCounter%espaciado==0)
					{
					var At=Math.floor(Math.random()*(wave+1))+1;			
					if(wave>6)
						At=Math.floor(Math.random()*7)+1;
					var sim=Math.floor(Math.random() * 3 )+1; 
					var px=((cWidth/100)*(Math.floor(Math.random()*(100))+1))/sim;
					var xx;
					var cover=Math.floor(Math.random() * (2 + 3 + 1)); 
					cover-=2;
					
					for(a=0 ;a<sim; a++) 
						{
						var maxg=1;
	
						for(n=0; n<maxg; n++)
							{
							xx=(a*(cWidth/sim))+(a%2?+px:(cWidth/sim)-px);

							if(cost<maxCost){newA(iniLife,iniLife,xx,-120,0,0,AiniXvel,AiniYvel,iniR,vision,1,At,inipowerShoot,iniCadence,0,iniShootSpeed,inishootType);
								cost+=At<7?At*10:5;}
							if(cover>0 && At>1)
								{
								var At2=1; 
								if(wave>6)
									At2=(Math.floor(Math.random()*2)*5)+1;  
									
								for(c2=0; c2<cover; c2++)
									{
									if(cost<maxCost){newA(iniLife,iniLife,xx,-20-(Math.floor(Math.random() * 3)),0,0,AiniXvel,AiniYvel,iniR,vision,1,At2,inipowerShoot,iniCadence,0,iniShootSpeed,inishootType);
										cost+=At2<7?At2*10:5;}
									}
								}
							}
						}
					if(wave>3 && wave%3==0 && Math.floor(Math.random() * 10)==3) 
						{
						var At2=(Math.floor(Math.random()*3)+2); 
							
						for(c3=0; c3<(Math.floor(Math.random()*5)+9); c3++)
							{
							if(cost<maxCost){newA(iniLife,iniLife,xx,-20-(Math.floor(Math.random() * 10)),0,0,AiniXvel,AiniYvel,iniR,vision,1,At2,inipowerShoot,iniCadence,0,iniShootSpeed,inishootType);
								cost+=At2<7?At2*10:5;}
							}
							
						}
					}
				}
			else
				{
				if(AA.reduce((acc, cur) => cur.tipo === 1 ? ++acc : acc, 0) == 0) 
					{
					canPutItems=false;				
					document.getElementById('gameMSG').style.opacity="1";
					var mmss=["good job","way to go","good for you","there you go","good on you","great job","awesome work","good work","great work","take a bow","nice one","full marks","hats off","good going","nice job","right on","keep it up","nice work","fine job","great effort","awesome","top effort"][Math.floor(Math.random()*21)]+
					", "+["Commander","fleet Captain","Chief","Officer","leader"][Math.floor(Math.random()*4)]+"!";
					var mms2="<font style='font-size:14px; color:#75bcc7;'>"+((5700000000/50)*(wave+1))+" light years traveled<br><br>"+((wave)*2)+"% done of 5700 Mly<br><br><br><br><br></font>";
					var oncl="nextWave2();";
					var btnm="continue mission";
					if(wave==50)
						{
						mmss="Congratulation Sir!<br><br> You got it!";
						mms2="Restart and play again!<br><br>";
						oncl="location.reload();";
						var btnm="restart";
						}
					document.getElementById('gameMSG').innerHTML="<font style='font-size:25px; color:#a591ff;'>&#x1F4AB;</font><br><br><font style='font-size:20px; color:#a591ff;'>"+mmss+"<br><br>Wave Killed<br><br><br></font></font>"+
					mms2+
					"<div class='blink_me' onclick='"+oncl+"' style='display:inline-block; text-align:center; padding:6px 20px 6px 20px; font-size:20px; color:lime; font-weight:500; box-shadow: 0px 0px 10px 5px #86a145; border-radius:10px; border:3px solid lime; background-color:rgba(0,0,0,0.5);'>"+
								btnm+"</div><br><br><br>";
								
					document.getElementById('gameMSG').style.pointerEvents ="auto";	
					if(wave<50)
						wave++;
					else
						{
						wave=1;
						localStorage.setItem('SpaceEscort13kbGame2', 1+' '+help);
						}
					zzfx(...[1.35,,585,,.2,.48,1,.39,-0.3,,66,.07,.14,,,,.15,.96,1,.12]);
					localStorage.setItem("SpaceEscort13kbGame2", wave+" "+help);
					setTimeout(function(){ 	speedOffset=0.01; 
											zzfx(...[1.02,0,128,.73,1.14,.38,1,.63,.3,,,,,.4,,.8,.14,.5,.65]);
											},1000);	
					setTimeout(function(){speedOffset=0;},3000);
					}
				}
			}
			

		if(zzfx && (mainCounter==1 || mainCounter%300==0))
			zzfx(...[0.9,.25,220,2,1.5,3,,3.4,,,,,1,.3,,,,.78,.02,.11]);
		if(zzfx && mainCounter%500==0)
			zzfx(...[0.1,.25,1500,2,,0,1,0,,,,,,,,,,0,4]);
			
		if(speedOffset>0)
			speedOffset+=0.2;

		
		if(AA[0] && AA[0].l>0)
			{
			document.getElementById("pasta").innerHTML=(AA[0].subtipo==8?Math.round(AA[0].l):0);
			if(AA[0].l<150)
				{
				document.getElementById('shipMenuDIVBlink').style.display='block';
				document.getElementById("pasta").style.color="#ff7575";
				}
			else
				{
				document.getElementById('shipMenuDIVBlink').style.display='none';
				}
			}
		
		
		
		TIS=Math.max(1-((SA.length+SE.length)*0.008),.3); 


		if(mainCounter%(Math.floor(Math.random()*21)+1)==0 )
			newStar();
			
		for (i=0; i < Stars.length; i++) 
			{	
			Stars[i].y+=Stars[i].Vel*StarVel;	
			if(Stars[i] && Stars[i].y > cHeight) 
				Stars.splice(i, 1);
			}

		for (i=0; i < SM.length; i++) 
			{	
			SM[i].y-=1;	
			SM[i].step++;
			if(SM[i] && SM[i].step > 100) 
				SM.splice(i, 1);
			}

		if(canShoot)
		  for (i = 0; i < SA.length; i++) 
			{
			if(SA[i].tipo==1)
				SA[i].y += SA[i].shootVel;
			if(SA[i].tipo==2)
				SA[i].y -= SA[i].shootVel;		
			SA[i].x += SA[i].ShootXdeviation;
			

			if(SA[i])			
				for (j = 0; j < AA.length; j++) 
					{
					if(SA[i])
					if(SA[i].tipo != AA[j].tipo)
						{	
						var a =  (AA[j].r) ;
						var x = (SA[i].x) - (AA[j].x);
						var y = (SA[i].y) - (AA[j].y);
						
						if ((a) > (Math.sqrt((x * x) + (y * y))))
							{
							zzfx(...[.2*TIS,,465,,.01,,2,.31,-0.5,,-50,,,-5.7,,,,.95,.03]);
							ExplosionXY(SA[i].x,SA[i].y,10,2,0);
							AA[j].l-=SA[i].power;											
							SA.splice(i, 1);
							}				
						}			
					}
			if(SA[i])
				if (((SA[i].y) > (cHeight) + 100) || ((SA[i].y) < 0 - 10) ) 
					SA.splice(i, 1); 		
			}
		
		
		
		for (i = 0; i < AA.length; i++) 
			{	
			var nearestE=-1;
			nearestE=buscarEnemigo(i);
			
			if(nearestE>-1)
				{			
				AA[i].Yup=AA[i].y;
				if(AA[nearestE].subtipo==1)
					AA[nearestE].Yup=AA[nearestE].y;
				if(AA[i].x < AA[nearestE].x) 
					AA[i].dx = AiniXvel; 
			
				if(AA[i].x > AA[nearestE].x) 
					AA[i].dx = -AiniXvel;
							
							
				if(AA[i].subtipo!=1) 	
					{
					if(AA[i].subtipo==6 || AA[i].subtipo==7)
						{
						if(AA[i].y < AA[nearestE].y) 
							AA[i].dy = (AA[i].Yvel*2);
						
						if(AA[i].y > AA[nearestE].y) 
							AA[i].dy = (-AA[i].Yvel*2);
						}
					else 
						{
						if(AA[i].y < AA[nearestE].y) 
							AA[i].dy = (AA[i].Yvel/6);
						
						if(AA[i].y >= AA[nearestE].y) 
							AA[i].dy = (-AA[i].Yvel/6);
						}
					}
					
					
					
				if((AA[nearestE].x) > (AA[i].x)-1 && (AA[nearestE].x) < (AA[i].x)+1)
					AA[i].dx =0;

			
				if((AA[nearestE].x) > (AA[i].x)-200 && (AA[nearestE].x) < (AA[i].x)+200)
					{
					if(canShoot && AA[i].lastShoot >= AA[i].cadencia)
						{
						if(AA[i].subtipo > 0 && AA[i].subtipo < 7)
							zzfx(...[.3*TIS,,452,.03,.02,.3,3,,-0.9,,50,,,.3,1,.1,,.5]);
						AA[i].lastShoot=0;
						
						if(AA[i].subtipo == 2)
							newS(AA[i].powerShoot,AA[i].x,AA[i].y,AA[i].shootType,AA[i].tipo,AA[i].shootSpeed,0)
						if(AA[i].subtipo == 3)
							{
							newS(AA[i].powerShoot,AA[i].x-12,AA[i].y,AA[i].shootType,AA[i].tipo,AA[i].shootSpeed,0) 
							newS(AA[i].powerShoot,AA[i].x,AA[i].y,AA[i].shootType,AA[i].tipo,AA[i].shootSpeed,0) 
							newS(AA[i].powerShoot,AA[i].x+10,AA[i].y,AA[i].shootType,AA[i].tipo,AA[i].shootSpeed,0) 
							}
						if(AA[i].subtipo == 4)
							{
							newS(AA[i].powerShoot,AA[i].x-15,AA[i].y,AA[i].shootType,AA[i].tipo,AA[i].shootSpeed,-1.5) 
							newS(AA[i].powerShoot,AA[i].x-6,AA[i].y,AA[i].shootType,AA[i].tipo,AA[i].shootSpeed,0) 
							newS(AA[i].powerShoot,AA[i].x+5,AA[i].y,AA[i].shootType,AA[i].tipo,AA[i].shootSpeed,0) 
							newS(AA[i].powerShoot,AA[i].x+13,AA[i].y,AA[i].shootType,AA[i].tipo,AA[i].shootSpeed,1.5) 
							}
						if(AA[i].subtipo == 5)
							{
							newS(AA[i].powerShoot,AA[i].x,AA[i].y,AA[i].shootType,AA[i].tipo,AA[i].shootSpeed,0) 
							}
						if(AA[i].subtipo == 6)
							{
							newS(AA[i].powerShoot,AA[i].x,AA[i].y,AA[i].shootType,AA[i].tipo,AA[i].shootSpeed,0) 
							}
						}
					}
					
				AA[i].lastShoot++;					
				}
					

			if(nearestE==-1)
				{
				if(AA[i].tipo==1)
					{
					AA[i].dy = AA[i].Yvel;
					if(AA[i].y > (cHeight - AA[i].r)-400)
						{
						if(AA[i].x>cWidth/2) AA[i].dx = -AiniXvel;
						if(AA[i].x<cWidth/2) AA[i].dx = AiniXvel;
						}
					else
						AA[i].dx = 0;
					}
				if(AA[i].tipo==2)
					{
					AA[i].dy = (-AA[i].Yvel);	
					AA[i].dx = 0;
					}
				
					
				}
				
		
			for (j = i; j < AA.length; j++) 
				{
				if(j!=i && ((AA[i].subtipo!=8 && AA[j].subtipo!=8) || ((AA[i].subtipo==8 || AA[j].subtipo==8 ) && AA[i].tipo!=AA[j].tipo ) ))
					{
					var dx = (AA[i].x) - (AA[j].x);
					var dy = (AA[i].y) - (AA[j].y);
					var dr = (AA[i].r) + (AA[j].r);

					if ((dx * dx + dy * dy) < (dr * dr)) 
						{
						AA[j].Yup=AA[j].y;
						AA[i].Yup=AA[i].y;
						if(AA[j].tipo != AA[i].tipo)
							{
							if(AA[i].subtipo==7 || AA[j].subtipo==7)
								{
								var u=i;
								var v=j
								if(AA[j].subtipo==7)
									{
									u=j;
									v=i;
									}
								
								for (ii=0; ii < AA.length; ii++) 
									{
									var dx2 = (AA[u].x) - (AA[ii].x);
									var dy2 = (AA[u].y) - (AA[ii].y);
									var dr2 = (AA[u].vision) + (AA[ii].r);

									if ((dx2 * dx2 + dy2 * dy2) < (dr2 * dr2)) 
										{	
										if(AA[u].subtipo!=8)
											AA[u].l=0;
										if(AA[v].subtipo!=8)
											AA[v].l=0;
										AA[ii].l-=100;	
										}
										
									}
		
								}
							else
								{
								AA[j].l-=0.2;
								AA[i].l-=0.2;
								}
							}
	
						var theta = (Math.atan2(dy, dx));
						var force = ((dr - Math.sqrt(dx * dx + dy * dy))/2);					
							
						AA[i].dx += force * Math.cos(theta);
						AA[j].x -= force * Math.cos(theta);
						AA[i].dy += force * Math.sin(theta);
						AA[j].y -= force * Math.sin(theta);
						}
					}
				}	
			
			
			if(shipsMoving && (AA[i].subtipo!=8 || (AA[i].subtipo==8 && AA[i].y>cHeight-175)))
				{
				if(StarVel<2)	
					StarVel+=0.001;
				AA[i].x += AA[i].dx;
				if(AA[i].tipo==2 && AA[i].y > AA[i].Yup)
					AA[i].y += AA[i].dy-speedOffset-(15);
				else
					AA[i].y += AA[i].dy-speedOffset;

				}
				
			
			if(AA[i].x < AA[i].r) 
				AA[i].x = AA[i].r;
			if(AA[i].x > (cWidth - AA[i].r)) 
				AA[i].x = cWidth - AA[i].r;
			
			if(AA[i].subtipo==7 || AA[i].subtipo==1)
				{					
				if(AA[i].tipo==1 && AA[i].y > (cHeight - AA[i].r)+50) 
					AA.splice(i, 1);
				if(AA[i].tipo==2 && AA[i].y < AA[i].r-50) 
					AA.splice(i, 1);
				}				
			else
				{
				if(AA[i].tipo==1 && AA[i].y > (cHeight - AA[i].r)-200) 
					AA[i].y = (cHeight - AA[i].r)-200;	
				if(AA[i].tipo==2 && AA[i].y < AA[i].r-50) 
					AA.splice(i, 1);
				}	
				
			
			if(AA[i])
				{
				if(canShoot && AA[i].subtipo!=8) 
					AA[i].l-=0.005;
				
				if(AA[i].l<=0)
					{	
					if(AA[i].subtipo==8)
						{
						zzfx(...[2.46,,77,,1,3,4,1.16,,,,,,.7,-30,.5,.2,.63,1,.01]);
						cost=0;
						shipsMoving=0;
						speedOffset=0;
						canPutItems=false;
						canShoot=false;
						SA=[];
						document.getElementById('gameMSG').style.opacity="1";
						document.getElementById('gameMSG').style.pointerEvents ="auto";
						document.getElementById('gameMSG').innerHTML="<font style='font-size:25px; color:orange;'>&#x1F4A5;<br><br>Mission Failed<br><br><br></font>"+
							"<div class='blink_me' onclick='tryagain();' style='display:inline-block; text-align:center; padding:6px 20px 6px 20px; font-size:20px; color:#d3fc6f; font-weight:500; box-shadow: 0px 0px 10px 5px #86a145; border-radius:10px; border:3px solid #d3fc6f; background-color:rgba(0,0,0,0.5);'>"+
							"try again</div><br><br><br>";
						
						}
					zzfx(...[TIS,,475,,.18,.83,2,1.86,,,,,,3.2,,.8,,1.5,1,.21]);
					for(var ex=0; ex<10; ex++)				
						{
						ExplosionXY(AA[i].x+(AA[i].r)+Math.floor(Math.random()*50)-25,AA[i].y+(AA[i].r)+Math.floor(Math.random()*50)-25,AA[i].r*Math.floor(Math.random()*3)+3,1,0); 
						}
					
					if(AA[i].tipo==1 && AA[0].l>0)
						{
						var qtt=0;
						switch(AA[i].subtipo)
							{
							case 1: qtt=3; break;  
							case 2: qtt=6; break;  
							case 3: qtt=13; break; 
							case 4: qtt=22; break; 
							case 5: qtt=26; break; 
							case 6: qtt=35; break;
							case 7: qtt=40; break; 
							}
						AA[0].l+=qtt;
						if(AA[0].l>500) 
							AA[0].l=500;
						newM(AA[i].x,AA[i].y,qtt,1);
						document.getElementById("pasta").style.color="yellow";
						document.getElementById("pasta").style.fontSize="16px";
						setTimeout(function(){document.getElementById("pasta").style.fontSize="14px"; document.getElementById("pasta").style.color="cyan";},200);
						}	
					AA.splice(i, 1); 
					}
				}
			}
		
		

	
		context.fillStyle="#000000";
		context.fillRect(0, 0, cWidth+1, cHeight);
		

		for (i=0; i < Stars.length; i++) 
			{	
			context.fillStyle="#"+Stars[i].color;
			context.fillRect(Stars[i].x,Stars[i].y,Stars[i].shine/1.7,Stars[i].shine/2.3);
			}
			

		for (i=0; i < AA.length; i++) 
			if(AA[i].subtipo!=0 && (show_vision || AA[i].subtipo==7))
				{	
				context.fillStyle = 'rgba(150,150,150,0.1)';
				context.beginPath();
				
				var VisionOffset=AA[i].vision*((AA[i].tipo>1)?-1:1); 
				if(AA[i].subtipo==7)
					VisionOffset=0;
				
				if(AA[i].tipo==1)
					context.arc(AA[i].x,AA[i].y+VisionOffset,AA[i].vision, 0, Math.PI * 2); 	
				else
					context.arc(AA[i].x,AA[i].y+VisionOffset,AA[i].vision, 0, Math.PI * 2); 
					
				context.fill();
				}
				

		for (var i = 0; i < AA.length; i++) 
			{
			if(AA[i].tipo==1) 
				{
				switch(AA[i].subtipo) 
					{
					case 1: {	context.save(); 
								context.translate(AA[i].x, AA[i].y); 
								context.rotate(Math.PI / 180 * ((AA[i].x*6)+(AA[i].y*6))%180); 
								context.drawImage(SPRTships,0,25, 25, 25, -50, -50, AA[i].r*5, AA[i].r*5); 
								context.restore(); 
								break;
							}
					default: {context.drawImage(SPRTships,(AA[i].subtipo-1)*25,25, 25, 25, AA[i].x-(AA[i].r*sizeRatio/4), AA[i].y-(AA[i].r*sizeRatio/4), AA[i].r*5, AA[i].r*5); break;}
					}
					
				}
			else 
				{
				switch(AA[i].subtipo)
					{ 
					case 1: {	context.save(); 
								context.translate(AA[i].x, AA[i].y); 
								context.rotate(Math.PI / 180 * ((AA[i].y*6)+(AA[i].x*6))%180); 
								context.drawImage(SPRTships,0,0, 25, 25, -50, -50, AA[i].r*5, AA[i].r*5); 
								context.restore(); 
								break;
							}
					default:{context.drawImage(SPRTships,(AA[i].subtipo-1)*25,0, 25, 25, AA[i].x-(AA[i].r*sizeRatio/4), AA[i].y-(AA[i].r*sizeRatio/4), AA[i].r*sizeRatio/2, AA[i].r*sizeRatio/2); break;}
					}
				}

		
			
			var vidaBarTop=AA[i].y+AA[i].r+10;
			if(AA[i].tipo==1) 
				vidaBarTop=AA[i].y+AA[i].r-50;
			if(AA[i].subtipo==8) 
				{
				vidaBarTop+=70; 
				context.fillStyle="#505050";
				context.fillRect(AA[i].x-AA[i].r-25 -3, vidaBarTop , (AA[i].r*2)+50+6 , 9);
				
				context.fillStyle='hsl('+ ((AA[i].l)*.18) +',100%,50%)';
				context.fillRect(AA[i].x-AA[i].r-25 , vidaBarTop+3 , Math.abs( ((AA[i].r*2+55)/AA[i].inilife)*AA[i].l )+2 , 3);
				}
			else
				{
				context.fillStyle="black";
				context.fillRect(AA[i].x-AA[i].r , vidaBarTop , AA[i].r*2 , 5);
				
				context.fillStyle='hsl('+ (AA[i].l) +',100%,50%)';
				context.fillRect(AA[i].x-AA[i].r , vidaBarTop-1 , Math.abs( (AA[i].r*2/AA[i].inilife)*AA[i].l )  , 3);	
				}
				
			}
			

		for (var i = 0; i < SE.length; i++) 
			{
			if(SE[i] && SE[i].tipo==1) 
				{

				SE[i].shine-=0.02;
				context.drawImage(SPRTexplosions,(SE[i].sprite*6),0, 6, 6,SE[i].x-SE[i].r,SE[i].y-SE[i].r, SE[i].r, SE[i].r); 

				if(mainCounter%(Math.floor(Math.random()*15)+1)==0)
					SE[i].sprite++;
					
				if(SE[i].sprite>=12)	
					SE.splice(i, 1);
				}
			if(SE[i] && SE[i].tipo==2)
				{
				SE[i].shine-=0.02;
				context.drawImage(SPRTexplosions,(SE[i].sprite*6),6, 6, 6,SE[i].x-SE[i].r,SE[i].y-SE[i].r, SE[i].r*2, SE[i].r*2); 

				if(mainCounter%(Math.floor(Math.random()*15)+1)==0)
					SE[i].sprite++;
					
				if(SE[i].sprite>=12)	
					SE.splice(i, 1);
				}
				
			}
			
	
		for (var i = 0; i < SA.length; i++) 
			{
			if(SA[i].tipo==1)
				{
				if(SA[i].shootType==6)
					context.drawImage(SPRTweapons,2,12, 3, 9,SA[i].x-5,SA[i].y, 12, 50);
				else
					context.drawImage(SPRTweapons,0,12, 1, 9,SA[i].x-1,SA[i].y, 5, 30);
				}
			else
				{
				if(SA[i].shootType==6)
					context.drawImage(SPRTweapons,2,0, 3, 9,SA[i].x-5,SA[i].y, 12, 50);
				else
					context.drawImage(SPRTweapons,0,0, 1, 9,SA[i].x-1,SA[i].y, 5, 30);
				}
			}
			

		for (i=0; i < SM.length; i++) 
			{		
			context.fillStyle = "black";
			context.font      = (sizeRatio*3.5)+"px Arial";
			context.fillText("+"+SM[i].qtt, SM[i].x-(sizeRatio*0.5)+2, SM[i].y+(sizeRatio*0.5)+2+50);
			
			var opa=(SM[i].step>65?(1-(SM[i].step-50)/65):1);
			context.fillStyle = 'rgba(255,255,0,'+opa+')'; 
			context.font      = (sizeRatio*3.5)+"px Arial";
			context.fillText("+"+SM[i].qtt, SM[i].x-(sizeRatio*0.5), SM[i].y+(sizeRatio*0.5)+50);
			}	
			
		}
	
	
	var SPRTships = new Image();
	var SPRTexplosions = new Image();
	var SPRTweapons = new Image();
	SPRTships.src = "img/SPRTships.png?v="+Date();
	SPRTships.onload = function() 
					{
					SPRTexplosions.src = "img/SPRTexplosions.png?v="+Date();  				
					};   
	SPRTexplosions.onload = function() 
					{
					SPRTweapons.src = "img/SPRTweapons.png?v="+Date();		
					};
    SPRTweapons.onload = function() 
					{
					render();				
					};
				
	}(this, this.document))
	
resize();	


var sizeRatio = canvas.width / 100;

var fps = 60,
	elapsed,
	mainCounter = 0;

(game_running = true),
	(shipsMoving = false),
	(canPutItems = false),
	(canShoot = true),
	(show_vision = false);

var wave = 1,
	help = 0;
if (localStorage.getItem("SpaceEscort13kbGame2") !== null) {
	var strg = localStorage.getItem("SpaceEscort13kbGame2").split(" ");
	wave = parseInt(strg[0]);
	help = parseInt(strg[1]);
}

if (help) {
	document.getElementById("helpb").style.boxShadow = "0px 0px 5px 3px #044";
} else {
	document.getElementById("helpb").classList.add("blink_me2");
	document.getElementById("helpb").style.boxShadow = "0px 0px 5px 3px #bf0";
}

if (wave > 1) document.getElementById("bpTxt").innerHTML = "Continue mission";

var mou = 0,
	AAtype = 2,
	AAsubtipo = 2;

var CanvasSize;
function resize() {
	context.setTransform(1, 0, 0, 1, 0, 0);
	CanvasSize = document.getElementById("canvasDIV").clientWidth / cWidth;
	context.scale(CanvasSize, CanvasSize);
}

document.body.onresize = function () {
	resize();
};

var TIS = 0;
(AA = []), (SA = []), (SM = []), (Stars = []), (SE = []);

var iniLife = 100,
	AAid = 1,
	SAid = 1,
	SMid = 1,
	Starsid = 1,
	ExplosionID = 1,
	iniR = 20,
	AiniXvel = 1,
	AiniYvel = 0.5,
	distance,
	vision,
	StarVel = 0.7,
	inipowerShoot = 1.5,
	inishootType = 5,
	iniCadence = 20,
	iniShootSpeed = 10,
	speedOffset = 0;

function tryagain() {
	speedOffset = 0;
	document.getElementById("gameMSG").style.pointerEvents = "none";
	document.getElementById("gameMSG").style.opacity = "0";
	setTimeout(function () {
		reset();
		play();
	}, 500);
}

function nextWave() {
	canPutItems = true;
	document.getElementById("gameMSG").style.opacity = "1";
	document.getElementById("gameMSG").style.pointerEvents = "none";
	document.getElementById("gameMSG").innerHTML =
		"<font style='font-size:25px; color:cyan;'><br><br>Wave " +
		wave +
		"<br><br><br></font>";
	setTimeout("document.getElementById('gameMSG').style.opacity='0'; ", 2000);
}

function nextWave2() {
	document.getElementById("gameMSG").style.opacity = "0";
	cost = 0;
	tipos = wave % 7;

	AA[0].l = 500;
	setTimeout(function () {
		nextWave();
	}, 2000);
}

var zzfxV = 0.5;
var zzfx = null;

// let zzfxX, zzfxR;
// function play() {
// 	if (zzfx == null) {
// 		// ZzFXMicro - Zuper Zmall Zound Zynth - v1.1.7 ~ 884 bytes minified
// 		zzfx = (
// 			p = 1,
// 			k = 0.05,
// 			b = 220,
// 			e = 0,
// 			r = 0,
// 			t = 0.1,
// 			q = 0,
// 			D = 1,
// 			u = 0,
// 			y = 0,
// 			v = 0,
// 			z = 0,
// 			l = 0,
// 			E = 0,
// 			A = 0,
// 			F = 0,
// 			c = 0,
// 			w = 1,
// 			m = 0,
// 			B = 0
// 		) => {
// 			let M = Math,
// 				R = 44100,
// 				d = 2 * M.PI,
// 				G = (u *= (500 * d) / R / R),
// 				C = (b *= ((1 - k + 2 * k * M.random((k = []))) * d) / R),
// 				g = 0,
// 				H = 0,
// 				a = 0,
// 				n = 1,
// 				I = 0,
// 				J = 0,
// 				f = 0,
// 				x,
// 				h;
// 			e = R * e + 9;
// 			m *= R;
// 			r *= R;
// 			t *= R;
// 			c *= R;
// 			y *= (500 * d) / R ** 3;
// 			A *= d / R;
// 			v *= d / R;
// 			z *= R;
// 			l = (R * l) | 0;
// 			for (h = (e + m + r + t + c) | 0; a < h; k[a++] = f)
// 				++J % ((100 * F) | 0) ||
// 					((f = q
// 						? 1 < q
// 							? 2 < q
// 								? 3 < q
// 									? M.sin((g % d) ** 3)
// 									: M.max(M.min(M.tan(g), 1), -1)
// 								: 1 - (((((2 * g) / d) % 2) + 2) % 2)
// 							: 1 - 4 * M.abs(M.round(g / d) - g / d)
// 						: M.sin(g)),
// 					(f =
// 						(l ? 1 - B + B * M.sin((d * a) / l) : 1) *
// 						(0 < f ? 1 : -1) *
// 						M.abs(f) ** D *
// 						p *
// 						zzfxV *
// 						(a < e
// 							? a / e
// 							: a < e + m
// 							? 1 - ((a - e) / m) * (1 - w)
// 							: a < e + m + r
// 							? w
// 							: a < h - c
// 							? ((h - a - c) / t) * w
// 							: 0)),
// 					(f = c
// 						? f / 2 +
// 						  (c > a ? 0 : ((a < h - c ? 1 : (h - a) / c) * k[(a - c) | 0]) / 2)
// 						: f)),
// 					(x = (b += u += y) * M.cos(A * H++)),
// 					(g += x - x * E * (1 - ((1e9 * (M.sin(a) + 1)) % 2))),
// 					n && ++n > z && ((b += v), (C += v), (n = 0)),
// 					!l || ++I % l || ((b = C), (u = G), (n = n || 1));
// 			p = zzfxX.createBuffer(1, h, R);
// 			p.getChannelData(0).set(k);
// 			b = zzfxX.createBufferSource();
// 			b.buffer = p;
// 			b.connect(zzfxX.destination);
// 			b.start();
// 			return b;
// 		};
// 		zzfxX = new (window.AudioContext || webkitAudioContext)();
// 	}

// 	reset();

// 	StarVel = 0.1;
// 	document.getElementById("Gametitle").style.display = "none";
// 	document.getElementById("botonPlayInfo").style.display = "none";
// 	document.getElementById("mainMenu").style.display = "block";
// 	document.getElementById("botonPlay").style.display = "none";

// 	document.getElementById("shipMenuDIV").style.display = "block";

// 	ponerNave(cWidth / 2, cHeight + 10, 1);
// 	canPutItems = true;
// 	ponerNave(cWidth / 2 + 150, cHeight - 400, -1);
// 	ponerNave(cWidth / 2 - 150, cHeight - 400, -1);
// 	canPutItems = false;

// 	document.getElementById("gameStartMSG").style.opacity = "0";
// 	document.getElementById("gameStartMSG").style.display = "block";
// 	setTimeout(function () {
// 		document.getElementById("gameStartMSG").style.opacity = "1";
// 	}, 10);
// 	setTimeout(function () {
// 		document.getElementById("gameStartMSG").style.opacity = "0";
// 	}, 6000);
// 	setTimeout(function () {
// 		document.getElementById("gameStartMSG").style.display = "none";
// 	}, 9000);

// 	setTimeout(function () {
// 		nextWave2();
// 	}, 8000);

// 	setTimeout(function () {
// 		document.getElementById("mainMenu").style.display = "none";
// 		canPutItems = true;
// 		mainCounter = 0;
// 		shipsMoving = true;
// 	}, 1000);
// }

function reset() {
	mou = 0;
	AAtype = 2;
	AAsubtipo = 2;
	selectShipmenu(document.getElementById("dflt"), 1);
	cost = 0;
	AA = [];
	SA = [];
	SM = [];
	SE = [];

	mainCounter = 0;
	AAid = 1;

	game_running = true;
	shipsMoving = true;
	canShoot = true;

	document.getElementById("botonPlay").style.display = "block";
	document.getElementById("botonPlayInfo").style.display = "block";
	document.getElementById("mainMenu").style.display = "block";
	document.getElementById("gameStartMSG").style.display = "none";

	vision = (sizeRatio * 30) / 2;

	context.fillStyle = "#000000";
	context.fillRect(0, 0, CanvasSize, CanvasSize);
}

function selectShipmenu(a, b) {
	if (!b)
		zzfx(
			...[
				0.58,
				,
				293,
				,
				0.09,
				0.09,
				1,
				0.14,
				-0.1,
				,
				,
				,
				0.04,
				0.4,
				,
				0.4,
				0.18,
				0.59,
				0.01,
				0.24,
			]
		);
	var mshp = document.getElementsByClassName("menuShips");
	for (var i = 0; i < mshp.length; ++i) {
		mshp[i].style.borderColor = "#445915";
		mshp[i].style.boxShadow = "none";
		mshp[i].style.color = "gray";
	}
	a.style.borderColor = "#d3fc6f";
	a.style.boxShadow = " 0px 0px 10px 2px #d3fc6f";
	a.style.color = "#c6d149";
}

function newA(
	life,
	inilife,
	posx,
	posy,
	dx,
	dy,
	Xvel,
	Yvel,
	radio,
	distVis,
	tipo,
	subtipo,
	powerShoot,
	cadencia,
	lastShoot,
	shootSpeed,
	shootType,
	Yup
) {
	var coste = 0;
	var lifeZ = life;
	var inilifeZ = inilife;
	var powerShootZ = inipowerShoot;
	var cadenciaZ = iniCadence;
	var shootSpeedZ = iniShootSpeed;
	var shootTypeZ = inishootType;

	switch (subtipo) {
		case 1:
			coste = 5;
			distVis = 0;
			lifeZ = 30;
			inilifeZ = 30;
			break;
		case 2:
			coste = 10;
			break;
		case 3:
			coste = 20;
			break;
		case 4:
			coste = 30;
			cadenciaZ = 20;
			break;
		case 5:
			coste = 40;
			distVis = vision * 1.4;
			powerShootZ = 15;
			cadenciaZ = 60;
			shootSpeedZ = 6;
			shootTypeZ = 6;
			break;
		case 6:
			coste = 50;
			lifeZ *= 3.5;
			break;
		case 7:
			coste = 60;
			lifeZ *= 1.5;
			break;
	}

	if (tipo == 1) {
		coste = 0;
	}

	if (subtipo == 8) {
		var A = {
			id: 0,
			l: 520,
			inilife: 520,
			x: posx,
			y: posy,
			dx: 0,
			dy: 0,
			Xvel: AiniXvel,
			Yvel: AiniYvel,
			r: radio,
			vision: distVis,
			tipo: tipo,
			subtipo: subtipo,
			powerShoot: powerShootZ,
			cadencia: cadenciaZ,
			lastShoot: 0,
			shootSpeed: shootSpeedZ,
			shootType: shootTypeZ,
			Yup: Yup,
		};
		AA.push(A);
	} else {
		if (AA[0].l > coste) {
			AA[0].l -= coste;
			var A = {
				id: AAid,
				l: lifeZ,
				inilife: lifeZ,
				x: posx,
				y: posy,
				dx: 0,
				dy: 0,
				Xvel: AiniXvel,
				Yvel: AiniYvel,
				r: radio,
				vision: distVis,
				tipo: tipo,
				subtipo: subtipo,
				powerShoot: powerShootZ,
				cadencia: cadenciaZ,
				lastShoot: 0,
				shootSpeed: shootSpeedZ,
				shootType: shootTypeZ,
				Yup: Yup,
			};
			AA.push(A);

			if (tipo == 2)
				setTimeout(
					"zzfx(...[.3,,329.6276,.03,.2,.78,,0,.1,,-60,.01,,,,,,1.2,.06]);",
					100
				);
			AAid++;
		} else {
			document.getElementById("gameMSG").style.opacity = "1";
			document.getElementById("gameMSG").innerHTML =
				"&#9888;<br><br>Cannot build this.<br>You will run out of Scriptium and mission will fail.";
			setTimeout(
				"if(canPutItems) document.getElementById('gameMSG').style.opacity='0';",
				2000
			);
			if (tipo == 2)
				setTimeout(
					"zzfx(...[,,1031,,.07,.24,,1.61,,,,,,.1,27,.2,,.96,.1,.07])",
					100
				);
		}
	}
}

function newS(power, posx, posy, shootType, tipo, shootVel, ShootXdeviation) {
	var S = {
		id: SAid,
		power: power,
		x: posx,
		y: posy,
		shootType: shootType,
		tipo: tipo,
		shootVel: shootVel,
		ShootXdeviation: ShootXdeviation,
	};
	SA.push(S);
	SAid++;
}

function newM(posx, posy, qtt, step) {
	var S = { id: SMid, x: posx, y: posy, qtt: qtt, step: step };
	SM.push(S);
	SMid++;
}

function ExplosionXY(Ex, Ey, radio, tipo, sprite) {
	var E = {
		id: ExplosionID,
		x: Ex,
		y: Ey,
		tipo: tipo,
		r: radio,
		shine: 1,
		sprite: sprite,
	};
	SE.push(E);
	ExplosionID++;
}

function newStar(a) {
	var Yini = 0;
	if (a == 1) Yini = Math.floor(Math.random() * cHeight);

	var velocity = (Math.floor(Math.random() * 8) + 1) / 3;
	var S = {
		id: Starsid,
		shine: Math.floor(Math.random() * 10) + 1,
		color: Math.floor(Math.random() * 13777215).toString(16),
		x: Math.floor(Math.random() * cWidth) - 2,
		y: Yini,
		tipo: 1,
		Vel: velocity,
	};
	Stars.push(S);
	Starsid++;
}

function ponerNave(x, y, o) {
	if (o == 1)
		newA(
			iniLife * 2,
			iniLife * 2,
			x,
			y,
			0,
			0,
			0,
			0,
			iniR,
			0,
			2,
			8,
			0,
			0,
			0,
			0,
			inishootType
		);
	if (canPutItems)
		newA(
			iniLife,
			iniLife,
			x,
			cHeight + 50,
			0,
			0,
			AiniXvel,
			AiniYvel,
			iniR,
			vision,
			AAtype,
			AAsubtipo,
			inipowerShoot,
			iniCadence,
			0,
			iniShootSpeed,
			inishootType,
			y
		);
}

var cost = 0;
var maxCost = 100;

context.imageSmoothingEnabled = false;

(function (window, document, undefined) {
	function calcularDistancia(ax, ay, bx, by) {
		var a = ax - bx;
		var b = ay - by;
		var c = Math.sqrt(a * a + b * b);
		return c;
	}

	function buscarEnemigo(i) {
		var closerE = -1;
		var distAB = 999999999;

		for (ii = 0; ii < AA.length; ii++) {
			if (AA[i].tipo != AA[ii].tipo) {
				var VisionOffset = AA[i].vision * (AA[i].tipo > 1 ? -1 : 1);
				if (AA[i].subtipo == 7) VisionOffset = 0;
				var dx = AA[i].x - AA[ii].x;
				var dy = AA[i].y - AA[ii].y + VisionOffset;
				var dr = AA[i].vision + AA[ii].r;

				if (dx * dx + dy * dy < dr * dr) {
					var newDistancia = calcularDistancia(
						AA[i].x,
						AA[i].y,
						AA[ii].x,
						AA[ii].y
					);
					if (newDistancia < distAB) {
						closerE = ii;
						distAB = newDistancia;
					}
				}
			}
		}
		return closerE;
	}

	for (i = 0; i < 100; i++) newStar(1);

	var requestAnimationFrame;
	(function () {
		requestAnimationFrame =
			window.requestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.msRequestAnimationFrame;
		window.requestAnimationFrame = requestAnimationFrame;
	})();

	function request() {
		var fpsInterval, startTime, now, then;
		function startAnimating(fps) {
			fpsInterval = 1000 / fps;
			then = Date.now();
			startTime = then;
			animate();
		}

		function animate() {
			requestAnimationFrame(animate);
			now = Date.now();
			elapsed = now - then;
			if (elapsed > fpsInterval) {
				then = now - (elapsed % fpsInterval);
				if (game_running) render();
			}
		}
		startAnimating(fps);
	}

	request();

	cost = 0;

	function render() {
		mainCounter++;

		if (mainCounter % 20) {
			maxCost = 700 + wave * 200;
			var valor = AA.reduce(
				(acc, cur) =>
					cur.tipo === 1
						? (acc += cur.subtipo < 7 ? cur.subtipo * 10 : 5)
						: acc,
				0
			);
			document.getElementById("alertSt").style.width =
				(100 / maxCost) * valor + "%";
		}

		if (canPutItems) {
			if (cost < maxCost) {
				var espaciado = 150 + Math.floor(Math.random() * 201);
				if (mainCounter == 1 || mainCounter % espaciado == 0) {
					var At = Math.floor(Math.random() * (wave + 1)) + 1;
					if (wave > 6) At = Math.floor(Math.random() * 7) + 1;
					var sim = Math.floor(Math.random() * 3) + 1;
					var px =
						((cWidth / 100) * (Math.floor(Math.random() * 100) + 1)) / sim;
					var xx;
					var cover = Math.floor(Math.random() * (2 + 3 + 1));
					cover -= 2;

					for (a = 0; a < sim; a++) {
						var maxg = 1;

						for (n = 0; n < maxg; n++) {
							xx = a * (cWidth / sim) + (a % 2 ? +px : cWidth / sim - px);

							if (cost < maxCost) {
								newA(
									iniLife,
									iniLife,
									xx,
									-120,
									0,
									0,
									AiniXvel,
									AiniYvel,
									iniR,
									vision,
									1,
									At,
									inipowerShoot,
									iniCadence,
									0,
									iniShootSpeed,
									inishootType
								);
								cost += At < 7 ? At * 10 : 5;
							}
							if (cover > 0 && At > 1) {
								var At2 = 1;
								if (wave > 6) At2 = Math.floor(Math.random() * 2) * 5 + 1;

								for (c2 = 0; c2 < cover; c2++) {
									if (cost < maxCost) {
										newA(
											iniLife,
											iniLife,
											xx,
											-20 - Math.floor(Math.random() * 3),
											0,
											0,
											AiniXvel,
											AiniYvel,
											iniR,
											vision,
											1,
											At2,
											inipowerShoot,
											iniCadence,
											0,
											iniShootSpeed,
											inishootType
										);
										cost += At2 < 7 ? At2 * 10 : 5;
									}
								}
							}
						}
					}
					if (
						wave > 3 &&
						wave % 3 == 0 &&
						Math.floor(Math.random() * 10) == 3
					) {
						var At2 = Math.floor(Math.random() * 3) + 2;

						for (c3 = 0; c3 < Math.floor(Math.random() * 5) + 9; c3++) {
							if (cost < maxCost) {
								newA(
									iniLife,
									iniLife,
									xx,
									-20 - Math.floor(Math.random() * 10),
									0,
									0,
									AiniXvel,
									AiniYvel,
									iniR,
									vision,
									1,
									At2,
									inipowerShoot,
									iniCadence,
									0,
									iniShootSpeed,
									inishootType
								);
								cost += At2 < 7 ? At2 * 10 : 5;
							}
						}
					}
				}
			} else {
				if (AA.reduce((acc, cur) => (cur.tipo === 1 ? ++acc : acc), 0) == 0) {
					canPutItems = false;
					document.getElementById("gameMSG").style.opacity = "1";
					var mmss =
						[
							"good job",
							"way to go",
							"good for you",
							"there you go",
							"good on you",
							"great job",
							"awesome work",
							"good work",
							"great work",
							"take a bow",
							"nice one",
							"full marks",
							"hats off",
							"good going",
							"nice job",
							"right on",
							"keep it up",
							"nice work",
							"fine job",
							"great effort",
							"awesome",
							"top effort",
						][Math.floor(Math.random() * 21)] +
						", " +
						["Commander", "fleet Captain", "Chief", "Officer", "leader"][
							Math.floor(Math.random() * 4)
						] +
						"!";
					var mms2 =
						"<font style='font-size:14px; color:#75bcc7;'>" +
						(5700000000 / 50) * (wave + 1) +
						" light years traveled<br><br>" +
						wave * 2 +
						"% done of 5700 Mly<br><br><br><br><br></font>";
					var oncl = "nextWave2();";
					var btnm = "continue mission";
					if (wave == 50) {
						mmss = "Congratulation Sir!<br><br> You got it!";
						mms2 = "Restart and play again!<br><br>";
						oncl = "location.reload();";
						var btnm = "restart";
					}
					document.getElementById("gameMSG").innerHTML =
						"<font style='font-size:25px; color:#a591ff;'>&#x1F4AB;</font><br><br><font style='font-size:20px; color:#a591ff;'>" +
						mmss +
						"<br><br>Wave Killed<br><br><br></font></font>" +
						mms2 +
						"<div class='blink_me' onclick='" +
						oncl +
						"' style='display:inline-block; text-align:center; padding:6px 20px 6px 20px; font-size:20px; color:lime; font-weight:500; box-shadow: 0px 0px 10px 5px #86a145; border-radius:10px; border:3px solid lime; background-color:rgba(0,0,0,0.5);'>" +
						btnm +
						"</div><br><br><br>";

					document.getElementById("gameMSG").style.pointerEvents = "auto";
					if (wave < 50) wave++;
					else {
						wave = 1;
						localStorage.setItem("SpaceEscort13kbGame2", 1 + " " + help);
					}
					zzfx(
						...[
							1.35,
							,
							585,
							,
							0.2,
							0.48,
							1,
							0.39,
							-0.3,
							,
							66,
							0.07,
							0.14,
							,
							,
							,
							0.15,
							0.96,
							1,
							0.12,
						]
					);
					localStorage.setItem("SpaceEscort13kbGame2", wave + " " + help);
					setTimeout(function () {
						speedOffset = 0.01;
						zzfx(
							...[
								1.02,
								0,
								128,
								0.73,
								1.14,
								0.38,
								1,
								0.63,
								0.3,
								,
								,
								,
								,
								0.4,
								,
								0.8,
								0.14,
								0.5,
								0.65,
							]
						);
					}, 1000);
					setTimeout(function () {
						speedOffset = 0;
					}, 3000);
				}
			}
		}

		if (zzfx && (mainCounter == 1 || mainCounter % 300 == 0))
			zzfx(
				...[
					0.9,
					0.25,
					220,
					2,
					1.5,
					3,
					,
					3.4,
					,
					,
					,
					,
					1,
					0.3,
					,
					,
					,
					0.78,
					0.02,
					0.11,
				]
			);
		if (zzfx && mainCounter % 500 == 0)
			zzfx(...[0.1, 0.25, 1500, 2, , 0, 1, 0, , , , , , , , , , 0, 4]);

		if (speedOffset > 0) speedOffset += 0.2;

		if (AA[0] && AA[0].l > 0) {
			document.getElementById("pasta").innerHTML =
				AA[0].subtipo == 8 ? Math.round(AA[0].l) : 0;
			if (AA[0].l < 150) {
				document.getElementById("shipMenuDIVBlink").style.display = "block";
				document.getElementById("pasta").style.color = "#ff7575";
			} else {
				document.getElementById("shipMenuDIVBlink").style.display = "none";
			}
		}

		TIS = Math.max(1 - (SA.length + SE.length) * 0.008, 0.3);

		if (mainCounter % (Math.floor(Math.random() * 21) + 1) == 0) newStar();

		for (i = 0; i < Stars.length; i++) {
			Stars[i].y += Stars[i].Vel * StarVel;
			if (Stars[i] && Stars[i].y > cHeight) Stars.splice(i, 1);
		}

		for (i = 0; i < SM.length; i++) {
			SM[i].y -= 1;
			SM[i].step++;
			if (SM[i] && SM[i].step > 100) SM.splice(i, 1);
		}

		if (canShoot)
			for (i = 0; i < SA.length; i++) {
				if (SA[i].tipo == 1) SA[i].y += SA[i].shootVel;
				if (SA[i].tipo == 2) SA[i].y -= SA[i].shootVel;
				SA[i].x += SA[i].ShootXdeviation;

				if (SA[i])
					for (j = 0; j < AA.length; j++) {
						if (SA[i])
							if (SA[i].tipo != AA[j].tipo) {
								var a = AA[j].r;
								var x = SA[i].x - AA[j].x;
								var y = SA[i].y - AA[j].y;

								if (a > Math.sqrt(x * x + y * y)) {
									zzfx(
										...[
											0.2 * TIS,
											,
											465,
											,
											0.01,
											,
											2,
											0.31,
											-0.5,
											,
											-50,
											,
											,
											-5.7,
											,
											,
											,
											0.95,
											0.03,
										]
									);
									ExplosionXY(SA[i].x, SA[i].y, 10, 2, 0);
									AA[j].l -= SA[i].power;
									SA.splice(i, 1);
								}
							}
					}
				if (SA[i])
					if (SA[i].y > cHeight + 100 || SA[i].y < 0 - 10) SA.splice(i, 1);
			}

		for (i = 0; i < AA.length; i++) {
			var nearestE = -1;
			nearestE = buscarEnemigo(i);

			if (nearestE > -1) {
				AA[i].Yup = AA[i].y;
				if (AA[nearestE].subtipo == 1) AA[nearestE].Yup = AA[nearestE].y;
				if (AA[i].x < AA[nearestE].x) AA[i].dx = AiniXvel;

				if (AA[i].x > AA[nearestE].x) AA[i].dx = -AiniXvel;

				if (AA[i].subtipo != 1) {
					if (AA[i].subtipo == 6 || AA[i].subtipo == 7) {
						if (AA[i].y < AA[nearestE].y) AA[i].dy = AA[i].Yvel * 2;

						if (AA[i].y > AA[nearestE].y) AA[i].dy = -AA[i].Yvel * 2;
					} else {
						if (AA[i].y < AA[nearestE].y) AA[i].dy = AA[i].Yvel / 6;

						if (AA[i].y >= AA[nearestE].y) AA[i].dy = -AA[i].Yvel / 6;
					}
				}

				if (AA[nearestE].x > AA[i].x - 1 && AA[nearestE].x < AA[i].x + 1)
					AA[i].dx = 0;

				if (AA[nearestE].x > AA[i].x - 200 && AA[nearestE].x < AA[i].x + 200) {
					if (canShoot && AA[i].lastShoot >= AA[i].cadencia) {
						if (AA[i].subtipo > 0 && AA[i].subtipo < 7)
							zzfx(
								...[
									0.3 * TIS,
									,
									452,
									0.03,
									0.02,
									0.3,
									3,
									,
									-0.9,
									,
									50,
									,
									,
									0.3,
									1,
									0.1,
									,
									0.5,
								]
							);
						AA[i].lastShoot = 0;

						if (AA[i].subtipo == 2)
							newS(
								AA[i].powerShoot,
								AA[i].x,
								AA[i].y,
								AA[i].shootType,
								AA[i].tipo,
								AA[i].shootSpeed,
								0
							);
						if (AA[i].subtipo == 3) {
							newS(
								AA[i].powerShoot,
								AA[i].x - 12,
								AA[i].y,
								AA[i].shootType,
								AA[i].tipo,
								AA[i].shootSpeed,
								0
							);
							newS(
								AA[i].powerShoot,
								AA[i].x,
								AA[i].y,
								AA[i].shootType,
								AA[i].tipo,
								AA[i].shootSpeed,
								0
							);
							newS(
								AA[i].powerShoot,
								AA[i].x + 10,
								AA[i].y,
								AA[i].shootType,
								AA[i].tipo,
								AA[i].shootSpeed,
								0
							);
						}
						if (AA[i].subtipo == 4) {
							newS(
								AA[i].powerShoot,
								AA[i].x - 15,
								AA[i].y,
								AA[i].shootType,
								AA[i].tipo,
								AA[i].shootSpeed,
								-1.5
							);
							newS(
								AA[i].powerShoot,
								AA[i].x - 6,
								AA[i].y,
								AA[i].shootType,
								AA[i].tipo,
								AA[i].shootSpeed,
								0
							);
							newS(
								AA[i].powerShoot,
								AA[i].x + 5,
								AA[i].y,
								AA[i].shootType,
								AA[i].tipo,
								AA[i].shootSpeed,
								0
							);
							newS(
								AA[i].powerShoot,
								AA[i].x + 13,
								AA[i].y,
								AA[i].shootType,
								AA[i].tipo,
								AA[i].shootSpeed,
								1.5
							);
						}
						if (AA[i].subtipo == 5) {
							newS(
								AA[i].powerShoot,
								AA[i].x,
								AA[i].y,
								AA[i].shootType,
								AA[i].tipo,
								AA[i].shootSpeed,
								0
							);
						}
						if (AA[i].subtipo == 6) {
							newS(
								AA[i].powerShoot,
								AA[i].x,
								AA[i].y,
								AA[i].shootType,
								AA[i].tipo,
								AA[i].shootSpeed,
								0
							);
						}
					}
				}

				AA[i].lastShoot++;
			}

			if (nearestE == -1) {
				if (AA[i].tipo == 1) {
					AA[i].dy = AA[i].Yvel;
					if (AA[i].y > cHeight - AA[i].r - 400) {
						if (AA[i].x > cWidth / 2) AA[i].dx = -AiniXvel;
						if (AA[i].x < cWidth / 2) AA[i].dx = AiniXvel;
					} else AA[i].dx = 0;
				}
				if (AA[i].tipo == 2) {
					AA[i].dy = -AA[i].Yvel;
					AA[i].dx = 0;
				}
			}

			for (j = i; j < AA.length; j++) {
				if (
					j != i &&
					((AA[i].subtipo != 8 && AA[j].subtipo != 8) ||
						((AA[i].subtipo == 8 || AA[j].subtipo == 8) &&
							AA[i].tipo != AA[j].tipo))
				) {
					var dx = AA[i].x - AA[j].x;
					var dy = AA[i].y - AA[j].y;
					var dr = AA[i].r + AA[j].r;

					if (dx * dx + dy * dy < dr * dr) {
						AA[j].Yup = AA[j].y;
						AA[i].Yup = AA[i].y;
						if (AA[j].tipo != AA[i].tipo) {
							if (AA[i].subtipo == 7 || AA[j].subtipo == 7) {
								var u = i;
								var v = j;
								if (AA[j].subtipo == 7) {
									u = j;
									v = i;
								}

								for (ii = 0; ii < AA.length; ii++) {
									var dx2 = AA[u].x - AA[ii].x;
									var dy2 = AA[u].y - AA[ii].y;
									var dr2 = AA[u].vision + AA[ii].r;

									if (dx2 * dx2 + dy2 * dy2 < dr2 * dr2) {
										if (AA[u].subtipo != 8) AA[u].l = 0;
										if (AA[v].subtipo != 8) AA[v].l = 0;
										AA[ii].l -= 100;
									}
								}
							} else {
								AA[j].l -= 0.2;
								AA[i].l -= 0.2;
							}
						}

						var theta = Math.atan2(dy, dx);
						var force = (dr - Math.sqrt(dx * dx + dy * dy)) / 2;

						AA[i].dx += force * Math.cos(theta);
						AA[j].x -= force * Math.cos(theta);
						AA[i].dy += force * Math.sin(theta);
						AA[j].y -= force * Math.sin(theta);
					}
				}
			}

			if (
				shipsMoving &&
				(AA[i].subtipo != 8 || (AA[i].subtipo == 8 && AA[i].y > cHeight - 175))
			) {
				if (StarVel < 2) StarVel += 0.001;
				AA[i].x += AA[i].dx;
				if (AA[i].tipo == 2 && AA[i].y > AA[i].Yup)
					AA[i].y += AA[i].dy - speedOffset - 15;
				else AA[i].y += AA[i].dy - speedOffset;
			}

			if (AA[i].x < AA[i].r) AA[i].x = AA[i].r;
			if (AA[i].x > cWidth - AA[i].r) AA[i].x = cWidth - AA[i].r;

			if (AA[i].subtipo == 7 || AA[i].subtipo == 1) {
				if (AA[i].tipo == 1 && AA[i].y > cHeight - AA[i].r + 50)
					AA.splice(i, 1);
				if (AA[i].tipo == 2 && AA[i].y < AA[i].r - 50) AA.splice(i, 1);
			} else {
				if (AA[i].tipo == 1 && AA[i].y > cHeight - AA[i].r - 200)
					AA[i].y = cHeight - AA[i].r - 200;
				if (AA[i].tipo == 2 && AA[i].y < AA[i].r - 50) AA.splice(i, 1);
			}

			if (AA[i]) {
				if (canShoot && AA[i].subtipo != 8) AA[i].l -= 0.005;

				if (AA[i].l <= 0) {
					if (AA[i].subtipo == 8) {
						zzfx(
							...[
								2.46,
								,
								77,
								,
								1,
								3,
								4,
								1.16,
								,
								,
								,
								,
								,
								0.7,
								-30,
								0.5,
								0.2,
								0.63,
								1,
								0.01,
							]
						);
						cost = 0;
						shipsMoving = 0;
						speedOffset = 0;
						canPutItems = false;
						canShoot = false;
						SA = [];
						document.getElementById("gameMSG").style.opacity = "1";
						document.getElementById("gameMSG").style.pointerEvents = "auto";
						document.getElementById("gameMSG").innerHTML =
							"<font style='font-size:25px; color:orange;'>&#x1F4A5;<br><br>Mission Failed<br><br><br></font>" +
							"<div class='blink_me' onclick='tryagain();' style='display:inline-block; text-align:center; padding:6px 20px 6px 20px; font-size:20px; color:#d3fc6f; font-weight:500; box-shadow: 0px 0px 10px 5px #86a145; border-radius:10px; border:3px solid #d3fc6f; background-color:rgba(0,0,0,0.5);'>" +
							"try again</div><br><br><br>";
					}
					zzfx(
						...[
							TIS,
							,
							475,
							,
							0.18,
							0.83,
							2,
							1.86,
							,
							,
							,
							,
							,
							3.2,
							,
							0.8,
							,
							1.5,
							1,
							0.21,
						]
					);
					for (var ex = 0; ex < 10; ex++) {
						ExplosionXY(
							AA[i].x + AA[i].r + Math.floor(Math.random() * 50) - 25,
							AA[i].y + AA[i].r + Math.floor(Math.random() * 50) - 25,
							AA[i].r * Math.floor(Math.random() * 3) + 3,
							1,
							0
						);
					}

					if (AA[i].tipo == 1 && AA[0].l > 0) {
						var qtt = 0;
						switch (AA[i].subtipo) {
							case 1:
								qtt = 3;
								break;
							case 2:
								qtt = 6;
								break;
							case 3:
								qtt = 13;
								break;
							case 4:
								qtt = 22;
								break;
							case 5:
								qtt = 26;
								break;
							case 6:
								qtt = 35;
								break;
							case 7:
								qtt = 40;
								break;
						}
						AA[0].l += qtt;
						if (AA[0].l > 500) AA[0].l = 500;
						newM(AA[i].x, AA[i].y, qtt, 1);
						document.getElementById("pasta").style.color = "yellow";
						document.getElementById("pasta").style.fontSize = "16px";
						setTimeout(function () {
							document.getElementById("pasta").style.fontSize = "14px";
							document.getElementById("pasta").style.color = "cyan";
						}, 200);
					}
					AA.splice(i, 1);
				}
			}
		}

		context.fillStyle = "#000000";
		context.fillRect(0, 0, cWidth + 1, cHeight);

		for (i = 0; i < Stars.length; i++) {
			context.fillStyle = "#" + Stars[i].color;
			context.fillRect(
				Stars[i].x,
				Stars[i].y,
				Stars[i].shine / 1.7,
				Stars[i].shine / 2.3
			);
		}

		for (i = 0; i < AA.length; i++)
			if (AA[i].subtipo != 0 && (show_vision || AA[i].subtipo == 7)) {
				context.fillStyle = "rgba(150,150,150,0.1)";
				context.beginPath();

				var VisionOffset = AA[i].vision * (AA[i].tipo > 1 ? -1 : 1);
				if (AA[i].subtipo == 7) VisionOffset = 0;

				if (AA[i].tipo == 1)
					context.arc(
						AA[i].x,
						AA[i].y + VisionOffset,
						AA[i].vision,
						0,
						Math.PI * 2
					);
				else
					context.arc(
						AA[i].x,
						AA[i].y + VisionOffset,
						AA[i].vision,
						0,
						Math.PI * 2
					);

				context.fill();
			}

		for (var i = 0; i < AA.length; i++) {
			if (AA[i].tipo == 1) {
				switch (AA[i].subtipo) {
					case 1: {
						context.save();
						context.translate(AA[i].x, AA[i].y);
						context.rotate(
							((Math.PI / 180) * (AA[i].x * 6 + AA[i].y * 6)) % 180
						);
						context.drawImage(
							SPRTships,
							0,
							25,
							25,
							25,
							-50,
							-50,
							AA[i].r * 5,
							AA[i].r * 5
						);
						context.restore();
						break;
					}
					default: {
						context.drawImage(
							SPRTships,
							(AA[i].subtipo - 1) * 25,
							25,
							25,
							25,
							AA[i].x - (AA[i].r * sizeRatio) / 4,
							AA[i].y - (AA[i].r * sizeRatio) / 4,
							AA[i].r * 5,
							AA[i].r * 5
						);
						break;
					}
				}
			} else {
				switch (AA[i].subtipo) {
					case 1: {
						context.save();
						context.translate(AA[i].x, AA[i].y);
						context.rotate(
							((Math.PI / 180) * (AA[i].y * 6 + AA[i].x * 6)) % 180
						);
						context.drawImage(
							SPRTships,
							0,
							0,
							25,
							25,
							-50,
							-50,
							AA[i].r * 5,
							AA[i].r * 5
						);
						context.restore();
						break;
					}
					default: {
						context.drawImage(
							SPRTships,
							(AA[i].subtipo - 1) * 25,
							0,
							25,
							25,
							AA[i].x - (AA[i].r * sizeRatio) / 4,
							AA[i].y - (AA[i].r * sizeRatio) / 4,
							(AA[i].r * sizeRatio) / 2,
							(AA[i].r * sizeRatio) / 2
						);
						break;
					}
				}
			}

			var vidaBarTop = AA[i].y + AA[i].r + 10;
			if (AA[i].tipo == 1) vidaBarTop = AA[i].y + AA[i].r - 50;
			if (AA[i].subtipo == 8) {
				vidaBarTop += 70;
				context.fillStyle = "#505050";
				context.fillRect(
					AA[i].x - AA[i].r - 25 - 3,
					vidaBarTop,
					AA[i].r * 2 + 50 + 6,
					9
				);

				context.fillStyle = "hsl(" + AA[i].l * 0.18 + ",100%,50%)";
				context.fillRect(
					AA[i].x - AA[i].r - 25,
					vidaBarTop + 3,
					Math.abs(((AA[i].r * 2 + 55) / AA[i].inilife) * AA[i].l) + 2,
					3
				);
			} else {
				context.fillStyle = "black";
				context.fillRect(AA[i].x - AA[i].r, vidaBarTop, AA[i].r * 2, 5);

				context.fillStyle = "hsl(" + AA[i].l + ",100%,50%)";
				context.fillRect(
					AA[i].x - AA[i].r,
					vidaBarTop - 1,
					Math.abs(((AA[i].r * 2) / AA[i].inilife) * AA[i].l),
					3
				);
			}
		}

		for (var i = 0; i < SE.length; i++) {
			if (SE[i] && SE[i].tipo == 1) {
				SE[i].shine -= 0.02;
				context.drawImage(
					SPRTexplosions,
					SE[i].sprite * 6,
					0,
					6,
					6,
					SE[i].x - SE[i].r,
					SE[i].y - SE[i].r,
					SE[i].r,
					SE[i].r
				);

				if (mainCounter % (Math.floor(Math.random() * 15) + 1) == 0)
					SE[i].sprite++;

				if (SE[i].sprite >= 12) SE.splice(i, 1);
			}
			if (SE[i] && SE[i].tipo == 2) {
				SE[i].shine -= 0.02;
				context.drawImage(
					SPRTexplosions,
					SE[i].sprite * 6,
					6,
					6,
					6,
					SE[i].x - SE[i].r,
					SE[i].y - SE[i].r,
					SE[i].r * 2,
					SE[i].r * 2
				);

				if (mainCounter % (Math.floor(Math.random() * 15) + 1) == 0)
					SE[i].sprite++;

				if (SE[i].sprite >= 12) SE.splice(i, 1);
			}
		}

		for (var i = 0; i < SA.length; i++) {
			if (SA[i].tipo == 1) {
				if (SA[i].shootType == 6)
					context.drawImage(
						SPRTweapons,
						2,
						12,
						3,
						9,
						SA[i].x - 5,
						SA[i].y,
						12,
						50
					);
				else
					context.drawImage(
						SPRTweapons,
						0,
						12,
						1,
						9,
						SA[i].x - 1,
						SA[i].y,
						5,
						30
					);
			} else {
				if (SA[i].shootType == 6)
					context.drawImage(
						SPRTweapons,
						2,
						0,
						3,
						9,
						SA[i].x - 5,
						SA[i].y,
						12,
						50
					);
				else
					context.drawImage(
						SPRTweapons,
						0,
						0,
						1,
						9,
						SA[i].x - 1,
						SA[i].y,
						5,
						30
					);
			}
		}

		for (i = 0; i < SM.length; i++) {
			context.fillStyle = "black";
			context.font = sizeRatio * 3.5 + "px Arial";
			context.fillText(
				"+" + SM[i].qtt,
				SM[i].x - sizeRatio * 0.5 + 2,
				SM[i].y + sizeRatio * 0.5 + 2 + 50
			);

			var opa = SM[i].step > 65 ? 1 - (SM[i].step - 50) / 65 : 1;
			context.fillStyle = "rgba(255,255,0," + opa + ")";
			context.font = sizeRatio * 3.5 + "px Arial";
			context.fillText(
				"+" + SM[i].qtt,
				SM[i].x - sizeRatio * 0.5,
				SM[i].y + sizeRatio * 0.5 + 50
			);
		}
	}

	var SPRTships = new Image();
	var SPRTexplosions = new Image();
	var SPRTweapons = new Image();
	SPRTships.src = "img/SPRTships.png?v=" + Date();
	SPRTships.onload = function () {
		SPRTexplosions.src = "img/SPRTexplosions.png?v=" + Date();
	};
	SPRTexplosions.onload = function () {
		SPRTweapons.src = "img/SPRTweapons.png?v=" + Date();
	};
	SPRTweapons.onload = function () {
		render();
	};
})(this, this.document);

resize();

