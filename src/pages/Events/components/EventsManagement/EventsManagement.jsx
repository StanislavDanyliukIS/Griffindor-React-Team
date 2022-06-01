import { useSorting } from '../../../../hook/useSorting';

import { getClassNames } from '../../../../functions/getClassNames';

import './EventsManagement.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EventsManagement = () => {
	const eventsData = useSelector(state => state.events.eventsData);
	const { items, requestSort, sorting } = useSorting(eventsData);

	return (
		<main>
			<div className={'container-xl'}>
				<h3 className={'page-name pt-2'}> Events </h3>
			</div>

			<button
				type='button'
				className='btn btn-outline-secondary btn-table-create'
			>
				Create a new Event
			</button>

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
					<tbody>
						{items.map(item => (
							<tr key={Math.random() * 100000000}>
								<td>
									<Link to={`/events/${item.name}`}>{item.name}</Link>
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
