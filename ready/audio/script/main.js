window.onload=function(){
	var json=[
	    {
	        "music_URL1": "http://yinyueshiting.baidu.com/data2/music/136637540/11202591443232861320.mp3?xcode=4dba6cc7e7a730d48e84979b09d702df",
	        "music_URL2": "http://yinyueshiting.baidu.com/data2/music/136637540/11202591443232861320.mp3?xcode=4dba6cc7e7a730d48e84979b09d702df",
	        "song_name": "至少还有你",
	        "singer_name": "张国荣"
	    },
	    {
	        "music_URL1": "http://file.qianqian.com//data2/music/134368537/134368537.mp3?xcode=e31fe004fbdd44abbdfb5657fcf2438e",
	        "music_URL2": "music/莫文蔚 - 阴天.mp3",
	        "song_name": "莫文蔚 - 阴天",
	        "singer_name": "莫文蔚"
	    }
	];
	for(var i in json){
		var oDiv=document.getElementById("content");
		new CreateBall(json[i],oDiv);
	}
	var oMusic=document.getElementById("music");
	var oSinger=document.getElementById("singer");
	var oSou1=document.getElementById("sour1");
	var oPicture=document.getElementById("picture");
	var oSou2=document.getElementById("sour2");
	var oAudio=document.getElementById("audio");
	var oSwitch=document.getElementById("switch");
	var oDiv=document.getElementById("content");
	var oMusic_box=document.getElementById("music_box");
	var aButton=document.getElementsByClassName("button");

	// oSwitch.onclick=function(){
	// 	oDiv.innerHTML="";
	// 	oMusic.innerHTML="歌曲名";
	// 	oSinger.innerHTML="歌手";
	// 	oSou1.setAttribute("src","");
	// 	oSou2.setAttribute("src","");
	// 	oAudio.load();
	// 	oPicture.style.backgroundColor="#66CCCC";
	// 	ajax("text.json?t="+new Date().getTime(),function(str){
	// 		var json=eval(str);
	// 		for(var i in json){
	// 			var oDiv=document.getElementById("content");
	// 			new CreateBall(json[i],oDiv);
	// 		}
	// 	},function(){
	// 		alert("失败");
	// 	})
	// }

	oAudio.addEventListener("play",function(){
		if(document.getElementById("active")){
			var oActive=document.getElementById("active");
			var oActive_btn=oActive.getElementsByClassName("button")[0];
			oActive_btn.setAttribute("src","img/icon/pause.png")
		}
		
	},false);
	oAudio.addEventListener("pause",function(){
		if(document.getElementById("active")){
			var oActive=document.getElementById("active");
			var oActive_btn=oActive.getElementsByClassName("button")[0];
			oActive_btn.setAttribute("src","img/icon/play.png")
		}
	},false);
	oAudio.addEventListener("ended",function(){
		if(document.getElementById("active")){
			var oActive=document.getElementById("active");
			var oActive_btn=oActive.getElementsByClassName("button")[0];
		}
		oAudio.pause();
	},false);
}

var c=["#EE3324","#F9A61A","#86BC40","#224096","#F47320","#1481A0","#F0F1AD"];

function random(iMin,iMax)
{
	return(parseInt(Math.random()*(iMax-iMin)+iMin));
}

function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj,false)[name];
	}
}

