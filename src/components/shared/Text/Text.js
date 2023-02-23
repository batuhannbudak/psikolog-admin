import React from 'react';
import cx from 'classnames';
import { bool, string, node } from 'prop-types';
import { MAP_COLORS, MAP_SIZE } from './constants';

const Text = ({
  inline,
  type,
  color,
  size,
  className,
  children,
  ...props
}) => (
  React.createElement(
    type,
    {
      className: cx(
        inline ? 'inline-flex items-center gap-2' : '',
        MAP_COLORS[color],
        MAP_SIZE[size],
        className
      ),
      ...props
    },
    children
  )
);

export default Text;

Text.propTypes = {
  inline: bool,
  type: string,
  color: string,
  size: string,
  className: string,
  children: node
};

Text.defaultProps = {
  inline: false,
  type: 'span',
  color: 'navy',
  size: 'default',
  className: '',
  children: null
};
