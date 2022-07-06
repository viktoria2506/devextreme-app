export default class Info {
    constructor(info) {
        this.dataField = info.dataField || '';
        this.caption = info.caption || '';
        this.dataType = info.dataType || '';
        this.alignment = info.alignment || '';
        this.visible = true;
    }
}