$(document).on("pagecreate", "#planefight", function(){
	let clientWidth = document.body.clientWidth;
	let clientHeight = document.body.clientHeight;
	//if (clientWidth > 700) {
		//打开一个新窗口并设置其大小
		//window.open('index.html','','width=600,height=900,location=no,menubar=no,status=no,toolbar=no' );
		//不询问是否关闭
		//window.opener=null;
		//window.open('','_self');
		//关闭自己的窗口
		//window.close();
	//}
	let status = 0;// 游戏状态
	// 设置背景图片和尺寸
	$("#planePanel").css("width", clientWidth + "px")
			.css("height", clientHeight - 45 + "px")
			.css("background-image", "url(images/background.png)")
			.css("background-size", "100% 100%");
	$("#fugai").css({width: clientWidth+"px", height: clientHeight - 45 + "px"});
	// 让飞机根据手指移动
	$("#planePanel").on("mousemove", function(e) {
		if (status == 1) {
			let x = e.pageX;
			let y = e.pageY;
			$("#hero").css("left", x-50 + "px").css("top", y-120 + "px");
		}
	});
	$("#fugai").on("click", function(){
		if (status == 0) {
			status = 1;
			$(this).css("display", "none");
			gameObj.start();
		} else if (status == 3) {
			status = 0;
			clearPanel();
			$("#fugai").css("display", "block");
			$("#startimg").attr("src", "images/start.png");
		}
	});
	$("#planePanel").on("mouseout", function(){
		if (status == 1) {
			status = 2;
			$("#fugai").css("display", "block");
			$("#startimg")[0].src = "images/pause.png";
		}
	});
	$("#planePanel").on("mouseover", function(){
		if (status == 2) {
			status = 1;
			$("#fugai").css("display", "none");
		}
	});
	// 点击返回时
	$("#planeback").on("click", function() {
		clearPanel();
		status = 0;
		$("#fugai").css("display", "block");
		$("#startimg").attr("src", "images/start.png");
	});
	function clearPanel(){
		hero.css({"left":clientWidth/2-50 + "px", "top":clientHeight*2/3+"px"});
		for (let i in bees) {
			bees[i].remove();
		}
		bees = [];
		for (let i in airplanes) {
			airplanes[i].remove();
		}
		airplanes = [];
		for (let i in bullets) {
			bullets[i].remove();
		}
		bullets = [];
	}
	let hero = $("#hero");
	hero.imgs = ["images/hero0.png", "images/hero1.png"];
	hero.count = 0;
	hero.css({"left":clientWidth/2-50 + "px", "top":clientHeight*2/3+"px"});
	hero.timer = null;
	hero.penHuo = function() {
		if (this.timer) {
			clearInterval(this.timer);
		}
		this.timer = setInterval(function() {
			if (status == 1) {
				hero.css("background-image", "url("+hero.imgs[hero.count++%2]+")");
			}
		}, 100);
	};
	hero.stop = function() {
		clearInterval(this.timer);
	};
	hero.isHit = function() {
		for (let i in bees) {
			if (+this.css("left").slice(0,-2)+97 > +bees[i].css("left").slice(0,-2)
					&& +this.css("left").slice(0,-2) < +bees[i].css("left").slice(0,-2)+60
					&& +this.css("top").slice(0,-2)+124>+bees[i].css("top").slice(0,-2)
					&& +this.css("top").slice(0,-2)<+bees[i].css("top").slice(0,-2)+50) {
				gameObj.stop();
				status = 3;
				$("#fugai").css("display", "block");
				$("#startimg")[0].src = "images/gameover.png";
			}
		}
		for (let i in airplanes) {
			if (+this.css("left").slice(0,-2)+97 > +airplanes[i].css("left").slice(0,-2)
					&& +this.css("left").slice(0,-2) < +airplanes[i].css("left").slice(0,-2)+49
					&& +this.css("top").slice(0,-2)+124>+airplanes[i].css("top").slice(0,-2)
					&& +this.css("top").slice(0,-2)<+airplanes[i].css("top").slice(0,-2)+36) {
				gameObj.stop();
				status = 3;
				$("#fugai").css("display", "block");
				$("#startimg")[0].src = "images/gameover.png";
			}
		}
	};
	let bees = [];
	let airplanes = [];
	let bullets = [];
	let beeImg = "images/bee.png";
	let airplaneImg = "images/airplane.png";
	let bulletImg = "images/bullet.png";
	function step(){
		let nextLeft = +this.css("left").slice(0,-2) + this.xspeed;
		let nextTop = +this.css("top").slice(0,-2) + this.yspeed;
		if (nextLeft <= 0) {
			nextLeft = 0;
			this.xspeed = -this.xspeed;
		} else if (nextLeft >= clientWidth - 60) {
			nextLeft = clientWidth - 60;
			this.xspeed = -this.xspeed;
		}
		this.css("left", nextLeft + "px");
		this.css("top", nextTop + "px");
	}
	function outOfPanel() {
		if (+this.css("top").slice(0,-2) > clientHeight || +this.css("top").slice(0,-2) < -100) {
			$(this).remove();
			return true;
		}
		return false;
	}
	function isHit() {
		for (let i in bullets) {
			if (+this.css("left").slice(0,-2)+60 > +bullets[i].css("left").slice(0,-2)
					&& +this.css("left").slice(0,-2) < +bullets[i].css("left").slice(0,-2)+8
					&& +this.css("top").slice(0,-2)+50>+bullets[i].css("top").slice(0,-2)
					&& +this.css("top").slice(0,-2)<+bullets[i].css("top").slice(0,-2)+14) {
				$(this).remove();
				return true;
			}
		}
		return false;
	}
	let enemyFactory = {};
	enemyFactory.timer = null;
	enemyFactory.create = function() {
		if (this.timer) {
			clearInterval(this.timer);
		}
		this.timer = setInterval(function() {
			if (status == 1) {
				let flag = parseInt(Math.random()*5);
				if (flag == 0) {
					let airplane = $("<img style='position: absolute;' src='"+airplaneImg+"'/>");
					let x = parseInt(Math.random()*clientWidth - 50);
					airplane.css({"left": x + "px", "top": "-40px"});
					$("#planePanel").append(airplane);
					airplane.yspeed = 8;
					airplane.step = step;
					airplane.outOfPanel = outOfPanel;
					airplanes.push(airplane);
				} else {
					let bee = $("<img style='position: absolute;' src='"+beeImg+"'/>");
					let x = parseInt(Math.random()*clientWidth - 60);
					bee.css({"left": x + "px", "top": "-50px"});
					$("#planePanel").append(bee);
					bee.xspeed = 3;
					bee.yspeed = 4;
					bee.step = step;
					bee.outOfPanel = outOfPanel;
					bee.isHit = isHit;
					bees.push(bee);
				}
			}
		}, 500);
	};
	enemyFactory.stop = function() {
		clearInterval(this.timer);
	};
	let bulletFactory = {};
	bulletFactory.timer = null;
	bulletFactory.create = function() {
		if (this.timer) {
			clearInterval(this.timer);
		}
		this.timer = setInterval(function(){
			if (status == 1) {
				let bullet = $("<img style='position: absolute;' src='"+bulletImg+"'/>");
				let x = +hero.css("left").slice(0, -2) + 45;
				let y = +hero.css("top").slice(0, -2);
				bullet.css({"left": x + "px", "top": y + "px"});
				$("#planePanel").append(bullet);
				bullet.yspeed = -10;
				bullet.step = step;
				bullet.outOfPanel = outOfPanel;
				bullets.push(bullet);
			}
		}, 200);
	};
	bulletFactory.stop = function() {
		clearInterval(this.timer);
	};
	let gameObj = {};
	gameObj.timer = null;
	gameObj.start = function() {// 开始游戏
		hero.penHuo();
		enemyFactory.create();
		bulletFactory.create();
		if (this.timer) {
			clearInterval(this.timer);
		}
		this.timer = setInterval(function() {
			if (status == 1) {
				for (let i in bees) {
					bees[i].step();
					let r = bees[i].outOfPanel();
					if (r) {
						bees.splice(i, 1);
						i--;
					}
					r = bees[i].isHit();
					if (r) {
						bees.splice(i, 1);
						i--;
					}
				}
				for (let i in airplanes) {
					airplanes[i].step();
					let r = airplanes[i].outOfPanel();
					if (r) {
						airplanes.splice(i, 1);
						i--;
					}
				}
				for (let i in bullets) {
					bullets[i].step();
					let r = bullets[i].outOfPanel();
					if (r) {
						bullets.splice(i, 1);
						i--;
					}
				}
				hero.isHit();
			}
		}, 20);
	};
	gameObj.stop = function() {
		hero.stop();
		enemyFactory.stop();
		bulletFactory.stop();
		clearInterval(this.timer);
	};
});