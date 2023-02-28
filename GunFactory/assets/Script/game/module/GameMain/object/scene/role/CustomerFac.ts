export class CustomerFac {
    protected facList: any[] = [];
    /**
     * 在固定时间内,创建多少个顾客
     * @param cnt 创建多少个顾客
     * @param time 在多少时间内创建
     */
    public createCustomersInTime(cnt: number, time: number) {
        let timeList = [];
        for (let i = 0; i < cnt; i++) {
            timeList[i] = Math.random() * time;
        }
        return function (curTime: number) {
            for (let i = timeList.length - 1; i >= 0; i--) {
                if (timeList[i] >= curTime) {
                    timeList.splice(i, 1);
                }
            }
            return timeList.length === 0;
        }
    }
}