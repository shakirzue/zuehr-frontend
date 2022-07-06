import React, { useEffect, useState } from 'react';
//import PropTypes from 'prop-types';
import ManagerAppBar from '../../../components/ManagerAppBar';
import { backgroundColor } from '../../../Constants';
import { Card, Col, Row, Container, Form } from 'react-bootstrap';
import Select from '../../../components/employee-profiling/form/Select';
import Input from '../../../components/employee-profiling/form/Input';
import CustomButton from '../../../components/employee-profiling/form/Button';
import { useDispatch, useSelector } from "react-redux";
import { hrModuleActions } from '../../../redux/actions/hr';
import _ from 'lodash';
//import moment from 'moment';

const EmployeeForm = props => {

    const [lookups, setLookUps] = useState({});
    const [personalDetails, setPersonalDetails] = useState({
        employeeId: '',
        firstName: '',
        lastName: '',
        phone: '',
        dateOfBirth: '',
        genderId: '',
        email: '',
        identityNumber: '',
        dateOfJoining: '',
        officialEmail: '',
        reportToId: '',
        executive: '',
        middleName: '',
        Guardian_Name: ''
    });

    const [companyDetails, setCompanyDetails] = useState({
        requisitionId: 1,
        groupId: null,
        locationId: null,
        companyDomainId: null,
        reportToId: null,
        businessUnitId: null,
        departmentId: null,
        jobCategoryId: null,
        designationId: null,
        campaignId: null,
    });

    const dispatch = useDispatch();
    const __lookups = useSelector(state => state.hrModule.lookups);
    const loading = useSelector(state => state.hrModule.loading);

    useEffect(() => {
        dispatch(hrModuleActions.getHrLookupsAction());
       // getAllHrLookUps()
    }, []);

    useEffect(() => {
        console.log(companyDetails)
    }, [companyDetails]);


    useEffect(() => {
        if (!_.isEmpty(__lookups) && _.isObject(__lookups)) {
            setLookUps(__lookups)
        }

    }, [__lookups])


    // const getAllHrLookUps = () => {
    //     dispatch(hrModuleActions.getHrLookupsAction())
    // }

    const createPersonalDetail = () => {

        dispatch(hrModuleActions.createPersonalDetailAction(
            personalDetails,
            createCompanyDetail
        ))
    }

    const createCompanyDetail = (id) => {
        Object.assign(companyDetails, { personalDetailId: id })
        dispatch(hrModuleActions.createCompanyDetailAction(
            companyDetails
        ))
    }

    const onChangeText = (name, value) => {
        setPersonalDetails({
            ...personalDetails,
            [name]: value
        })
    }

    const onChangeCompaniesText = (name, value) => {
        setCompanyDetails({
            ...companyDetails,
            [name]: value
        })
    }

    const renderCompanyInfoForm = () => {
        return (
            <>
                <p className='company-information-title'>Company Information</p>
                <Row>
                <Col md={'6'}>
                        <Select name={'companyDomainId'} id={'companyDomainId'} label="Company" options={lookups?.companydomain} onChange={onChangeCompaniesText} />
                    </Col>
                    <Col md={'6'}>
                        <Select name={'locationId'} id={'locationId'} label="Location" options={lookups?.location} onChange={onChangeCompaniesText} />
                    </Col>
                    <Col md={'6'}>
                        <Select name={'departmentId'} id={'departmentId'} label="Department" options={lookups?.department} onChange={onChangeCompaniesText} />
                    </Col>

                    <Col md={'6'}>
                        <Select name={'designationId'} id={'designationId'} label="Designation" options={lookups?.designation} onChange={onChangeCompaniesText} />
                    </Col>
                    {/* <Col md={'3'}>
                        <Select name={'groupId'} id={'groupId'} label="Group" options={lookups?.group} onChange={onChangeCompaniesText} />
                    </Col> */}
                    
                    
                    {/* <Col md={'3'}>
                        <Select name={'businessUnitId'} id={'businessUnitId'} label="Business Unit" options={lookups?.businessUnit} onChange={onChangeCompaniesText} />
                    </Col> */}
                   
                    {/* <Col md={'3'}>
                        <Select name={'campaignId'} id={'campaignId'} label="Campaign" options={lookups?.campaign} onChange={onChangeCompaniesText} />
                    </Col> */}
                    {/* <Col md={'3'}>
                        <Select name={'jobCategoryId'} id={'jobCategoryId'} label="Job Category" options={lookups?.jobcategory} onChange={onChangeCompaniesText} />
                    </Col> */}
                    
                    {/* <Col md={'3'}>
                        <Select name={'costCenterId'} id={'costCenterId'} label="Cost Center" options={lookups?.costcenter} onChange={onChangeCompaniesText} />
                    </Col> */}
                </Row>
            </>
        )
    }

    const renderPersonalInfoForm = () => {
        return (
            <>
                <p className='mt-3 company-information-title'>Personal Information</p>
                <Row>
                    <Col md={3}>
                        <Input name={'employeeId'} id={'employeeId'} label="Employee Code" onChange={onChangeText} disabled/>
                    </Col>
                    <Col md={3}>
                        <Input name={'firstName'} id={'firstName'} label="First Name*" onChange={onChangeText} required/>
                    </Col>
                    <Col md={3}>
                        <Input name={'middleName'} id={'middleName'} label="Middle Name" onChange={onChangeText} />
                    </Col>
                    <Col md={3}>
                        <Input name={'lastName'} id={'lastName'} label="Last Name" onChange={onChangeText} />
                    </Col>
                    <Col md={3}>
                        <Input name={'identityNumber'} id={'identityNumber'} label="CNIC*" onChange={onChangeText} required/>
                    </Col>
                    <Col md={3}>
                        <Input name={'phone'} id={'phone'} label="Phone*" onChange={onChangeText} type="number" required/>
                    </Col>
                    <Col md={3}>
                        <Input name={'dateOfBirth'} id={'dateOfBirth'} label="Date Of Birth" onChange={onChangeText} type="date" />
                    </Col>
                    <Col md={3}>
                        <Select name={'genderId'} id={'genderId'} label="Gender" onChange={onChangeText} options={lookups?.gender} />
                    </Col>
                    <Col md={3}>
                        <Input name={'email'} id={'email'} label="Personal Email" onChange={onChangeText} required/>
                    </Col>
                    <Col md={3}>
                        <Input name={'Guardian_Name'} id={'Guardian_Name'} label="Father/Husband Name" onChange={onChangeText} />
                    </Col>
                    <Col md={3}>
                        <Input name={'dateOfJoining'} id={'dateOfJoining'} label="Date Of Joining" onChange={onChangeText} type="date" />
                    </Col>
                    <Col md={3}>
                        <Input name={'officialEmail'} id={'officialEmail'} label="Official Email" onChange={onChangeText} type="email" />
                    </Col>
                    <Col md={3}>
                        <Select name={'reportToId'} id={'reportToId'} label="Report To">
                        <option value="0">Report To</option>
                        <option value="1">Supervisor</option>
                        <option value="2">Team Lead</option>
                        </Select>
                    </Col>
                    <Col md={2}>
                        <div className='executive-checkbox mt-5'>
                            <input type="checkbox" id="executive" name="executive" value="executive"/>
                            <label for="executive">   Is Executive</label>
                        </div>
                        
                    </Col>

                    
                    
                </Row>
            </>
        )
    }

    const renderSubmitButton = () => {
        return (
            <CustomButton title={'Save'} onClick={createPersonalDetail} isLoading={loading} size="md"/>
        )
    }

    return (
        <div style={{  height: "100vh", backgroundColor: "#f2f2f2", overflow: "scroll" }}>
            <ManagerAppBar drawerOption={"open"} location="Home" />
            <Container className='employee-form-container'>
            <div className='main-dashboard col-sm-12'>
                    <h3 className="mb-3" style={{ textAlign: "left" }}>Employee Information</h3>
                </div>
                {/* <h4 className='panel-form-title'>Employee Information</h4> */}
                <Card className='employee-form-card-container'>
                    <Form>
                        {renderCompanyInfoForm()}
                        {renderPersonalInfoForm()}
                        {renderSubmitButton()}
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

EmployeeForm.propTypes = {

};

export default EmployeeForm;