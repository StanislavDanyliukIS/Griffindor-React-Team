import { Outlet } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';

const Layout = () => {
	return (
		<>
			<Header />
			<NavBar />
			<Outlet />
		</>
	);
};
export default Layout;
