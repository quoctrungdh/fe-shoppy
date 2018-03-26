import * as React from 'react';

function Button(props: any) {
	const { children, ...rest } = props;
	return (
		<button {...rest} className={`shoppyButton ${props.className || ''}`}>
			{children}
		</button>
	);
}

export default Button;
