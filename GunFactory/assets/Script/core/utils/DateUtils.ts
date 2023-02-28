/**
 * Created by yangsong on 2014/11/22.
 * Date工具类
 */
class DateUtils {

    /**
     * 根据秒数格式化字符串
     * @param second 秒数
     * @param type 1:00:00:00   2:yyyy-mm-dd h:m:s    3:00:00   4:xx天前，xx小时前，xx分钟前 5:xx小时xx分
     * @return
     *
     */
    public getFormatBySecond(second: number, type: number = 1): string {
        var str: string = "";
        switch (type) {
            case 1:
                str = this.getFormatBySecond1(second);
                break;
            case 2:
                str = this.getFormatBySecond2(second);
                break;
            case 3:
                str = this.getFormatBySecond3(second);
                break;
            // case 4:
            //     str = this.getFormatBySecond4(second);
            //     break;
            // case 5:
            //     str = this.getFormatBySecond5(second);
            //     break;
            case 6:
                str = this.getFormatBySecond6(second);
                break;
        }
        return str;
    }

    //1: 00:00:00
    private getFormatBySecond1(t: number = 0): string {
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
        return hours + ":" + mins + ":" + sens;
    }

    //3: 00:00
    private getFormatBySecond3(t: number = 0): string {
        var hourst: number = Math.floor(t / 3600);
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
        return mins + ":" + sens;
    }

    //2:yyyy-mm-dd h:m:s
    private getFormatBySecond2(time: number): string {
        var date: Date = new Date(time);
        var year: number = date.getFullYear();
        var month: number = date.getMonth() + 1; 	//返回的月份从0-11；
        var day: number = date.getDate();
        var hours: number = date.getHours();
        var minute: number = date.getMinutes();
        var second: number = date.getSeconds();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;

    }

    // //4:xx天前，(24小时前),xx小时前，(60分钟前),xx分钟前,(离线/秒?[暂时先这样])
    // private getFormatBySecond4(time: number): string {
    //     var t = Math.floor(time / 3600);
    //     if (t > 0) {
    //         if (t > 24) {
    //             let showTime = Math.floor(t / 24);
    //             if (showTime > 0) {
    //                 return Math.floor(t / 24) + GameText.getText(lang.daysAgo);
    //             } else {
    //                 return 24 + GameText.getText(lang.hoursAgo);
    //             }
    //         }
    //         else {
    //             if (t > 0) {
    //                 return t + GameText.getText(lang.hoursAgo);
    //             } else {
    //                 return 60 + GameText.getText(lang.minutesAgo);
    //             }
    //         }
    //     }
    //     else {
    //         let showTime = Math.floor(time / 60);
    //         if (showTime > 0) {
    //             return Math.floor(time / 60) + GameText.getText(lang.minutesAgo);
    //         } else {
    //             return GameText.getText(lang.offlineText);
    //         }
    //         // return Math.floor(time / 60) + GameText.getText(lang.minutesAgo);
    //     }
    // }

    // private getFormatBySecond5(time: number): string {
    //     //每个时间单位所对应的秒数
    //     var oneDay: number = 3600 * 24;
    //     var oneHourst: number = 3600;
    //     var oneMinst: number = 60;

    //     var days = Math.floor(time / oneDay);
    //     var hourst: number = Math.floor(time % oneDay / oneHourst)
    //     var minst: number = Math.floor((time - hourst * oneHourst) / oneMinst)  //Math.floor(time % oneDay % oneHourst / oneMinst);
    //     var secondt: number = Math.floor((time - hourst * oneHourst) % oneMinst) //time;

    //     var dayss: string = "";
    //     var hourss: string = ""
    //     var minss: string = "";
    //     var secss: string = ""
    //     if (time > 0) {
    //         //天
    //         if (days == 0) {
    //             dayss = "";
    //             //小时
    //             if (hourst == 0) {
    //                 hourss = "";
    //                 //分
    //                 if (minst == 0) {
    //                     minss = "";
    //                     if (secondt == 0) {
    //                         secss = "";
    //                     } else if (secondt < 10) {
    //                         secss = "0" + secondt + GameText.getText(lang.second);
    //                     } else {
    //                         secss = "" + secondt + GameText.getText(lang.second);
    //                     }

    //                     return secss;
    //                 }
    //                 else {
    //                     minss = "" + minst + GameText.getText(lang.minute);
    //                     if (secondt == 0) {
    //                         secss = "";
    //                     } else if (secondt < 10) {
    //                         secss = "0" + secondt + GameText.getText(lang.second);
    //                     } else {
    //                         secss = "" + secondt + GameText.getText(lang.second);
    //                     }

    //                 }

    //                 return minss + secss;
    //             }
    //             else {
    //                 hourss = hourst + GameText.getText(lang.hour);
    //                 if (minst == 0) {
    //                     minss = "";
    //                     if (secondt == 0) {
    //                         secss = "";
    //                     } else if (secondt < 10) {
    //                         secss = "0" + secondt + GameText.getText(lang.second);
    //                     } else {
    //                         secss = "" + secondt + GameText.getText(lang.second);
    //                     }

    //                     return secss

    //                 } else if (minst < 10) {
    //                     minss = "0" + minst + GameText.getText(lang.minute);
    //                 } else {
    //                     minss = "" + minst + GameText.getText(lang.minute);
    //                 }

