import ReactDOM from 'react-dom';
import { Toast } from '../Toast/Toast';
import { useToastPortal } from '../../hook/useToastPortal';
import { useToastAutoClose } from '../../hook/useToastAutoClose';
import { useState, forwardRef, useImperativeHandle } from 'react';

import './ToastPortal.scss';

export const ToastPortal = forwardRef(
	({ autoClose = true, autoCloseTime = 5000 }, ref) => {
		const [toasts, setToasts] = useState([]);
		const { loaded, portalId } = useToastPortal();

		useToastAutoClose({
			toasts,
			setToasts,
			autoClose,
			autoCloseTime,
		});

		const removeToast = id => {
			setToasts(toasts.filter(t => t.id !== id));
		};

		useImperativeHandle(ref, () => ({
			addMessage(toast) {
				setToasts([...toasts, { ...toast, id: new Date().getTime() }]);
			},
		}));

		return loaded ? (
			ReactDOM.createPortal(
				<div className='toastContainer'>
					{toasts.map(t => (
						<Toast
							key={t.id}
							mode={t.mode}
							message={t.message}
							onClose={() => removeToast(t.id)}
						/>
					))}
				</div>,
				document.getElementById(portalId)
			)
		) : (
			<></>
		);
	}
);
