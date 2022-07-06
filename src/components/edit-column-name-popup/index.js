import React from 'react';
import './styles.scss';

import GridAction from '../../actions/grid-action';
import ConfigStore from '../../stores/config-store';

import { Popup } from "devextreme-react/popup";
import Button from "devextreme-react/button";

export default class EditColumnNamePopup extends React.Component {
    constructor (props) {
        super(props);

        this.state = {            
            value: ''
        }
    }

    _onValueChange = (e) => {
        this.setState({value: e.target.value});
    }

    editColumnName = () => {
        GridAction.changeCaption(this.props.dataFieldForChange, this.state.value);
        
        this.props.hideEditColumnPopup(false);
        this.setState({value: ''});
    }

    setDefaultName = () => {
        console.log(ConfigStore.getCaptionByName(this.props.dataFieldForChange));
        this.setState({value: ConfigStore.getCaptionByName(this.props.dataFieldForChange)});
    }

    render () {
        const { value } = this.state;

        return (
            <Popup
                {...this.props}
                width="60%"
                height="auto"
                className="popup-container"
                showCloseButton={true}
                showTitle={true}
                title="Редактировать название колонки"
                closeOnOutsideClick={true}
                onShowing={this.setDefaultName}
            >
                <div className="container">
                    <div className="input-container">
                        <input
                            type="text"
                            name="columnName"
                            id="columnName"
                            value={value }
                            onChange={this._onValueChange}
                        />
                    </div>
                    <Button text="Применить" onClick={this.editColumnName} disabled={!value}/>
                </div>
            </Popup>
        );
    }
}