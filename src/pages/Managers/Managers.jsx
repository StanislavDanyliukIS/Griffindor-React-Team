import {useAuth} from '../../hook/useAuth';
import {useUserData} from '../../hook/useUserData';

import ManagersList from './components/ManagersList/ManagersList';
import ManagersManagement from './components/ManagersManagement/ManagersManagement';

import './Managers.scss';

const Managers = () => {
    const {isAuth} = useAuth();
    const {role} = useUserData();

    return (
        <div className={'managers-general'}>
            {(() => {
                if (isAuth && role === 'admin') {
                    return <ManagersManagement/>;
                } else if (isAuth && role === 'manager') {
                    return <ManagersList/>;
                }
            })()}
        </div>
    );
};

export default Managers;
