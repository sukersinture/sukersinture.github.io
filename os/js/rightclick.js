/**
 * 
 */
let rightclick = $("#rightclick");
let cont = $("#container");
let divs = rightclick.getElementsByTagName("div");
cont.onmousedown = function(e) {
	if (e.button == 2) {
		let x = e.layerX;
		let y = e.layerY;
		rightclick.style.display = "block";
		rightclick.style.left = x + "px";
		rightclick.style.top = y + "px";
		animation(rightclick, {height: divs.length*30}, function() {
			for (let i = 0; i < divs.length; i++) {
				divs[i].style.opacity = 1;
			}
		});
	} else if (e.button == 0) {
		for (let i = 0; i < divs.length; i++) {
			divs[i].style.opacity = 0;
		}
		animation(rightclick, {height: 0}, function(){
			rightclick.style.display = "none";
		});
	}
};
cont.oncontextmenu = function() {return false;};
cont.bzindex = 1;
for (let i in divs) {
	divs[i].onclick = select;
}
function select(e) {
	let text = this.id;
	if (text == "changebz") {
		cont.style.backgroundImage = "url(img/bz"+(cont.bzindex++%3+1)+".jpg)";
	} else if (text == "newfolder") {
		let folder = document.createElement("div");
		folder.className = "folder";
		let folderIcon = document.createElement("img");
		folderIcon.src = "img/folder.png";
		folderIcon.className = "deskicon";
		folder.appendChild(folderIcon);
		cont.appendChild(folder);
	} else if (text == "newfile") {
		let file = document.createElement("div");
		file.className = "file";
		let fileIcon = document.createElement("img");
		fileIcon.src = "img/file.png";
		fileIcon.className = "deskicon";
		file.appendChild(fileIcon);
		cont.appendChild(file);
	}
}