// TypeScript file
/**
 * @description 装饰器函数
 */
export namespace Decorators {
    export function AddGetInstance(constructor: Function) {
        constructor["getInstance"] = function (...args: any[]) {
            var Class: any = this;
            if (!Class._instance) {
                var argsLen: number = args.length;
                if (argsLen == 0) {
                    Class._instance = new Class();
                } else if (argsLen == 1) {
                    Class._instance = new Class(args[0]);
                } else if (argsLen == 2) {
                    Class._instance = new Class(args[0], args[1]);
                } else if (argsLen == 3) {
                    Class._instance = new Class(args[0], args[1], args[2]);
                } else if (argsLen == 4) {
                    Class._instance = new Class(args[0], args[1], args[2], args[3]);
                } else if (argsLen == 5) {
                    Class._instance = new Class(args[0], args[1], args[2], args[3], args[4]);
                }
            }
            return Class._instance;
        }
        // return function(target:Function){
        //     return 
        // }
    }
    // /**
    //  * @description 自动打印函数的第一个参数
    //  */
    // export let printDatas = (value: boolean) => {
    //     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    //         if (value) {
    //             const method = descriptor.value;
    //             descriptor.value = function (...arg) {
    //                 egret.log("执行方法:",target["__class__"], ":", propertyKey);
    //                 return method.apply(this, arg);
    //             }
    //         } else {
    //             return descriptor.value;
    //         }
    //     };
    // }
    // /**
    //  *@description 检查第一个参数是否为空
    //  */
    // export let checkNull = (target, propertyKey, descriptor) => {
    //     const method = descriptor.value;
    //     descriptor.value = function (...arg) {
    //         if (!arg[0]) {
    //             egret.warn(`方法${propertyKey}的参数不能为null`)
    //             return null;
    //         }
    //         else {
    //             return method.apply(this, arg);
    //         }

    //     }
    // }
    // /**
    //  * @description 调用一个函数时,自动打印这个函数的一些信息
    //  */
    // export let pringMsg = (str?: string) => {
    //     return (target, propertyKey, descriptor) => {
    //         const method = descriptor.value;
    //         descriptor.value = function (...arg) {
    //             egret.log(propertyKey + str)
    //             return method.apply(this, arg);
    //         }
    //     }
    // }
}
// window["Decorators"] = this.Decorators;