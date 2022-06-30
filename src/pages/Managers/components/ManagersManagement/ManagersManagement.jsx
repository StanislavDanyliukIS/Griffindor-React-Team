import { Fragment, useEffect, useState } from 'react';
import { useSorting } from '../../../../hook/useSorting';

import { useDispatch } from 'react-redux';
import { logOut } from '../../../../store/slices/authSlice';
import { clearUserData } from '../../../../store/slices/userDataSlice';

import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	onSnapshot,
	query,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';
import {
	createUserWithEmailAndPassword,
	getAuth,
	signOut,
} from 'firebase/auth';
import { db } from '../../../../firebase';

import { EditField } from '../../../../components/EditField/EditField';
import { ReadField } from '../../../../components/ReadField/ReadField';
import { ModalManager } from './components/ModalManager/ModalManager';
import { ConfirmDeleteModal } from '../../../../components/ConfirmDeleteModal/ConfirmDeleteModal';

import { getClassNames } from '../../../../functions/getClassNames';

import './ManagersManagement.scss';

const ManagersManagement = () => {
	const auth = getAuth();
	const password = '111111';

	const [managers, setManagers] = useState([]);
	const [deleteManager, setDeleteManager] = useState({});
	const [addFormData, setAddFormData] = useState('');
	const [editFormData, setEditFormData] = useState('');
	const [editUser, setEditUser] = useState(null);

	const dispatch = useDispatch();
	const indexedManagers = managers.map((el, idx) => {
		el.index = idx + 1;
		return el;
	});
	const { items, requestSort, sorting } = useSorting(indexedManagers);

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

	const handleAddFormChange = event => {
		event.preventDefault();

		const fieldName = event.target.getAttribute('name');
		const fieldValue = event.target.value;

		const newFormData = { ...addFormData };
		newFormData[fieldName] = fieldValue;

		setAddFormData(newFormData);
	};

	const handleAddFormSubmit = event => {
		event.preventDefault();
		createUserWithEmailAndPassword(auth, addFormData.email, password)
			.then(userCredential => {
				return {
					email: userCredential.user.email,
					id: userCredential.user.uid,
				};
			})
			.then(data => {
				return {
					id: data.id,
					email: data.email,
					name: addFormData.name,
					role: 'manager',
					birthday: addFormData.birthday,
					organization: addFormData.organization,
					telephone: addFormData.telephone,
					password: password,
					userImageUrl: null,
					photo: null,
				};
			})
			.then(user => {
				setDoc(doc(db, 'users', user.id), {
					email: user.email,
					name: user.name,
					role: user.role,
					birthday: user.birthday,
					organization: user.organization,
					telephone: user.telephone,
					password: password,
					userImageUrl: null,
					photo: null,
				});
			})
			.catch(error => {
				console.error(error);
			});

		signOut(auth).then(() => {
			dispatch(logOut());
			dispatch(clearUserData());
			localStorage.removeItem('isAuth');
			localStorage.removeItem('role');
		});
	};

	const handleEditFormChange = event => {
		event.preventDefault();

		const fieldName = event.target.getAttribute('name');
		const fieldValue = event.target.value;
		const newFormData = { ...editFormData };
		newFormData[fieldName] = fieldValue;
		setEditFormData(newFormData);
	};

	const handleEditFormSubmit = event => {
		event.preventDefault();
		const editedContact = {
			name: editFormData.name,
			email: editFormData.email,
			telephone: editFormData.telephone,
			organization: editFormData.organization,
			birthday: editFormData.birthday,
		};

		const item = items.filter(el => el.id === editFormData.id);
		const document = doc(db, 'users', item[0].id);
		getDoc(document).then(data => {
			updateDoc(doc(db, 'users', item[0].id), {
				name: editedContact.name,
				birthday: editedContact.birthday,
				organization: editedContact.organization,
				telephone: editedContact.telephone,
			});
		});
		setEditUser(null);
	};

	const handleCancelClick = () => {
		setEditUser(null);
	};

	const handleDeleteClick = itemId => {
		const user = items.filter(el => el.id === itemId);

		setDeleteManager(user[0]);
	};

	const handleDeleteSubmit = () => {
		const document = doc(db, 'users', deleteManager.id);
		getDoc(document).then(() => {
			deleteDoc(document);
		});
		setDeleteManager({});
	};

	const handleEditClick = (event, item) => {
		event.preventDefault();
		setEditUser(item.id);
		const formValues = {
			index: item.index,
			name: item.name,
			email: item.email,
			telephone: item.telephone,
			organization: item.organization,
			birthday: item.birthday,
			id: item.id,
		};
		setEditFormData(formValues);
	};

	return (
		<div className='managers-container'>
			<main>
				<div className={'container-xl heading-container'}>
					<h3 className='title-management pt-2'>Managers Management</h3>
				</div>
				<div className={'container-xl btn-container'}>
					<button
						type='button'
						className='btn btn-outline-secondary create-manager-btn btn-table-create'
						data-toggle='modal'
						data-target='#ModalCreateManager'
					>
						<span className='btn-create-user-text'>Add a new user</span>
					</button>
				</div>
				<ModalManager
					handleAddFormChange={handleAddFormChange}
					handleAddFormSubmit={handleAddFormSubmit}
					setAddFormData={setAddFormData}
				/>
				<ConfirmDeleteModal
					user={deleteManager.name}
					handleDeleteSubmit={handleDeleteSubmit}
				/>

				<div className={'container-xl manager-table'}>
					<table className='table'>
						<thead>
							<tr>
								<th
									scope='col'
									onClick={() => requestSort('index')}
									className={`${getClassNames('index', sorting)} w-10 pointer`}
								>
									№
								</th>
								<th
									scope='col'
									onClick={() => requestSort('name')}
									className={`${getClassNames('name', sorting)} w-15 pointer`}
								>
									Name
								</th>
								<th
									scope='col'
									onClick={() => requestSort('email')}
									className={`${getClassNames('email', sorting)} w-20 pointer`}
								>
									Email
								</th>
								<th scope='col' className={'w-15'}>
									Telephone
								</th>
								<th
									scope='col'
									onClick={() => requestSort('organization')}
									className={`${getClassNames(
										'organization',
										sorting
									)} w-10 pointer`}
								>
									Company
								</th>
								<th
									scope='col'
									onClick={() => requestSort('birthday')}
									className={`${getClassNames(
										'birthday',
										sorting
									)} w-15 pointer table-min-width`}
								>
									Date of Birth
								</th>
								<th scope='col'></th>
							</tr>
						</thead>
						<tbody>
							{items.map(item => (
								<Fragment key={item.id}>
									{editUser === item.id ? (
										<EditField
											key={item.id}
											item={item}
											editFormData={editFormData}
											handleEditFormChange={handleEditFormChange}
											handleEditFormSubmit={handleEditFormSubmit}
											handleCancelClick={handleCancelClick}
										/>
									) : (
										<ReadField
											key={item.id}
											item={item}
											handleEditClick={handleEditClick}
											handleDeleteClick={handleDeleteClick}
										/>
									)}
								</Fragment>
							))}
						</tbody>
					</table>
				</div>
			</main>
		</div>
	);
};

export default ManagersManagement;
