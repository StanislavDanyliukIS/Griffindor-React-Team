import { useParams } from 'react-router-dom';

import './Event.scss';

const Event = () => {
	const { title } = useParams();
	return (
		<div className='container'>
			<div className={'container-xl'}>
				<h3 className={'page-name pt-2'}> {`${title} event`} </h3>
			</div>
			<div className='container-xl'>
				<table className='table event-table'>
					<thead>
						<tr>
							<th scope='col'>Users</th>
							<th scope='col'>Extra points</th>
							<th scope='col'>Comment</th>
							<th scope='col'>Attended the event</th>
							<th scope='col'></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope='row'>John Doe</th>
							<td>100</td>
							<td>Great!</td>
							<td>
								<input
									className='form-check-input'
									type='checkbox'
									value=''
									id='flexCheckChecked'
								/>
							</td>
							<td>
								<button
									type='button'
									className='btn btn-outline-secondary btn-edit'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										fill='currentColor'
										className='bi bi-pencil-square'
										viewBox='0 0 16 16'
									>
										<path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
										<path
											fillRule='evenodd'
											d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
										/>
									</svg>
								</button>
							</td>
						</tr>
						<tr>
							<th scope='row'>John Doe</th>
							<td>100</td>
							<td>Great!</td>
							<td>
								<input
									className='form-check-input'
									type='checkbox'
									value=''
									id='flexCheckChecked'
								/>
							</td>
							<td>
								<button
									type='button'
									className='btn btn-outline-secondary btn-edit'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										fill='currentColor'
										className='bi bi-pencil-square'
										viewBox='0 0 16 16'
									>
										<path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
										<path
											fillRule='evenodd'
											d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
										/>
									</svg>
								</button>
							</td>
						</tr>
						<tr>
							<th scope='row'>John Doe</th>
							<td>100</td>
							<td>Great!</td>
							<td>
								<input
									className='form-check-input'
									type='checkbox'
									value=''
									id='flexCheckChecked'
								/>
							</td>
							<td>
								<button
									type='button'
									className='btn btn-outline-secondary btn-edit'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										fill='currentColor'
										className='bi bi-pencil-square'
										viewBox='0 0 16 16'
									>
										<path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
										<path
											fillRule='evenodd'
											d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
										/>
									</svg>
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Event;
