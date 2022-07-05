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
                    <Tab eventKey={'company_detail'} title={'Company Detail'}>
                        {'Company Detail'}
                    </Tab>
                    <Tab eventKey={'contact_detail'} title={'Contact Detail'}>
                        {renderContactInfoMainContainer()}
                    </Tab>
                    <Tab eventKey={'bank_detail'} title={'Bank Detail'}>
                        {renderBankInfoMainContainer()}
                    </Tab>
                    <Tab eventKey={'life_insurance'} title={'Life Insurance/PF Detail'}>
                        {renderInsuranceInfoMainContainer()}
                    </Tab>
                    <Tab eventKey={'personality_detail'} title={'Personality Detail'}>
                        {renderPersonalityInfoMainContainer()}
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
                        <Input name={'employeeId'} id={'employeeId'} label="Employee Id" onChange={onChangeText} defaultValue={personalDetails.employeeId} />
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
                </Row>
                <CustomButton title={'Update'} customContainerClass={'tab-section-card-button'} onClick={onClickUpdateDetail} />
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
                {renderTabCard('Family Member Information', renderFamilyInfoTab())}
            </>
        )
    }

    // contact detail tab
    const renderContactInfoMainContainer = () => {
        return (
            <>
                {renderTabCard('Contact Detail', renderContactInfoTab())}
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
                {renderTabCard('Bank Detail', renderBankInfoTab())}
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
                {renderTabCard('PF Detail', null)}
                {renderTabCard('Life Insurance', renderInsuranceField())}
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

    //personality tab

    const renderPersonalityInfoMainContainer = () => {
        return (
            <>
                {renderTabCard('Personality Detail', null)}
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