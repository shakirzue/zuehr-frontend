import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ManagerAppBar from '../../../components/ManagerAppBar';
import { backgroundColor } from '../../../Constants';
import { Card, Col, Row, Container, Form, FormSelect } from 'react-bootstrap';
import Select from '../../../components/employee-profiling/form/Select';
import Input from '../../../components/employee-profiling/form/Input';
import CustomButton from '../../../components/employee-profiling/form/Button';
import { useDispatch, useSelector } from "react-redux";
import { hrModuleActions } from '../../../redux/actions/hr';
import _ from 'lodash';

const ShiftForm = props => {

    const [lookups, setLookUps] = useState({})

    const dispatch = useDispatch();
    const __lookups = useSelector(state => state.hrModule.lookups);

    useEffect(() => {
        getAllHrLookUps()
    }, []);

    useEffect(() => {
        if (!_.isEmpty(__lookups) && _.isObject(__lookups)) {
            setLookUps(__lookups)
        }

    }, [__lookups])

    const getAllHrLookUps = () => {
        dispatch(hrModuleActions.getHrLookupsAction())
    }

    const renderCompanyInfoForm = () => {
        return (
            <>
                <p className='company-information-title'>Shift Scheduler</p>
                <Row>
                    <Col md={'3'}>
                        <Select name={'group'} id={'group'} label="Group" options={lookups?.group} />
                    </Col>
                   
                    <Col md={'3'}>
                        <Select name={'company-domain'} id={'company-domain'} label="Company Domain" options={lookups?.companydomain} />
                    </Col>
                    
                    <Col md={'3'}>
                        <Select name={'department'} id={'department'} label="Department" options={lookups?.department} />
                    </Col>

                    <Col md={'3'}>
                        <Select name={'employee'} id={'employee'} label="Employee" options={lookups?.employee} />
                    </Col>
                    
                </Row>
            </>
        )
    }

    
    const renderSubmitButton = () => {
        return (
            <CustomButton title={'Save'} />
        )
    }

    return (
        <div style={{ minHeight: "100vh", backgroundImage: backgroundColor }}>
            <ManagerAppBar drawerOption={"open"} location="Home" />
            <Container className='employee-form-container'>
                <h4 className='panel-form-title'>Shift Scheduler</h4>
                <Card className='employee-form-card-container'>
                    <Form>
                        {renderCompanyInfoForm()}                    
                        {renderSubmitButton()}
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

ShiftForm.propTypes = {

};

export default ShiftForm;