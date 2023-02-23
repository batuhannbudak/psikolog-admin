import { object, bool } from 'prop-types';
import React from 'react';
import { DETAIL_KEYS } from './constants';
// eslint-disable-next-line import/no-cycle
import Text  from '../Text';

const DetailWrapper = ({
  metrics,
  needsPadding
}) => {
  const metricKeys = Object.keys(metrics);

  return (
    <div className='flex flex-wrap flex-col justify-center gap-3 grow-1 py-2 ml-1'>
      {metricKeys.map(key => (
        <div className='flex flex-row items-center pl-2' key={key}>
          <Text color='pale' size='sm'>{DETAIL_KEYS[key]}</Text>
          <Text color='navy' size='lg' className={`font-medium ml-auto ${needsPadding ? 'mr-0' : 'mr-0'}`}>{metrics[key]}</Text>
        </div>
      ))}
    </div>
  );
};

export default DetailWrapper;

DetailWrapper.propTypes = {
  metrics: object,
  needsPadding: bool
};

DetailWrapper.defaultProps = {
  metrics: {},
  needsPadding: false
};
