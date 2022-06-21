import React, { useEffect, useRef, useState } from 'react';
import { Card, Col, Container, Row, InputGroup, Tabs, Tab } from 'react-bootstrap';
import CustomButton from '../../../components/employee-profiling/form/Button';
import ManagerAppBar from '../../../components/ManagerAppBar';
import { backgroundColor } from '../../../Constants';
import userAvatar from '../../../assets/img/user_avatar.png'
import CustomTabs from '../../../components/employee-profiling/tabs';
import ShiftUI from './Tabs/ShiftUI';
import { useDispatch, useSelector } from "react-redux";
import { attendanceActions } from '../../../redux/actions/attendance';
import Select from '../../../components/employee-profiling/form/Select';
import _ from 'lodash';

const ShiftDetails = props => {
    const dispatch = useDispatch();
    const __shifts = useSelector(state => state.attendance.shifts);
    const __shiftWeek = useSelector(state => state.attendance.shiftWeeks);
    const [shifts, setShifts] = useState({});
    const [weeks, setWeeks] = useState({});
    const [shiftId, setShiftId] = useState(0);
    const [tabsList, setTabsList] = useState([]);
    const [selectedDay, setSelectedDay] = useState('');
    const [weekDetail, setWeekDetail] = useState({
        id: 0,
        dayType: null,
        day: '',
        startTimeHour: 0o0,
        startTimeMin: 0o0,
        endTimeHour: 0o0,
        endTimeMin: 0o0,
        breakDurationHour: 0o0,
        breakDurationMin: 0o0,
        flexInHour: 0o0,
        flexInMin: 0o0,
        flexOutHour: 0o0,
        flexOutMin: 0o0
    });

    useEffect(() => {
        getAllShifts();
        let list = [
            { key: 'monday', title: 'MON', item: (__shiftWeek !== null? __shiftWeek[0].Shift_Week_Details.filter(week=>week.day === 'monday') : null)},
            { key: 'tuesday', title: 'TUE' },
            { key: 'wednesday', title: 'WED' },
            { key: 'thursday', title: 'THU'},
            { key: 'friday', title: 'FRI'},
            { key: 'saturday', title: 'SAT' },
            { key: 'sunday', title: 'SUN' },
        ];
        setTabsList(list);
    }, [])

    useEffect(() => {
        if (!_.isEmpty(__shifts) && _.isObject(__shifts)) {
            setShifts(__shifts)
        }
    }, [__shifts])

    useEffect(() => {
        renderMainTabs();
    }, [tabsList])

    useEffect(() => {
        let list = [
            { key: 'monday', title: 'MON', item: (__shiftWeek !== null ? __shiftWeek[0].Shift_Week_Details.filter(week=>week.Day === 'monday') : [])},
            { key: 'tuesday', title: 'TUE', item: (__shiftWeek !== null ? __shiftWeek[0].Shift_Week_Details.filter(week=>week.Day === 'tuesday') : []) },
            { key: 'wednesday', title: 'WED', item: (__shiftWeek !== null ? __shiftWeek[0].Shift_Week_Details.filter(week=>week.Day === 'wednesday') : []) },
            { key: 'thursday', title: 'THU', item: (__shiftWeek !== null ? __shiftWeek[0].Shift_Week_Details.filter(week=>week.Day === 'thursday') : [])},
            { key: 'friday', title: 'FRI', item: (__shiftWeek !== null ? __shiftWeek[0].Shift_Week_Details.filter(week=>week.Day === 'friday') : [])},
            { key: 'saturday', title: 'SAT', item: (__shiftWeek !== null ? __shiftWeek[0].Shift_Week_Details.filter(week=>week.Day === 'saturday') : []) },
            { key: 'sunday', title: 'SUN', item: (__shiftWeek !== null ? __shiftWeek[0].Shift_Week_Details.filter(week=>week.Day === 'sunday') : []) },
        ];
        setTabsList(list);
    }, [__shiftWeek])

    const getAllShifts = () => {
      
        dispatch(attendanceActions.getAllShiftAction())
    }

    const onChangeText = (name, value) => {        
        setWeekDetail({
            ...weekDetail,
            [name]: value
        })
    }

    const submitWeekDetail = async (event) => {
        setSelectedDay(event.target.getAttribute('dayName'));
        await setInterval(() => {
            setWeekDetail({
                ...weekDetail,
                day: event.target.getAttribute('dayName')
            });
          }, 1000);

        let weeks = [];
        await weeks.push(weekDetail)
        await dispatch(attendanceActions.createShiftWeekDetailAction(
          { shiftId: shiftId, weeks}
        ))
    }

    const onShiftChange = (name, value) => {
       
        setShiftId(value);
        if(value > 0){
            dispatch(attendanceActions.getShiftDetailsAction(
            {shiftId: value}
            ));
        }
    }

    const renderInfoDetail = (title, val, isButton = false, buttonClass = '') => {
        return (
            <div>
                <h4 className='employee-detail-box-title'>{title}</h4>
                {
                    isButton ?
                        <CustomButton buttonClass={'employee-detail-box-info-btn-active'} customContainerClass={`employee-detail-box-info-btn`} className={buttonClass} title={val} size="sm" />
                        :
                        <p className='employee-detail-box-title employee-detail-box-value'>{val}</p>
                }
            </div>
        )
    }

    const renderMainTabs = () => {
        return (
            <Tabs defaultActiveKey={'monday'} className="mb-3 employee-profiling-detail-tab-item-container">
            {
                tabsList.map(({ key, title, item }) => {
                    return (                        
                        <Tab eventKey={key} title={title}>
                            {renderShiftUI(key, item)}
                        </Tab>
                    )
                })
            }
            </Tabs>
        )
    }
    const renderShifts = () => {
        return (
            <Col md={'3'}>
                <Select name={'shift'} id={'shift'} label="Shift" options={shifts} onChange={onShiftChange} />
            </Col>
        )
    }
    const renderShiftUI = (dayName, item) => {
        return <ShiftUI dayName={dayName} item={item} onChange={onChangeText} onSubmit={submitWeekDetail} />
    }

    return (
        <div style={{ minHeight: "100vh", backgroundImage: backgroundColor }}>
            <ManagerAppBar drawerOption={""} location="Home" />
            <Container className='employee-form-container'>
                {renderShifts()}
                {renderMainTabs()}
            </Container>
        </div>
    );
};

ShiftDetails.propTypes = {

};

export default ShiftDetails;