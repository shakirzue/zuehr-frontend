import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const CustomButton = ({ isLoading, title, size = "lg", onClick = () => { }, customContainerClass = '', buttonClass = '', ...rest }) => {

    const onClickButton = (event) => {
        if (onClick) {
            onClick(event)
        }
    }

    return (
        <div className={`select-component-container ${customContainerClass}`}>
            <Button className={`primary-btn ${buttonClass}`} size={size} onClick={onClickButton}  {...rest}>{title}</Button>
        </div>
    );
};

export default CustomButton;