import React from "react";

import "./styles.scss";
import GridAction from "../../actions/grid-action";

import { Popup } from "devextreme-react/popup";

export default class AddColumnPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  _addColumn = (e) => {
    const { column } = e.target.dataset;
    const newList = this.state.list.slice();
    const index = this.state.list.findIndex((name) => column === name);

    if (index >= 0) {
      newList.splice(index, 1);
    } else {
      newList.push(column);
    }

    this.setState({ list: newList });
  };

  _handleClick = () => {
    this.props.onHiding();

    GridAction.addColumn(this.state.list);
  };

  render() {
    const { reportConfig } = this.props;

    return (
      <Popup
        {...this.props}
        width="50%"
        height="auto"
        className="popup-container"
        showCloseButton={true}
        showTitle={true}
        title="Доступные колонки"
        closeOnOutsideClick={true}
      >
        <div className="config-list">
          {reportConfig
            .filter(({ visible }) => !visible)
            .map(({ dataField }) => (
              <div className="config-item" key={dataField}>
                <input
                  type="checkbox"
                  id={dataField}
                  data-column={dataField}
                  onClick={this._addColumn}
                />
                <label htmlFor={dataField}>{dataField}</label>
              </div>
            ))}
        </div>
        <button onClick={this._handleClick}>Добавить</button>
      </Popup>
    );
  }
}
