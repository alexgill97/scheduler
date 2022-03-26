import React from 'react';
import 'components/Appointment/styles.scss';
import Show from './Show';
import Empty from './Empty';
import Header from './Header';

export default function Appointment(props) {
  const { time, id, interview } = props;
  return (
    <article className="appointment">
      <Header time={time} />
      {interview ? (
        <Show student={interview.student} interviewer={interview.interviewer} />
      ) : (
        <Empty />
      )}
    </article>
  );
}
