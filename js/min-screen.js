;(function (doc, win, undefined) {//rem动态计算代码 于https://www.cnblogs.com/tangshiwei/p/5959998.html复制
          var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in win? 'orientationchange' : 'resize',
            recalc = function () {
              var clientWidth = docEl.clientWidth;
              if (clientWidth === undefined) return;
              docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
            };
          if (doc.addEventListener === undefined) return;
          win.addEventListener(resizeEvt, recalc, false);
          doc.addEventListener('DOMContentLoaded', recalc, false)
        })(document, window);
        
$(function (){
	var ary = [
		{"color":"pink","width":70},
		{"color":"orange","width":75},
		{"color":"lightblue","width":70},
		{"color":"springgreen","width":65},
		{"color":"honeydew","width":100},
		{"color":"honeydew","width":100},
		{"color":"honeydew","width":100},
		{"color":"honeydew","width":100}
	]
	var make = false;
	
	$('#emailclick').unbind('click').bind('click',function (){
		document.querySelector('#send').click();
	});
	$('#sendemail').unbind('click').bind('click',function (){
		document.querySelector('#send').click();
	});
	
	setTimeout(function (){
		$('.introduce').children().css({"animation":"move 2s"});
	},1000);
	
//	load();
	loads();
	$(window).unbind('resize').bind('resize',loads);
	function load(){
		if($(window).height()>750){
			var dom = document.querySelectorAll('.Graphical div');
			for(var i = 0;i < dom.length;i++){
				$(dom[i]).css({"background-color":ary[i].color,"width":ary[i].width+"%"});
			}
		}
	}
	
	
	function loads(){
		if($('.min-screen').css('display')=='none'){
			return;
		}
		$(window).scroll(function (){
		var dom = document.querySelectorAll('.Graphical div');
		if($(window).scrollTop()<750-$(window).height()){
			for(var i = 0;i < dom.length;i++){
				$(dom[i]).css({"width":0});
			}
		}
		else{
			for(var i = 0;i < dom.length;i++){
				$(dom[i]).css({"background-color":ary[i].color,"width":ary[i].width+"%"});
			}
		}
	});
	
	$(".Graphical").hover(function (){
		$(this).prev().css({"color":"red"});
	},function (){
		$(this).prev().css({"color":"black"});
	});
	}
})
