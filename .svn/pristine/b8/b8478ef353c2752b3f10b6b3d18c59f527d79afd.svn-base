
class RandomUtils {
    /**
    * 获取一个区间的随机数
    * @param $from 最小值
    * @param $end 最大值
    * @returns {number}
    */
    public limit($from: number, $end: number): number {
        // $from = Math.min($from, $end);
        // $end = Math.max($from, $end);
        var range: number = $end - $from;
        return $from + Math.random() * range;
    }

    /**
     * 获取一个区间的随机数(整数)
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    public limitInteger($from: number, $end: number): number {
        return Math.floor(this.limit($from, $end + 1));
    }

    /**
     * 在一个数组中随机获取一个元素
     * @param arr 数组
     * @returns {any} 随机出来的结果
     */
    public randomArray<T>(arr: Array<T>): T {
        var index: number = Math.floor(Math.random() * arr.length);
        return arr[index];
    }

    /**
     * 将传进来的数值乱序
     * @param arr 
     */
    public shuffle<T>(arr: Array<T>): Array<T> {
        for (let i = arr.length - 1; i >= 0; i--) {
            let rIndex = Math.floor(Math.random() * (i + 1));
            let temp = arr[rIndex];
            arr[rIndex] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }

    /**
     * 加权随机算法，获取带有权值的随机元素 
     * @param arr 数组
     * @param totalWeight 总的权重值,如果没有会自动计算
     * @returns {any} 随机出来的结果
     */
    public randomArrayByWeight<T extends { weight: number }>(arr: Array<T>, totalWeight?: number): T {
        let arrLen = arr.length;
        if (!totalWeight) {//如果没有指定总权重,自动计算总权重
            totalWeight = 0;
            for (let i = 0; i < arrLen; i++) {
                totalWeight += arr[i].weight;;
            }
        }
        let random = Math.random() * totalWeight;
        for (let i = 0; i < arrLen; i++) {
            random -= arr[i].weight;
            if (random <= 0) {
                return arr[i];
            }
        }
    }

}
window["RandomUtils"] = RandomUtils;
