import Alert from 'react-bootstrap/Alert';
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function MessageBox(props) {
  return (
    <Alert variant={props.variant || 'info'}>{props.children}</Alert>
  );
}

export default MessageBox
