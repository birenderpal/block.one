import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function Button(props) {
  const { btnSize, btnText, btnColor, btnRounded, onClick } = props;
  const classList = classnames('btn', `btn-${btnSize}`, `btn-${btnColor}`, {
    'btn-rounded': btnRounded,
  });
  return (
    <button 
      type="button"
      className={classList}
      onClick={() => onClick()}
      data-testid="load-button"
    >
      {btnText ? <span>{btnText}</span> : null}
    </button>
  );
}

Button.defaultProps = {
  btnSize: 'medium',
  btnText: 'Load',
  btnColor: 'dark',
  btnRounded: false,
};

Button.propTypes = {
  btnText: PropTypes.string,
  btnSize: PropTypes.oneOf(['small', 'medium', 'large']),
  btnColor: PropTypes.oneOf([
    'primary',
    'warning',
    'secondary',
    'dark',
    'success',
  ]),
  btnRounded: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  onClick: PropTypes.func,
};

Button.displayName = 'Button';
