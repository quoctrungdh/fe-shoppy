import React from 'react';

function Button(props) {
  const { children, ...rest } = props;
  return (
    <button {...rest} className={`shoppyButton ${props.className || ''}`}>
      {children}
    </button>
  );
}

export default Button;
