
export default class ResManager {
    getResByUrl(e) {
        return this.getResById(e);
    }
    loadResArray(url: string[], progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any[]) => void) | null): void {
        return cc.loader.loadResArray(url, progressCallback, completeCallback)
    }
    public getRemoteResAsync(resources: string, type?: typeof cc.Asset): Promise<any> {
        // cc.loader.loadRes()
        return new Promise((resolve: Function, reject: Function) => {
            if (type) {
                cc.loader.loadRes(resources, type, (err, texture) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(texture);
                    }
                });
            } else {
                cc.loader.loadRes(resources, (err, texture) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(texture);
                    }
                });
            }

        });
    }

    // protected cacheList
    protected loadCacheList: { [url: string]: Promise<any> } = Object.create(null);
    
    public getResAsync<T extends cc.Asset>(resources: string, type?: { new(): T }): Promise<T> {
        if (this.loadCacheList[resources]) {
            return this.loadCacheList[resources];
        }
        this.loadCacheList[resources] = new Promise((resolve: Function, reject: Function) => {
            if (type) {
                cc.loader.loadRes(resources, type, (err, texture) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(texture);
                    }
                });
            } else {
                cc.loader.loadRes(resources, (err, texture) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(texture);
                    }
                });
            }

        });
        return this.loadCacheList[resources];
    }
    public getResByUrlAsync(resources: string | string[] | { uuid?: string, url?: string, type?: string }): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            cc.loader.load(resources, (err, texture) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(texture);
                }
            });
        });
    }
    getRes<T extends cc.Asset>(name: string, type?: { new(): T }): T {
        return cc.loader.getRes(name, type);
    }
    getResById(e: string) {
        return cc.loader.getRes(e);
    }
}