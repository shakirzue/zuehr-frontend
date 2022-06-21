import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import Input from '../../../../components/employee-profiling/form/Input';
import CustomButton from '../../../../components/employee-profiling/form/Button';
import Select from '../../../../components/employee-profiling/form/Select';
import { Link } from 'react-router-dom';
import { Edit, Delete } from "@material-ui/icons";

const Academics = props => {
    const [tabsList, setTabsList] = useState([]);
    const [isShowFamilyForm, setIsShowFamilyForm] = useState(false);

    const onToggleIsFamilyMemberForm = (e) => {
        setIsShowFamilyForm(!isShowFamilyForm)
    }

    return (


        <div className={`tab-section-container`}>
            <div className='tab-section-header'>
                <h4>{'Academics Profile'}</h4>
            </div>
            <div className='tab-section-card'>
                <div className='employee-profiling-detail-tabs-container'>
                    <div className='family-info-tab-form-container'>
                        <a href='javascript:void(0)' onClick={onToggleIsFamilyMemberForm}>Click here to add academics details</a>
                        {
                            isShowFamilyForm ?
                                <>
                                    <Row>
                                        <Col md={3}>
                                            <Input
                                                name={'institute_name'}
                                                id={'institute_name'}
                                                label="Institute Name :"
                                                placeholder="Institute Name" />
                                        </Col>
                                        <Col md={3}>
                                            <Input name={'degree_title'} id={'degree_title'}
                                                label="Degree Title :" placeholder="Degree Title" />
                                        </Col>
                                        <Col md={3}>
                                            <Input name={'grade'} id={'grade'}
                                                label="Grade :" placeholder="Grade" />
                                        </Col>
                                        <Col md={3}>
                                            <Input name={'year_passed'} id={'year_passed'}
                                                label="Year Passed :" placeholder="Year Passed" />
                                        </Col>
                                    </Row>
                                    <CustomButton title={'Add'} customContainerClass={'tab-section-card-button'} />
                                </> : null
                        }
                    </div>
                    <div className='family-info-tab-list-container'>
                        <h4>Academics Profile List</h4>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>Institute Name</th>
                                    <th>Degree Title</th>
                                    <th>Grade</th>
                                    <th>Year Passed</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Aptech</td>
                                    <td>ACCP Pro</td>
                                    <td>B</td>
                                    <td>2019</td>
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
                </div>
            </div>
        </div>
    )
};

export default Academics;