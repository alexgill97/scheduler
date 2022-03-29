export function getAppointmentsForDay(state, day) {
  const appointmentIds = state.days.filter((stateDay) => stateDay.name === day);

  if (!appointmentIds[0]) {
    return [];
  }
  return appointmentIds[0].appointments.map((id) => state.appointments[id]);
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const student = interview.student;
  const interviewer = state.interviewers[interview.interviewer];
  return { interviewer, student };
}

export function getInterviewersForDay(state, day) {
  const stateDay = state.days.find((eachDay) => eachDay.name === day);
  if (stateDay) {
    const interviewersForDay = stateDay.interviewers.map(
      (interviewerId) => state.interviewers[interviewerId]
    );

    return interviewersForDay;
  }
  return [];
}
