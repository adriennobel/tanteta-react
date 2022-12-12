import { useState, useEffect } from "react";

const CalendarBook = () => {

    // init monthCounter to 1 to get lastDateOfThisMonth. 1 represents this month
    let [monthCounter, setMonthCounter] = useState(1);
    let [dayOfThisMonth, setDayOfThisMonth] = useState(new Date().getDate());

    useEffect(() => {

    });

    const date = new Date(); // month object with today's full date and time

    // date object with the full date and time of the last day of this month
    const lastDateOfThisMonth = new Date(date.getFullYear(), date.getMonth() + monthCounter, 0);
    const firstDateOfThisMonth = new Date(date.getFullYear(), date.getMonth() + monthCounter - 1, 1);
    const thisMonthAndYear = lastDateOfThisMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

    const dayID = lastDateOfThisMonth.getFullYear() + "-" + (lastDateOfThisMonth.getMonth() + 1);
    const today = dayID + "-" + date.getDate();
    const selectedDate = dayID + "-" + dayOfThisMonth;

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

    // console.log(date);
    // ISO 2020-05-10T00:00
    // console.log(date.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }));

    function nextMonth() {
        monthCounter += 1;
        setMonthCounter(monthCounter);
        console.log(monthCounter);
    }

    function prevMonth() {
        if (monthCounter > 1) {
            monthCounter -= 1;
            setMonthCounter(monthCounter);
        }
        console.log(monthCounter);
    }

    function check() {

        const daysOfThisMonthElement = document.querySelectorAll(`.dayin-${dayID}`);
        for (let i = 0; i < daysOfThisMonthElement.length; i++) {
            if (daysOfThisMonthElement[i].checked) {
                dayOfThisMonth = daysOfThisMonthElement[i].value
                setDayOfThisMonth(dayOfThisMonth);
            }
        }
        console.log(dayOfThisMonth);
    }

    const dayObjectWithTimeSlots = [{
        date: '2022-12-12',
        timeSlots: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30']
    }];
    const timesOfThisDay = dayObjectWithTimeSlots.find(dayobjwtime => dayobjwtime.date == selectedDate);

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
                    <div className="days">
                        {
                            emptyDaysOfThisMonth.map(day => (
                                <span key={day} className="empty-day"></span>
                            ))
                        }
                        {
                            daysOfThisMonth.map(day => (
                                (day < date.getDate() && lastDateOfThisMonth.getMonth() == date.getMonth()) ?
                                    <span key={day} onClick={check} className="this-day not-available">
                                        <input type="radio" id={`day-${dayID}-${day}`} value={day} className={`dayin-${dayID}`} name="day_of_the_month" disabled />
                                        <label htmlFor={`day-${dayID}-${day}`} >{day}</label>
                                    </span>
                                    :
                                    (dayID + "-" + day == today) ?
                                        (new Date(`${dayID}-${day} EST`).getDay() == 0) ? // Check if the day being mapped is a sunday
                                            <span key={day} onClick={check} className="this-day today">
                                                <input type="radio" id={`day-${dayID}-${day}`} value={day} className={`dayin-${dayID}`} name="day_of_the_month" defaultChecked disabled />
                                                <label htmlFor={`day-${dayID}-${day}`} >{day}</label>
                                            </span>
                                            :
                                            <span key={day} onClick={check} className="this-day today">
                                                <input type="radio" id={`day-${dayID}-${day}`} value={day} className={`dayin-${dayID}`} name="day_of_the_month" defaultChecked />
                                                <label htmlFor={`day-${dayID}-${day}`} >{day}</label>
                                            </span>
                                        :
                                        (new Date(`${dayID}-${day} EST`).getDay() == 0) ? // Check if the day being mapped is a sunday
                                            <span key={day} onClick={check} className="this-day">
                                                <input type="radio" id={`day-${dayID}-${day}`} value={day} className={`dayin-${dayID}`} name="day_of_the_month" disabled />
                                                <label htmlFor={`day-${dayID}-${day}`} >{day}</label>
                                            </span>
                                            :
                                            <span key={day} onClick={check} className="this-day">
                                                <input type="radio" id={`day-${dayID}-${day}`} value={day} className={`dayin-${dayID}`} name="day_of_the_month" />
                                                <label htmlFor={`day-${dayID}-${day}`} >{day}</label>
                                            </span>
                            ))
                        }
                    </div>
                </div>

            </div>
            <div className="timeslots-box">
                <div className="timeslots-header">
                    <h4>Pick a time</h4>
                    <p className="selected-time">00:00</p>
                </div>
                <div className="timeslots-body">
                    {
                        (timesOfThisDay) ?
                            <div className="times-of-this-day">
                                <h5>{timesOfThisDay.date}</h5>
                                <p>Available timeslots should be displayed heere.</p>
                                {
                                    timesOfThisDay.timeSlots.map(time => (
                                        <div key={time}>{time}</div>
                                    ))
                                }
                            </div>
                            :
                            <div className="times-of-this-day nothing">
                                <p>No Booking this day, default timeslots should be displayed.</p>
                                <p>When user choses, get that time and create a booking in the server</p>
                                <p>Next user will see the available timeslots instead of default timeslots.</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default CalendarBook;