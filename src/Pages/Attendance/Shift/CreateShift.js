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


    const renderSubmitButton = () => {
        return (

            <CustomButton title={'Save'} size="md" onClick={createShiftDetail} isLoading={loading} />
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
                    <h3 className="mb-3" style={{ textAlign: "left" }}>Create Shift</h3>
                </div>
                <Card className='employee-form-card-container col-sm-12'>
                    <Form>
                        {/* <Row>
                            <Col md={12}>
                                <Input name={'name'} id={'name'} label="Shift Name"  onChange={onChangeText} />
                            </Col>
                            <Col md={12}>
                                <Select name={'timezoneId'} id={'timezoneId'} label="Timezone" options={lookups?.timezone} onChange={onChangeText} />
                            </Col>
                           
                            <Col md={12}>
                                <Input name={'description'} id={'description'} label="Shift Details"  onChange={onChangeText} />
                            </Col>
   
                        </Row> */}

                        <Row>
                            <Col md={6}>
                                <Input className='col-sm-6'
                                    name={''}
                                    id={''}
                                    label="Creating By :"
                                    placeholder="Junaid Khan" disabled />
                            </Col>

                            <Col md={6}>
                                {/* <Select name={'shiftTemplateId'} id={'shiftTemplateId'} label="Timezone: " options={lookups?.shiftTemplate} />
                            */}
                                <div className='select-component-container'>
                                    <label>Department / Section</label>
                                    <select className='select-component-item mr-1 border-1 col-sm-12 rounded-3 p-1 mb-2' >
                                        <option value='finance' selected="selected">Finance</option>
                                        <option value='EST'>Marketing</option>
                                        <option value='PST'>IT</option>
                                        <option value='PST'>Sales</option>
                                    </select>
                                </div>
                            </Col>


                            <Col md={6}>
                                <Input className='col-sm-12'
                                    name={''}
                                    id={''}
                                    label="Shift Title :"
                                    placeholder="July-Campaign | Extended Hours Shift" />
                            </Col>

                            <Col md={6} className="mt-4 mb-4">
                                {/* <Select name={'shiftTemplateId'} id={'shiftTemplateId'} label="Timezone: " options={lookups?.shiftTemplate} />
                            */}
                                <div className='select-component-container d-flex align-items-center justify-content-center '>

                                    <label className='pr-4'>  Valid From  </label>
                                    <select className='select-component-item mr-1 border-1 col-sm-4 rounded-3 p-1 mb-2' name="startTimeHour" >
                                        <option value='00' selected="selected">09:00 Am</option>
                                        <option value='01'>09:00 Am</option>
                                        <option value='02'>10:00 Am</option>
                                        <option value='03'>11:00 Am</option>
                                        <option value='04'>12:00 Pm</option>
                                    </select>

                                    <label className='pr-2 pl-2'>  To  </label>

                                    <select className='select-component-item mr-1 border-1 col-sm-4 rounded-3 p-1 mb-2' name="startTimeHour" >
                                        <option value='00' selected="selected">09:00 Pm</option>
                                        <option value='01'>09:00 Am</option>
                                        <option value='02'>10:00 Am</option>
                                        <option value='03'>11:00 Am</option>
                                        <option value='04'>12:00 Pm</option>
                                    </select>
                                </div>
                            </Col>




                            <Col md={6}>
                                <div className='day-field d-flex mt-3'><label className='col-sm-2'>Monday</label>
                                    <div className='col-sm-2 d-inline-block'>

                                        <label class="switch">
                                            <input data-on="On" type="checkbox" id="toggle-switch" />
                                            <span class="slider round"></span>
                                        </label>
                                    </div>
                                    <div className='col-sm-4 d-flex mb-3'>
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
                                <div className='day-field d-flex mt-3'><label className='col-sm-2'>Tuesday</label>
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
                                <div className='day-field d-flex mb-3'><label className='col-sm-2'>Wednes</label>
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
                                <div className='day-field d-flex'><label className='col-sm-2'>Thursday</label>
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
                                <div className='day-field d-flex'><label className='col-sm-2'>Saturday</label>
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
                        <div class="d-flex">
                            {/* <button class="primary-btn  btn btn-primary btn-md ">Publish</button> */}

                            {renderSubmitButton()}
                        </div>
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

CreateShift.propTypes = {

};

export default CreateShift;