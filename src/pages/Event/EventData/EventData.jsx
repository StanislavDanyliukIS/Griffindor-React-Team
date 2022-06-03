import { useState } from 'react';
import { getClassNames } from '../../../functions/getClassNames';
import { useSorting } from '../../../hook/useSorting';
import './EventData.scss';

const EventData = ({ event }) => {
	const { items, requestSort, sorting } = useSorting(event.participants);
	const [extrapoints, setExtrapoints] = useState(null);
	const [comment, setComments] = useState('');
	console.log(event);
	const handleEditPoints = () => {};
	const handleEditComment = () => {};
	return (
		<div className='container-xl'>
			<table className='table table-hover event-table'>
				<thead>
					<tr>
						<th
							scope='col'
							onClick={() => requestSort('name')}
							className={getClassNames('name', sorting)}
						>
							Users
						</th>
						<th
							scope='col'
							onClick={() => requestSort('score')}
							className={getClassNames('score', sorting)}
						>
							Extra points
						</th>
						<th
							scope='col'
							onClick={() => requestSort('comment')}
							className={getClassNames('comment', sorting)}
						>
							Comment
						</th>
						<th
							scope='col'
							onClick={() => requestSort('attended')}
							className={getClassNames('attended', sorting)}
						>
							Attended the event
						</th>
					</tr>
				</thead>
				<tbody>
					{items.map(item => (
						<tr key={Math.random() * 100000000}>
							<td>{item.user}</td>
							<td>
								<input
									className='form-control user-form'
									type='number'
									name='score'
									required='required'
									placeholder='Add extra points'
									onChange={handleEditPoints}
								/>
							</td>
							<td>
								<input
									className='form-control user-form'
									type='text'
									name='comment'
									placeholder='Type some comment'
									onChange={handleEditComment}
								/>
							</td>
							<td>
								<input
									className='form-check-input check'
									type='checkbox'
									id='flexCheckChecked'
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default EventData;
