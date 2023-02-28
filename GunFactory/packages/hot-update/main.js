'use strict';
var fs = require("fs");
var Path = require("path");
var charset = "utf-8";
var FileUtil = require("./FileUtil");

function getNodePoolFiles(buildResults, zipFiles) {
    var prefabUrl = `db://assets/resources/prefab/game/NodePoolMsr.prefab`;
    var prefabUuid = Editor.assetdb.urlToUuid(prefabUrl);
    Editor.log(prefabUrl, prefabUuid)
    // 获得指定资源依赖的所有资源
    var depends = buildResults.getDependencies(prefabUuid);
    for (var i = 0; i < depends.length; ++i) {
        var uuid = depends[i];
        var type = buildResults.getAssetType(uuid);
        if (!zipFiles[uuid]) {
            // 获得工程中的资源相对 URL（如果是自动图集生成的图片，由于工程中不存在对应资源，将返回空）
            var url = Editor.assetdb.uuidToUrl(uuid);
            if (url && (url.indexOf(".png") > -1 || url.indexOf(".jpg") > -1)) {
                continue;
            }
            // 获取资源类型
            // 获得工程中的资源绝对路径（如果是自动图集生成的图片，同样将返回空）
            var local = Editor.assetdb.uuidToUrl(uuid);
            var nativePath = buildResults.getNativeAssetPath(uuid);

            // 获得构建后的原生资源路径（原生资源有图片、音频等，如果不是原生资源将返回空）

            zipFiles[uuid] = {
                local,
                nativePath
            };
            Editor.log(nativePath)
        }

    }
}

function addPackRes(url, saveFile, buildResults) {
    var prefabUuid = Editor.assetdb.urlToUuid(url);
    saveFile[prefabUuid] = {
        local: url,
        nativePath: buildResults.getNativeAssetPath(prefabUuid)
    }
    Editor.log("额外添加资源", saveFile[prefabUuid]);
}

function getDepends(options, callback) {
    var prefabUrls = ['LoginScene', 'GameScene'];
    var saveFileData = {};
    var buildResults = options.buildResults;

    let targetPath = FileUtil.joinPath(options.project, "../wechatgame/res");
    for (let j = 0; j < prefabUrls.length; j++) {
        var prefabUrl = `db://assets/Scene/${prefabUrls[j]}.fire`;
        var prefabUuid = Editor.assetdb.urlToUuid(prefabUrl);
        Editor.log(prefabUrl, prefabUuid)
        // 获得指定资源依赖的所有资源
        var depends = buildResults.getDependencies(prefabUuid);
        let zipFiles = saveFileData[prefabUrls[j]] = {};
        for (var i = 0; i < depends.length; ++i) {
            var uuid = depends[i];
            // 获得工程中的资源相对 URL（如果是自动图集生成的图片，由于工程中不存在对应资源，将返回空）
            var url = Editor.assetdb.uuidToUrl(uuid);
            // 获取资源类型
            var type = buildResults.getAssetType(uuid);
            // 获得工程中的资源绝对路径（如果是自动图集生成的图片，同样将返回空）
            var local = Editor.assetdb.uuidToUrl(uuid);
            var nativePath = buildResults.getNativeAssetPath(uuid);
            if (nativePath) {
                // : nativePath ? nativePath.replace(options.project, "") : "",
            }
            // 获得构建后的原生资源路径（原生资源有图片、音频等，如果不是原生资源将返回空）
            zipFiles[uuid] = {
                local,
                nativePath
            };
            Editor.log(">>>>>", nativePath)
        }
    }

    // addPackRes("db://assets/resources/Texture/game/guide/cg.jpg", saveFileData["LoginScene"], buildResults);
    // addPackRes("db://assets/resources/prefab/view/GameUIView.prefab", saveFileData["GameScene"], buildResults);
    // addPackRes("db://assets/resources/prefab/view/NewsView.prefab", saveFileData["GameScene"], buildResults);
    // addPackRes("db://assets/resources/prefab/view/ScheduleAndMiniappsView.prefab", saveFileData["GameScene"], buildResults);
    // getNodePoolFiles(buildResults, saveFileData["GameScene"]);

    Editor.assetdb.queryAssets('db://assets/resources/config/**\/*', ["json", "text"], function (error, results) {
        //     createAllLevelData(results);
        if (results) {
            results.forEach(function (result) {
                saveFileData.GameScene[result.uuid] = {
                    local: result.url
                };

            });
        }
        FileUtil.save(FileUtil.joinPath(targetPath, "zipFileList.json"), JSON.stringify(saveFileData));
        callback();
    });

    // db://internal/effects

}

