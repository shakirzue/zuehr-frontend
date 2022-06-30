import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ManagerAppBar from '../../../components/ManagerAppBar';
import { backgroundColor } from '../../../Constants';
import { Card, Col, Row, Container, Form, FormSelect } from 'react-bootstrap';
import Select from '../../../components/employee-profiling/form/Select';
import Input from '../../../components/employee-profiling/form/Input';
import CustomButton from '../../../components/employee-profiling/form/Button';
import MultiSelect from '../../../components/employee-profiling/form/MultiSelect';
import { useDispatch, useSelector } from "react-redux";
import { attendanceActions } from '../../../redux/actions/attendance';
import { hrModuleActions } from '../../../redux/actions/hr';
import _ from 'lodash';

const CreateShift = props => {

    const [lookups, setLookUps] = useState({})

    const [shiftDetails, setShiftDetails] = useState({
        name: null,
        description: null,
        timezoneId: null,
        userProfileId: null
    });

    const dispatch = useDispatch();
    const __lookups = useSelector(state => state.hrModule.lookups);
    const loading = useSelector(state => state.hrModule.loading);


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

    const createShiftDetail = () => {
        dispatch(attendanceActions.createShiftDetailAction(
            shiftDetails
        ))
    }

    const renderCompanyInfoForm = () => {
        return (
            <>
                <p className='company-information-title'>Company Information</p>
                <Row>
                    <Col md={'3'}>
                        <Select name={'group'} id={'group'} label="Group" options={lookups?.group} />
                    </Col>
                    <Col md={'3'}>
                        <Select name={'location'} id={'location'} label="Location" options={lookups?.location} />
                    </Col>
                    <Col md={'3'}>
                        <Select name={'company-domain'} id={'company-domain'} label="Company Domain" options={lookups?.companydomain} />
                    </Col>
                    <Col md={'3'}>
                        <Select name={'business-unit'} id={'business-unit'} label="Business Unit" options={lookups?.businessUnit} />
                    </Col>
                    <Col md={'3'}>
                        <Select name={'department'} id={'department'} label="Department" options={lookups?.department} />
                    </Col>
                    <Col md={'3'}>
                        <Select name={'campaign'} id={'campaign'} label="Campaign" options={lookups?.campaign} />
                    </Col>
                    <Col md={'3'}>
                        <Select name={'job-category'} id={'job-category'} label="Job Category" options={lookups?.location} />
                    </Col>
                    <Col md={'3'}>
                        <Select name={'designation'} id={'designation'} label="Designation" options={lookups?.designation} />
                    </Col>
                    <Col md={'3'}>
                        <Select name={'cost-center'} id={'cost-center'} label="Cost Center" options={lookups?.costcenter} />
                    </Col>
                </Row>
            </>
        )
    }

    const renderPersonalInfoForm = () => {
        return (
            <>
                <p className='company-information-title'>Personal Information</p>
                
                <Row>
                    <Col md={3}>
                        <Input name={'cnic'} id={'cnic'} label="CNIC" />
                    </Col>
                    <Col md={3}>
                        <Input name={'FirstName'} id={'FirstName'} label="First Name" />
                    </Col>
                    <Col md={3}>
                        <Input name={'middle-name'} id={'middle-name'} label="Middle Name" />
                    </Col>
                    <Col md={3}>
                        <Input name={'last-name'} id={'last-name'} label="Last Name" />
                    </Col>
                    <Col md={3}>
                        <Input name={'dob'} id={'dob'} label="Date Of Birth" />
                    </Col>
                    <Col md={3}>
                        <Input name={'gender'} id={'gender'} label="Gender" />
                    </Col>
                    <Col md={3}>
                        <Input name={'personal-email'} id={'personal-email'} label="Personal Email" />
                    </Col>
                    <Col md={3}>
                        <Input name={'father_name'} id={'father_name'} label="Father/Husband Name" />
                    </Col>
                    <Col md={3}>
                        <Input name={'date_joining'} id={'date_joining'} label="Date Of Joining" />
                    </Col>
                </Row>
            </>
        )
    }

    const renderSubmitButton = () => {
        return (
           
            <CustomButton title={'Save'} onClick={createShiftDetail} isLoading={loading} />
        )
    }

    const onChangeText = (name, value) => {
        setShiftDetails({
            ...shiftDetails,
            [name]: value
        })
    }

    // const onChangeTimezoneText = (name, value) => {
    //     setShiftDetails({
    //         ...shiftDetails,
    //         [name]: value
    //     })
    // }

    return (
        <div style={{  height: "800px", backgroundColor: "#f4f4f4", overflow: "scroll" }}>
            <ManagerAppBar drawerOption={""} location="Home" />
            <Container className='employee-form-container'>
               
                <div className='main-dashboard col-sm-12'>
                    <h3 className="mb-3" style={{ textAlign: "left" }}>Create Shift</h3>
                </div>
                <Card className='employee-form-card-container col-sm-4'>
                    <Form>
                        <Row>
                            <Col md={12}>
                                <Input name={'name'} id={'name'} label="Shift Name"  onChange={onChangeText} />
                            </Col>
                            <Col md={12}>
                                <Select name={'timezoneId'} id={'timezoneId'} label="Timezone" options={lookups?.timezone} onChange={onChangeText} />
                            </Col>
                            {/* <Col md={'3'}>
                              <Select name={'company-domain'} id={'company-domain'} label="Company Domain" options={lookups?.companydomain}  onChange={onChangeText} />
                            </Col> */}

                            {/* <Col md={'3'}>
                                <MultiSelect name={'department'} id={'department'} label="Department" options={lookups?.department} multiple />
                            </Col> */}

                            <Col md={12}>
                                <Input name={'description'} id={'description'} label="Shift Details"  onChange={onChangeText} />
                            </Col>
   
                        </Row>
                        {renderSubmitButton()}
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

CreateShift.propTypes = {

};

export default CreateShift;