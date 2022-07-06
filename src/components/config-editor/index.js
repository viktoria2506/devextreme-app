import React from 'react';
import './styles.scss';
import GridAction from "../../actions/grid-action";
import AddColumnPopup from "../add-column-popup";
import EditColumnNamePopup from "../edit-column-name-popup";

export default class ConfigEditor extends React.Component {
    constructor (props) {
        super (props);

        this.state = {
            addColumnVisible: false,
            editColumnVisible: false,
            dataFieldForChange: ''
        }
        this.showAddColumn = this.showAddColumn.bind(this);
    }

    _handleDelete = (e) => {
        const { column } = e.target.dataset;
        
        GridAction.deleteColumn(column);
    }

    _handleEdit = (e) => {
        const {column} = e.target.dataset;

        this.setState({editColumnVisible: true, dataFieldForChange: column});
    }

    hideAddColumn = () => {
        this.setState({addColumnVisible: false});
    }

    showAddColumn = () => {
        this.setState({addColumnVisible: true});
    }

    hideEditColumnPopup = () => {
        this.setState({editColumnVisible: false, dataFieldForChange: ''})
    }

    render () {
        const {addColumnVisible, editColumnVisible, dataFieldForChange} = this.state;
        const {reportConfig} = this.props;

        return (
            <>
            <div className="config-editor">
                <div className="config-editor-title">Список колонок</div>
                <div className="columns-list">
                    {reportConfig
                        .filter(({visible}) => visible)
                        .map(({dataField, caption}) =>
                            <div key={dataField} className="columns-list-item">
                                <div>{caption}</div>
                                <div className="dx-icon-trash" data-column={dataField} onClick={this._handleDelete} />
                                <div className="dx-icon-edit" data-column={dataField} onClick={this._handleEdit} />
                            </div>
                        )}
                </div>
                <div className="add-column-button" onClick={this.showAddColumn} disabled={reportConfig.every(({ visible }) => visible)}>Добавить колонку</div>
            </div>
            <AddColumnPopup
                visible={addColumnVisible}
                onHiding={this.hideAddColumn}
                reportConfig={reportConfig}
            />
            <EditColumnNamePopup
                dataFieldForChange={dataFieldForChange}
                visible={editColumnVisible}
                onHiding={this.hideEditColumnPopup}
                hideEditColumnPopup={this.hideEditColumnPopup}
                reportConfig={reportConfig}
            />
        </>
        )
    }
}