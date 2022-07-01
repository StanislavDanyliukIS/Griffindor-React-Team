import { useEffect, useState } from 'react';

import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../../firebase';

import SoonEvent from '../SoonEvent/SoonEvent';

import './SoonEvents.scss';

const SoonEvents = () => {
	const [dateArr, setDateArr] = useState([]);

	useEffect(() => {
		let q;
		q = query(collection(db, 'events'));

		onSnapshot(q, querySnapshot => {
			let dateArray = [];

			querySnapshot.forEach(doc => {
				dateArray.push({ ...doc.data(), id: doc.id });
			});

			setDateArr(dateArray);
		});
	}, []);

	const sortDate = dateArr.sort((a, b) => {
		if (new Date(a.date) < new Date(b.date)) {
			return -1;
		}
		if (new Date(a.date) > new Date(b.date)) {
			return 1;
		}
		return 0;
	});

	const filteredDate = sortDate
		.filter(el => new Date(el.date) > Date.now())
		.slice(0, 6);

	return (
		<div className={'soon_events col px-0'}>
			<h4 className={'soon_events-title'}>Soon Events</h4>
			<div className={'soon_events-container row  rounded'}>
				{filteredDate.map((el, idx) => (
					<SoonEvent
						name={el.name}
						date={el.date}
						number={idx + 1}
						key={Math.random() * 999999}
					/>
				))}
			</div>
		</div>
	);
};

export default SoonEvents;
