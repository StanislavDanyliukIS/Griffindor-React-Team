import { useEffect, useState } from 'react';

import {
	collection,
	limit,
	onSnapshot,
	query,
	where,
} from 'firebase/firestore';
import { db } from '../../../../firebase';

import Member from '../Member/Member';

import './MembersList.scss';

const Members = () => {
	const limited = 16;
	const [members, setMembers] = useState([]);
	const [searchField, setSearchField] = useState('');
	const [limitNumber, setLimitNumber] = useState(limited);

	useEffect(() => {
		let q;
		q = query(
			collection(db, 'users'),
			limit(limitNumber),

			where('role', '==', 'user')
		);

		const membersList = onSnapshot(q, querySnapshot => {
			let membersArray = [];

			querySnapshot.forEach(doc => {
				membersArray.push({ ...doc.data(), id: doc.id });
			});
			setMembers(membersArray);
		});
		return () => membersList();
	}, [limitNumber]);

	const handleChange = event => {
		setSearchField(event.target.value);
	};

	const results = !searchField
		? members
		: members.filter(
				member =>
					member.name.includes(searchField) ||
					member.organization.includes(searchField)
		  );

	return (
		<div className={'members'}>
			<div className={'page-header'}>
				<div className={'container-xl heading-container'}>
					<h3 className={'page-name pt-2'}> Members </h3>
				</div>
			</div>
			<div className={'page-search container-xl '}>
				<div>
					<span> {results.length + ' members'} </span>
				</div>
				<div className={'page-input'}>
					<input
						className={'px-2 border rounded-1'}
						type={'text'}
						placeholder={'Search'}
						value={searchField}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className={'page-body pt-4'}>
				<div className={'container-xl'}>
					<div className={'container-xl'}>
						{results.length !== 0 ? (
							<div className={'members-row row w-100'}>
								{results.map(item => (
									<Member
										key={item.id}
										name={item.name}
										number={item.telephone}
										organization={item.organization}
										userImageUrl={item.userImageUrl}
									/>
								))}
							</div>
						) : (
							<div className={'text-center  m-auto fs-1 pt-5'}>
								No one was found
							</div>
						)}
					</div>
				</div>
				<div className={'container-xl'}>
					<div className={'loadMore  m-auto'}>
						{(() => {
							if (results.length >= limitNumber) {
								return (
									<button
										type={'button'}
										className={'btn btn-primary mt-3'}
										onClick={() => {
											setLimitNumber(prevState => prevState + limited);
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
		</div>
	);
};

export default Members;
