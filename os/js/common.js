/**
 * 公共方法
 */
function $(slct) {
	if (slct && typeof(slct) == "string") {
		if (slct.indexOf("#") == 0) {
			return document.getElementById(slct.substring(1));
		} else if (slct.indexOf(".") == 0) {
			return document.getElementsByClassName(slct.substring(1));
		} else {
			return document.getElementsByTagName(slct);
		}
	} else {
		return null;
	}
}