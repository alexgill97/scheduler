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
  const appointmentIds = state.days.filter((stateDay) => stateDay.name === day);
  let interviewerArr = [];
  if (!appointmentIds[0]) {
    return [];
  }
  appointmentIds[0].appointments
    .map((id) => state.appointments[id])
    .forEach((appointment) => {
      console.log(appointment);
      if (appointment.interview) {
        interviewerArr.push(
          state.interviewers[appointment.interview.interviewer]
        );
      }
    });
  console.log(interviewerArr);
  return interviewerArr;
}
