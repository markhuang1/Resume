window.onload = function (){
	var time = false;
	var maxSong = 0;//最大歌曲数
	var state;//保存定时器
	var jsonz;
	var jso = {
		"color1":"white",
		"color2":"white",
		"color3":"white",
		"color4":"white",
		"color5":"white",
		"color6":"blue",
		"color7":"green",
		"color8":"black",
		"icon":"^"
	}
	var c = new fullPage(jso,judge,generate,jsonz);
	
	//播放控制
	var li = document.querySelectorAll('.play-controls li');
	li[0].addEventListener('click',last,true);//上一首
	li[1].addEventListener('click',stopPlay,true);//暂停
	li[2].addEventListener('click',next,true);//下一首
	
	//添加拖动事件
	
	music()//音乐控制
	
	voice()//音量控制
	
	ini()//初始化播放器
	
	links()//hover 个人链接
	
	loading();//加载动画
	
	function homePageShow() {//主页动画
//		var temp = 0;
//		var p = document.getElementsByClassName('pagechild')[0];
//		p =  p.querySelectorAll('p');
//		var clear = setInterval(function (){
//			p[temp].remove();
//			if(temp>=p.length-1){
//				clearInterval(clear);
				time = true;
				hrshow();
				mouseOver();//添加鼠标放上事件
//				return;
//			}
//			p[temp].style.cssText = 'animation: shows 3s';
//			temp++;
//		},3000);
	}
	
	function hrshow() {
		var content = document.querySelector('.content');
		var homePage = document.querySelector('.home-nav');
		content.style.cssText = 'margin-top: 10px; visibility: visible;';
		homePage.style.cssText = 'left: 10px;'
	}
	
	function mouseOver(){//添加鼠标进入与移出事件
		var contents  = document.querySelector('.contents');
		var content = document.querySelector('.content');
		var e = e || window.event;	
		content.addEventListener('mousemove',function (){rotateXY(e,contents,content)},false);//鼠标进入事件
		content.addEventListener('mouseout',function (){recover(e,contents,content)},false);//鼠标移出事件
	}
	
	function rotateXY(e,contents,content) {//鼠标移入旋转XY
		var distanceX = event.clientX-contents.offsetLeft;
		var distanceY = event.clientY-contents.offsetHeight;
		content.style.cssText = 'margin-top:20px;box-shadow: black 0 0 20px;visibility: visible;';
		if(distanceX>300){
			contents.style.cssText = 'transform: translateX('+(distanceX-300)/300*20+'px) translateY('+(distanceY-150)/150*20+'px) ;height:340px;width:640px;transition:all 0s';
		}
		else if(distanceX<300){
			contents.style.cssText = 'transform: translateX('+(300-distanceX)/300*(-30)+'px) translateY('+(150-distanceY)/150*-20+'px);height:340px;width:640px;transition:all 0s';
		}
	
	}
	
	function recover(e,contents,content) {//移出恢复原样
		contents.style.cssText = 'transform: translateX(0px) translateY(0px);height:320px;width:620px';
		content.style.cssText = 'margin-top:10px;box-shadow: black 0 0 10px;visibility: visible;';
	}
	function loading(){
		var loadin = document.querySelector('#loading');
		loadin.style.cssText = 'top: -100%;';
			
		homePageShow();
	}
	
	function judge(){
		return time;
	}
//	function callback(data){
//		console.log(data);
//	}
	response();
	function response(){
//		var script = document.createElement('script');
//		script.src = "http://s.music.163.com/search/get/?type=1&s=Frontier&limit=10&offset=0&version=1&cb=callback";
//		document.head.appendChild(script);
		var xmlhttp;
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		  
		  xmlhttp.onreadystatechange = function(){
		  	if (xmlhttp.readyState==4 && xmlhttp.status==200){
			   jsonz = JSON.parse(xmlhttp.responseText);
			   generate(jsonz)
			  }
		  }
		  xmlhttp.open('GET','json.json',true);
		  xmlhttp.send();
}
	
	function last(){//上一首
		//获取当前播放元素
		var nowDom = $("div .songs-list[index="+$('audio').attr('index')+"]");
		if(nowDom.prev('div').length!=0){
			nowDom.prev('div').click();
		}
		else{
			$("div .songs-list[index="+maxSong+"]").click();
		}
	}
	var state;//获取状态
	document.querySelector('audio').addEventListener('ended',function(){
		plays(true);
		next();
//		document.querySelector('audio').play();
//		setTimeout(function (){
//			stopPlay();
//		},10);
	});
	
	function stopPlay(){//暂停播放
		var play = document.querySelector('audio');
		try{
			clearInterval(state);
		}
		catch(err){
//			console.log(err);
		}
		if(play.paused){
			(function (){
				state = setInterval(function (){
					plays(false);
				},1000);	
			})()
			play.play();	
			li[1].innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
		}
		else{
			clearInterval(state);
			play.pause();
			li[1].innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
		}
	}
	function next(){//下一首
		var nowDom = $("div .songs-list[index="+$('audio').attr('index')+"]");
		if(nowDom.next('div').length!=0){
			nowDom.next('div').click();
		}
		else{
			$("div .songs-list[index='0']").click();
		}
	}
	
	function plays(yes){
		var audios = document.querySelector('audio');
		var probars = document.querySelector('.probar-circ');
		probar(audios,probars,yes);
	}
	
	function probar(audios,probars,yes){//设置进度条位置
		var nowTime = audios.currentTime;
		var allTime = audios.duration;
		if(yes){
			nowTime = 0;
			allTime = 0;
		}
		sets(nowTime,allTime,probars);
	}
	function sets(nowTime,allTime,probars){
		probars.style.cssText = "width:"+nowTime/allTime*100+"%";
	}
	var up  = true;
	function pushs(circ,sure,dom,dom2,dom3){
		var audios = document.querySelector('audio');
		$(circ).click();
		$(circ).unbind('mousedown').bind('mousedown',function(){
			
			$(circ).unbind('mouseup').bind('mouseup',function (){//添加点击事件，移出body的move事件
				var scal;
				if(sure){
					audios.play();
					stopPlay();
					scal =parseInt(dom3.style.width.toString().replace(/px/g,"")); 
				}
				else{
					scal =parseInt(dom3.style.height.toString().replace(/px/g,""));
				}
				if(sure){
					var allTime = audios.duration;
					var nowTime = parseInt(allTime*(scal/100)); 
					audios.currentTime = nowTime;
					audios.paused;
					stopPlay();
				}
				else{
					audios.volume = parseFloat(scal/100);
				}
				$(document.body).unbind('mouseup');
				$(document.body).unbind('mousemove');//移出body的mousemove事件
				return;
			
		});
			finds(dom,sure,dom2,audios,dom3);
			$(document.body).unbind('mouseup').bind('mouseup',function(){
				$(circ).mouseup();//点击一次让后移出
			});
		});
		
	}
	function finds(dom,sure,dom2,audios,dom3){
		$(document.body).unbind('mousemove').bind('mousemove',function(){
			moves(dom,sure,dom2,audios,dom3);
		});
	}
	function moves(dom,sure,dom2,audios,dom3){
		var pro;
		var x;
		var width;
		pro = document.querySelector(dom2);
		if(sure){
			audios.play();
			stopPlay();
			x = $(pro).offset().left;//返回元素距离文档的偏移量
			x = event.clientX-x;
		}
		else{
			x = $(pro).offset().top;//返回元素距离文档的偏移量
			x = event.clientY-x;
		}
		
		pro = document.querySelector(dom2);
		if(sure){
			width = parseInt(window.getComputedStyle(pro).width.toString().replace(/px/g,""));
		}
		else{
			width = parseInt(window.getComputedStyle(pro).height.toString().replace(/px/g,""));
		}
		if(x/width*100>100){
			return;
		}
		if(sure){
			dom3.style.cssText = 'width: '+x/width*100+'%;';
		}
		else{
			if((1-x/width)*100>100){
				return;
			}
			dom3.style.cssText = 'height: '+(1-x/width)*100+'%;';
		}
		
		//设置播放位置
		//获取播放时长

	}
	
	//生成歌曲列表
	function generate(jsoz){
		$('.box-list')[0].innerHTML = "";
		var len = jsoz.audios.length;
		var height = $('.box-list').height();
		if(len>Math.floor(($(window).height()-120)/110)&&$(window).height()<220){
			return;
		}
		else if(len>Math.floor(($(window).height()-120)/110)){ 
			len = Math.floor(($(window).height()-120)/110);
		}
		maxSong = len-1;
		for(var i = 0;i<len;i++){
			var str = `
				<div class="songs-list">
								
								<div class="song-pic" style = 'background-image:url(${jsoz.audios[i].picUrl});background-size:cover'>
									
								</div>
								
								<div class="songs-name">
									<div>${jsoz.audios[i].name}</div>
									<div>${jsoz.audios[i].artists}</div>
								</div>
							
							</div>
			`
			$('.box-list').append($(str));
			$($('.songs-list')[i]).data("url",jsoz.audios[i].audio);
			$($('.songs-list')[i]).data("picurl",jsoz.audios[i].picUrl);
			$($('.songs-list')[i]).attr('index',i);
			$($('.songs-list')[i]).bind('click',function(){
				$('audio').attr('src',$(this).data('url'));
				$('audio').attr('index',$(this).attr('index'));
				$('.pic').css({'background-image':'url('+$(this).data('picurl')+')'});
				$('.right-page').css({'background-image':'url('+$(this).data('picurl')+')','background-size':'cover'});
				li[1].click();
			})
		}
	}
	
	//音量控制
	function voice(){
		document.querySelector('.voice').addEventListener('mousedown',function(){
			var circ = document.querySelector('.voice-circ');
			var sure = false;
			var dom = document.querySelector('.voice');
			var dom2 = '.voice';
			var dom3 = document.querySelector('.voice-controls');
			pushs(circ,sure,dom,dom2,dom3)	// 1：需要点击的元素 2：布尔true表示调整音频  false表示调整声音 3：dom表示控制条最底层元素 4：dom2表示控制条最底层元素
			//类名 5表示需要移动的元素
		},true);
	}
	
	//初始化播放器
	function ini(){
		document.querySelector('audio').volume = 0.5;
	}
	
	//音乐控制
	function music(){
		document.querySelector('.circ').addEventListener('mousedown',function(){//播放时间控制
			var circ = document.querySelector('.circ');
			var dom = document.querySelector('.probar');
			var dom2 = '.probar';
			var dom3 = document.querySelector('.probar-circ')
			pushs(circ,true,dom,dom2,dom3);// 1：需要点击的元素 2：布尔true表示调整音频  false表示调整声音 3：dom表示控制条最底层元素 4：dom2表示控制条最底层元素
			//类名 5表示需要移动的元素
		},true);
	}
	
	window.onresize = function (){
		generate(jsonz);
	}
	console.log("2018-03-02更新，感谢秋叶网博客提供的免费空间以及免费域名（http://www.mizuiren.com/）");
	console.log("网页借鉴了网上一些简历的设计风格，我简直没有艺术细菌 ，技术又垃圾，只能做到这个样子了");
	console.log("本站除了第三页的jQuery图标插件，其它功能基本上是原生JavaScript实现，中间参杂了一小部分jQuery代码");
	console.log("由于对DOM的频繁操作，使用起来会有一些卡顿，右上角按钮打开右侧菜单，音频时长和音量拖动有bug，暂未解决，只要最后鼠标归位到拖动圆点上就无bug");
	console.log("如果有什么意见或建议欢迎发送邮件到我的邮箱 iCloud邮箱：18681644184@iCloud.com 或者QQ邮箱：1395410509@qq.com");

	function links(){//hover 个人链接
		$('i').hover(function (){
			$(this).next().css({'display':'block'});
		},function (){
			$(this).next().css({'display':'none'});
		});
	}
	
	//点击放大图片
	function big(){
	var img = document.getElementsByClassName("producte");
	for(var i = 0 ; i < img.length ; i++){
		img[i].addEventListener("click",function (){
			biger($(this).css("background-image").replace('url(','').replace(')','').replace('"','').replace('"',''));
		});
	}
}
big();
function biger(sr){
	var body = document.getElementsByTagName("body")[0];
	var wid = document.documentElement.clientWidth;
	var hei =document.documentElement.clientHeight;
	var div = document.createElement("div");
	var img = document.createElement("img");
	var clos= document.createElement("div");
	sets(clos,img,div,sr,wid,hei,body);
	div.appendChild(clos)
	div.appendChild(img);
	body.appendChild(div);
	
}
function sets(clos,img,div,sr,wid,hei,body){
	clos.width = "60px";
	clos.height = "60px"
	clos.style.fontSize = "30px";
	clos.style.lineHeight ="60px";
	clos.style.color = "black";
	clos.style.float = "right";
	clos.innerHTML = "<i class='fa fa-times' aria-hidden='true'></i>";
	img.src = sr;
	img.style.display = "block";
	img.style.margin = "auto";
	img.style.marginTop = "10%";
	img.setAttribute("class","bigers");
	div.setAttribute("class","div1");
	div.style.zIndex = 9999;
	div.style.width = wid + "px";
	div.style.height = hei + "px";
	div.style.position = "fixed";
	div.style.left ="0px";
	div.style.top = "0px";
	div.style.transition = "all 1s";
	div.style.backgroundColor = "rgba(0,0,0,0.5)";
	div.addEventListener("click",function(event){
		div.style.opacity = "0";
		div.childNodes[1].style.animation = "rotas 1s linear";
		setTimeout(function(){
			div.remove();
		},1000);
	});
}
}
