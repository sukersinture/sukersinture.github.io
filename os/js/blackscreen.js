/**
 * 
 */
let bs = $("#blackscreen");
bs.onclick = function() {
	bs.style.opacity = 1;
	let t = setInterval(function(){
		let op = parseFloat(bs.style.opacity*10 - 1)/10;
		bs.style.opacity = op;
		if (op == 0) {
			clearInterval(t);
			bs.style.display = "none";
		}
	}, 20);
};
let close = $("#close");
close.timer = null;
close.onmouseover = function() {
	close.timer = setTimeout(function() {
		animation(close, {top: 0});
	}, 100);
};
close.onmouseout = function() {
	if (close.timer) {
		clearTimeout(close.timer);
		setTimeout(function() {
			animation(close, {top: -80});
		}, 100);
	}
};
close.onclick = function() {
	bs.style.opacity = 0;
	bs.style.display = "block";
	let t = setInterval(function(){
		let op = parseFloat(bs.style.opacity*10 + 1)/10;
		bs.style.opacity = op;
		if (op == 1) {
			clearInterval(t);
		}
	}, 20);
};