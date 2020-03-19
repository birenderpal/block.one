/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
import React from 'react';
import classnames from 'classnames';
import PropTypes, { arrayOf } from 'prop-types';

export default function ListItem(props) {
  const { clickable, inline, children, blockID, onClick } = props;

  const listClass = classnames('list-group-item', {
    'list-inline': inline,
    clickable,
  });

  return clickable ? (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      className={listClass}
      onClick={() => onClick(blockID)}
      data-testid="clickable-block"
    >
      {children}
    </li>
  ) : (
    <li className={listClass} data-testid="raw-block">
      {children}
    </li>
  );
}

ListItem.defaultProps = {
  clickable: false,
  inline: false,
};

ListItem.propTypes = {
  inline: PropTypes.bool,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    arrayOf(PropTypes.element),
  ]),
  blockID: PropTypes.number,
};

ListItem.displayName = 'ListItem';
