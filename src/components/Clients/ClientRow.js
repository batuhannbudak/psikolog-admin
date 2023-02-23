import React from 'react';

import {
  object, number, bool
} from 'prop-types';

import { getStatusTag } from '../../helper/clientsHelper';

const ClientRow = ({
  data, index, isFirst, isLast
}) => {
  return (
    <div className={`${index % 2 === 0 ? 'bg-navy-25' : 'bg-navy-50'} ${isFirst && 'radius-t'} ${isLast && 'radius-b'}`}>
      <div className='h-18 px-12 flex flex-row items-center'>
        <span className='w-1/4'>{`${data.isim.first} ${data.isim.last}`}</span>
        <span className='w-1/4'>{data.yas}</span>
        <span className='w-1/4'>{data.cinsiyet}</span>
        <span className='w-1/4'>{getStatusTag(data.durum)}</span>
      </div>
    </div>
  );
};

ClientRow.propTypes = {
  data: object,
  index: number,
  isFirst: bool,
  isLast: bool
};

ClientRow.defaultProps = {
  data: {},
  index: 0,
  isFirst: false,
  isLast: false
};

export default ClientRow;
