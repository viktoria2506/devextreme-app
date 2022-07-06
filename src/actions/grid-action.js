import Dispatcher from '../dispatcher/app-dispatcher';
import ACTION_TYPE from './action-type';

class GridAction {
    addColumn (dataFields) {
        Dispatcher.dispatch({
            ACTION_TYPE: ACTION_TYPE.addColumn,
            dataFields
        })
    }

    deleteColumn (dataField) {
        Dispatcher.dispatch({
            ACTION_TYPE: ACTION_TYPE.deleteColumn,
            dataField
        })
    }

    changeCaption (dataField, caption) {
        Dispatcher.dispatch({
            ACTION_TYPE: ACTION_TYPE.changeCaption,
            dataField,
            caption
        })
    }
}

export default new GridAction();