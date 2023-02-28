
export default class BaseCondition extends b3.Condition {
    protected log(...optionalParams: any[]) {
        let title = this.title;
        let matchs = title.match(/(<[0-9a-zA-Z_]+>)/g);
        if (matchs) {
            for (const iterator of matchs) {
                let key = iterator.slice(1, iterator.length - 1);
                title = title.replace(iterator, this.properties[key] + "");
            }
        }
        Log.trace(title, ...optionalParams);
    }
}