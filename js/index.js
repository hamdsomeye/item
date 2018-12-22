//声明
var imgWp = document.getElementById('bg').getElementsByClassName('imgWp');
var imgBtn = document.getElementById('bg').getElementsByClassName('imgBtn');
var img = document.getElementById('bg').getElementsByClassName('imgNr');
var myscore = document.getElementById('score');
var progress = document.getElementById('progress');

//得分
var score = 0;

//时间 单位毫秒
var time = 30000;
var nowTime = time;



// 主流程
var num = 0;
var mainTi = setInterval(function(){
	num++;
	mainInit();
	
	//相当于定时器执行4次，执行一次if内容
	if(num%4 == 0){
		addImg();
	}


	//控制时间进度条
	nowTime -= 150;
	progress.style.width = nowTime/time * 100 + '%';

	//时间结束游戏结束
	if( nowTime/time <= 0){
		clearInterval(mainTi);
	}
}, 150)


//主流程
function mainInit(){
	for (var i = 0; i < imgWp.length; i++) {

		//getAttribute 获取到的是字符串
		var index = imgWp[i].getAttribute('index')*1;
		var key = imgWp[i].getAttribute('key')*1;

		// 控制index的值
		if(index >= 0 && index <=5){
			index += key;
			if(index > 5){
				imgWp[i].setAttribute('key', '-1');
				index = 4;
			}
		}
		//点击后的流程
		if(index >= 6){
			index += key;
			if(index > 9){
				index = -1;
			}
		}

		//更新index的值
		imgWp[i].setAttribute('index', index);

		//根据index控制图片位置
		img[i].style.left = -216 * index + 'px';

	};
}


//生成
function addImg(){
	while(1){
		//随机取洞 随机取小灰灰或者灰太狼
		var i = Random(0 , 8);
		var type = Random(0 , 1);
		var index = imgWp[i].getAttribute('index');

		//判断洞是否已经有
		if(index == -1){
			//生成
			imgWp[i].setAttribute('index', 0);
			imgWp[i].setAttribute('key', 1);

			//改变类型
			if(type == 0){
				img[i].src = 'img/x.png';
				imgBtn[i].setAttribute('type', -1);
			}else{
				img[i].src = 'img/h.png';
				imgBtn[i].setAttribute('type', 1);
			}
			return;
		}
	}
}


// 取一个随机数，范围是min - max 
function Random(min , max){
	return Math.floor(min + Math.random()*(max-min+1));
}


//用户交互
for (var i = 0; i < imgBtn.length; i++) {
	// imgBtn[i].i = i;
	 aa(i);
};

function aa(i){

	imgBtn[i].onclick = function(){
		var index = imgWp[i].getAttribute('index')*1;
		var key = imgWp[i].getAttribute('key')*1;
		var type = imgBtn[i].getAttribute('type')*1;

		if(index != -1 && type != 0){
			imgWp[i].setAttribute('key', 1);
			imgWp[i].setAttribute('index', 6);
			score += type*10;
			myscore.innerText = score;
			imgBtn[i].setAttribute('type', 0);
		}

	}
}



