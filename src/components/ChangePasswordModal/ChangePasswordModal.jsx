import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { doc, updateDoc } from "firebase/firestore";
import { getAuth, updatePassword, signOut } from "firebase/auth";
import { db } from "../../firebase";

import { useUserData } from "../../hook/useUserData";
import { useAuth } from "../../hook/useAuth";

import { logOut } from "../../store/authSlice";
import { clearUserData } from "../../store/userDataSlice";

import "./ChangePasswordModal.scss";
import { useDispatch } from "react-redux";

const ChangePasswordModal = () => {

	const [passwordObj, setPasswordObj] = useState({
		currentPassword: '',
		newPassword_1: '',
		newPassword_2: '',
	});
	const [newPassword, setNewPassword] = useState('');
	const [worning, setWorning] = useState('text-hiden');
	const [passwordLength, setPasswordLength] = useState('text-hiden');
	const [passwordCheck, setPasswordCheck] = useState('text-hiden');

	const dispatch = useDispatch();

	const { password } = useUserData();
	const { uid } = useAuth();

	useEffect(() => createNewPassword(), [passwordObj]);

	const handleChange = e => {
		setPasswordObj({ ...passwordObj, [e.target.name]: e.target.value });
	};

	const navigate = useNavigate();

	const moveToprofile = () => {
		navigate(-1);
	};

	const createNewPassword = () => {
		passwordObj.newPassword_1 === passwordObj.newPassword_2 &&
		passwordObj.currentPassword === password
			? setNewPassword(passwordObj.newPassword_1)
			: setNewPassword(false);
	};

	const checkCurrentPassword = () => {
		setPasswordCheck(
			passwordObj.currentPassword === password ? 'text-hiden' : 'text-danger'
		);
	};

	const checkPasswordLength = () => {
		setPasswordLength(
			passwordObj.newPassword_1.length >= 6 ||
				passwordObj.newPassword_1.length === 0
				? 'text-hiden'
				: 'text-danger'
		);
	};

	const changePassword = () => {
		if (
			passwordObj.currentPassword !== password ||
			passwordObj.newPassword_1.length < 6 ||
			newPassword === false
		) {
			throw new Error('Incorrect password!');
		}

		const auth = getAuth();
		const user = auth.currentUser;

		updatePassword(user, newPassword)
			.then(() =>
				updateDoc(doc(db, 'users', uid), {
					password: newPassword,
				})
			)
			.then(() => {
				signOut(auth)
					.then(() => {
						dispatch(logOut());
						dispatch(clearUserData());
						localStorage.clear();
					})
					.catch(error => {
						console.error(error);
					});
			})
			.catch(error => {
				console.error(error);
			});
	};

	const passwordNotMatch = () => {
		setWorning(
			passwordObj.newPassword_1 === passwordObj.newPassword_2 ||
				passwordObj.newPassword_2.length === 0
				? 'text-hiden'
				: 'text-danger'
		);
	};

	return (
		<div className='changepassword-field card-body'>
			<form className='change-password-form'>
				<div className='password-input form-group mb-3 row current-password-input'>
					<label className='password-label form-label col-3 col-form-label'>
						Current Password
					</label>
					<div className='col'>
						<input
							type='password'
							name='currentPassword'
							className='form-control'
							placeholder='Password'
							value={passwordObj.currentPassword}
							autoComplete='on'
							onChange={handleChange}
						/>
						<small className='form-hint'>Enter your current password.</small>
						<span className={passwordCheck}>Incorrect curent password.</span>
					</div>
				</div>
				<div className='password-input  form-group mb-3 row'>
					<label className='password-label form-label col-3 col-form-label'>
						New Password
					</label>
					<div className='col'>
						<input
							type='password'
							className={`form-control`}
							placeholder='Password'
							name='newPassword_1'
							value={passwordObj.newPassword_1}
							onChange={handleChange}
							autoComplete='on'
							onBlur={checkPasswordLength}
						/>
						<small className='form-hint'>
							Enter your new password, your password must be 6-20 characters
							long.
						</small>
						<span className={passwordLength}>
							Password should contain at least 6 characters.
						</span>
					</div>
				</div>
				<div className='password-input form-group mb-3 row'>
					<label className='password-label form-label col-3 col-form-label'>
						New Password
					</label>
					<div className='col'>
						<input
							type='password'
							name='newPassword_2'
							className='form-control'
							placeholder='Password'
							value={passwordObj.newPassword_2}
							onChange={handleChange}
							autoComplete='on'
							onBlur={passwordNotMatch}
						/>
						<small className='form-hint'>Repeat your new password.</small>
						<span className={worning}>Password does not match.</span>
					</div>
				</div>

				<div className='form-footer'>
					<button
						type='submit'
						className='password-btn btn btn-primary'
						onClick={e => {
							e.preventDefault();
							checkCurrentPassword();
							changePassword();
							setPasswordObj({
								currentPassword: '',
								newPassword_1: '',
								newPassword_2: '',
							});
						}}
					>
						Submit
					</button>
					<button
						type='button'
						className='password-btn btn btn-outline-secondary'
						onClick={moveToprofile}
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default ChangePasswordModal;
