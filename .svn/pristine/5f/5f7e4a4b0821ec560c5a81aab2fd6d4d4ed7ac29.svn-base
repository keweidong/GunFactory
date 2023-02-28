// namespace mine {
const decimal = [
    "", "K", "M", "B", "T",
    "aa", "ab", "ac", "ad", "ae",
    "af", "ag", "ah", "ai", "aj",
    "ak", "al", "am", "an", "ao",
    "ap", "aq", "ar", "as", "at",
    "au", "av", "aw", "ax", "ay",
    "az",
    "ba", "bb", "bc", "bd", "be",
    "bf", "bg", "bh", "bi", "bj",
    "bk", "bl", "bm", "bn", "bo",
    "bp", "bq", "br", "bs", "bt",
    "bu", "bv", "bw", "bx", "by",
    "bz",
    "ca", "cb", "cc", "cd", "ce",
    "cf", "cg", "ch", "ci", "cj",
    "ck", "cl", "cm", "cn", "co",
    "cp", "cq", "cr", "cs", "ct",
    "cu", "cv", "cw", "cx", "cy",
    "cz",
];
type long = number;
type byte = number;
type int = number;
type Integer = number;
type double = number;
//我的超大数据表现方式
class MyBigLong {
    public static pool: MyBigLong[] = [];
    public static tempNum = MyBigLong.create(0, 0);
    public value: double = 0;
    // public _value: double = 0;
    private _numberStr: string = "";
    // public set value(value: number) {
    // 	if (value == Infinity) {
    // 		egret.log(value);
    // 	}
    // 	this._value = value;
    // }
    // public get value() {
    // 	return this._value;
    // }
    constructor() {
        // this.init(baseNumber, rateBy10);
    }
    public init(baseNumber: MyBigLong): MyBigLong
    public init(baseNumber: long, rateBy10: long): MyBigLong
    public init(baseNumber: long | MyBigLong, rateBy10?: long): MyBigLong {
        if (baseNumber instanceof MyBigLong) {
            return this.initByBigNum(baseNumber);

        } else {
            return this.initByNumber(baseNumber, rateBy10);
        }
    }
    public initByNumber(baseNumber: long, rateBy10: long) {
        this._numberStr = "";
        this.value = baseNumber * Math.pow(10, rateBy10);
        return this;
    }
    public initByBigNum(baseNumber: MyBigLong) {
        this._numberStr = "";
        this.value = baseNumber.value;
        return this;
    }
    public static create(baseNumber: MyBigLong): MyBigLong
    public static create(baseNumber: long, rateBy10: long): MyBigLong
    public static create(baseNumber: long | MyBigLong, rateBy10?: long): MyBigLong {
        let num = MyBigLong.pool.pop();
        if (num) {
        } else {
            num = new MyBigLong();
        }
        if (baseNumber instanceof MyBigLong) {
            num.initByBigNum(baseNumber);
        } else {
            num.initByNumber(baseNumber, rateBy10);
        }
        return num;
    }
    public release() {
        MyBigLong.pool.push(this);
    }
	/**
	 * 除法
	 */
    public divide(cmpNumber: MyBigLong | number) {
        if (typeof cmpNumber === "number") {
            this.value = Math.floor(this.value / cmpNumber);
        } else {
            this.value = Math.floor(this.value / cmpNumber.value);
        }
        this._numberStr = "";
        return this;
    }
	/**
	 * 大整数除法,这个是一个不精确的除法,只计算当大整数位数相差不超过2位的情况,如果超出就按0计算
	 */
    public divideBigLong(cmpNumber: MyBigLong) {
        return this.value / cmpNumber.value;

    }
    public cmp(cmpNumber: MyBigLong | number): int {
        if (typeof cmpNumber === "number") {
            return (this.value - cmpNumber);
        } else {
            return (this.value - cmpNumber.value);
        }
    }

    public add(value: MyBigLong | number): MyBigLong {
        if (typeof value === "number") {
            this.value = Math.floor(this.value + value);
        } else {
            this.value = Math.floor(this.value + value.value);
        }
        this._numberStr = "";
        return this;
    }

    public sub(value: MyBigLong | number): MyBigLong {
        if (typeof value === "number") {
            this.value = Math.floor(this.value - value);
        } else {
            this.value = Math.floor(this.value - value.value);
        }
        this._numberStr = "";
        return this;
    }
    public static toString(value: number) {
        if (value < 1000) {
            return value + "";
        } else {
            let numstr = value.toPrecision(3);
            let list = numstr.split("e+");
            //指数位
            let cnt = parseInt(list[1]);
            //大整数位余数
            let cnt1 = cnt % 3;
            cnt -= cnt1;
            if (cnt1 < 2) {
                numstr = numstr.replace(".", "");
                return numstr.slice(0, cnt1 + 1) + "." + numstr.slice(cnt1 + 1, 3) + decimal[cnt / 3];
            }
            return numstr.replace(".", "").slice(0, cnt1 + 1) + decimal[cnt / 3];
        }
    }
    public toString() {
        if (this._numberStr) {
            return this._numberStr;
        }
        if (this.value < 1000) {
            return this._numberStr = this.value + "";
        } else {
            let numstr = this.value.toPrecision(3);
            let list = numstr.split("e+");
            //指数位
            let cnt = parseInt(list[1]);
            //大整数位余数
            let cnt1 = cnt % 3;
            cnt -= cnt1;
            if (cnt1 < 2) {
                numstr = numstr.replace(".", "");
                return this._numberStr = numstr.slice(0, cnt1 + 1) + "." + numstr.slice(cnt1 + 1, 3) + decimal[cnt / 3];
            } else {
                return this._numberStr = numstr.replace(".", "").slice(0, cnt1 + 1) + decimal[cnt / 3];
            }
        }
    }
	/**
	 * 乘于某个数
	 */
    public multiply(cmpNumber: MyBigLong | number): MyBigLong {
        if (typeof cmpNumber === "number") {
            this.value = Math.floor(this.value * cmpNumber);
        } else {
            this.value = Math.floor(this.value * cmpNumber.value);
        }
        this._numberStr = "";
        return this;
    }
    public copy() {
        return MyBigLong.create(this);
    }
    public isZero(): boolean {
        return this.value === 0;
    }
    public clear(): void {
        this.value = 0;
        this._numberStr = "0";
    }
    public getData(): number[] {
        return [this.value];
    }

    public unPackData(data: number[]): void {
        this._numberStr = "";
        this.value = data[0];
    }
}

// class EncodeBigLog extends MyBigLong {
//     public static pool: EncodeBigLog[] = [];
//     public static create(baseNumber: EncodeBigLog): MyBigLong
//     public static create(baseNumber: long, rateBy10: long): MyBigLong
//     public static create(baseNumber: long | EncodeBigLog, rateBy10?: long): MyBigLong {
//         let num = EncodeBigLog.pool.pop();
//         if (num) {
//         } else {
//             num = new EncodeBigLog();
//         }
//         if (baseNumber instanceof EncodeBigLog) {
//             num.initByBigNum(baseNumber);
//         } else {
//             num.initByNumber(baseNumber, rateBy10);
//         }
//         return num;
//     }
//     public copy() {
//         return MyBigLong.create(this);
//     }
//     public release() {
//         EncodeBigLog.pool.push(this);
//     }
// }
window["MyBigLong"] = MyBigLong;
