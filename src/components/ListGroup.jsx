import React from 'react';
import PropTypes, { arrayOf } from 'prop-types';

export default function ListGroup({ children }) {
  return <ul className="list-group">{children}</ul>;
}

ListGroup.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.oneOfType([
    PropTypes.element,
    arrayOf(PropTypes.element),
  ]),
};

ListGroup.displayName = 'ListGroup';
