import { useMemo } from 'react';

import './Toast.scss';

export const Toast = ({ mode, onClose, message }) => {
	const classes = useMemo(() => ['cstoast', `${mode}`].join(' '), [mode]);

	return (
		<div onClick={onClose} className={classes}>
			<div className='message'>{message}</div>
		</div>
	);
};
