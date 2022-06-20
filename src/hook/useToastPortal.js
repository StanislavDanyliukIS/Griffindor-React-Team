import { useState, useEffect } from 'react';

export const useToastPortal = () => {
	const [loaded, setLoaded] = useState(false);
	const [portalId] = useState(`toast-portal-${new Date().getTime()}`);

	useEffect(() => {
		const div = document.createElement('div');
		div.id = portalId;
		div.style = 'position: fixed; top: 20px; right: 20px; z-index: 1050;';
		document.getElementsByTagName('body')[0].prepend(div);

		setLoaded(true);

		return () => document.getElementsByTagName('body')[0].removeChild(div);
	}, [portalId]);

	return { loaded, portalId };
};
