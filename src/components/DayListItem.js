import React from 'react';
import 'components/DayListItem.scss';
import classNames from 'classnames';

let formatSpots = (spots) => {
  if (spots === 1) {
    return '1 spot remaining';
  }
  if (spots === 0) {
    return 'no spots remaining';
  } else {
    return `${spots} spots remaining`;
  }
};
function DayListItem(props) {
  let liClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots,
  });
  return (
    <li className={liClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

export default DayListItem;
