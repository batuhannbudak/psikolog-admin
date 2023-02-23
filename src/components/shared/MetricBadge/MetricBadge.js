import React from 'react';
import {
  func, number, string, oneOfType
} from 'prop-types';

const MetricBadge = ({
  Icon,
  value,
  subtitle,
  additionalClasses
}) => {
  return (
    <div className={`metric-badge relative flex flex-col radius-xl p-4 w-36 ${additionalClasses}`}>
      {Icon && <Icon className='absolute top-4 right-4' /> }
      <span className='color-white font-bold text-2xl line-height-3xl'>{value}</span>
      <p className='color-white font-normal text-sm line-height-sm'>{subtitle}</p>
    </div>
  );
};

export default MetricBadge;

MetricBadge.propTypes = {
  Icon: func,
  value: oneOfType([string, number]),
  subtitle: string,
  additionalClasses: string
};

MetricBadge.defaultProps = {
  Icon: null,
  value: 0,
  subtitle: '',
  additionalClasses: ''
};
