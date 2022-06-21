import React from 'react';
import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner'


const Loader = ({ label = 'loading', color = 'blue', containerClass = '' }) => {
    return (
        <div className={`loader-container ${containerClass}`}>
            <ThreeDots
                height="50"
                width="50"
                color={color}
                ariaLabel={label}
            />
        </div>
    );
};


export default Loader;