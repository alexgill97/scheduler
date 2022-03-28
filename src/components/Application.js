import React, { useState, useEffect } from 'react';

import 'components/Application.scss';
import DayList from './DayList';
import Appointment from './Appointment';
import axios from 'axios';
import { getAppointmentsForDay, getInterview } from '../helpers/selectors';

// const appointments = {
//   1: {
//     id: 1,
//     time: '12pm',
//   },
//   2: {
//     id: 2,
//     time: '1pm',
//     interview: {
//       student: 'Lydia Miller-Jones',
//       interviewer: {
//         id: 3,
//         name: 'Sylvia Palmer',
//         avatar: 'https://i.imgur.com/LpaY82x.png',
//       },
//     },
//   },
//   3: {
//     id: 3,
//     time: '2pm',
//   },
//   4: {
//     id: 4,
//     time: '3pm',
//     interview: {
//       student: 'Archie Andrews',
//       interviewer: {
//         id: 4,
//         name: 'Cohana Roy',
//         avatar: 'https://i.imgur.com/FK8V841.jpg',
//       },
//     },
//   },
//   5: {
//     id: 5,
//     time: '4pm',
//   },
// };

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    console.log(id, interview);
  }
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
  }
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      console.log(all);
      const [days, appointments, interviewers] = all;
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const parsedAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        bookInterview={bookInterview}
      />
    );
  });

  //----- JSX To Return --------

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />{' '}
      </section>
      <section className="schedule">
        {parsedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
