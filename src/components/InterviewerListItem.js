import classNames from 'classnames';
import React from 'react';
import 'components/InterviewerListItem.scss';

function InterviewerListItem(props) {
  let liClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });
  return (
    <li onClick={props.setInterviewer} className={liClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && <p>{props.name}</p>}
    </li>
  );
}

export default InterviewerListItem;
