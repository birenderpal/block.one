import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
export default function ListItem(props) {
  const { clickable, inline, children, blockID, onClick } = props;

  const listClass = classnames('list-group-item', {
    'list-inline': inline,
    clickable: clickable,
  });

  return clickable ? (
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

ListItem.propTypes = {
  inline: PropTypes.bool,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
};

ListItem.displayName = 'ListItem';
