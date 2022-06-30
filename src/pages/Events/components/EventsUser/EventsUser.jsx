import { useSelector } from 'react-redux';
import usePagination from "../../../../hook/usePagination";
import { useSorting } from '../../../../hook/useSorting';

import { getClassNames } from '../../../../functions/getClassNames';

import Pagination from "../../../../components/Pagination/Pagination";

import './EventsUser.scss';

const EventsUser = () => {
	const eventsData = useSelector(state => state.events.eventsData);
	const { items, requestSort, sorting } = useSorting(eventsData);
	const {
		firstContentIndex,
		lastContentIndex,
		nextPage,
		prevPage,
		page,
		setPage,
		totalPages,
	} = usePagination({
		contentPerPage: 8,
		count: items.length,
	});
	return (
		<main>
			<div className={'container-xl heading-container'}>
				<h3 className={'page-name pt-2'}> Events </h3>
			</div>

			<div className={'container-xl'}>
				<table className='table'>
					<thead>
						<tr>
							<th
								scope='col'
								onClick={() => requestSort('name')}
								className={`${getClassNames('name', sorting)} w-30 pointer`}
							>
								Name
							</th>
							<th
								scope='col'
								onClick={() => requestSort('date')}
								className={`${getClassNames('date', sorting)} w-30 pointer`}
							>
								Date
							</th>
							<th
								scope='col'
								onClick={() => requestSort('score')}
								className={`${getClassNames('score', sorting)} w-30 pointer`}
							>
								Score
							</th>
						</tr>
					</thead>
					<tbody>
						{items.slice(firstContentIndex, lastContentIndex).map(item => (
							<tr key={item.id}>
								<td className='name-column'>{item.name}</td>
								<td>
									{item.date.substr(0, 10) + ' ' + item.date.substr(11, 8)}
								</td>
								<td>{item.score}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Pagination
				firstContentIndex={firstContentIndex}
				lastContentIndex={lastContentIndex}
				page={page}
				totalPages={totalPages}
				prevPage={prevPage}
				setPage={setPage}
				nextPage={nextPage}
			/>
		</main>
	);
};

export default EventsUser;
