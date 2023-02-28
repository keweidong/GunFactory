import { GameText } from "../lang/GameText";

/**
 * Created by yangsong on 15-1-12.
 * 通用工具类
 */
class CommonUtils {
    /**
     * 深度复制
     * @param _data
     */
    public copyDataHandler(obj: any): any {
        var newObj;
        if (obj instanceof Array) {
            newObj = [];
        }
        else if (obj instanceof Object) {
            newObj = {};
        }
        else {
            return obj;
        }
        var keys = Object.keys(obj);
        for (var i: number = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            newObj[key] = this.copyDataHandler(obj[key]);
        }
        return newObj;
    }

    public setSpriteFrame(url: string, sprite: cc.Sprite | cc.Mask) {
        let frame = cc.loader.getRes(url, cc.SpriteFrame);
        if (frame) {
            // CC_DEBUG && Log.trace("setSpriteFrame:资源以及预加载", url);
            sprite.spriteFrame = frame;
        } else {
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame: cc.SpriteFrame) {
                if (err) {
                    CC_DEBUG && Log.error("资源加载出错", url);
                }
                else {
                    sprite.spriteFrame = spriteFrame;
                }
            });

        }

    }

    /**
     * 把源对象的值复制到目标对象
     */
    public copyObject(obj: Object, target: Object) {
        for (let key in obj) {
            target[key] = obj[key];
        }
    }
    public getItemByKey(list: any[], key, value) {
        for (var i = list.length - 1; i > -1; --i) {
            if (list[i][key] == value) {
                return list[i];
            }
        }
        return null;
    }
    public getIndexByKey(list: any[], key, value) {
        for (var i = list.length - 1; i > -1; --i) {
            if (list[i][key] == value) {
                return i;
            }
        }
        return -1;
    }

    public getNumberInNormalDistribution(mean: number, std_dev: number): number {
        return mean + (this.randomNormalDistribution() * std_dev);
    }
    protected randomNormalDistribution() {
        var u = 0.0, v = 0.0, w = 0.0, c = 0.0;
        do {
            //获得两个（-1,1）的独立随机变量
            u = Math.random() * 2 - 1.0;
            v = Math.random() * 2 - 1.0;
            w = u * u + v * v;
        } while (w == 0.0 || w >= 1.0)
        //这里就是 Box-Muller转换
        c = Math.sqrt((-2 * Math.log(w)) / w);
        //返回2个标准正态分布的随机数，封装进一个数组返回
        //当然，因为这个函数运行较快，也可以扔掉一个
        //return [u*c,v*c];
        return u * c;
    }
    public removeItemByKey(list: any[], key, value) {
        for (var i = list.length - 1; i > -1; --i) {
            if (list[i][key] == value) {
                return list.splice(i, 1);
            }
        }
        return null;
    }
    public removeItemByValue(list: any[], value): boolean {
        for (var i = list.length - 1; i > -1; --i) {
            if (list[i] == value) {
                list.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    /**
     * 将毫秒数转换为时分秒格式
     * @param num 毫秒数
     */
    public getFormatTime(num: number, isBref: boolean = false) {
        num = Math.floor(num / 1000);
        const minute = 60;
        const hour = 60 * minute;
        const oneDay = 24 * hour;
        let str = "";
        if (num >= oneDay) {
            str += GameText.getText(lang.common_day_1).format(Math.floor(num / oneDay));//  + "天";
            num %= oneDay;
            if (isBref) {
                return str;
            }
        }
        if (num >= hour) {
            str += Math.floor(num / hour) + GameText.getText(lang.common_hour);// "小时";
            num %= hour;
            if (isBref) {
                return str
            }
        }
        if (num >= minute) {
            str += Math.floor(num / minute) + GameText.getText(lang.common_minute);//"分钟";
            num %= minute;
            if (isBref) {
                return str
            }
        }
        if (num) {
            str += num + GameText.getText(lang.common_second);//"秒";
            if (isBref) {
                return str
            }
        }
        return str;
    }

    public getFormatBySecond1(t: number = 0, isSimple: boolean = true): string {
        var hourst: number = Math.floor(t / 3600);
        var hours: string;
        if (hourst == 0) {
            hours = "00";
        } else {
            if (hourst < 10)
                hours = "0" + hourst;
            else
                hours = "" + hourst;
        }
        var minst: number = Math.floor((t - hourst * 3600) / 60);
        var secondt: number = Math.floor((t - hourst * 3600) % 60);
        var mins: string;
        var sens: string;
        if (minst == 0) {
            mins = "00";
        } else if (minst < 10) {
            mins = "0" + minst;
        } else {
            mins = "" + minst;
        }
        if (secondt == 0) {
            sens = "00";
        } else if (secondt < 10) {
            sens = "0" + secondt;
        } else {
            sens = "" + secondt;
        }
        if (isSimple && hours.indexOf("00") > -1) {
            return mins + ":" + sens;
        }
        return hours + ":" + mins + ":" + sens;
    }
    /**
     * 判断是否是undefined
     */
    public isFunction(obj) {
        try {
            if (typeof obj === "function") {
                return true;
            } else { //不是函数
                return false;
            }
        } catch (e) {
            return false;
        }
    }

    /**
     * 判断是否是undefined
     */
    public isUndefined(obj) {
        return typeof (obj) == "undefined";
    }

    /**
     * 判断指定时间是否已经超过当前时间的日子[只能比较日期是否都是同一天]
     */
    public isSameDay(time: number) {
        let formatStr = "yyyyMMdd";
        let targetDay = new Date(time).Format(formatStr);
        let today = new Date(Date.now()).Format(formatStr);

        return targetDay == today;
    }

    /**
     * 判断是否是null(没啥用)
     * obj为null时，typeof返回object
     */
    public isNull(obj) {
        if (!obj && !this.isUndefined(obj) && obj != 0) {
            return true;
        } else {
            return false;
        }
    }
    public isArray(target: any) {
        return Object.prototype.toString.call(target) === '[object Array]';
    }

    public isObject(target: any) {
        return Object.prototype.toString.call(target) === '[object Object]';
    }

    /**
     * 判断是否是字符串
     */
    public isString(obj) {
        // return Object.prototype.toString.call(obj) === "[object String]";
        return typeof (obj) == "string";
    }

    /** 坐标解析 */
    public parsePos(pos, str: string, symbol?: string) {
        let temp = str.split(symbol || ",");
        for (let value of temp) {
            switch (value[0]) {
                case "l":
                    pos.left = parseInt(value.slice(1));
                    break;
                case "r":
                    pos.right = parseInt(value.slice(1));
                    break;
                case "t":
                    pos.top = parseInt(value.slice(1));
                    break;
                case "b":
                    pos.bottom = parseInt(value.slice(1));
                    break;
                case "v":
                    pos.verticalCenter = parseInt(value.slice(1));
                    break;
                case "w":
                    pos.width = parseInt(value.slice(1));
                    break;
                case "h":
                    pos.height = parseInt(value.slice(1));
                    break;
                case "H":
                    pos.horizontalCenter = parseInt(value.slice(1));
                    break;
                case "R":
                    pos.rotation = parseInt(value.slice(1));
                    break;
            }
        }
    }

    public transPos(pos) {

    }

    public getPosX1(object: { right?: number; left?: number; x?: number; horizontalCenter?: number; }, parentWidth: number, objWidth?: number): number {
        if (!isNaN(object.left)) {
            return object.left - parentWidth / 2;
        } else if (!isNaN(object.right)) {
            return parentWidth / 2 - object.right - objWidth;
        } else if (!isNaN(object.horizontalCenter)) {
            return (parentWidth - objWidth) / 2 + object.horizontalCenter;
        } else {
            return object.x;
        }
    }
    public getPosY1(object: { top?: number; bottom?: number; y?: number; verticalCenter?: number; }, parentHeight: number, objHeight?: number): number {
        if (!isNaN(object.top)) {
            return parentHeight / 2 - object.top;
        } else if (!isNaN(object.bottom)) {
            return object.bottom - parentHeight / 2 - objHeight;
        } else if (!isNaN(object.verticalCenter)) {
            return (parentHeight - objHeight) / 2 + object.verticalCenter;
        } else {
            return object.y;
        }
    }
    protected sleep(delay: number) {
        return new Promise((resole) => {
            cc.director.getScheduler().schedule(resole, null, 0, 1, delay / 1000);
        })
    }


}
interface Array<T> {
    /**
     * 移除数据某一项
     * @param value 要移除的值
     */
    remove(value: T): boolean;
}
Array.prototype.remove = function (value) {
    let index = this.indexOf(value);
    if (index > -1) {
        this.splice(index, 1);
        return true;
    }
    return false;
};

Object.defineProperty(Array.prototype, "remove", {
    enumerable: false, // 不能枚举
});
window["CommonUtils"] = CommonUtils;
