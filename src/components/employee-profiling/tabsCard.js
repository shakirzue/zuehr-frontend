import React from 'react';
import PropTypes from 'prop-types';

const TabsCard = ({ title, content, customContainerClass = '', ...rest }) => {
    return (
        <div className={`tab-section-container ${customContainerClass}`}>
            <div className='tab-section-header'>
                <h4>{title}</h4>
            </div>
            <div className='tab-section-card'>
                {content}
            </div>
        </div>
    );
};


export default TabsCard;