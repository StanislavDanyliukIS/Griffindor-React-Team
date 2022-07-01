import { Navigate } from 'react-router-dom';

import { useAuth } from '../hook/useAuth';

const RequiredAuth = ({ children }) => {
	const { isAuth } = useAuth();

	if (!isAuth) {
		return <Navigate to='/login' />;
	}
	return children;
};
export default RequiredAuth;
