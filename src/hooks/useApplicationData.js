import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAppointmentsForDay } from 'helpers/selectors';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;

      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  const updateSpots = (state, appointments) => {
    const stateDay = state.days.find((day) => day.name === state.day);
    const appointmentsForDay = stateDay.appointments.map(
      (id) => appointments[id]
    );
    const availableSpots = appointmentsForDay.filter(
      (apt) => !apt.interview
    ).length;
    const updatedDay = {
      ...stateDay,
      spots: availableSpots,
    };
    const days = [...state.days];
    days[stateDay.id - 1] = updatedDay;
    return days;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments,
        days: updateSpots(state, appointments),
      });
    });
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      res.status === 204 &&
        setState({
          ...state,
          appointments,
          days: updateSpots(state, appointments),
        });
    });
  };
  return { state, setDay, bookInterview, cancelInterview };
}
