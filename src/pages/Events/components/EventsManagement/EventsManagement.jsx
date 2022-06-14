import { useSorting } from '../../../../hook/useSorting';
import { useEffect, useState } from 'react';

import { db } from '../../../../firebase';
import {
	collection,
	addDoc,
	query,
	onSnapshot,
	where,
} from 'firebase/firestore';

import { getClassNames } from '../../../../functions/getClassNames';

import './EventsManagement.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ModalEvent } from './components/ModalEvent/ModalEvent';

const EventsManagement = () => {
	const eventsData = useSelector(state => state.events.eventsData);
	const { items, requestSort, sorting } = useSorting(eventsData);

	const [initValue, setInitValue] = useState({
		date: '',
		name: '',
		score: 0,
		participants: [],
	});

	const [formData, setFormData] = useState(initValue);

	const handleClearForm = () => {
		setFormData(initValue);
	};
	const handleAddFormChange = e => {
		e.preventDefault();

		const fieldName = e.target.name;
		const fieldValue = e.target.value;

		const newFormData = { ...formData };
		newFormData[fieldName] = fieldValue;

		setFormData(newFormData);
	};
	const handleAddFormSubmit = async e => {
		e.preventDefault();
		if (JSON.stringify(initValue) !== JSON.stringify(formData)) {
			await addDoc(collection(db, 'events'), {
				date: formData.date,
				name: formData.name,
				participants: formData.participants,
				score: formData.score,
			});
		}

		setFormData(initValue);
	};

	useEffect(() => {
		const q = query(collection(db, 'users'), where('role', '==', 'user'));

		onSnapshot(q, querySnapshot => {
			const participantsArray = [];

			querySnapshot.forEach(doc => {
				participantsArray.push({
					id: doc.id,
					user: doc.data().name,
					attended: false,
					extrapoints: 0,
					comment: '',
				});
			});
			setInitValue(prev => ({ ...prev, participants: participantsArray }));
		});
	}, []);

	return (
		<main>
			<div className={'container-xl'}>
				<h3 className={'page-name pt-2'}> Events </h3>
			</div>
			<div className={'container-xl'}>
				<button
					type='button'
					className='btn btn-outline-secondary btn-table-create'
					data-toggle='modal'
					data-target='#ModalCreateEvent'
					onClick={() => {
						setFormData(initValue);
					}}
				>
					Create a new Event
				</button>
			</div>

			<ModalEvent
				handleClearForm={handleClearForm}
				handleAddFormChange={handleAddFormChange}
				handleAddFormSubmit={handleAddFormSubmit}
				formData={formData}
			/>

			<div className={'container-xl'}>
				<table className='table'>
					<thead>
						<tr>
							<th
								scope='col'
								onClick={() => requestSort('name')}
								className={`${getClassNames('name', sorting)}`}
							>
								Name
							</th>
							<th
								scope='col'
								onClick={() => requestSort('date')}
								className={`${getClassNames('date', sorting)}`}
							>
								Date
							</th>
							<th
								scope='col'
								onClick={() => requestSort('score')}
								className={`${getClassNames('score', sorting)}`}
							>
								Points for attending
							</th>
						</tr>
					</thead>
					<tbody className='events-list'>
						{items.map(item => (
							<tr key={Math.random() * 100000000}>
								<td>
									<Link to={`/events/${item.id}`}>{item.name}</Link>
								</td>
								<td>
									{item.date.substr(0, 10) + ' ' + item.date.substr(11, 8)}
								</td>
								<td>{item.score}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
};

export default EventsManagement;
