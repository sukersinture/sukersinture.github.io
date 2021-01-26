/**
动画函数
@author: Suker
参数:
dom: 元素
destObj: 终点状态对象
	如: {width: 100, height: 200, top: 300, left: 400, opacity: 0.1}
callback：回调函数
*/
var animation_timer = null;
function animation(dom, destObj, callback) {
	if (animation_timer) {
		clearInterval(animation_timer);
	}
	// scale: 每一帧的变化（数字越大，每一帧变化越小，数字越小，每一帧变化越大）
	let scale = 8;
	// 一帧和一帧之间的时间差单位：毫秒
	let ms = 15;
	let f = function() {
		let style = getComputedStyle(dom);
		// 当前的状态: 宽, 高, x, y
		let cwidthStr = style.width;
		let cheightStr = style.height;
		let cleftStr = style.left;
		let ctopStr = style.top;
		
		let cwidth = parseInt(cwidthStr.substring(0, cwidthStr.length - 2));
		let cheight = parseInt(cheightStr.substring(0, cheightStr.length - 2));
		let cleft = parseInt(cleftStr.substring(0, cleftStr.length - 2));
		let ctop = parseInt(ctopStr.substring(0, ctopStr.length - 2));
		let copacity = parseFloat(dom.style.opacity)*1000;
		// 输出信息
//		console.info("cwidth: " + cwidth + ", cheight: " + cheight + ", cleft: " + cleft + ", ctop: " + ctop + ", copacity: " + copacity/10000);
//		console.info("dwidth: " + destObj.width + ", " + "dheight: " + destObj.height + ", dleft: " + destObj.left + ", dtop: " + destObj.top + ", dopacity: " + destObj.opacity);
		// 计算下一步
		let f1 = true;
		let f2 = true;
		let f3 = true;
		let f4 = true;
		let f5 = true;
		if (destObj.width || destObj.width == 0) {
			let step = Math.ceil((destObj.width - cwidth)/scale);
			if (destObj.width - cwidth < 0) {
				step--;
			}
			if (step != 0) {
				f1 = false;
			}
			cwidth = cwidth + step;
		}
		if (destObj.height || destObj.height == 0) {
			let step = Math.ceil((destObj.height - cheight)/scale);
			if (destObj.height - cheight < 0) {
				step--;
			}
			if (step != 0) {
				f2 = false;
			}
			cheight = cheight + step;
		}
		if (destObj.left || destObj.left == 0) {
			let step = Math.ceil((destObj.left - cleft)/scale);
			if (destObj.left - cleft < 0) {
				step--;
			}
			if (step != 0) {
				f3 = false;
			}
			cleft = cleft + step;
		}
		if (destObj.top || destObj.top == 0) {
			let step = Math.ceil((destObj.top - ctop)/scale);
			if (destObj.top - ctop < 0) {
				step--;
			}
			if (step != 0) {
				f4 = false;
			}
			ctop = ctop + step;
		}
		if (destObj.opacity || destObj.opacity == 0) {
			let step = (parseFloat(destObj.opacity)*1000 - copacity)/scale;
			if (Math.abs(step) > 0.01) {
				f5 = false;
			}
			copacity = copacity + step;
		}
		dom.style.width = cwidth + "px";
		dom.style.height = cheight + "px";
		dom.style.left = cleft + "px";
		dom.style.top = ctop + "px";
		dom.style.opacity = copacity/1000;
		// 终点判断
		if (f1 && f2 && f3 && f4 && f5) {
			clearInterval(animation_timer);
			callback && callback();
		}
	};
	animation_timer = setInterval(f, ms);
}