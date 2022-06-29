import { useEffect, useState } from 'react';

import {
	collection,
	query,
	onSnapshot,
	limit,
	where,
} from 'firebase/firestore';
import { db } from '../../../../firebase';

import Manager from '../Manager/Manager';
import './ManagersList.scss';

const ManagersList = () => {
	const limited = 16;

	const [managers, setManagers] = useState([]);
	const [searchName, setSearchName] = useState('');
	const [limitNumber, setLimitNumber] = useState(limited);

	useEffect(() => {
		let q;
		q = query(
			collection(db, 'users'),
			limit(limitNumber),
			where('role', '==', 'manager')
		);

		const managersList = onSnapshot(q, querySnapshot => {
			let managersArray = [];

			querySnapshot.forEach(doc => {
				managersArray.push({ ...doc.data(), id: doc.id });
			});
			setManagers(managersArray);
		});
		return () => managersList();
	}, [limitNumber]);

	const handleChange = event => {
		setSearchName(event.target.value);
	};

	const results = !searchName
		? managers
		: managers.filter(manager => manager.name.includes(searchName));
	return (
		<div className={'managers'}>
			<div className={'page-header'}>
				<div className={'container-xl heading-container'}>
					<h3 className={'page-name pt-2'}> Managers </h3>
				</div>
			</div>
			<div className={'page-search container-xl '}>
				<div>
					<span className={'page-result'}>
						{' '}
						{results.length + ' managers'}{' '}
					</span>
				</div>
				<div className={"page-input"}>
					<input
						className={'px-2 border rounded-1'}
						type={'text'}
						placeholder={'Search'}
						value={searchName}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className={'page-body pt-4'}>
				<div className={'container-xl'}>
					{results.length !== 0 ? (
						<div className={'managers-row row w-100'}>
							{results.map(item => (
								<Manager
									key={item.id}
									name={item.name}
									number={item.phone}
									userImageUrl={item.userImageUrl}
								/>
							))}
						</div>
					) : (
						<div className={'text-center text-muted m-auto fs-1 pt-5'}>
							No one was found
						</div>
					)}
				</div>
			</div>
			<div className={'container-xl'}>
				<div className={'loadMore  m-auto'}>
					{(() => {
						if (results.length > limited) {
							return (
								<button
									type={'button'}
									className={'loadMore__btn btn '}
									onClick={() => {
										setLimitNumber(limitNumber + limited);
									}}
								>
									Show {limited} more
								</button>
							);
						}
					})()}
				</div>
			</div>
		</div>
	);
};

export default ManagersList;
