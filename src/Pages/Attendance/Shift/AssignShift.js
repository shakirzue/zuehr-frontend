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

const AssignShift = props => {

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

    const assignShiftDetail = () => {
        dispatch(attendanceActions.assignShiftDetailAction(
            shiftDetails
        ))
    }

    const renderSubmitButton = () => {
        return (

            <CustomButton title={'Save'} size="md" onClick={assignShiftDetail} isLoading={loading} />
        )
    }

    const onChangeText = (name, value) => {
        setShiftDetails({
            ...shiftDetails,
            [name]: value
        })
    }

    return (
        <div style={{ height: "800px", backgroundColor: "#f4f4f4", overflow: "scroll" }}>
            <ManagerAppBar drawerOption={"open"} location="Home" />
            <Container className='employee-form-container'>

                <div className='main-dashboard col-sm-12'>
                    <h3 className="mb-3" style={{ textAlign: "left" }}>Shift Assignment</h3>
                </div>
                <Card className='employee-form-card-container col-sm-12'>
                    <Form>
                        <Row>
                        
                        <div className='text-left'>
                            <select className='select-component-item mr-1 border-1 rounded-3 col-sm-3 p-2 mb-3' name="startTimeHour" >
                                            <option value='00' selected="selected">Select Shift</option>
                                            <option value='01'>IT</option>
                                            <option value='02'>Marketing</option>
                                            <option value='03'>Sales</option>
                                            <option value='04'>Voice</option>
                                        </select>
                        </div>

                        <div class="col-md-5">
                        <h4 className='text-left mb-4 select-days'>Days</h4>
                        </div>
                        <div class="col-md-6 text-left">
                        <h4 className='mb-3 select-days'>Select Employees</h4>
                        </div>

                       
                        
                            <Col md={5}>
                            
                                <div className='d-flex mb-3'>
                                    <label className='day-width'> Monday </label><input class="w-50 text-center ml-4" placeholder="09:00 AM to 6:00 PM" type="text" disabled/>
                                </div>
                                <div className='d-flex mb-3'>
                                    <label className='day-width'> Tuesday </label><input class="w-50 text-center ml-4" placeholder="09:00 AM to 6:00 PM" type="text" disabled/>
                                </div>
                                <div className='d-flex mb-3'>
                                    <label className='day-width'> Wednsday </label><input class="w-50 text-center ml-2" placeholder="09:00 AM to 6:00 PM" type="text" disabled/>
                                </div>
                                <div className='d-flex mb-3'>
                                    <label className='day-width'> Thursday </label><input class="w-50 text-center ml-3" placeholder="09:00 AM to 6:00 PM" type="text" disabled/>
                                </div>
                                <div className='d-flex mb-3'>
                                    <label className='day-width mr-3'> Friday </label><input class="w-50 text-center ml-4" placeholder="09:00 AM to 6:00 PM" type="text" disabled/>
                                </div>

                                <div className='d-flex mb-3'>
                                    <label className='day-width mr-3'> Saturday </label><input class="w-50 text-center ml-1" placeholder="09:00 AM to 6:00 PM" type="text" disabled/>
                                </div>
                             
                                
                            </Col>
                             
                            <Col md={4} className='text-left height-overflow-check p-3'>
                           
                            <div className='executive-checkbox mb-4'>
                                <input type="checkbox" id="executive" name="executive" value="executive"/>
                                <label for="executive"> Muhammad Saqib Afzal</label>
                            </div>
                            <div className='executive-checkbox mb-4'>
                                <input type="checkbox" id="executive" name="executive" value="executive"/>
                                <label for="executive"> Muhammad Anwar Khan</label>
                            </div>
                            <div className='executive-checkbox mb-4'>
                                <input type="checkbox" id="executive" name="executive" value="executive"/>
                                <label for="executive"> Muhammad Maqsood Alam </label>
                            </div>
                            <div className='executive-checkbox mb-4'>
                                <input type="checkbox" id="executive" name="executive" value="executive"/>
                                <label for="executive"> Muhammad Babar Sheikh </label>
                            </div>
                            <div className='executive-checkbox mb-4'>
                                <input type="checkbox" id="executive" name="executive" value="executive"/>
                                <label for="executive"> Muhammad Azam Khan</label>
                            </div>
                            <div className='executive-checkbox mb-4'>
                                <input type="checkbox" id="executive" name="executive" value="executive"/>
                                <label for="executive"> Muhammad Nawaz</label>
                            </div>
                            <div className='executive-checkbox mb-4'>
                                <input type="checkbox" id="executive" name="executive" value="executive"/>
                                <label for="executive"> Muhammad Malik</label>
                            </div>
                            <div className='executive-checkbox mb-4'>
                                <input type="checkbox" id="executive" name="executive" value="executive"/>
                                <label for="executive"> Muhammad Huzeifa Awan </label>
                            </div>
                            <div className='executive-checkbox mb-4'>
                                <input type="checkbox" id="executive" name="executive" value="executive"/>
                                <label for="executive"> Muhammad Huzeifa Awan </label>
                            </div>
                            <div className='executive-checkbox mb-4'>
                                <input type="checkbox" id="executive" name="executive" value="executive"/>
                                <label for="executive"> Muhammad Huzeifa Awan </label>
                            </div>
                            <div className='executive-checkbox mb-4'>
                                <input type="checkbox" id="executive" name="executive" value="executive"/>
                                <label for="executive"> Muhammad Nawaz</label>
                            </div>
                            <div className='executive-checkbox mb-4'>
                                <input type="checkbox" id="executive" name="executive" value="executive"/>
                                <label for="executive"> Muhammad Malik</label>
                            </div>
                            <div className='executive-checkbox mb-4'>
                                <input type="checkbox" id="executive" name="executive" value="executive"/>
                                <label for="executive"> Muhammad Huzeifa Awan </label>
                            </div>
                            <div className='executive-checkbox mb-4'>
                                <input type="checkbox" id="executive" name="executive" value="executive"/>
                                <label for="executive"> Muhammad Nawaz</label>
                            </div>
                            <div className='executive-checkbox mb-4'>
                                <input type="checkbox" id="executive" name="executive" value="executive"/>
                                <label for="executive"> Muhammad Malik</label>
                            </div>
                            <div className='executive-checkbox mb-4'>
                                <input type="checkbox" id="executive" name="executive" value="executive"/>
                                <label for="executive"> Muhammad Huzeifa Awan </label>
                            </div>
                            </Col>



                            <Col md={6}>

                            </Col>
                        </Row>
                        <div class="d-flex">
                            <button class="primary-btn  btn btn-primary btn-md mt-3 mb-3">Update</button>

                            {/* {renderSubmitButton()} */}
                        </div>
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

AssignShift.propTypes = {

};

export default AssignShift;