import * as React from 'react';

function Input(props: any) {
	return <input {...props} className={`shoppyInput ${props.className || ''}`} />;
}

export default Input;
