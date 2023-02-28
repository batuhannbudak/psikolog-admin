import React from 'react';

import {
  object, number, bool
} from 'prop-types';

const AppointmentCard = ({
  data, index, isFirst, isLast
}) => {

  
  const getHour = () => {
    const temp = data.date.split(' ');
    return temp.at(-1);
  };

  const getDate = () => {
    const temp = data.date.split(' ');
  
    let dateStr = '';
    for (let i = 0; i < temp.length - 1; i++) {
      dateStr += temp[i] + ' ';
    }

    return dateStr;
  }

  return (
    <div className={`${index % 2 === 0 ? 'bg-navy-25' : 'bg-navy-50'} ${isFirst && 'radius-t'} ${isLast && 'radius-b'}`}>
      <div className='h-18 px-12 flex flex-row items-center'>
        <span className='w-1/4'>{data.therapistName}</span>
        <span className='w-1/4'>{data.clientName}</span>
        <span className='w-1/4'>{getDate()}</span>
        <span className='w-1/4'>{getHour()}</span>
      </div>
    </div>
  );
};

AppointmentCard.propTypes = {
  data: object,
  index: number,
  isFirst: bool,
  isLast: bool
};

AppointmentCard.defaultProps = {
  data: {},
  index: 0,
  isFirst: false,
  isLast: false
};

export default AppointmentCard;
