import React from 'react';
import PropTypes from 'prop-types';
import { FormSelect, FormLabel } from 'react-bootstrap';
import _ from 'lodash';

const Select = ({ name, id, onChange = () => { }, label = '', options = [], defaultValue = null }) => {

    const onChangeSelect = (e) => {
        const { value, name } = e.target;

        if (onChange) {
            onChange(name, value)
        }
    }

    return (
        <div className='select-component-container'>
            <FormLabel className='select-component-label' for={id}>{label}</FormLabel>
            <FormSelect className='select-component-item' name={name} id={id} onChange={onChangeSelect} >
                <option>Select</option>
                {
                    _.isArray(options) && options.map(item => {
                        const { id } = item;
                        let isChecked = id === defaultValue;
                        return (
                            <option value={item?.id} selected={isChecked}>{item?.Description}</option>
                        )
                    })
                }
            </FormSelect>
        </div>
    );
};

Select.propTypes = {

};

export default Select;