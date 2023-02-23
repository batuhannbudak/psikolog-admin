import React from 'react';
import { string } from 'prop-types';
import { LoadingDotsWrapper, LoadingDotsCircle } from './ScLoadingDots';

const LoadingDots = ({ size, backgroundColor }) => {
  return (
    <LoadingDotsWrapper className={`${size}`}>
      <LoadingDotsCircle backgroundColor={backgroundColor} />
      <LoadingDotsCircle backgroundColor={backgroundColor} />
      <LoadingDotsCircle backgroundColor={backgroundColor} />
    </LoadingDotsWrapper>
  );
};

LoadingDots.defaultProps = {
  size: 'medium',
  backgroundColor: '#2B3245'
};

LoadingDots.propTypes = {
  size: string,
  backgroundColor: string
};

export default LoadingDots;
