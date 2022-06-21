import React from 'react';
import { FormControl, FormLabel } from 'react-bootstrap';

const Input = ({ name, type, id, onChange = () => { }, label, ...rest }) => {

    const onChangeText = (e) => {
        const { name, value } = e.target

        if (onChange) {
            onChange(name, value)
        }
    }

    return (
        <div className='select-component-container'>
            <FormLabel className='select-component-label' for={id}>{label}</FormLabel>
            <FormControl
                className='select-component-item'
                type={type}
                name={name}
                onChange={onChangeText}
                {...rest}
            />
        </div>
    );
};

Input.propTypes = {

};

export default Input;