import React, { useEffect, useState } from 'react';
import CustomTabs from '../../../../components/employee-profiling/tabs';
import { Col, Row, Table, Tabs, Tab } from 'react-bootstrap';
import Input from '../../../../components/employee-profiling/form/Input';
import CustomButton from '../../../../components/employee-profiling/form/Button';
import TabsCard from '../../../../components/employee-profiling/tabsCard';
import Select from '../../../../components/employee-profiling/form/Select';
import { Link } from 'react-router-dom';
import { Edit, Delete } from "@material-ui/icons";
import Loader from '../../../../components/Loader';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const General = ({
    data = {},
    lookups = {},
    onUpdateDetail = () => { },
    onCreateFamilyDetail = () => { },
    onUpdateFamilyDetail = () => { },
}) => {
    const [isShowFamilyForm, setIsShowFamilyForm] = useState(false);
    const [familyListId, setFamilyListId] = useState(null);
    const [isShowContactDetailForm, setIsShowContactDetailForm] = useState(false);
    const [contactDetailFormInput, setContactDetailFormInput] = useState(true);
    const [personalDetails, setPersonalDetails] = useState({});
    const [familyDetails, setFamilyDetails] = useState({
        memberName: '',
        relationshipId: '',
        shiftTemplateId: '',
        dateOfBirth: '',
        qualification: null,
    });



    //list state
    const [familyInfo, setFamilyInfo] = useState([]);

    // selectors
    const { family, loading: familyListLoading } = useSelector(state => state.familyInfo);

    useEffect(() => {
        if (!_.isEmpty(family) && _.isArray(family)) {
            setFamilyInfo(family);
        }
    }, [family])

    useEffect(() => {
        setPersonalDetails({
            employeeId: data.EmployeeId,
            firstName: data.FirstName,
            lastName: data.LastName,
            phone: data.phone,
            dateOfBirth: data.DateOfBirth,
            genderId: data.Gender_Id,
            email: data.Email,
            identityNumber: data.IdentityNumber,
            dateOfJoining: data.DateOfJoining,
            officialEmail: data.officialEmail,
            reportToId: data.reportToId,
            executive: data.executive,
            middleName: data.MiddleName,
            guardianName: data.Guardian_Name,
            personalDetailId: data.id,
            phone: data.Phone
        })
    }, [data])

    const onChangeText = (name, value) => {
        setPersonalDetails({
            ...personalDetails,
            [name]: value
        })

    }


    const onChangeFamilyInfo = (name, value) => {
        setFamilyDetails({
            ...familyDetails,
            [name]: value
        })

    }

    const onClickUpdateDetail = () => {
        onUpdateDetail(personalDetails)
    }


    //family info functions
    const onClickCreateFamily = () => {
        onCreateFamilyDetail(familyDetails)
    }

    const onEditFamilyDetail = (index) => {
        if (_.isArray(familyInfo) && familyInfo?.[index]) {
            setIsShowFamilyForm(true);
            let params = familyInfo?.[index];
            const { id, MemberName, Relationship_Id, Qualification_Id, DateOfBirth } = params;
            let data = {
                memberName: MemberName,
                relationshipId: Relationship_Id,
                dateOfBirth: DateOfBirth,
                qualification: Qualification_Id,
            }

            setFamilyDetails(data);
            setFamilyListId(id)
        }
    }

    const onFamilyUpdateCb = () => {
        setFamilyDetails({
            memberName: '',
            relationshipId: '',
            dateOfBirth: '',
            qualification: null,
        })
        setFamilyListId(null)
    }

    const onToggleIsFamilyMemberForm = () => {
        setIsShowFamilyForm(!isShowFamilyForm)
    }

    const onToggleIsContactDetailForm = () => {
        setIsShowContactDetailForm(!isShowContactDetailForm)
    }

    const onToggleContactDetailFormInput = () => {
        setContactDetailFormInput(!contactDetailFormInput)
    }


    const renderMainTabs = () => {
        return (
            <div className='employee-profiling-detail-tabs-container'>
                <Tabs defaultActiveKey={'personal_info'} className="mb-3 employee-profiling-detail-tab-item-container">
                    <Tab eventKey={'personal_info'} title={'Personal Info'}>
                        {renderPersonalInfoMainContainer()}
                    </Tab>
                    <Tab eventKey={'bank_detail'} title={'Bank Detail'}>
                        {renderBankInfoMainContainer()}
                    </Tab>
                    {/* <Tab eventKey={'company_detail'} title={'Company Detail'}>
                        {'Company Detail'}
                    </Tab> */}
                    <Tab eventKey={'contact_detail'} title={'Next of Kin'}>
                        {renderContactInfoMainContainer()}
                    </Tab>

                    <Tab eventKey={'life_insurance'} title={'Insurance Details'}>
                        {renderInsuranceInfoMainContainer()}
                    </Tab>
                    <Tab eventKey={'personality_detail'} title={'Employee Master Shift'}>
                        {renderEmployeeMasterShiftContainer()}
                    </Tab>
                </Tabs>
            </div>
        )
    }

    const renderTabCard = (title, content) => {
        return (
            <TabsCard title={title} content={content} />
        )
    }

    const renderLoader = () => {
        return (
            <Loader />
        )
    }

    const renderPersonalInfoTab = () => {
        return (
            <>
                <Row>
                    <Col md={3}>
                        <Input name={'employeeId'} id={'employeeId'} label="Employee Code" onChange={onChangeText} defaultValue={personalDetails.employeeId} disabled />
                    </Col>
                    <Col md={3}>
                        <Input name={'identityNumber'} id={'identityNumber'} label="CNIC" onChange={onChangeText} defaultValue={personalDetails.identityNumber} />
                    </Col>
                    <Col md={3}>
                        <Input name={'firstName'} id={'firstName'} label="First Name" onChange={onChangeText} defaultValue={personalDetails.firstName} />
                    </Col>
                    <Col md={3}>
                        <Input name={'middleName'} id={'middleName'} label="Middle Name" onChange={onChangeText} defaultValue={personalDetails.middleName} />
                    </Col>
                    <Col md={3}>
                        <Input name={'lastName'} id={'lastName'} label="Last Name" onChange={onChangeText} defaultValue={personalDetails.lastName} />
                    </Col>
                    <Col md={3}>
                        <Input name={'phone'} id={'phone'} label="Phone" onChange={onChangeText} type="number" defaultValue={personalDetails.phone} />
                    </Col>
                    <Col md={3}>
                        <Input name={'dateOfBirth'} id={'dateOfBirth'} label="Date Of Birth" onChange={onChangeText} type="date" defaultValue={personalDetails.dateOfBirth} />
                    </Col>
                    <Col md={3}>
                        <Select name={'genderId'} id={'genderId'} label="Gender" onChange={onChangeText} options={lookups?.gender} />
                    </Col>
                    <Col md={3}>
                        <Input name={'email'} id={'email'} label="Personal Email" onChange={onChangeText} defaultValue={personalDetails.email} />
                    </Col>
                    <Col md={3}>
                        <Input name={'guardianName'} id={'guardianName'} label="Father/Husband Name" onChange={onChangeText} defaultValue={personalDetails.guardianName} />
                    </Col>
                    <Col md={3}>
                        <Input name={'dateOfJoining'} id={'dateOfJoining'} label="Date Of Joining" onChange={onChangeText} type="date" defaultValue={personalDetails.dateOfJoining} />
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
                            <input type="checkbox" id="executive" name="executive" value="executive" />
                            <label for="executive">   Is Executive</label>
                        </div>

                    </Col>
                </Row>
                <CustomButton title={'Update'} customContainerClass={'tab-section-card-button'} onClick={onClickUpdateDetail} size="md" />
            </>
        )
    }

    const renderFamilyInfoTab = () => {
        return (
            <>
                <div className='family-info-tab-form-container'>
                    <a href='javascript:void(0)' onClick={onToggleIsFamilyMemberForm}>Click here to add family member</a>
                    {
                        isShowFamilyForm ?
                            <>
                                <Row>
                                    <Col md={3}>
                                        <Input
                                            name={'memberName'}
                                            id={'memberName'}
                                            label="Family Member Name :"
                                            placeholder="Family Member Name"
                                            onChange={onChangeFamilyInfo}
                                            defaultValue={familyDetails?.memberName}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Select name={'relationshipId'} id={'relationshipId'} label="Relationship : " options={lookups?.relationship} onChange={onChangeFamilyInfo} defaultValue={familyDetails?.relationshipId} />
                                    </Col>
                                    <Col md={3}>
                                        <Input name={'dateOfBirth'} id={'dateOfBirth'} label="DOB :" type={'date'} onChange={onChangeFamilyInfo} defaultValue={familyDetails?.dateOfBirth} />
                                    </Col>
                                    <Col md={3}>
                                        <Select name={'qualification'} id={'qualification'} label="Qualification : " options={lookups?.qualification} onChange={onChangeFamilyInfo} defaultValue={familyDetails?.qualification} />
                                    </Col>
                                </Row>
                                <CustomButton title={'Add'} customContainerClass={'tab-section-card-button'} onClick={onClickCreateFamily} />
                            </> : null
                    }
                </div>
                <div className='family-info-tab-list-container'>
                    <h4>Family Members</h4>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>Name Of Family Member</th>
                                <th>Relationship</th>
                                <th>Date Of Birth</th>
                                <th>Qualification</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                familyListLoading ?
                                    renderLoader()
                                    :
                                    familyInfo.map((item, index) => {
                                        const { MemberName, Relationship, DateOfBirth, Qualification } = item;
                                        return (
                                            <tr key={index}>
                                                <td>{MemberName}</td>
                                                <td>{Relationship?.Description}</td>
                                                <td>{DateOfBirth}</td>
                                                <td>{Qualification?.Description}</td>
                                                <td>
                                                    <Link to={`#`} onClick={() => onEditFamilyDetail(index)}>
                                                        <Edit />
                                                    </Link>
                                                    <Link to={'#'}>
                                                        <Delete />
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                            }
                        </tbody>
                    </Table>
                </div>
            </>
        )
    }

    const renderPersonalInfoMainContainer = () => {
        return (
            <>
                {renderTabCard('Personal Info', renderPersonalInfoTab())}
                {/* {renderTabCard('Family Member Information', renderFamilyInfoTab())} */}
            </>
        )
    }

    // contact detail tab
    const renderContactInfoMainContainer = () => {
        return (
            <>
                {/* {renderTabCard('Contact Detail', renderContactInfoTab())} */}
            </>
        )
    }

    const renderContactInfoTab = () => {
        return (
            <>
                <div className='family-info-tab-form-container'>
                    <a href='javascript:void(0)' onClick={onToggleIsContactDetailForm}>Click here to add contact detail</a>
                    {
                        isShowContactDetailForm ?
                            <>
                                <div>
                                    <a href='javascript:void(0)' onClick={onToggleContactDetailFormInput}>{contactDetailFormInput ? 'Create New' : 'Select From List'}</a>
                                </div>
                                <Row>
                                    <Col md={4}>
                                        {
                                            contactDetailFormInput ?
                                                <Input
                                                    name={'contact_detail_name'}
                                                    id={'contact_detail_name'}
                                                    label="Name :"
                                                    placeholder="Name" /> :
                                                <Select name={'contact_detail_name'} id={'contact_detail_name'} label="Select Name" />
                                        }
                                    </Col>
                                    <Col md={4}>
                                        <Input name={'contact_detail_relationship'} id={'contact_detail_relationship'} label="Relationship :" placeholder={'Relationship'} />
                                    </Col>
                                    <Col md={4}>
                                        <Input name={'contact_detail_phone'} id={'contact_detail_phone'} label="Phone :" placeholder={'Phone'} />
                                    </Col>
                                </Row>
                                <CustomButton title={'Add'} customContainerClass={'tab-section-card-button'} />
                            </> : null
                    }
                </div>
                <div className='family-info-tab-list-container'>
                    <h4>Contact Details</h4>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>Name Member</th>
                                <th>Relationship</th>
                                <th>Phone Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Muhammad Imran</td>
                                <td>Father</td>
                                <td>0123456789</td>
                                <td>
                                    <Link to={`#`}>
                                        <Edit />
                                    </Link>
                                    <Link to={'#'}>
                                        <Delete />
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </>
        )
    }

    // bank detail tab
    const renderBankInfoMainContainer = () => {
        return (
            <>
                {/* {renderTabCard('Bank Detail', renderBankInfoTab())} */}
            </>
        )
    }

    const renderBankInfoTab = () => {
        return (
            <>
                <Row>
                    <Col md={6}>
                        <Input
                            name={'bank_iban'}
                            id={'bank_iban'}
                            label="IBAN :"
                            placeholder="IBAN" />
                    </Col>
                    <Col md={6}>
                        <Input name={'bank_account_title'} id={'bank_account_title'} label="Account Title :" placeholder={'Account Title'} />
                    </Col>
                    <Col md={4}>
                        <Input name={'bank_bic'} id={'bank_bic'} label="BIC :" placeholder={'BIC'} />
                    </Col>
                    <Col md={4}>
                        <Input name={'bank_name'} id={'bank_name'} label="Bank Name :" placeholder={'Bank Name'} />
                    </Col>
                    <Col md={4}>
                        <Input name={'bank_branch_name'} id={'bank_branch_name'} label="Branch Name :" placeholder={'Branch Name'} />
                    </Col>
                </Row>
                <CustomButton title={'Add'} customContainerClass={'tab-section-card-button'} />
            </>
        )
    }

    //insurance and pf tab

    const renderInsuranceInfoMainContainer = () => {
        return (
            <>
                {/* {renderTabCard('PF Detail', null)} */}
                {/* {renderTabCard('Life Insurance', renderInsuranceField())} */}
            </>
        )
    }

    const renderInsuranceField = () => {
        return (
            <>
                <Row>
                    <Col md={4}>
                        <Input
                            name={'Insurance_provider'}
                            id={'Insurance_provider'}
                            label="Insurance Provider :"
                            placeholder="Insurance Provider" />
                    </Col>
                    <Col md={4}>
                        <Input name={'policy_number'} id={'policy_number'} label="Policy Number :" placeholder={'Policy Number'} type="number" />
                    </Col>
                    <Col md={4}>
                        <Input name={'start_date'} id={'start_date'} label="Start Date :" placeholder={'Start Date'} type="date" />
                    </Col>
                    <Col md={4}>
                        <Input name={'end_date'} id={'end_date'} label="End Date :" placeholder={'End Date'} type="date" />
                    </Col>
                    <Col md={4}>
                        <Input name={'coverage_details'} id={'coverage_details'} label="Coverage Details :" placeholder={'Coverage Details'} />
                    </Col>
                    <Col md={4}>
                        <Input name={'other_info'} id={'other_info'} label="Other Info :" placeholder={'Other Info'} />
                    </Col>
                </Row>
                <CustomButton title={'Add'} customContainerClass={'tab-section-card-button'} />
            </>
        )
    }

    //Employee Master Shift tab

    const renderEmployeeMasterShiftContainer = () => {
        return (
            <>
                {renderTabCard('Employee Master Shift', renderEmployeeMasterShiftTab())}

            </>
        )
    }

    const renderEmployeeMasterShiftTab = () => {
        return (
            <>
                <Row>
                    <Col md={4}>
                        <Input className='col-sm-12'
                            name={''}
                            id={''}
                            label="Employee Name :"
                            placeholder="Junaid Khan" disabled />
                    </Col>
                    <Col md={4}>
                        {/* <Select name={'shiftTemplateId'} id={'shiftTemplateId'} label="Timezone: " options={lookups?.shiftTemplate} />
                            */}
                        <div className='select-component-container'>
                            <label>Shift Template:</label>
                            <select className='select-component-item mr-1 border-1 col-sm-12 rounded-3 p-1' name={'shiftTemplateId'} id={'shiftTemplateId'} >
                                <option value='TIMEZONE' selected="selected">Select Shift Template</option>
                                <option value='EST'>Option 1</option>
                                <option value='PST'>Option 2</option>
                            </select>
                        </div>
                    </Col>
                    <Col md={4}>
                        {/* <Select name={'shiftTemplateId'} id={'shiftTemplateId'} label="Timezone: " options={lookups?.shiftTemplate} />
                            */}
                        <div className='select-component-container'>
                            <label>Timezone:</label>
                            <select className='select-component-item mr-1 border-1 col-sm-12 rounded-3 p-1' name={'shiftTemplateId'} id={'shiftTemplateId'} >
                                <option value='TIMEZONE' selected="selected">Select Timezone</option>
                                <option value='EST'>Eastern State Time (EST)</option>
                                <option value='PST'>Pakistan State Time (PST)</option>
                            </select>
                        </div>
                    </Col>
                    <Col md={6} className='mt-3'>
                        <div className='day-field d-flex mb-3'><label className='col-sm-2'>Monday</label>
                            <div className='col-sm-2 d-inline-block'>

                                <label class="switch">
                                    <input data-on="On" type="checkbox" id="toggle-switch" />
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div className='col-sm-4 d-flex'>
                                <select className='select-component-item mr-1 border-1 rounded-3' name="startTimeHour" >
                                    <option value='00' selected="selected">09:00 Am</option>
                                    <option value='01'>09:00 Am</option>
                                    <option value='02'>10:00 Am</option>
                                    <option value='03'>11:00 Am</option>
                                    <option value='04'>12:00 Pm</option>
                                </select>

                                <select className='select-component-item ml-1 border-1 rounded-3' name="startTimeHour" >
                                    <option value='00' selected="selected">09:00 Pm</option>
                                    <option value='01'>09:00 Am</option>
                                    <option value='02'>10:00 Am</option>
                                    <option value='03'>11:00 Am</option>
                                    <option value='04'>12:00 Pm</option>
                                </select>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} className='mt-3'>
                        <div className='day-field d-flex mb-3'><label className='col-sm-2'>Tuesday</label>
                            <div className='col-sm-2 d-inline-block'>

                                <label class="switch">
                                    <input data-on="On" type="checkbox" id="toggle-switch" />
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div className='col-sm-4 d-flex'>
                                <select className='select-component-item mr-1 border-1 rounded-3' name="startTimeHour" >
                                    <option value='00' selected="selected">09:00 Am</option>
                                    <option value='01'>09:00 Am</option>
                                    <option value='02'>10:00 Am</option>
                                    <option value='03'>11:00 Am</option>
                                    <option value='04'>12:00 Pm</option>
                                </select>

                                <select className='select-component-item ml-1 border-1 rounded-3' name="startTimeHour" >
                                    <option value='00' selected="selected">09:00 Pm</option>
                                    <option value='01'>09:00 Am</option>
                                    <option value='02'>10:00 Am</option>
                                    <option value='03'>11:00 Am</option>
                                    <option value='04'>12:00 Pm</option>
                                </select>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='day-field d-flex mb-3'><label className='col-sm-2'>Wednesday</label>
                            <div className='col-sm-2 d-inline-block'>

                                <label class="switch">
                                    <input data-on="On" type="checkbox" id="toggle-switch" />
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div className='col-sm-4 d-flex'>
                                <select className='select-component-item mr-1 border-1 rounded-3' name="startTimeHour" >
                                    <option value='00' selected="selected">09:00 Am</option>
                                    <option value='01'>09:00 Am</option>
                                    <option value='02'>10:00 Am</option>
                                    <option value='03'>11:00 Am</option>
                                    <option value='04'>12:00 Pm</option>
                                </select>

                                <select className='select-component-item ml-1 border-1 rounded-3' name="startTimeHour" >
                                    <option value='00' selected="selected">09:00 Pm</option>
                                    <option value='01'>09:00 Am</option>
                                    <option value='02'>10:00 Am</option>
                                    <option value='03'>11:00 Am</option>
                                    <option value='04'>12:00 Pm</option>
                                </select>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='day-field d-flex mb-3'><label className='col-sm-2'>Thursday</label>
                            <div className='col-sm-2 d-inline-block'>

                                <label class="switch">
                                    <input data-on="On" type="checkbox" id="toggle-switch" />
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div className='col-sm-4 d-flex'>
                                <select className='select-component-item mr-1 border-1 rounded-3' name="startTimeHour" >
                                    <option value='00' selected="selected">09:00 Am</option>
                                    <option value='01'>09:00 Am</option>
                                    <option value='02'>10:00 Am</option>
                                    <option value='03'>11:00 Am</option>
                                    <option value='04'>12:00 Pm</option>
                                </select>

                                <select className='select-component-item ml-1 border-1 rounded-3' name="startTimeHour" >
                                    <option value='00' selected="selected">09:00 Pm</option>
                                    <option value='01'>09:00 Am</option>
                                    <option value='02'>10:00 Am</option>
                                    <option value='03'>11:00 Am</option>
                                    <option value='04'>12:00 Pm</option>
                                </select>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='day-field d-flex mb-3'><label className='col-sm-2'>Friday</label>
                            <div className='col-sm-2 d-inline-block'>

                                <label class="switch">
                                    <input data-on="On" type="checkbox" id="toggle-switch" />
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div className='col-sm-4 d-flex'>
                                <select className='select-component-item mr-1 border-1 rounded-3' name="startTimeHour" >
                                    <option value='00' selected="selected">09:00 Am</option>
                                    <option value='01'>09:00 Am</option>
                                    <option value='02'>10:00 Am</option>
                                    <option value='03'>11:00 Am</option>
                                    <option value='04'>12:00 Pm</option>
                                </select>

                                <select className='select-component-item ml-1 border-1 rounded-3' name="startTimeHour" >
                                    <option value='00' selected="selected">09:00 Pm</option>
                                    <option value='01'>09:00 Am</option>
                                    <option value='02'>10:00 Am</option>
                                    <option value='03'>11:00 Am</option>
                                    <option value='04'>12:00 Pm</option>
                                </select>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='day-field d-flex mb-3'><label className='col-sm-2'>Saturday</label>
                            <div className='col-sm-2 d-inline-block'>

                                <label class="switch">
                                    <input data-on="On" type="checkbox" id="toggle-switch" />
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div className='col-sm-4 d-flex'>
                                <select className='select-component-item mr-1 border-1 rounded-3' name="startTimeHour" >
                                    <option value='00' selected="selected">09:00 Am</option>
                                    <option value='01'>09:00 Am</option>
                                    <option value='02'>10:00 Am</option>
                                    <option value='03'>11:00 Am</option>
                                    <option value='04'>12:00 Pm</option>
                                </select>

                                <select className='select-component-item ml-1 border-1 rounded-3' name="startTimeHour" >
                                    <option value='00' selected="selected">09:00 Pm</option>
                                    <option value='01'>09:00 Am</option>
                                    <option value='02'>10:00 Am</option>
                                    <option value='03'>11:00 Am</option>
                                    <option value='04'>12:00 Pm</option>
                                </select>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='day-field d-flex mb-3'><label className='col-sm-2'>Sunday</label>
                            <div className='col-sm-2 d-inline-block'>

                                <label class="switch">
                                    <input data-on="On" type="checkbox" id="toggle-switch" />
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div className='col-sm-4 d-flex'>
                                <select className='select-component-item mr-1 border-1 rounded-3' name="startTimeHour" >
                                    <option value='00' selected="selected">09:00 Am</option>
                                    <option value='01'>09:00 Am</option>
                                    <option value='02'>10:00 Am</option>
                                    <option value='03'>11:00 Am</option>
                                    <option value='04'>12:00 Pm</option>
                                </select>

                                <select className='select-component-item ml-1 border-1 rounded-3' name="startTimeHour" >
                                    <option value='00' selected="selected">09:00 Pm</option>
                                    <option value='01'>09:00 Am</option>
                                    <option value='02'>10:00 Am</option>
                                    <option value='03'>11:00 Am</option>
                                    <option value='04'>12:00 Pm</option>
                                </select>
                            </div>
                        </div>
                    </Col>

                </Row>
                {/* <CustomButton title={'Add'} customContainerClass={'tab-section-card-button'} /> */}
            </>
        )
    }


    return (
        <div>
            {renderMainTabs()}
        </div>
    );
};

export default General;