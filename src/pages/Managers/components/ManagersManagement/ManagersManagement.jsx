import { useSorting } from '../../../../hook/useSorting';
import { useEffect, useState } from 'react';

import { getClassNames } from '../../../../functions/getClassNames';

import { Modal } from '../../../../components/Modal/Modal';
import { EditField } from '../../../../components/EditField/EditField';
import { ReadField } from '../../../../components/ReadField/ReadField';

import './ManagersManagement.scss';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../../firebase';

const ManagersManagement = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [managers, setManagers] = useState([]);

	useEffect(() => {
		let q = query(collection(db, 'users'), where('role', '==', 'manager'));

		const managersList = onSnapshot(q, querySnapshot => {
			let managersArray = [];

			querySnapshot.forEach(doc => {
				managersArray.push({ ...doc.data(), id: doc.id });
			});
			setManagers(managersArray);
		});
		return () => managersList();
	}, []);

	const { items, requestSort, sorting } = useSorting(managers);

	const [addUser, setAddUser] = useState('');
	const [editFormData, setEditFormData] = useState('');
	const [editUser, setEditUser] = useState(null);

	const handleEditFormChange = event => {
		event.preventDefault();

		const fieldName = event.target.getAttribute('name');
		const fieldValue = event.target.value;
		const newFormData = { ...editFormData };
		newFormData[fieldName] = fieldValue;
		setEditFormData(newFormData);
	};

	const handleCancelClick = () => {
		setEditUser(null);
	};

	const handleDeleteClick = itemId => {
		const newItems = [...items];
		const index = items.findIndex(item => item.id === itemId);
		newItems.splice(index, 1);
		setManagers(newItems);
	};

	const handleEditClick = (event, item) => {
		event.preventDefault();
		setEditUser(item.name);

		const formValues = {
			name: item.name,
			email: item.email,
			telephone: item.telephone,
			organization: item.organization,
			score: item.score,
			birthday: item.birthday,
		};
		setEditFormData(formValues);
	};

	return (
		<div className='container-xl managers-container'>
			<main>
				<h3 className='title-management'>Managers Management</h3>
				<button
					onClick={() => {
						setModalOpen(true);
					}}
					type='button'
					className='btn btn-primary btn-create-user'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='currentColor'
						className='bi bi-plus-square'
						viewBox='0 0 16 16'
					>
						<path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
						<path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
					</svg>
					<span className='btn-create-user-text'>Add a new user</span>
				</button>
				{modalOpen && <Modal setModalOpen={setModalOpen} />}

				<table className='table-secondary table  theme'>
					<thead>
						<tr>
							<th
								scope='col'
								onClick={() => requestSort('name')}
								className={`${getClassNames('name', sorting)} w-15 theme`}
							>
								Name
							</th>
							<th
								scope='col'
								onClick={() => requestSort('email')}
								className={`${getClassNames('email', sorting)} w-15 theme`}
							>
								Email
							</th>
							<th scope='col' className={"w-15 theme"}>Telephone</th>
							<th
								scope='col'
								onClick={() => requestSort('organization')}
								className={`${getClassNames('organization', sorting)} w-10 theme`}
							>
								Company
							</th>
							<th
								scope='col'
								onClick={() => requestSort('score')}
								className={`${getClassNames('score', sorting)} w-15 theme`}
							>
								Score
							</th>
							<th
								scope='col'
								onClick={() => requestSort('birthday')}
								className={`${getClassNames('birthday', sorting)} w-15 theme`}
							>
								Date of Birth
							</th>
							<th scope='col' className={"theme"}></th>
							<th scope='col' className={"theme"}></th>
						</tr>
					</thead>
					<tbody>
						{items.map(item => (
							<>
								{editUser === item.name ? (
									<EditField
										editFormData={editFormData}
										handleEditFormChange={handleEditFormChange}
										handleCancelClick={handleCancelClick}
									/>
								) : (
									<ReadField
										item={item}
										handleEditClick={handleEditClick}
										handleDeleteClick={handleDeleteClick}
									/>
								)}
							</>
						))}
					</tbody>
				</table>
			</main>
		</div>
	);
};

export default ManagersManagement;
