import React from 'react';
import cx from 'classnames';
import { string, func } from 'prop-types';
import { MAP_THEME, MAP_SIZE, MAP_ICON_SIZE } from './constants';

const FeaturedIcon = ({
  Icon,
  type,
  size,
  theme,
  className,
  ...props
}) => (
  React.createElement(
    type,
    {
      className: cx(
        'inline-flex items-center justify-center shrink-0 color-white',
        MAP_THEME[theme],
        MAP_SIZE[size],
        className
      ),
      ...props
    },
    <Icon className={MAP_ICON_SIZE[size]} />
  )
);

FeaturedIcon.propTypes = {
  Icon: func,
  type: string,
  size: string,
  theme: string,
  className: string
};

FeaturedIcon.defaultProps = {
  Icon: f => f,
  type: 'button',
  size: 'md',
  theme: 'navy',
  className: ''
};

export default FeaturedIcon;
