import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

function Form(props) {
  const { interviewers, onSave, onCancel } = props;
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = () => {
    setStudent('');
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  const save = () => {
    onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            value={student}
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(e) => setStudent(e.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={save}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

export default Form;
