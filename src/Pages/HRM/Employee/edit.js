import React, { useEffect, useRef, useState } from 'react';
import { Card, Col, Container, Row, InputGroup, Tabs, Tab } from 'react-bootstrap';
import CustomButton from '../../../components/employee-profiling/form/Button';
import ManagerAppBar from '../../../components/ManagerAppBar';
import { backgroundColor } from '../../../Constants';
import userAvatar from '../../../assets/img/user_avatar.png'
import CustomTabs from '../../../components/employee-profiling/tabs';
import General from './Tabs/general';
import Academics from './Tabs/academics';
import Experiences from './Tabs/experience';
import Documents from './Tabs/documents';
import ProfessionalReference from './Tabs/reference';
import { useDispatch, useSelector } from 'react-redux';
import { hrModuleActions } from '../../../redux/actions';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { getFullEmployeeName } from '../../../helpers/utils';

const EmployeeEdit = props => {

    const [tabsList, setTabsList] = useState([]);
    const [details, setDetails] = useState({});
    const [lookups, setLookUps] = useState({});

    const inputFile = useRef(null);

    const dispatch = useDispatch();
    const params = useParams();
    const __details = useSelector(state => state.hrModule.singleProfileDetail);
    const __lookups = useSelector(state => state.hrModule.lookups);

    useEffect(() => {
        // let list = [
        //     { key: 'general', title: 'General', item: renderGeneralTab() },
        //     { key: 'academics', title: 'Academics', item: renderAcademics() },
        //     { key: 'experiences', title: 'Experiences', item: renderExperiences() },
        //     { key: 'documents', title: 'Documents', item: renderDocuments() },
        //     { key: 'professional_reference', title: 'Professional Reference', item: renderProfessionalReferences() },
        //     { key: 'others', title: 'Others', item: 'Under Development ..' },
        //     { key: 'clearance_detail', title: 'Clearance Detail', item: 'Under Development ..' },
        // ];

        // setTabsList(list);

        dispatch(hrModuleActions.getProfileByEmployeeIdAction(params?.id, getFamilyInfoDetails))
        getAllHrLookUps();
    }, []);


    useEffect(() => {
        if (!_.isEmpty(__details)) {
            setDetails(__details)
        }
    }, [__details])

    useEffect(() => {
        if (!_.isEmpty(__lookups) && _.isObject(__lookups)) {
            setLookUps(__lookups)
        }

    }, [__lookups])

    const getAllHrLookUps = () => {
        dispatch(hrModuleActions.getHrLookupsAction())
    }

    const editPersonalDetail = (data) => {
        dispatch(hrModuleActions.updatePersonalDetailAction(data))
    }

    const getFamilyInfoDetails = () => {
        let data = { 'personalDetailId': 31 }
        dispatch(hrModuleActions.getFamilyInfoByProfileAction(data))
    }

    const createFamilyInformation = (data) => {
        Object.assign(data, { personalDetailId: details?.id })
        dispatch(hrModuleActions.createFamilyDetailAction(data, getFamilyInfoDetails))
    }

    // const

    const onPressUploadNew = () => {
        inputFile.current.click();
    }

    const onFileSelect = (e) => {
        let file = e.target.files[0];
    }

    const getCompanyObject = (array) => {
        if (_.isArray(array) && array.length > 0) {
            let desgination = array[0].Designation;
            return desgination ? desgination.Description : '';
        }

        return '';
    }

    const getProfileStatus = () => {
        return details?.isActive ? 'Active' : 'Pending'
    }

    const getGenderName = () => {
        return details?.Gender ? details?.Gender?.Description : ''
    }

    const renderInfoDetail = (title, val, isButton = false, buttonClass = '') => {
        return (
            <div>
                <h4 className='employee-detail-box-title'>{title}</h4>
                {
                    isButton ?
                        <CustomButton disabled buttonClass={'employee-detail-box-info-btn-active'} customContainerClass={`employee-detail-box-info-btn`} className={buttonClass} title={val} size="sm" />
                        :
                        <p className='employee-detail-box-title employee-detail-box-value'>{val}</p>
                }

            </div>
        )
    }

    const renderMainTabs = () => {
        return (
            <div className='employee-profiling-detail-tabs-container'>
                <Tabs defaultActiveKey={'general'} className="mb-3 employee-profiling-detail-tab-item-container">
                    <Tab eventKey={'general'} title={'General'}>
                        {renderGeneralTab()}
                    </Tab>
                </Tabs>
            </div>
        )
    }

    const renderGeneralTab = () => {
        return <General
            data={details}
            lookups={lookups}
            onUpdateDetail={editPersonalDetail}
            onCreateFamilyDetail={createFamilyInformation}
        />
    }

    const renderAcademics = () => {
        return <Academics />
    }

    const renderExperiences = () => {
        return <Experiences />
    }

    const renderDocuments = () => {
        return <Documents />
    }

    const renderProfessionalReferences = () => {
        return <ProfessionalReference />
    }

    return (
        <div style={{ height: "800px", backgroundColor: "#f4f4f4", overflow: "scroll" }}>
            <ManagerAppBar drawerOption={"open"} location="Home" />
            <Container className='employee-form-container'>
                <Card className='employee-form-card-container'>
                    <Row>
                        <Col md={3}>
                            {renderInfoDetail('Employee ID', details?.EmployeeId, true)}
                            {renderInfoDetail('Gender', getGenderName())}
                            {renderInfoDetail('Date Of Joining', details?.DateOfJoining)}
                            {renderInfoDetail('Designation', getCompanyObject(details?.Company_Details), true)}
                            {renderInfoDetail('Email Address', details?.Email)}
                        </Col>
                        <Col md={3}>
                            {renderInfoDetail('Employee Name', getFullEmployeeName(details))}
                            {renderInfoDetail('NIC No', details?.IdentityNumber)}
                            {renderInfoDetail('Business Unit', 'Support',)}
                            {renderInfoDetail('Official Email', details?.Email)}
                            {renderInfoDetail('Father Name', details?.Guardian_Name)}
                        </Col>
                        <Col md={3}>
                            {renderInfoDetail('Date Of Birth', details?.DateOfBirth)}
                            {renderInfoDetail('Department', 'IT Field', true)}
                            {renderInfoDetail('Portal Login', 'muhammad.huzaifa')}
                            {renderInfoDetail('Status', getProfileStatus(), true, 'employee-detail-box-info-btn-active')}
                        </Col>
                        <Col md={3}>
                            <div className='employee-detail-info-pic-container text-center'>
                                <img src={userAvatar} />
                                <CustomButton title="Upload New" onClick={onPressUploadNew} />
                                <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={onFileSelect} />
                            </div>
                        </Col>
                    </Row>
                </Card>
                {renderMainTabs()}
            </Container>
        </div>
    );
};

EmployeeEdit.propTypes = {

};

export default EmployeeEdit;