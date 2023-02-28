window.versionInfo = {
    /**
     * 打包在apk包里面的版本号
     */
    version: "$version",
    /**
     * 资源文件夹的版本号
     */
    packVersion: "$packVersion"
};
if (isNaN(parseInt(versionInfo.version))) {
    versionInfo.version = "0";
}

window.boot = function (projectJsPath) {
    var settings = window._CCSettings;
    window._CCSettings = undefined;
    
    if (!settings.debug) {
        var uuids = settings.uuids;

        var rawAssets = settings.rawAssets;
        var assetTypes = settings.assetTypes;
        var realRawAssets = settings.rawAssets = {};
        for (var mount in rawAssets) {
            var entries = rawAssets[mount];
            var realEntries = realRawAssets[mount] = {};
            for (var id in entries) {
                var entry = entries[id];
                var type = entry[1];
                // retrieve minified raw asset
                if (typeof type === 'number') {
                    entry[1] = assetTypes[type];
                }
                // retrieve uuid
                realEntries[uuids[id] || id] = entry;
            }
        }

        var scenes = settings.scenes;
        for (var i = 0; i < scenes.length; ++i) {
            var scene = scenes[i];
            if (typeof scene.uuid === 'number') {
                scene.uuid = uuids[scene.uuid];
            }
        }

        var packedAssets = settings.packedAssets;
        for (var packId in packedAssets) {
            var packedIds = packedAssets[packId];
            for (var j = 0; j < packedIds.length; ++j) {
                if (typeof packedIds[j] === 'number') {
                    packedIds[j] = uuids[packedIds[j]];
                }
            }
        }

        var subpackages = settings.subpackages;
        for (var subId in subpackages) {
            var uuidArray = subpackages[subId].uuids;
            if (uuidArray) {
                for (var k = 0, l = uuidArray.length; k < l; k++) {
                    if (typeof uuidArray[k] === 'number') {
                        uuidArray[k] = uuids[uuidArray[k]];
                    }
                }
            }
        }
    }

    function setLoadingDisplay() {
        // Loading splash scene
        var splash = document.getElementById('splash');
        var progressBar = splash.querySelector('.progress-bar span');
        cc.loader.onProgress = function (completedCount, totalCount, item) {
            var percent = 100 * completedCount / totalCount;
            if (progressBar) {
                progressBar.style.width = percent.toFixed(2) + '%';
            }
        };
        splash.style.display = 'block';
        progressBar.style.width = '0%';

        cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
            splash.style.display = 'none';
        });
    }

    var onStart = function () {
        cc.loader.downloader._subpackages = settings.subpackages;

        cc.view.enableRetina(true);
        cc.view.resizeWithBrowserSize(true);

        if (!false && !false) {
            if (cc.sys.isBrowser) {
                setLoadingDisplay();
            }

            if (cc.sys.isMobile) {
                if (settings.orientation === 'landscape') {
                    cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
                } else if (settings.orientation === 'portrait') {
                    cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
                }
                cc.view.enableAutoFullScreen([
                    cc.sys.BROWSER_TYPE_BAIDU,
                    cc.sys.BROWSER_TYPE_WECHAT,
                    cc.sys.BROWSER_TYPE_MOBILE_QQ,
                    cc.sys.BROWSER_TYPE_MIUI,
                ].indexOf(cc.sys.browserType) < 0);
            }

            // Limit downloading max concurrent task to 2,
            // more tasks simultaneously may cause performance draw back on some android system / browsers.
            // You can adjust the number based on your own test result, you have to set it before any loading process to take effect.
            if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_ANDROID) {
                cc.macro.DOWNLOAD_MAX_CONCURRENT = 2;
            }
        }

        function loadScene(launchScene) {
            cc.director.loadScene(launchScene,
                function (err) {
                    if (!err) {
                        if (cc.sys.isBrowser) {
                            // show canvas
                            var canvas = document.getElementById('GameCanvas');
                            canvas.style.visibility = '';
                            var div = document.getElementById('GameDiv');
                            if (div) {
                                div.style.backgroundImage = '';
                            }
                        }
                        cc.loader.onProgress = null;
                        console.log('Success to load scene: ' + launchScene);
                    } else if (CC_BUILD) {
                        setTimeout(function () {
                            loadScene(launchScene);
                        }, 1000);
                    }
                }
            );
        }
        var launchScene = settings.launchScene;
        // load scene
        loadScene(launchScene);
    };
    // jsList
    var jsList = settings.jsList;
    if (jsList) {
        jsList = jsList.map(function (x) {
            return 'src/' + x;
        });
        jsList.push(projectJsPath);
    } else {
        jsList = [projectJsPath];
    }

    var option = {
        id: 'GameCanvas',
        scenes: settings.scenes,
        debugMode: settings.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
        showFPS: !false && settings.debug,
        frameRate: 60,
        jsList: jsList,
        groupList: settings.groupList,
        collisionMatrix: settings.collisionMatrix,
    }

    // init assets
    cc.AssetLibrary.init({
        libraryPath: 'res/import',
        rawAssetsBase: 'res/raw-',
        rawAssets: settings.rawAssets,
        packedAssets: settings.packedAssets,
        md5AssetsMap: settings.md5AssetsMap,
        subpackages: settings.subpackages
    });

    cc.game.run(option, onStart);
};
(function () {
    var _storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'blackjack-remote-asset');
    var isUPdateing = localStorage.getItem('isUPdateing');
    if (isUPdateing) {
        localStorage.removeItem('isUPdateing');
        localStorage.removeItem('HotUpdateSearchPaths');
        console.log("热更新没有完成,强制删除所有缓存文件,重新热更新!");
        jsb.fileUtils.removeDirectory(_storagePath + "/project.manifest"); //删除本地热更新缓存配置文件
    }
    //获取缓存在本地的更新配置文件
    var projectManifestStr = jsb.fileUtils.getStringFromFile(_storagePath + "/project.manifest");
    if (projectManifestStr) {
        var projectManifest = JSON.parse(projectManifestStr);
        var cacheVersion = parseInt(projectManifest.version);
        if (parseInt(versionInfo.version) >= cacheVersion) { //如果包体的版本号大于缓存的版本号
            console.log("删除缓存文件!");
            jsb.fileUtils.removeDirectory(_storagePath); //删除本地缓存文件
        } else {
            versionInfo.version = cacheVersion + "";
            var hotUpdateSearchPaths = localStorage.getItem('HotUpdateSearchPaths');
            if (hotUpdateSearchPaths) { //设置搜索路径,优先使用下载下来的资源
                console.log("hotUpdateSearchPaths:", hotUpdateSearchPaths);
                jsb.fileUtils.setSearchPaths(JSON.parse(hotUpdateSearchPaths));
            }
        }
    }
    let re = /src\/([0-9a-zA-Z-.]+)\.[0-9abcdefg]+\.(jsc|js)/;

    function getRealpath(jsPath) {
        if (projectManifest) { //通过版本控制文件获取js文件的真实路径(因为勾选了md5 cache后,js文件会被加速md5码)
            let name = jsPath.match(re)[1];
            for (const key in projectManifest.assets) {
                let matchs = key.match(re);
                if (matchs && name == matchs[1]) {
                    return key;
                }
            }
        }
        return jsPath;
    }

    // getRealpath("src/settings.js");
    require(getRealpath("src/settings.js"));
    require(getRealpath("src/cocos2d-jsb.js"));
    require('jsb-adapter/jsb-engine.js');
    cc.macro.CLEANUP_IMAGE_CACHE = true;
    var settings = window._CCSettings;
    window.boot(getRealpath(settings.debug ? 'src/project.dev.js' : 'src/project.js'));
})();