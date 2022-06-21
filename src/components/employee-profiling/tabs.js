import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

const CustomTabs = ({ tabsList = [], defaultActive = '' }) => {
    return (
        <div className='employee-profiling-detail-tabs-container'>
            <Tabs defaultActiveKey={defaultActive} className="mb-3 employee-profiling-detail-tab-item-container">
                {
                    tabsList.map(({ key, title, item }) => {
                        return (
                            <Tab eventKey={key} title={title}>
                                {item}
                            </Tab>
                        )
                    })
                }
            </Tabs>
        </div>
    );
};

export default CustomTabs;