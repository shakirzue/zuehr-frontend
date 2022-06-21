import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import Input from '../../../../components/employee-profiling/form/Input';
import CustomButton from '../../../../components/employee-profiling/form/Button';
import Select from '../../../../components/employee-profiling/form/Select';
import { Link } from 'react-router-dom';
import { Edit, Delete } from "@material-ui/icons";
import moment from 'moment';

const Documents = props => {
    const [isShowDocuments, setIsShowDocuments] = useState(false);
    const [__date, setDate] = useState(new Date());

    const onToggleIsExperienceForm = (e) => {
        setIsShowDocuments(!isShowDocuments)
    }

    return (
        <div className={`tab-section-container`}>
            <div className='tab-section-header'>
                <h4>{'Documents'}</h4>
            </div>
            <div className='tab-section-card'>
                <div className='employee-profiling-detail-tabs-container'>
                    <div className='family-info-tab-form-container'>
                        <a href='javascript:void(0)' onClick={onToggleIsExperienceForm}>Click here to add documents</a>
                        {
                            isShowDocuments ?
                                <>
                                    <div className='required-docs-container'>
                                        <h4 className='required-docs-container-title'>Required Document</h4>
                                        <Table striped bordered>
                                            <thead>
                                                <tr>
                                                    <th>Document Name</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Degree</td>
                                                    <td>
                                                        <CustomButton title={'Upload'} size="sm" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                    <Row>
                                        <Col md={4}>
                                            <Input
                                                name={'document_name'}
                                                id={'document_name'}
                                                label="Document Name :"
                                                placeholder="Document Name" />
                                        </Col>
                                        <Col md={4}>
                                            <Input name={'comments'} id={'comments'}
                                                label="Comments :" placeholder="Comments" />
                                        </Col>
                                        <Col md={4}>
                                            <Input name={'document'} id={'document'} label="Upload Document (One or more)" type={'file'} />
                                        </Col>
                                    </Row>
                                    <CustomButton title={'Add'} customContainerClass={'tab-section-card-button'} />
                                </> : null
                        }
                    </div>
                    <div className='family-info-tab-list-container'>
                        <h4>Documents</h4>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>Document Name</th>
                                    <th>Comments</th>
                                    <th>Documents</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Degree</td>
                                    <td>Intermediate Degree</td>
                                    <td>file.xlxs</td>
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

export default Documents