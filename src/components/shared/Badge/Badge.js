import React from 'react';
import cx from 'classnames';
import { string, node } from 'prop-types';
import {
  MAP_THEME,
  MAP_THEME_LIGHT,
  MAP_INVERSE_THEME,
  MAP_SIZE
} from './constants';

const Badge = ({
  size,
  theme,
  type,
  className,
  children,
  ...props
}) => (
  <span
    className={cx(
      'inline-flex shrink-0 radius-full items-center justify-center gap-1 text-sm',
      // eslint-disable-next-line no-nested-ternary
      type === 'inverse'
        ? MAP_INVERSE_THEME[theme]
        : type === 'light' ? MAP_THEME_LIGHT[theme] : (MAP_THEME[theme] || MAP_THEME.navy),
      MAP_SIZE[size],
      className
    )}
    {...props}
  >
    {children}
  </span>
);

Badge.propTypes = {
  size: string,
  theme: string,
  type: string,
  className: string,
  children: node
};

Badge.defaultProps = {
  size: 'md',
  theme: 'navy',
  type: 'default',
  className: '',
  children: null
};

export default Badge;
