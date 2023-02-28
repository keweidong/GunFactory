
export class CsvDataBase implements ICsvDataBase {
    id: number = null;
    len: number = 0;
    // public abo: AttrBaseObject = new AttrBaseObject();
    public $parseData(lines: string[], typeList: string[], keyList: string[]) {
        let arrLen = lines.length;
        for (let j = 0; j < arrLen; j++) {
            if (typeList[j] === "int") {
                this[keyList[j]] = parseInt(lines[j]);
            } else if (typeList[j] === "float") {
                this[keyList[j]] = parseFloat(lines[j]);
            } else {
                this[keyList[j]] = lines[j];
            }
        }
        return lines[0];
    }
}
export interface ICsvDataBase {
    id: number;
    $parseData(lines: string[], typeList: string[], keyList: string[]);
}
