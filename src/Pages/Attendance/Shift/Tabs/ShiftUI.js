import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table, Form } from 'react-bootstrap';
import Input from '../../../../components/employee-profiling/form/Input';
import CustomButton from '../../../../components/employee-profiling/form/Button';
import Select from '../../../../components/employee-profiling/form/Select';
import { Link } from 'react-router-dom';
import { Edit, Delete } from "@material-ui/icons";
import moment from 'moment';

const ShiftForm = ({ dayName, onChange = () => { }, onSubmit=()=>{}, item }) => {
    const [selectedDayType, setSelectedDayType] = useState('');

    const onChangeSelection = (e) => {
        const { value, name } = e.target;
        if (onChange) {
            onChange(name, value)
        }
        if(name === 'dayType'){
            setSelectedDayType(value);
        }
    }

    return (
        <Card className='employee-form-card-container'>
         <Form>
        <Row>
            <Col md={4}>
               <strong>Day Type</strong>
            </Col>
            <Col md={4}>
                <label>
                    <input name="dayType"
                    type="radio"
                    value="working"
                    checked={selectedDayType === "working"}
                    onChange={onChangeSelection}
                    />
                    Working
                </label>
            </Col>
        <Col md={4}>
          <label>
            <input name="dayType"
              type="radio"
              value="holiday"
              checked={selectedDayType === "holiday"}
              onChange={onChangeSelection}
            />
            Holiday
          </label>
          </Col>
            {/* <Col md={4}>
            <strong>Working</strong>
            </Col>
            <Col md={4}>
            <strong>Holiday</strong>
            </Col> */}
            <hr></hr>
        </Row>

        <Row>
            <Col md={4}>
               Start Time
            </Col>
            <Col md={4}>
             Hours <select className='select-component-item' name="startTimeHour" onChange={onChangeSelection} >
             < option value='00' selected="selected">00</option>
                   <option value='01'>01</option>
                   <option value='02'>02</option>
                   <option value='03'>03</option>
                   <option value='04'>04</option>
                   <option value='05'>05</option>
                   <option value='06'>06</option>
                   <option value='07'>07</option>
                   <option value='08'>08</option>
                   <option value='09'>09</option>
                   <option value='10'>10</option>
                   <option value='11'>11</option>
                   <option value='12'>12</option>
             </select>
            </Col>
            <Col md={4}>
            Min <select name="startTimeMin" onChange={onChangeSelection} >
            < option value='00' selected="selected">00</option>
                    <option value='05'>05</option>
                   <option value='10'>10</option>
                   <option value='15'>15</option>
                   <option value='20'>20</option>
                   <option value='25'>25</option>
                   <option value='30'>30</option>
                   <option value='35'>35</option>
                   <option value='40'>40</option>
                   <option value='45'>45</option>
                   <option value='50'>50</option>
                   <option value='55'>55</option>
                   <option value='60'>60</option>
             </select>
            </Col>
        </Row>

        <Row>
            <Col md={4}>
               Break Duration
            </Col>
            <Col md={4}>
             Hours <select className='select-component-item'  name="breakDurationHour" onChange={onChangeSelection} >
             < option value='00' selected="selected">00</option>
                   <option value='01'>01</option>
                   <option value='02'>02</option>
                   <option value='03'>03</option>
                   <option value='04'>04</option>
                   <option value='05'>05</option>
                   <option value='06'>06</option>
                   <option value='07'>07</option>
                   <option value='08'>08</option>
                   <option value='09'>09</option>
                   <option value='10'>10</option>
                   <option value='11'>11</option>
                   <option value='12'>12</option>
             </select>
            </Col>
            <Col md={4}>
            Min <select name="breakDurationMin" onChange={onChangeSelection} >
            < option value='00' selected="selected">00</option>
            <option value='05'>05</option>
                   <option value='10'>10</option>
                   <option value='15'>15</option>
                   <option value='20'>20</option>
                   <option value='25'>25</option>
                   <option value='30'>30</option>
                   <option value='35'>35</option>
                   <option value='40'>40</option>
                   <option value='45'>45</option>
                   <option value='50'>50</option>
                   <option value='55'>55</option>
                   <option value='60'>60</option>
             </select>
            </Col>
        </Row>

        <Row>
            <Col md={4}>
              Shift End
            </Col>
            <Col md={4}>
             Hours <select className='select-component-item' name="endTimeHour" onChange={onChangeSelection} >
             < option value='00' selected="selected">00</option>
             <option value='01'>01</option>
                   <option value='02'>02</option>
                   <option value='03'>03</option>
                   <option value='04'>04</option>
                   <option value='05'>05</option>
                   <option value='06'>06</option>
                   <option value='07'>07</option>
                   <option value='08'>08</option>
                   <option value='09'>09</option>
                   <option value='10'>10</option>
                   <option value='11'>11</option>
                   <option value='12'>12</option>
             </select>
            </Col>
            <Col md={4}>
            Min <select name="endTimeMin" onChange={onChangeSelection} >
            < option value='00' selected="selected">00</option>
            <option value='05'>05</option>
                   <option value='10'>10</option>
                   <option value='15'>15</option>
                   <option value='20'>20</option>
                   <option value='25'>25</option>
                   <option value='30'>30</option>
                   <option value='35'>35</option>
                   <option value='40'>40</option>
                   <option value='45'>45</option>
                   <option value='50'>50</option>
                   <option value='55'>55</option>
                   <option value='60'>60</option>
             </select>
            </Col>
        </Row>

        <Row>
            <Col md={4}>
               Flexi In
            </Col>
            <Col md={4}>
             Hours <select className='select-component-item' name="flexInHour" onChange={onChangeSelection} >
             < option value='00' selected="selected">00</option>
             <option value='01'>01</option>
                   <option value='02'>02</option>
                   <option value='03'>03</option>
                   <option value='04'>04</option>
                   <option value='05'>05</option>
                   <option value='06'>06</option>
                   <option value='07'>07</option>
                   <option value='08'>08</option>
                   <option value='09'>09</option>
                   <option value='10'>10</option>
                   <option value='11'>11</option>
                   <option value='12'>12</option>
             </select>
            </Col>
            <Col md={4}>
            Min <select name="flexInMin" onChange={onChangeSelection} >
            < option value='00' selected="selected">00</option>
            <option value='05'>05</option>
                   <option value='10'>10</option>
                   <option value='15'>15</option>
                   <option value='20'>20</option>
                   <option value='25'>25</option>
                   <option value='30'>30</option>
                   <option value='35'>35</option>
                   <option value='40'>40</option>
                   <option value='45'>45</option>
                   <option value='50'>50</option>
                   <option value='55'>55</option>
                   <option value='60'>60</option>
             </select>
            </Col>
        </Row>

        <Row>
            <Col md={4}>
               Flexi Out
            </Col>
            <Col md={4}>
             Hours <select className='select-component-item' name="flexOutHour" onChange={onChangeSelection} >
             < option value='00' selected="selected">00</option>
             <option value='01'>01</option>
                   <option value='02'>02</option>
                   <option value='03'>03</option>
                   <option value='04'>04</option>
                   <option value='05'>05</option>
                   <option value='06'>06</option>
                   <option value='07'>07</option>
                   <option value='08'>08</option>
                   <option value='09'>09</option>
                   <option value='10'>10</option>
                   <option value='11'>11</option>
                   <option value='12'>12</option>
             </select>
            </Col>
            <Col md={4}>
            Min <select name="flexOutMin" name="flexOutMin" onChange={onChangeSelection} >
            < option value='00' selected="selected">00</option>
                   <option value='05'>05</option>
                   <option value='10'>10</option>
                   <option value='15'>15</option>
                   <option value='20'>20</option>
                   <option value='25'>25</option>
                   <option value='30'>30</option>
                   <option value='35'>35</option>
                   <option value='40'>40</option>
                   <option value='45'>45</option>
                   <option value='50'>50</option>
                   <option value='55'>55</option>
                   <option value='60'>60</option>
             </select>
            </Col>
        </Row>

       <Row>
       <Col md={4}>
            <CustomButton title={'Save '+dayName} customContainerClass={'tab-section-card-button'} dayName={dayName} id={item.length > 0 ? (item[0].id) : 0} onClick={onSubmit} />
       </Col>
       </Row>

       </Form>
    </Card>
    )
};

export default ShiftForm