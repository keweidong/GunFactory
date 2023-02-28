import { Platform } from "../../game/platform/Platform";
import App from "../App";

export namespace GameText {
    let langStr: string[];
    let langStrMap: {
        [key: string]: string
    } = Object.create(null);
    let isInit = false;
    function loadRemote(url: string): Promise<string> {
        return new Promise((resolve: Function, reject: Function) => {
            url = `https://wxclient.gzqidong.cn/gameConf/GunFactory/${versionInfo.packVersion}/${url}.csv?v=${Date.now()}`;
            if (CC_JSB) {
                App.Http.requestAsync(url, null, "GET").then((str: string) => {
                    resolve(str);
                });
            } else {
                cc.loader.load({ url: url, type: 'text' }, function (err, texture) {
                    if (err) {
                        Log.error("loadRemote:", err)
                        reject(err);
                    } else {
                        resolve(texture)
                    }
                });
            }
        });

    }
    export async function init() {
        if (isInit) {
            return;
        }

        // loadRemote
        let langJsonAsset: cc.JsonAsset = await getResAsync("language/lang_0", cc.JsonAsset);
        langStr = langJsonAsset.json;
        isInit = true;
        // if (CC_EDITOR) {
        //     Editor.Profile.load('profile://project/language/lang_cn.json', (err, profile) => {
        //         // langStr = profile
        //         cc.log(profile.data['0'])
        //         for (const key in profile) {
        //             // cc.log(key)

        //         }
        //         // window.i18n.curLang = profile.data['default_language'];
        //         // if (polyInst) {
        //         //     let data = loadLanguageData(window.i18n.curLang) || {};
        //         //     initPolyglot(data);
        //         // }
        //     });
        // } else {

        // }
        let arrLen = langStr.length;
        for (let i = 0; i < arrLen; i++) {
            langStrMap[lang[i]] = langStr[i];
        }
        if (Platform.instance.isGetRemoteRes()) {
            let text = await loadRemote("lang_ch_cn");
            text = text.replace(/\r\n/g, "\n");
            let list = text.split(/\n/);
            for (let i = 0; i < list.length; i++) {
                if (list[i]) {
                    let lines = list[i].split(",");
                    langStrMap[lines[0]] = lines[1];
                }
            }
        }
    }
    function getResAsync(resources: string, type: typeof cc.Asset): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            cc.loader.loadRes(resources, type, (err, texture) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(texture);
                }
            });

        });
    }
    export function getText(key: lang) {
        return langStr[key];
    }
    export function getTextByStr(key: string) {
        return langStrMap[key];
    }
    // if (CC_EDITOR) {
    //     cc.log("CC_EDITOR", CC_BUILD, CC_DEBUG, CC_EDITOR, CC_TEST)
    //     try {
    //         init();
    //     } catch (error) {
    //     }
    // }
}
