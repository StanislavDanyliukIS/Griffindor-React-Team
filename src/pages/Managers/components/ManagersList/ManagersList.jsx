import { useState } from 'react';

import Manager from '../Manager/Manager';

import './ManagersList.scss';

const managersArr = [
	{
		name: 'Lolik',
		number: '23545363',
	},
	{
		name: 'Bolik',
		number: '12343242',
	},
	{
		name: 'Alcoholic',
		number: '4353234245',
	},
	{
		name: 'Shokoladnyy',
		number: '234243123',
	},
	{
		name: 'Zayats',
		number: '2342355',
	},
	{
		name: 'Laskavyy',
		number: '4574364254',
	},
	{
		name: 'Merzavets',
		number: '678674573',
	},
];

const ManagersList = () => {
	const [searchName, setSearchName] = useState('');

	const handleChange = event => {
		setSearchName(event.target.value);
	};

	const results = !searchName
		? managersArr
		: managersArr.filter(manager => manager.name.includes(searchName));

	return (
		<div className={'managers'}>
			<div className={'page-header'}>
				<div className={'container-xl'}>
					<h3 className={'page-name pt-2'}> Managers </h3>
				</div>
			</div>
			<div className={'page-search container-xl '}>
				<div>
					<span className={"page-result"}> {results.length + ' managers'} </span>
				</div>
				<div>
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
					{results.length!==0
					?
						<div className={'managers-row row w-100'}>
							{results.map(item => (
								<Manager
									key={Math.random() * 10000000}
									name={item.name}
									number={item.number}
								/>
							))}
						</div>
					:
						<div className={"text-center text-muted m-auto fs-1 pt-5"}>
							No one was found
						</div>}
				</div>
			</div>
		</div>
	);
};

export default ManagersList;
