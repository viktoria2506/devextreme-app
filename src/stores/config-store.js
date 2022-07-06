import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher/app-dispatcher';
import Info from './info';
import reportConfig from '../data/report-config.json';
import ACTION_TYPE from '../actions/action-type';
import EVENT_TYPE from './event-type';

class ConfigStore extends EventEmitter {
    _config = [];

    constructor() {
        super();

        this._config = reportConfig.map((conf) => {
            return new Info(conf)
        })

        Dispatcher.register(this.registerActions.bind(this));
    }

    _findColumnIndexByName (dataField) {
        return this._config.findIndex((field) => dataField === field.dataField);
    }

    _actionAddNewColumn (dataFields) {
        console.log(dataFields);
        for (let i = 0; i < dataFields.length; i++) {
            const index = this._findColumnIndexByName(dataFields[i]);

            this._config[index].visible = true;
        }

        this.emit(EVENT_TYPE.change);
    }

    _actionDeleteColumn (dataField) {
        const index = this._findColumnIndexByName(dataField);

        this._config[index].visible = false;
        this.emit(EVENT_TYPE.change);
    }

    _actionChangeCaption (dataField, caption) {
        const index = this._findColumnIndexByName(dataField);

        this._config[index].caption = caption;
        this.emit(EVENT_TYPE.change);
    }

    registerActions (action) {
        console.log(action);
        if (action.ACTION_TYPE === ACTION_TYPE.addColumn) {
            console.log('add');
            this._actionAddNewColumn(action.dataFields);
        } else if (action.ACTION_TYPE === ACTION_TYPE.deleteColumn) {
            this._actionDeleteColumn(action.dataField);
        } else if (action.ACTION_TYPE === ACTION_TYPE.changeCaption) {
            this._actionChangeCaption(action.dataField, action.caption);
        }
    }

    getConfig () {
        return this._config;
    }

    getCaptionByName (dataField) {
        const index = this._config.findIndex((field) => dataField === field.dataField);

        return this._config[index].caption;
    }
}

export default new ConfigStore();