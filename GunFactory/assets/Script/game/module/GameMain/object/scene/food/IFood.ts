
interface IFood {
    /**
      * 获取当前等级图标
      */
    getCurLevelIcon(): string;
    /**
     * 获取下单icon
     */
    getOrderIcon(): string;
    /**
     * 获取菜式售卖价格
     */
    getAward(order: IOrder, rate: number);
    /**获取菜式id */
    getId(): number;

    foodType: number;
}