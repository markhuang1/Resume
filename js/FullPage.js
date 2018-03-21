function fullPage(jso,judeg,generate,jsoz){
	
	var mark = false;//创建导航开关标识符false代表关闭
	var scrollNum = 0;//初始化鼠标滚轮
	var nowPage=0;//记录当前页为第几页
	var pageHome = document.getElementById('pagehome');
	var rightNav = document.getElementById('right-nav');
	var rightPage = document.querySelector('.right-page');
	var page = document.getElementsByClassName('page');
	var lengths = page.length;
	for( var i = 0,len = page.length; i < len;i++){
		page[i].style.cssText = "background-color:"+jso["color"+(i+1)]+";margin-top:0;";//设置每一页的样式
	}
	
	//处理滚轮兼容
	var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //火狐和其他浏览器兼容
    
	if (window.attachEvent) //IE兼容  
	    pageHome.attachEvent("on"+mousewheelevt, pageScroll)  
	else {
	    pageHome.addEventListener(mousewheelevt, pageScroll, false);
	}
	
	//动态生成小圆点
	emit(page.length);
	
	//设置右边侧栏位置
	posiTion();
	
	//小圆点变色
	change();
	
	//向上箭头生成以及动画
	animationUp();
	
	//创建右侧顶部导航跳转菜单
	leftNav();
	
	//添加滚轮事件
	function pageScroll() {
		if(scrollNum==1){
			return;
		}
		if(!judeg()){
			return;
		}
		var height = document.documentElement.clientHeight;
		var top = parseInt(page[0].style.marginTop.toString().replace(/px/g),"");
		var e = e || window.event;
		if(e.wheelDelta){
			if(e.wheelDelta > 0){
				pageScrollUp(height,top);
			}
			else {
				pageScrollDown(height,top);
			}
		}
		else{
			if(e.detail > 0){
				pageScrollUp(height,top);
			}
			else {
				pageScrollDown(height,top);
			}
		}
		height = document.documentElement.clientHeight;
		top = parseInt(page[0].style.marginTop.toString().replace(/px/g),"");
		nowPage = top/height;
		change();
		scrollNum = 1;
		if(nowPage==0||nowPage==-(page.length-1)){
			scrollNum = 0;
			animate();
			return;
		}
		else{
			setTimeout(function(){
				scrollNum = 0;
				animate();
			},500);	
		}
	}
	
	function pageScrollUp(height,top) {
		if(top!=0){
			page[0].style.marginTop = top+height+"px";
		}
		else{
			console.log("到头啦");
		}
	}
	
	function pageScrollDown(height,top) {
		if(-top>=(page.length-1)*height){
			console.log("到底了");
		}
		else{
			page[0].style.marginTop = top-height+"px";
		}
	}
	
	window.addEventListener('resize',function(){
		rander();
		posiTion();
	},false);
	
	function rander() {//重新渲染margintop
		var height = document.documentElement.clientHeight;
		page[0].style.marginTop = height*nowPage+"px";
	}
	
	function emit(leng) {//创建小圆点
		for(var i = 0;i < leng;i++){
			var div = document.createElement('div');
			div.setAttribute('class','right-circ')
			div.addEventListener('click',jump,true);
			div.setAttribute('index',i);
			rightNav.appendChild(div);
		}
		
	}
	
	function posiTion() {//设置右侧导航栏位置居中
		rightNav.style.top = parseInt(document.documentElement.clientHeight*0.5)-parseInt(window.getComputedStyle(rightNav).height.toString().replace(/px/g,"")*0.5)+"px";
	}
	
	//小圆点变色（包含点击事件变色）
	function change() {
		var div = document.getElementById('right-nav').querySelectorAll('div');
		for(var i = 0,leng = div.length;i < leng;i++){
			div[i].style.backgroundColor = "white";
		}
		div[-nowPage].style.backgroundColor  = "black";
	}
	
	//点击小圆点跳转
	function jump() {
		if(!judeg()){
			return;
		}
		var e = e || window.event;
		nowPage = -(e.target.getAttribute('index'));
		rander();
		change();
		animate();
	}
	
	function animationUp() {//添加上划动画
		for (var i = 1;i<lengths;i++){
			var div = document.createElement('div');
			div.innerHTML = jso.icon;
			div.addEventListener('click',upPage,true);
			div.setAttribute('class','clickup');
			page[i].appendChild(div);
		}
	}
	
	function upPage() {
		if(nowPage>-1){
			return;
		}
		else{
			nowPage = nowPage+1;
			rander();
			change();
		}
		
	}
	
	function leftNav() {
		var div = document.createElement('div');
		div.setAttribute('class','rightOpen')
		for(var i = 0;i<3;i++){
			var div1 = document.createElement('div');
			div1.setAttribute('class',"animate-Openright")
			div.appendChild(div1);
		}
		div.addEventListener('click',function (){;
			if(!judeg()){
				return;
			}
			toggles(this);
		},true);//添加点击事件打开关闭
		pageHome.appendChild(div);
	}
	
	function toggles(div) {//打开与关闭开关事件
		var div = div.querySelectorAll('div');
		if(!mark){
			div[0].style.cssText = 'transform-origin: 0 50%;transform: rotateZ(50deg);';
			div[1].style.cssText = 'transition: all 1s;width: 0;';
			div[2].style.cssText = 'transition: all 1s;transform-origin: 0 50%;transform: rotateZ(-50deg)';;
			Push();//调用推动页面方法，用来展示右侧导航菜单
			
		}
		else{
			for(var i = 0;i<div.length;i++){
				div[i].style.cssText = '';
			}
			Push();
			
		}
	}
	
	function Push() {
		if(!mark){
			pageHome.setAttribute('class',"pagehome");
			rightPage.style.right = '0%';
			pageHome.style.transition = 'all .5s';
			mark = true;
		}
		else{
			pageHome.removeAttribute('class',"pagehome")
			rightPage.style.right = '-40%';
			pageHome.style.transition = 'all .5s';
			mark = false;
		}
		
	}
	
	function animate(){//当前页显示动画
		if(-nowPage==1){
			animate1();
		}
		else if(-nowPage==2){
			animate2();
		}
		else if(-nowPage==3){
			animate3();
		}
		else if(-nowPage==4){
			animate4();
		}
		else if(-nowPage==5){
			animate5();
		}
		
	}
	
	function animate1(){
		var photo = document.querySelector('.photo');
		photo.style.cssText = 'opacity: 1;animation: turnaround 1.5s ease;'
	}
	function animate2(){
		$(".clow").addClass("setheight");
		var dom = $(".power-basics>li");
		var leng = dom.length;
		for(let i=0;i<leng;i++){
			$(dom[i]).addClass("power-basics"+(i+1))
		}
		dom = $(".power-understand>li");
		leng = dom.length;
		for(let i=0;i<leng;i++){
			$(dom[i]).addClass("power-understand"+(i+1))
		}
	}
	function animate3(){
		document.querySelector(".exhibition").style.cssText = "margin-left:0;opacity: 1;"
	}
	function animate4(){
		$(".li1")[0].style.left=0;
		$(".li2")[0].style.right=0;
		$(".li3")[0].style.left=0;
		$(".li4")[0].style.right=0;
	}
	function animate5(){
		document.querySelector('.code').style.cssText = 'margin-left: -200px;';
	}
}
