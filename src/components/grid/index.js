import React from "react";
import './styles.scss';

import ConfigStore from "../../stores/config-store";
import EVENT_TYPE from "../../stores/event-type";

import Table from "../data-grid";
import ConfigEditor from "../config-editor";

export default class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = this._getInitialState();
  }

  _getInitialState() {
    return { reportConfig: ConfigStore.getConfig() };
  }

  _onChange = () => {
    this.setState(this._getInitialState());
  };

  componentDidMount() {
    ConfigStore.on(EVENT_TYPE.change, this._onChange);
  }

  componentWillUnmount() {
    ConfigStore.off(EVENT_TYPE.change, this._onChange);
  }

  render() {
    const { reportConfig } = this.state;

    return (
      <div className="content-block">
        <div className="main-container">
          <Table reportConfig={reportConfig} />
          <ConfigEditor reportConfig={reportConfig} />
        </div>
      </div>
    );
  }
}