function CreateBall(json_,oDiv){

	var _this=this;
	this.music_URL1=json_.music_URL1;
	this.music_URL2=json_.music_URL2;
	this.song_name=json_.song_name;
	this.singer_name=json_.singer_name;

	this.music_ball=document.createElement('div');
	this.music_ball.className="music_ball";

	this.source_box=document.createElement('div')
	this.source_box.className="source_box";

	this.source1=document.createElement('source');
	this.source1.className="source1";
	this.source1.setAttribute("src",this.music_URL1);

	this.source2=document.createElement('source');
	this.source2.className="source2";
	this.source2.setAttribute("src",this.music_URL2);

	this.source_box.appendChild(this.source1);
	this.source_box.appendChild(this.source2);
	this.music_ball.appendChild(this.source_box);

	this.music_content=document.createElement("div");
	this.music_content.className="music_content";

	this.song=document.createElement("span");
	this.song.className="song";
	this.song.innerHTML=this.song_name;

	this.button=document.createElement("img");
	this.button.className="button";
	this.button.setAttribute("src","img/icon/play.png");

	this.singer=document.createElement("span");
	this.singer.className="singer";
	this.singer.innerHTML=this.singer_name;

	this.music_content.appendChild(this.song);
	this.music_content.appendChild(this.button);
	this.music_content.appendChild(this.singer);

	this.br=document.createElement("br");
	this.music_content.insertBefore(this.br,this.singer);
	this.br=document.createElement("br");
	this.music_content.insertBefore(this.br,this.button);

	this.music_ball.appendChild(this.music_content);
	oDiv.appendChild(this.music_ball);

	this.wh=random(150,250);
	startMove(this.music_ball,{"width":this.wh,"height":this.wh});

	// this.music_ball.style.width=this.wh+"px";
	// this.music_ball.style.height=this.wh+"px";
	
	this.co=c[random(0,6)];
	this.music_ball.style.backgroundColor=this.co;

	this.pw=parseInt(this.music_ball.parentNode.offsetWidth);//ie下用getAttribute(obj,"width")有bug，为NaN
	this.ph=parseInt(getStyle(this.music_ball.parentNode,"height"));
	this.l=random(0,this.pw-this.wh);
	this.t=random(0,this.ph-this.wh);
	this.music_ball.style.left=this.l+"px";
	this.music_ball.style.top=this.t+"px";

	this.disX=0;
	this.disY=0;
	this.music_ball.onmousedown=function(ev){
		var ev=ev||event;
		_this.fnDown(ev);
		return false;
	}

	this.button.onclick=function(ev){
		var ev=ev||event;
		_this.fnClick(ev);
	}
	this.music_ball.onmouseenter=function(ev){
		var ev=ev||event;
		_this.fnMouseenter(ev);
	}
	this.music_ball.onmouseleave=function(ev){
		var ev=ev||event;
		_this.fnMouseleave(ev);
	}
}

CreateBall.prototype.fnDown=function(ev){
	var ev=ev||event;
	var aBalls=document.getElementsByClassName("music_ball");
	for(var i=0;i<aBalls.length;i++){
		aBalls[i].style.zIndex=0;
	}
	this.music_ball.style.zIndex=99;
}

CreateBall.prototype.fnClick=function(ev){
	var ev=ev||event;
	var _this=this;
	var aBalls=document.getElementsByClassName("music_ball");
	var aButton=document.getElementsByClassName("button");
	for(var i=0;i<aBalls.length;i++){
		aBalls[i].setAttribute("id","");
		aButton[i].setAttribute("src","img/icon/play.png")
	}
	this.music_ball.setAttribute("id","active");
	this.button.setAttribute("src","img/icon/pause.png")

	var oMusic=document.getElementById("music");
	var oSinger=document.getElementById("singer");
	var oSou1=document.getElementById("sour1");
	var oSou2=document.getElementById("sour2");
	var oPicture=document.getElementById("picture");
	var oAudio=document.getElementById("audio");

	if(oSou1.getAttribute("src")!=this.music_URL1){

		oMusic.innerHTML=this.song_name;
		oSinger.innerHTML=this.singer_name;
		oSou1.setAttribute("src",this.music_URL1);
		oSou2.setAttribute("src",this.music_URL2);
		oAudio.load();
		oPicture.style.backgroundColor=this.co;
		this.button.setAttribute("src","img/icon/pause.png")
	}else{
		if(oAudio.ended){
			oAudio.currentTime=0;
		}
		if(oAudio.paused){
			oAudio.play();
			this.button.setAttribute("src","img/icon/pause.png")
		}else{
			oAudio.pause();
			this.button.setAttribute("src","img/icon/play.png")
		}
	}
}
CreateBall.prototype.fnMousedown=function(ev){

}
CreateBall.prototype.fnMouseenter=function(ev){
	var ev=ev||event;
	var _this=this;
	startMove(this.music_ball,{"width":this.wh+100,"height":this.wh+100,"top":this.t-50,"left":this.l-50});
}
CreateBall.prototype.fnMouseleave=function(ev){
	var ev=ev||event;
	var _this=this;
	startMove(this.music_ball,{"width":this.wh,"height":this.wh,"top":this.t,"left":this.l});
}