    //                 return hourss + minss;

    //             }
    //         }
    //         else {
    //             dayss = days + GameText.getText(lang.day);
    //             if (hourst == 0) {
    //                 hourss = "";
    //             } else {
    //                 if (hourst < 10)
    //                     hourss = "0" + hourst + GameText.getText(lang.hour);
    //                 else
    //                     hourss = "" + hourst + GameText.getText(lang.hour);
    //                 ;
    //             }
    //             return dayss + hourss;
    //         }
    //     }
    //     return "";
    // }

    //2:yyyy-mm-dd h:m:s
    private getFormatBySecond6(time: number): string {
        var date: Date = new Date(time);
        var year: number = date.getFullYear();
        var month: number = date.getMonth() + 1; 	//返回的月份从0-11；
        var day: number = date.getDate();
        // var hours: number = date.getHours();
        // var minute: number = date.getMinutes();
        // var second: number = date.getSeconds();
        return year + "年" + month + "月" + day + "日";

    }

    /**判断时间戳是否跨天 */
    public isLastDay(time1: number, time2: number) {
        let day1 = Math.floor(time1 / 86400);
        let day2 = Math.floor(time2 / 86400);
        if (day1 == day2) {
            return false;  // 没跨天
        }
        else {
            return true;    // 跨天
        }
    }

    public getHour(time: number) {
        var oneDay: number = 3600 * 24;
        var oneHourst: number = 3600;
        var oneMinst: number = 60;

        var days = Math.floor(time / oneDay);
        var hourst: number = Math.floor(time % oneDay / oneHourst);
        return hourst;
    }

    /** 判断时间是否在同一区间 */
    public isSameTimePart(time1: number, time2: number) {
        let hour1 = this.getHour(time1);
        let hour2 = this.getHour(time2);
        if (hour1 / 3 == hour2 / 3) {
            return true;
        }
        else {
            return false;
        }
    }

    public setServerTime(time: number) {
        let offsetTime = time - Date.now();
        if (Math.abs(offsetTime - this.paddingTime) > 30000) {
            this.paddingTime = offsetTime;
        }
        CC_DEBUG && Log.trace("与服务器偏差时间为:", this.paddingTime);
    }

    public getPaddingTime() {
        return this.paddingTime;
    }


    private paddingTime: number = 0;
    // public Now() {
    //     return Date.now() + this.paddingTime;
    // }
    /**
     * 获得当前时间(毫秒数)
     */
    public Now(): number {
        return Date.now() + this.paddingTime;
    }

    // const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
    // console.log("当天0点:"+start); //Mon Dec 04 2017 00:00:00 GMT+0800 (中国标准时间)

    // const start2 = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
    // console.log("当天23.59.59:"+start2); //Mon Dec 04 2017 23:59:59 GMT+0800 (中国标准时间)

    /**
     * 获取时间0点(开始)
     */
    public getTodayStart(time?: number) {
        if (time) {
            return (Math.floor(time / 86400000) * 86400000) + this.paddingTime;
        } else { //获取本地的
            return new Date(new Date().toLocaleDateString()).getTime() + this.paddingTime;
        }
    }

    /**
     * 获取时间的23:59:59(结束)
     */
    public getTodayEnd(time?: number) {
        if (time) {
            return (Math.ceil(time / 86400000) * 86400000 - 1) + this.paddingTime;
        } else { //获取本地的
            return new Date(new Date().toLocaleDateString()).getTime() + (24 * 60 * 60 * 1000 - 1) + this.paddingTime;
        }
    }

    /**
     * 判断指定时间是否已经超过当前时间的日子[只能比较日期是否都是同一天]
     */
    public isSameDay(time: number) {
        let formatStr = "yyyyMMdd";
        let targetDay = new Date(time).Format(formatStr);
        let today = new Date(this.Now()).Format(formatStr);

        return targetDay == today;
    }

    /**
     * 判断指定时间是否大于当前时间
     */
    public isGreaterNow(time: number) {
        return time > this.Now();
    }
    /**
     * 获取当前是周几
     * ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
     */
    public getDay(timestamp: number): number {
        let date = new Date(timestamp);
        return date.getDay();
    }

    /**
     * 判定两个时间是否是同一天
     */
    public isSameDate(timestamp1: number, timestamp2: number): boolean {
        let date1 = new Date(timestamp1);
        let date2 = new Date(timestamp2);
        return date1.getFullYear() == date2.getFullYear()
            && date1.getMonth() == date2.getMonth()
            && date1.getDate() == date2.getDate();
    }

    /**
     * 日期格式化
     */
    public format(d: Date, fmt: string = "yyyy-MM-dd hh:mm:ss"): string {
        let o = {
            "M+": d.getMonth() + 1, //month
            "d+": d.getDate(),    //day
            "h+": d.getHours(),   //hour
            "m+": d.getMinutes(), //minute
            "s+": d.getSeconds(), //second
            "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
            "S": d.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1,
            (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        return fmt;
    }
    // /** 
    //  * 获取指定时间的23:59:59(结束)
    //  */
    // public getTimeEnd(time:number){
    //     return (Math.ceil(time/86400000)*86400000 -1) + this.paddingTime;
    // }
}

window["DateUtils"] = DateUtils;