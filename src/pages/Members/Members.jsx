import MembersList from './components/MembersList/MembersList';

import './Members.scss';
import { useAuth } from '../../hook/useAuth';
import MembersManagement from './components/MembersManagement/MembersManagement';
import {useUserData} from "../../hook/useUserData";

const Members = () => {
	const { isAuth } = useAuth();
	const { role } = useUserData();
	return (
		<div className={'members '}>
			{isAuth && role === 'user' ? <MembersList /> : <MembersManagement />}
		</div>
	);
};

export default Members;
