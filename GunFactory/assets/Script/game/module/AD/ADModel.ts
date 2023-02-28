import App from "../../../core/App";
import BaseModel from "../../../core/mvc/model/BaseModel";
import { AdType } from "./ADController";


export class ADModel extends BaseModel {
    public registerItems: { [key: number]: IShareAndAd[] } = {};

    public interactionAdConf: InteractionAd = null;

    /**
     * 分享的静态数据
     */
    protected shareStaticData: ShareStaticData[] = [];
    public adShareStatus: {
        [key: number]: number
    } = {};
    /**
     * 获取某个广告点存档数据
     * @param type 广告点类型
     */
    public getData(type: AdType) {
        let data = App.GameDataMsr.adAndShareData[type];
        if (!data) {
            data = App.GameDataMsr.adAndShareData[type] = {
                adCnt: 0,
                shareCnt: 0,
                freeCnt: 0,
            };
            // App.GameDataMsr.saveAdAndShareData();
        }
        return data;
    }
    public reset() {
        this.registerItems = {};
        this.adShareStatus = {};
    }
    public getAdShareConf(type: AdType) {
        return App.ConfigManager.getConfig("AdDataManager").getData(type);
    }
    /**
		 * 随机获取一个分享数据
		 * @returns {ShareStaticData} 分享数据
		 */
    public getShareData(key?: string): ShareStaticData {
        if (key) {
            for (var i = 0; i < this.shareStaticData.length; i++) {
                if (this.shareStaticData[i].share_key == key) {
                    return this.shareStaticData[i];
                }
            }
        }
        let weight = [];
        for (var i = 0; i < this.shareStaticData.length; i++) {
            weight.push(this.shareStaticData[i].weight);
        }
        let number = this.weight_rand(weight);
        return this.shareStaticData[number];

    }

    /**
     * 返回随机分享结果
     * @returns {number} 数组结果下标
     */
    public weight_rand(list: number[]) {
        let total = 0;
        let i, length: number;
        length = list.length;
        for (i = 0; i < length; i++) {
            total += 'undefined' != typeof (list[i]) ? list[i] : 0;;
        }
        if (total == 0) {
            return this.random(length);
        }
        let result: number;
        for (i = 0; i < length; i++) {
            let rand = Math.floor(Math.random() * total + 1);
            if (rand <= list[i]) {
                result = i;
                return result;
            } else {
                total -= list[i];
            }
        }
    }

    /**
     * 取随机数,从0-max
     * @param {number} max 最大值
     * @returns {number} 区间内的随机数
     */
    private random(max: number): number {
        // parseInt(Math.random() * (max + 1), 10);
        return Math.floor(Math.random() * max);
    }

    public async initShareStaticData() {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            // if (App.GlobalData.isRelease) {
            try {
                let result = await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/share/getShareList.php", {});
                this.shareStaticData = JSON.parse(result);
            } catch (e) {
                this.shareStaticData = [{
                    "id": 4,
                    "resource_id": 7,
                    "share_key": "qjs",
                    "weight": 0,
                    "shareMessage": "求大家帮我解个锁！我真的特别想要往下挖",
                    "sharePic": "https://wxclient.gzqidong.cn/resource//Upload/resource/156051170827037753.jpg"
                }, {
                    "id": 3,
                    "resource_id": 6,
                    "share_key": "cdhj",
                    "weight": 0,
                    "shareMessage": "一铲子下去竟然挖到超大黄金",
                    "sharePic": "https://wxclient.gzqidong.cn/resource//Upload/resource/15605116981846430346.jpg"
                }, {
                    "id": 5,
                    "resource_id": 8,
                    "share_key": "wsyw",
                    "weight": 0,
                    "shareMessage": "有矿就可以为所欲为吗？",
                    "sharePic": "https://wxclient.gzqidong.cn/resource//Upload/resource/1560511714402146269.jpg"
                }, {
                    "id": 6,
                    "resource_id": 9,
                    "share_key": "ssr",
                    "weight": 0,
                    "shareMessage": "点击送SSR主管！海量金币和超级现金等好礼！",
                    "sharePic": "https://wxclient.gzqidong.cn/resource//Upload/resource/15605117201211149555.jpg"
                }, {
                    "id": 7,
                    "resource_id": 10,
                    "share_key": "gjsc",
                    "weight": 0,
                    "shareMessage": "没时间解释了！赶紧上车！",
                    "sharePic": "https://wxclient.gzqidong.cn/resource//Upload/resource/1560511725528421387.jpg"
                }, {
                    "id": 9,
                    "resource_id": 11,
                    "share_key": "cjlxs",
                    "weight": 0,
                    "shareMessage": "\u6211\u6b63\u5728\u53c2\u52a0\u4eba\u6c14\u6bd4\u8d5b\uff0c\u767e\u5206\u767e\u514d\u8d39\u62ff\u5b9e\u7269\u5956\u52b1",
                    "sharePic": "https:\/\/wxclient.gzqidong.cn\/resource\/Upload\/resource\/15613599211205427331.png"
                }]
            }
        } else {
            this.shareStaticData = [
                {
                    shareMessage: "测试",
                    sharePic: "sharePic/share/share07_fix.jpg",
                }
            ];
        }
        // Log.warn("分享信息列表", this.shareStaticData);
    }

}
declare global {
    interface GameConf {
        /**
         * 插屏广告弹出配置
         */
        interactionAd: InteractionAd;
    }
    /**
     * 插屏广告弹出配置
     */
    type InteractionAd = {
        /**
         * 在线时间超过多少后开始谈插屏广告
         */
        startShowTime: number;
        /**
         * 插屏广告弹出间隔时间
         */
        paddingTime: number;
        /**
         * 各个面板弹出插屏广告的概率
         */
        view: {
            [viewName: string]: number;
        }
    }
}
// registerJSONConf("InteractionAd", "TTInteractionExpressAd");

// TTInteractionExpressAd