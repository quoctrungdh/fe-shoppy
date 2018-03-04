import React from 'react';

function Input(props) {
  return <input {...props} className={`shoppyInput ${props.className || ''}`} />;
}

export default Input;