// var Fs = require("fire-fs");
// var Path = require("fire-path");
function onBeforeBuildFinish(options, callback) {

    Editor.log('发布完成>>>>>>>>>>', options.platform);


    // var url = FileUtil.joinPath(options.buildPath, "jsb-link/main.js");
    // var fileData = FileUtil.read(url);
    // var newStr =
    //     "(function () {\n" +
    //     "    if (typeof window.jsb === 'object') {\n" +
    //     "        var hotUpdateSearchPaths = localStorage.getItem('HotUpdateSearchPaths');\n" +
    //     "        if (hotUpdateSearchPaths) {\n" +
    //     "            jsb.fileUtils.setSearchPaths(JSON.parse(hotUpdateSearchPaths));\n" +
    //     "        }\n" +
    //     "    }\n" +
    //     "})();\n";
    // newStr += fileData;
    // FileUtil.save(url, newStr);
    if (options.platform == "android" || options.platform == "ios") {
        let targetPath = FileUtil.joinPath(options.project, "../jsb-default");
        let targetResPath = FileUtil.joinPath(targetPath, "res");
        let soureResPath = FileUtil.joinPath(options.buildPath, "jsb-default/res");
        if (targetResPath != soureResPath) {
            let tarSrcPath = FileUtil.joinPath(targetPath, "src");
            FileUtil.remove(targetResPath);
            FileUtil.remove(tarSrcPath);
            FileUtil.copy(soureResPath, targetResPath);
            FileUtil.copy(FileUtil.joinPath(options.buildPath, "jsb-default/src"), tarSrcPath);
            FileUtil.copy(FileUtil.joinPath(options.buildPath, "jsb-default/main.js"), FileUtil.joinPath(targetPath, "main.js"));
            let peojectJson = JSON.parse(FileUtil.read(FileUtil.joinPath(options.buildPath, "jsb-default/project.json")));
            peojectJson.serviceClassPath = [
                // "org.cocos2dx.javascript.SDK.TTAD.TTSDK",
                "org.cocos2dx.javascript.SDK.GameBridge",
                "org.cocos2dx.javascript.SDK.REYUN.RYSDK",
                // "org.cocos2dx.javascript.SDK.WXSDK.WXSDK",
                "org.cocos2dx.javascript.SDK.TopOnSDK.TopOnSDK"
            ];
            FileUtil.save(FileUtil.joinPath(targetPath, "project.json"), JSON.stringify(peojectJson));
        }
    }

    // if (options.platform == "mini-game") {
    //     getDepends(options, callback)
    //     copytest(Path.join(options.dest, 'src/assets/Script/libs'))
    // } else {
    //     callback();
    // }
    if (options.platform == "wechatgame" || options.platform == "mini-game") {
        getDepends(options, callback)
        copytest(Path.join(options.dest, 'src/assets/Script/libs'))
    } else if (options.platform == "runtime") { //oppo小游戏类型的
        getDepends(options, callback)
        Editor.log('oppo同步替换');
        copytestoppo(Path.join(options.dest, 'src/assets/Script/libs'))

    } else {
        callback();
    }
    Editor.log('发布完成!!!!1'); // 你可以在控制台输出点什么
}

function copytestoppo(source) {
    let pathList = FileUtil.getDirectoryListing(source);
    for (let i = 0; i < pathList.length; i++) {
        let temp = pathList[i];
        if (FileUtil.isFile(temp)) {
            if (temp.indexOf("async") > -1) {
                var script = fs.readFileSync(temp, 'utf8'); // 读取构建好的 main.js
                // script += '\n' + 'window.myID = "01234567";';         // 添加一点脚本到
                script = script.replace('!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(n.async=n.async||{})}(this,function(n)', 'var global = window;!function(n,t){n.async = {};t(n.async)}(window,function(n)');
                fs.writeFileSync(temp, script); // 保存 main.js
            }
        }
    }
}

function copytest(source) {
    let pathList = FileUtil.getDirectoryListing(source);
    for (let i = 0; i < pathList.length; i++) {
        let temp = pathList[i];
        if (FileUtil.isFile(temp)) {
            if (temp.indexOf("async") > -1) {
                var script = fs.readFileSync(temp, 'utf8'); // 读取构建好的 main.js
                // script += '\n' + 'window.myID = "01234567";';         // 添加一点脚本到
                script = script.replace('!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(n.async=n.async||{})}(this,function(n)', '!function(n,t){n.async = {};t(n.async)}(window,function(n)');
                fs.writeFileSync(temp, script); // 保存 main.js
            }
        }
    }
}
module.exports = {
    load: function () {
        // 当 package 被正确加载的时候执行
        Editor.Builder.on('build-finished', onBeforeBuildFinish);
    },

    unload: function () {
        // 当 package 被正确卸载的时候执行
        Editor.Builder.removeListener('build-finished', onBeforeBuildFinish);
    },

    messages: {
        // 'editor:build-finished': function (event, target) {
        //     var root = Path.normalize(target.dest);
        //     var url = Path.join(root, "main.js");
        //     Fs.readFile(url, "utf8", function (err, data) {
        //         if (err) {
        //             throw err;
        //         }

        //         var newStr =
        //         "(function () {\n" +
        //         "    if (typeof window.jsb === 'object') {\n" +
        //         "        var hotUpdateSearchPaths = localStorage.getItem('HotUpdateSearchPaths');\n" +
        //         "        if (hotUpdateSearchPaths) {\n" +
        //         "            jsb.fileUtils.setSearchPaths(JSON.parse(hotUpdateSearchPaths));\n" +
        //         "        }\n" +
        //         "    }\n" +
        //         "})();\n";
        //         newStr += data;
        //         Fs.writeFile(url, newStr, function (error) {
        //             if (err) {
        //                 throw err;
        //             }
        //             Editor.log("SearchPath updated in built main.js for hot update");
        //         });
        //     });
        // }
    }
};