
/**
 * Created by yangsong on 2014/11/22.
 * 数学计算工具类
 */
export enum Dir {
    Top,
    TopRight,
    Right,
    BottomRight,
    Bottom,
    BottomLeft,
    Left,
    TopLeft
}
export class MathUtils {
    /**
     * 弧度制转换为角度值
     * @param radian 弧度制
     * @returns {number}
     */
    public getAngle(radian: number): number {
        return 180 * radian / Math.PI;
    }

    /**
     * 角度值转换为弧度制
     * @param angle
     */
    public getRadian(angle: number): number {
        return angle / 180 * Math.PI;
    }

    /**
     * 获取两点间弧度
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    public getRadian2(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
        var xdis: number = p2X - p1X;
        var ydis: number = p2Y - p1Y;
        return Math.atan2(ydis, xdis);
    }

    /**
     * 获取两点间距离
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    public getDistance(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
        var disX: number = p2X - p1X;
        var disY: number = p2Y - p1Y;
        var disQ: number = disX * disX + disY * disY;
        return Math.sqrt(disQ);
    }
    public computeGameObjDir(currX: number, currY: number, gotoX: number, gotoY: number): Dir {
        var radian: number = this.getRadian2(currX, currY, gotoX, gotoY);

        var angle: number = this.getAngle(radian);
        var dir: Dir;
        if (angle == 0) {
            dir = Dir.Right;
        }
        else if (angle == 90) {
            dir = Dir.Bottom;
        }
        else if (angle == 180) {
            dir = Dir.Left;
        }
        else if (angle == -90) {
            dir = Dir.Top;
        }
        else if (angle > 0 && angle < 90) {
            dir = Dir.BottomRight;
        }
        else if (angle > 90 && angle < 180) {
            dir = Dir.BottomLeft;
        }
        else if (angle > -180 && angle < -90) {
            dir = Dir.TopLeft;
        }
        else if (angle > -90 && angle < 0) {
            dir = Dir.TopRight;
        }
        return dir;
    }
    evalRpn(exp: string) {
        let rpnQueue = dal2Rpn(exp);

        var outputStack = [];
        while (rpnQueue.length > 0) {
            var cur = rpnQueue.shift();

            if (!isOperator(cur)) {
                outputStack.push(cur);
            } else {
                if (outputStack.length < 2) {
                    throw "unvalid stack length";
                }
                var sec = outputStack.pop();
                var fir = outputStack.pop();

                outputStack.push(getResult(fir, sec, cur));
            }
        }

        if (outputStack.length != 1) {
            throw ("unvalid expression");
        } else {
            return outputStack[0];
        }
    }
}
function isOperator(value) {
    var operatorString = "+-*/()";
    return operatorString.indexOf(value) > -1
}

function getPrioraty(value) {
    switch (value) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        default:
            return 0;
    }
}

function prioraty(o1, o2) {
    return getPrioraty(o1) <= getPrioraty(o2);
}
function split(exp: string) {
    return exp.match(/(\(|\)|\*|\+|\-|\/|\d+\.?\d*)/g);
}
function dal2Rpn(exp) {
    var inputStack = split(exp);
    var outputStack = [];
    var outputQueue = [];
    while (inputStack.length > 0) {
        var cur = inputStack.shift();
        if (isOperator(cur)) {
            if (cur == '(') {
                outputStack.push(cur);
            } else if (cur == ')') {
                var po = outputStack.pop();
                while (po != '(' && outputStack.length > 0) {
                    outputQueue.push(po);
                    po = outputStack.pop();
                }
                if (po != '(') {
                    throw "error: unmatched ()";
                }
            } else {
                while (prioraty(cur, outputStack[outputStack.length - 1]) && outputStack.length > 0) {
                    outputQueue.push(outputStack.pop());
                }
                outputStack.push(cur);
            }
        } else {
            outputQueue.push(parseFloat(cur));
        }
    }
    if (outputStack.length > 0) {
        if (outputStack[outputStack.length - 1] == ')' || outputStack[outputStack.length - 1] == '(') {
            throw "error: unmatched ()";
        }
        while (outputStack.length > 0) {
            outputQueue.push(outputStack.pop());
        }
    }
    return outputQueue;

}
function getResult(fir, sec, cur) {
    switch (cur) {
        case "+":
            return fir + sec;
        case "-":
            return fir - sec;
        case "*":
            return fir * sec;
        case "/":
            return fir / sec;
    }
}