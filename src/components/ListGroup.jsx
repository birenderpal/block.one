import React from "react";
import PropTypes from "prop-types";

export default function ListGroup({children}) {  
  return (
    <ul className="list-group">
      {children}
    </ul>
  );
}



ListGroup.displayName = "ListGroup";
