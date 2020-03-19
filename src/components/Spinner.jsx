import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

function Spinner({ size, color }) {
  const spinnerClass = classnames(
    'loader',
    `loader-${color}`,
    { 'loader-lg': size === 'large' },
    { 'loader-sm': size === 'small' },
    { 'loader-md': size === 'medium' },
  );
  return <div className={spinnerClass} data-testid="spinner" />;
}
Spinner.defaultProps = {
  size: 'medium',
  color: 'dark',
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf([
    'primary',
    'warning',
    'secondary',
    'dark',
    'success',
  ]),
};

Spinner.displayName = 'Spinner';
export default Spinner;
