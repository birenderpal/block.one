import React from 'react';
import PropTypes, { arrayOf } from 'prop-types';

export default function BlockAction({ align, children }) {
  return <div className={`block-action-group ${align}`}>{children}</div>;
}

BlockAction.defaultProps = {
  align: 'align-center',
};

BlockAction.propTypes = {
  // Align action items, one of [align-center, align-left, align-right]
  align: PropTypes.oneOf(['align-center', 'align-left', 'align-right']),
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.oneOfType([
    PropTypes.element,
    arrayOf(PropTypes.element),
  ]),
};

BlockAction.displayName = 'BlockAction';
