import React from 'react';
import PropTypes from 'prop-types';

export default function BlockAction({ align, children }) {
  return <div className={`block-action-group ${align}`}>{children}</div>;
}

BlockAction.defaultProps = {
  align: 'align-center',
};

BlockAction.propTypes = {
  // Align action items, one of [align-center, align-left, align-right]
  align: PropTypes.oneOf(['align-center', 'align-left', 'align-right']) 
};

BlockAction.displayName = 'BlockAction';
