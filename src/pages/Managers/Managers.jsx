import ManagersList from './components/ManagersList/ManagersList';
import ManagersManagement from './components/ManagersManagement/ManagersManagement';
import './Managers.scss';
import { useAuth } from '../../hook/useAuth';
import { useUserData } from '../../hook/useUserData';

const Managers = () => {
	const { isAuth } = useAuth();
	const { role } = useUserData();

	return (
		<div className={'managers'}>
			{(() => {
				if (isAuth && role === 'admin') {
					return <ManagersManagement />;
				} else if (isAuth && role === 'manager') {
					return <ManagersList />;
				}
			})()}
		</div>
	);
};

export default Managers;
