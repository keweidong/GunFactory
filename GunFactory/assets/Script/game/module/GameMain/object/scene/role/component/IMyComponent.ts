import GameObject from "../GameObject";


export interface IMyComponent extends cc.Component {
    init();
    entity: GameObject;
    exit();
}