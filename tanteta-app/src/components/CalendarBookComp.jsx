import '../styles/CalendarBookStyles.css'
import { useState, useEffect } from "react";
import axios from "axios";

const CalendarBookComp = () => {

    const today = new Date(); // month object with today's full date and time
    const todayISO = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();

    // init monthCounter to 1 to get lastDateOfThisMonth. 1 represents this month
    let [monthCounter, setMonthCounter] = useState(1);
    let [selectedDate, setSelectedDate] = useState(todayISO);
    let [timeSlots, setTimeSlots] = useState([]);
    let [selectedTime, setSelectedTime] = useState('00:00');
    let [dayObjectWithTimeSlots, setDayObjectWithTimeSlots] = useState([
        {
            date: '',
            timeSlotsAvailable: []
        }
    ]);

    useEffect(() => {
        const checkDayObject = async () => {
            const response = await axios.get(`http://localhost:8000/api/check/${selectedDate}`);

            const newTimeSlots = response.data;
            setTimeSlots(newTimeSlots);
        }
        checkDayObject();

        // prevents default behavior when browsing through months
        const initSelectedDayElement = document.getElementById(selectedDate);
        initSelectedDayElement ? initSelectedDayElement.checked = true : null;

    }, [selectedDate]);

    // date object with the full date and time of the last day of this month
    const lastDateOfThisMonth = new Date(today.getFullYear(), today.getMonth() + monthCounter, 0);
    const firstDateOfThisMonth = new Date(today.getFullYear(), today.getMonth() + monthCounter - 1, 1);

    const thisMonthAndYear = lastDateOfThisMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    const thisMonthAndYearISO = lastDateOfThisMonth.getFullYear() + "-" + (lastDateOfThisMonth.getMonth() + 1);

    // array to hold the days of the viewed month. updates automatically as monthCounter changes to show the correct days of each month as the user clicks through months
    let daysOfThisMonth = [];
    for (let i = 0; i < lastDateOfThisMonth.getDate(); i++) {
        daysOfThisMonth.push(i + 1);
    }

    let emptyDaysOfThisMonth = [];
    for (let i = 0; i < firstDateOfThisMonth.getDay(); i++) {
        emptyDaysOfThisMonth[i] = i;
    }

    // init array this way so that weeks days are gotten dynamically fron JS based on local standards
    let daysOfTheWeek = [];
    for (let i = 1; i <= 7; i++) {
        daysOfTheWeek.push(new Date(2020, 2, i).toLocaleDateString(undefined, { weekday: 'short' }));
    }

    function nextMonth() {
        monthCounter += 1;
        setMonthCounter(monthCounter);
        iniitCalendar();
        initTimeslotBtns();
        console.log(monthCounter);
    }

    function prevMonth() {
        if (monthCounter > 1) {
            monthCounter -= 1;
            setMonthCounter(monthCounter);
            iniitCalendar();
            initTimeslotBtns();
        }
        console.log(monthCounter);
    }

    function iniitCalendar() {
        const daysOfThisMonthElement = document.querySelectorAll('.days-of-this-month input');
        for (let element of daysOfThisMonthElement) {
            element.checked = false;
        }
    }

    const selectThisDay = (e) => {
        const newSelectedDate = e.target.className;
        setSelectedDate(newSelectedDate);
        setSelectedTime('00:00');

        initTimeslotBtns();
        // console.log(new Date(`${selectedDate} EST`));
        console.log(e.target.className);
    }

    function showThisBtn(e) {
        const target = e.target.className;
        const thisTimeBtn = document.querySelector(`.${target} + .timeslot-btn`);

        initTimeslotBtns();

        if (thisTimeBtn.className == 'timeslot-btn visible') {
            thisTimeBtn.classList.add('hidden');
            thisTimeBtn.classList.remove('visible');
        } else if (thisTimeBtn.className == 'timeslot-btn hidden') {
            thisTimeBtn.classList.add('visible');
            thisTimeBtn.classList.remove('hidden');
        }
        // console.log(btn.className);
    }

    function initTimeslotBtns() {
        const alltimebtns = document.querySelectorAll('.timeslot-btn');

        for (let thisbtn of alltimebtns) {
            if (thisbtn.className == 'timeslot-btn visible') {
                thisbtn.classList.add('hidden');
                thisbtn.classList.remove('visible');
            }
        }
    }

    const selectThisTimeSlot = (e) => {
        const newselectedTime = e.target.innerHTML;
        setSelectedTime(newselectedTime);

        // let dayIndex = dayObjectWithTimeSlots.findIndex(timeslot => timeslot.date == selectedDate);
        // let timeIndex = dayObjectWithTimeSlots[dayIndex].timeSlotsAvailable.indexOf(selectedTime);

        // dayObjectWithTimeSlots[dayIndex].timeSlotsAvailable.splice(timeIndex, 1);
        // setDayObjectWithTimeSlots(dayObjectWithTimeSlots);

        console.log(selectedTime);
    }

    return (
        <div className="calendar-book-component">
            <input type="date" />
            <div className="calendar-box">

                <div className="calendar-header">
                    <h4 className="current-month-and-year">{thisMonthAndYear}</h4>
                    <p className="selected-date">{selectedDate}</p>
                    <button onClick={prevMonth}> &larr; </button>
                    <button onClick={nextMonth}> &rarr; </button>
                </div>

                <div className="calendar-body">
                    <div className="weekdays">
                        {
                            daysOfTheWeek.map(wday => (
                                <span key={wday}>{wday}</span>
                            ))
                        }
                    </div>
                    <div className="days-of-this-month">
                        {
                            emptyDaysOfThisMonth.map(day => (
                                <span key={day} className="empty-day"></span>
                            ))
                        }
                        {
                            daysOfThisMonth.map(day => (
                                // check days before today to disable them
                                (day < today.getDate() && lastDateOfThisMonth.getMonth() == today.getMonth()) ?
                                    <span key={day} className="prevday">
                                        <input type="radio" id={`${thisMonthAndYearISO}-${day}`} value={day} name="day_of_this_month" disabled />
                                        <label htmlFor={`${thisMonthAndYearISO}-${day}`} className={`${thisMonthAndYearISO}-${day}`} >{day}</label>
                                    </span>
                                    :
                                    // check if this day is today
                                    (thisMonthAndYearISO + "-" + day == todayISO) ?
                                        (new Date(`${thisMonthAndYearISO}-${day} EST`).getDay() == 0) ?
                                            // Check if the day being mapped is a sunday
                                            <span key={day} className="thisday today sunday">
                                                <input type="radio" id={`${thisMonthAndYearISO}-${day}`} value={day} name="day_of_this_month" disabled defaultChecked />
                                                <label htmlFor={`${thisMonthAndYearISO}-${day}`} className={`${thisMonthAndYearISO}-${day}`} >{day}</label>
                                            </span>
                                            :
                                            <span key={day} className="thisday today">
                                                <input type="radio" id={`${thisMonthAndYearISO}-${day}`} value={day} name="day_of_this_month" defaultChecked />
                                                <label onClick={selectThisDay} htmlFor={`${thisMonthAndYearISO}-${day}`} className={`${thisMonthAndYearISO}-${day}`} >{day}</label>
                                            </span>
                                        :
                                        (new Date(`${thisMonthAndYearISO}-${day} EST`).getDay() == 0) ?
                                            // Check if the day being mapped is a sunday
                                            <span key={day} className="thisday sunday">
                                                <input type="radio" id={`${thisMonthAndYearISO}-${day}`} value={day} name="day_of_this_month" disabled />
                                                <label htmlFor={`${thisMonthAndYearISO}-${day}`} className={`${thisMonthAndYearISO}-${day}`} >{day}</label>
                                            </span>
                                            :
                                            <span key={day} className="thisday selectable">
                                                <input type="radio" id={`${thisMonthAndYearISO}-${day}`} value={day} name="day_of_this_month" />
                                                <label onClick={selectThisDay} htmlFor={`${thisMonthAndYearISO}-${day}`} className={`${thisMonthAndYearISO}-${day}`} >{day}</label>
                                            </span>
                            ))
                        }
                    </div>
                </div>

            </div>
            <div className="timeslots-box">
                <div className="timeslots-header">
                    <h4>Book a slot for {new Date(`${selectedDate} EST`).toLocaleDateString(undefined, { day: 'numeric', weekday: 'long', month: 'long', year: 'numeric' })}</h4>
                    {/* <p className="selected-time">{selectedTime}</p> */}
                </div>
                <div className="timeslots-body">
                    <div className="times-of-this-day">
                        {
                            timeSlots.map((time, index) => (
                                <div key={time} className={`timeslot-wrap`}>
                                    <div onClick={showThisBtn} className={`timeslot-${index}`}>{time}</div>
                                    <div className={`timeslot-btn hidden`}><button onClick={selectThisTimeSlot}>Book</button></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CalendarBookComp;