import React from 'react';

import {
  array
} from 'prop-types';

const ExpertiseAreas = ({ areas }) => {
  return (
    <div className='flex flex-wrap'>
      {
        areas.map((item, index) => {
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index} // TODO:
              className='text-sm bg-blue-100 color-blue-600 radius border-blue-400 border p-2 mr-2 my-2'
            >
              {item}
            </div>
          );
        })
      }
    </div>
  );
};

ExpertiseAreas.propTypes = {
  areas: array
};

ExpertiseAreas.defaultProps = {
  areas: []
};

export default ExpertiseAreas;
