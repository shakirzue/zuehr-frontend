import React from 'react';
import PropTypes from 'prop-types';
import { FormSelect, FormLabel } from 'react-bootstrap';
import _ from 'lodash';

const MultiSelect = ({ name, id, onChange = () => { }, label = '', options = [] }) => {
    return (
        <div className='select-component-container'>
            <FormLabel className='select-component-label' for={id}>{label}</FormLabel>
            <FormSelect className='select-component-item' name={name} id={id} onChange={onChange} multiple >
                <option>Select</option>
                {
                    _.isArray(options) && options.map(item => {
                        return <option value={item?.id}>{item?.Description}</option>
                    })
                }
            </FormSelect>
        </div>
    );
};

MultiSelect.propTypes = {

};

export default MultiSelect;