import BaseModel from "../../../core/mvc/model/BaseModel";
export enum GuideConst {
    /**
     * 开启新手引导
     */
    OPEN_GUIDE,
    /**
     * 开始录制
     */
    START_RECORD,
    /**
    * 停止录制
    */
    STOP_RECORD,
    /**
    * 播放录制
    */
    PLAY_RECORD,
    SET_IS_AUTO,
    /**
     * 下一步新手引导
     */
    NEXT_STEP,
    /**
     * 执行某个函数
     */
    EXECUTE_FUNC,
    /**
     * 检测某步新手引导是否执行完成
     */
    CHECK_IS_GUIDE,
}
// registerJSONConf("guideConf", "NewGuideTree");//注册到预加载配置里面
export class GuideModel extends BaseModel implements IMemento {

    saveData: {
        [id: string]: {
            /**这个引导到了第几步, 如果-1则表示已经完成 */
            index: number;
        }
    } = null;
    public checkStep(id: number, step: number) {
        if (!this.saveData[id]) {
            this.saveData[id] = { index: 0 }
        }
        let data = this.saveData[id];
        if (data.index <= step) {
            // 如果未完成该引导
            return true;
        }
        return false;
    }

    /** 设置新手引导步骤 */
    public setStep(id: number, step: number) {
        if (!this.saveData[id]) {
            this.saveData[id] = { index: step };
        }
        else {
            this.saveData[id].index = step;
        }
       
    }


    /** 检测引导是否已完成 */
    public checkIsFinish(id: number) {
        let data = this.saveData[id];
        if (data && data.index === -1) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
    * 创建存档
    */
    createMemento(key: string): any {
        return this.saveData;
    }

    /**
     * 同步存档
     * 
     * @param {*} data 同步的数据
     */
    setMemento(data: { [id: string]: any }) {
        if (data) {
            this.saveData = data;
        } else {
            this.saveData = {};
        }
    }
}
