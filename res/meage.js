var fs = require('fs')
var Path = require('path');
var exec = require('child_process').exec,
	child;
//遍历文件夹，获取所有文件夹里面的文件信息
/*
 * @param path 路径
 *
 */
var _FORMAT_SEPARATOR = String.fromCharCode(0x1f);
var _FORMAT_ARGS_PATTERN = new RegExp('^[^' + _FORMAT_SEPARATOR + ']*' + new Array(100).join('(?:.([^' + _FORMAT_SEPARATOR + ']*))?'));
String.prototype.format = function() {
	return (_FORMAT_SEPARATOR +
		Array.prototype.join.call(arguments, _FORMAT_SEPARATOR)).
	replace(_FORMAT_ARGS_PATTERN, this);
}

// if (process.argv[2]) {
// 	var workPath = Path.join(process.cwd(), "../");
// } else {
var workPath =  Path.join(process.cwd(), "config");
// }
var targetPath = Path.join(workPath, "../GunFactory/assets/resources/config");
// 
var ratio = "";
var type = "";
ratio = "50-60";
type = "none";
// console.log(process.argv[2])
// if (process.argv[2]) {
// 	// targetPath = Path.join(targetPath, process.argv[2]);
// }
console.log("workPath:", workPath)
console.log("targetPath", targetPath)
var cmdStr = "qdtool mergeimg -s $1 --target $2".format(workPath, targetPath);
if (type) {
	cmdStr += " -t " + type + " -r " + ratio + " -c true";
}
console.log(cmdStr)
var child = exec(cmdStr, function(err, out, code) {
	if (err !== null) {
		console.log(err);
	} else {
		console.log(out);
	}
});