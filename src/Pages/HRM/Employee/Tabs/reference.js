import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import Input from '../../../../components/employee-profiling/form/Input';
import CustomButton from '../../../../components/employee-profiling/form/Button';
import Select from '../../../../components/employee-profiling/form/Select';
import { Link } from 'react-router-dom';
import { Edit, Delete } from "@material-ui/icons";
import moment from 'moment';

const ProfessionalReference = props => {
    const [isShowReferences, setIsShowReferences] = useState(false);
    const [__date, setDate] = useState(new Date());

    const onToggleIsReferenceForm = (e) => {
        setIsShowReferences(!isShowReferences)
    }

    return (
        <div className={`tab-section-container`}>
            <div className='tab-section-header'>
                <h4>{'Professional References'}</h4>
            </div>
            <div className='tab-section-card'>
                <div className='employee-profiling-detail-tabs-container'>
                    <div className='family-info-tab-form-container'>
                        <a href='javascript:void(0)' onClick={onToggleIsReferenceForm}>Click here to add professional references</a>
                        {
                            isShowReferences ?
                                <>
                                    <Row>
                                        <Col md={3}>
                                            <Input
                                                name={'name'}
                                                id={'name'}
                                                label="Name :"
                                                placeholder="Name" />
                                        </Col>
                                        <Col md={3}>
                                            <Input name={'relationship'} id={'relationship'} placeholder="Relationship" label="Relationship : " />
                                        </Col>
                                        <Col md={3}>
                                            <Input name={'designation'} id={'designation'}
                                                label="Designation :" placeholder="Designation" />
                                        </Col>
                                        <Col md={3}>
                                            <Input name={'number'} id={'number'}
                                                label="Number :" placeholder="Number" type={'number'} />
                                        </Col>
                                        <Col md={3}>
                                            <Input
                                                name={'company_name'}
                                                id={'company_name'}
                                                label="Company Name :"
                                                placeholder="Company Name" />
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
                                    <th>Name</th>
                                    <th>Relationship</th>
                                    <th>Designation</th>
                                    <th>Company</th>
                                    <th>Number</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Hammad Javed</td>
                                    <td>Junior</td>
                                    <td>Senior Full Stack Developer</td>
                                    <td>Cubix</td>
                                    <td>923209269108</td>
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

export default ProfessionalReference