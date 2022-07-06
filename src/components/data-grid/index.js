import React from 'react';
import './styles.scss';

import ConfigStore from "../../stores/config-store";
import data from "../../data/data";

import {
    Column,
    DataGrid
} from 'devextreme-react/data-grid';

export default class Table extends React.Component {
    constructor (props) {
        super(props);

        this.data = data.getCompaniesInfo();
    }

    _getInitialState () {
        return { reportConfig: ConfigStore.getConfig()};
    }
    
    render () {
        const { reportConfig } = this.props;
        const isEmpty = !reportConfig;

        return (
            <div className='grid-data'>
            <div className="grid-title">Окно предварительного просмотра отчёта</div>
                {isEmpty && <div>Добавьте колонки для отображения</div>}
                {!isEmpty && <DataGrid
                dx-icon-edit={true}
                    dataSource={this.data}
                >
                    {reportConfig.map((config) =>
                        <Column
                            key={config.dataField}
                            data-id={config.caption}
                            {...config}
                        />
                    )}
                </DataGrid>}
            </div>
        );
    }
}
