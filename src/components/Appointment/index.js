import React from 'react';
import 'components/Appointment/styles.scss';
import Show from './Show';
import Empty from './Empty';
import Header from './Header';
import Form from './Form';
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';
import Confirm from './Confirm';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETE = 'DELETE';
const EDIT = 'EDIT';
const CONFIRM = 'CONFIRM';

export default function Appointment(props) {
  // prettier-ignore
  const { time, id, interview, bookInterview, interviewers, cancelInterview } = props;

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview).then(() => {
      transition(SHOW);
    });
  };

  const deleteInterview = (id) => {
    transition(DELETE);
    cancelInterview(id).then(() => {
      transition(EMPTY);
    });
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          id={id}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onSave={save} onCancel={back} />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETE && <Status message="Deleteing..." />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={() => deleteInterview(id)}
          onCancel={() => transition(SHOW)}
          message="Confirm Deletion"
        />
      )}
    </article>
  );
}
