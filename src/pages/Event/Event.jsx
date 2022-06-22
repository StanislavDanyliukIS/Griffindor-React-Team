import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './Event.scss';
import EventData from './EventData/EventData';

const Event = () => {
	const { id } = useParams();
	const [event, setEvent] = useState({
		date: '',
		name: '',
		score: '',
		participants: [],
	});
	const eventsData = useSelector(state => state.events.eventsData);

	useEffect(() => {
		const findEvent = eventsData.find(items => items.id === id);
		setEvent(findEvent);
	});

	return event ? (
		<div className='event'>
			<div className={'container-xl'}>
				<h3 className={'page-name pt-2'}> {`${event.name} event`} </h3>
			</div>
			<EventData event={event} />
		</div>
	) : (
		<></>
	);
};

export default Event;
