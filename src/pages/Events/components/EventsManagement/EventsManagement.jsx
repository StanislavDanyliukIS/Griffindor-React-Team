import { useSorting } from '../../../../hook/useSorting';
import { useState } from 'react';

import { db } from '../../../../firebase';
import { collection, addDoc } from 'firebase/firestore';

import { getClassNames } from '../../../../functions/getClassNames';

import './EventsManagement.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ModalEvent } from './components/ModalEvent/ModalEvent';

const EventsManagement = () => {
	const eventsData = useSelector(state => state.events.eventsData);
	const { items, requestSort, sorting } = useSorting(eventsData);

	const initValueForNewEvent = {
		date: '',
		name: '',
		points: '',
		participants: [],
	};
	const [modalOpen, setModalOpen] = useState(false);
	const [formData, setFormData] = useState(initValueForNewEvent);

	const handleAddFormChange = e => {
		e.preventDefault();

		const fieldName = e.target.getAttribute('name');
		const fieldValue = e.target.value;

		const newFormData = { ...formData };
		newFormData[fieldName] = fieldValue;

		setFormData(newFormData);
	};
	const handleAddFormSubmit = async e => {
		e.preventDefault();
		if (JSON.stringify(initValueForNewEvent) !== JSON.stringify(formData)) {
			await addDoc(collection(db, 'events'), {
				date: formData.date,
				name: formData.name,
				participants: formData.participants,
				score: formData.points,
			});
		}
		setModalOpen(false);
		setFormData(initValueForNewEvent);
	};
	return (
		<main>
			<div className={'container-xl'}>
				<h3 className={'page-name pt-2'}> Events </h3>
			</div>
			<button
				type='button'
				className='btn btn-outline-secondary btn-table-create'
				onClick={() => {
					setModalOpen(true);
				}}
			>
				Create a new Event
			</button>
			{modalOpen && (
				<ModalEvent
					setModalOpen={setModalOpen}
					setFormData={setFormData}
					handleAddFormChange={handleAddFormChange}
					handleAddFormSubmit={handleAddFormSubmit}
					initValueForNewEvent={initValueForNewEvent}
				/>
			)}
			<div className={'container-xl'}>
				<table className='table table-hover'>
					<thead>
						<tr>
							<th
								scope='col'
								onClick={() => requestSort('name')}
								className={getClassNames('name', sorting)}
							>
								Name
							</th>
							<th
								scope='col'
								onClick={() => requestSort('date')}
								className={getClassNames('date', sorting)}
							>
								Date
							</th>
							<th
								scope='col'
								onClick={() => requestSort('score')}
								className={getClassNames('score', sorting)}
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
