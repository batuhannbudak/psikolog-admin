import React from 'react';
import { number, string } from 'prop-types';

const CircularProgressbar = ({
  value,
  shape,
  size,
  fontSize,
  primaryColor,
  secondaryColor,
  subtitle
}) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div
        aria-valuemin="0"
        aria-valuemax="100"
        style={{
          '--value': value,
          '--primaryColor': primaryColor,
          '--secondaryColor': secondaryColor,
          '--fontSize': fontSize
        }}
        className={`
          ${shape === 'circular' ? 'circular-progressbar' : 'semicircular-progressbar'}
          relative overflow-hidden font-circular m-auto ${size}
        `}
      />
      <span
        className='font-normal text-xs line-height-xl color-navy-500'
      >
        {subtitle}
      </span>
    </div>
  );
};

export default CircularProgressbar;

CircularProgressbar.propTypes = {
  value: number,
  shape: string,
  size: string,
  fontSize: string,
  primaryColor: string,
  secondaryColor: string,
  subtitle: string
};

CircularProgressbar.defaultProps = {
  value: 0,
  shape: 'circular',
  size: '',
  fontSize: '',
  primaryColor: '',
  secondaryColor: '',
  subtitle: ''
};
