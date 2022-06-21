import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import Input from '../../../../components/employee-profiling/form/Input';
import CustomButton from '../../../../components/employee-profiling/form/Button';
import Select from '../../../../components/employee-profiling/form/Select';
import { Link } from 'react-router-dom';
import { Edit, Delete } from "@material-ui/icons";
import moment from 'moment';

const Experiences = props => {
    const [isShowExperiences, setIsShowExperiences] = useState(false);
    const [__date, setDate] = useState(new Date());

    const onToggleIsExperienceForm = (e) => {
        setIsShowExperiences(!isShowExperiences)
    }

    return (
        <div className={`tab-section-container`}>
            <div className='tab-section-header'>
                <h4>{'Employee Experience'}</h4>
            </div>
            <div className='tab-section-card'>
                <div className='employee-profiling-detail-tabs-container'>
                    <div className='family-info-tab-form-container'>
                        <a href='javascript:void(0)' onClick={onToggleIsExperienceForm}>Click here to add experiences details</a>
                        {
                            isShowExperiences ?
                                <>
                                    <Row>
                                        <Col md={3}>
                                            <Input
                                                name={'company_name'}
                                                id={'company_name'}
                                                label="Company Name :"
                                                placeholder="Company Name" />
                                        </Col>
                                        <Col md={3}>
                                            <Input name={'designation'} id={'designation'}
                                                label="Designation :" placeholder="Designation" />
                                        </Col>
                                        <Col md={3}>
                                            <Input name={'from_date'} id={'from_date'}
                                                label="From :" placeholder="From" type={'date'} />
                                        </Col>
                                        <Col md={3}>
                                            <Input name={'to_date'} id={'to_date'}
                                                label="To :" placeholder="To" type={'date'} />
                                        </Col>
                                    </Row>
                                    <CustomButton title={'Add'} customContainerClass={'tab-section-card-button'} />
                                </> : null
                        }
                    </div>
                    <div className='family-info-tab-list-container'>
                        <h4>Experiences</h4>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>Company Name</th>
                                    <th>Designation</th>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cubix</td>
                                    <td>Senior Full Stack Developer</td>
                                    <td>{moment(__date).format('L')}</td>
                                    <td>{moment(__date).format('L')}</td>
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

export default Experiences