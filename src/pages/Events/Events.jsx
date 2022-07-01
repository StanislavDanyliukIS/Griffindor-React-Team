import { useAuth } from '../../hook/useAuth';
import { useUserData } from '../../hook/useUserData';

import EventsUser from './components/EventsUser/EventsUser';
import EventsManagement from './components/EventsManagement/EventsManagement';

import './Events.scss';

const Events = () => {
	const { isAuth } = useAuth();
	const { role } = useUserData();

	return (
		<div className='events'>
			{isAuth && role === 'user' ? <EventsUser /> : <EventsManagement />}
		</div>
	);
};

export default Events;
