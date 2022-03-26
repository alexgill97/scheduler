import DayList from 'components/DayList';

export function getAppointmentsForDay(state, day) {
  const appointmentIds = state.days.filter((stateDay) => stateDay.name === day);

  if (!appointmentIds[0]) {
    return [];
  }
  return appointmentIds[0].appointments.map((id) => state.appointments[id]);
}
