import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';
import { useUserData } from '../../hook/useUserData';
import { addUserData, clearUserData } from '../../store/slices/userDataSlice';
import { logOut, logIn } from '../../store/slices/authSlice';
import { logined, unlogined } from '../../store/slices/statusSlicer';

import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

import ThemeSwitch from './components/ThemeSwitch';

import './Header.scss';

import logo_white from './../../imgs/logo_white.png';
import logo_black from './../../imgs/logo_black.png';

const Header = () => {
	const navigate = useNavigate();

	const moveToProfile = () => navigate('profile');

	const dispatch = useDispatch();
	const location = useLocation();

	const { name } = useUserData();
	const role = localStorage.getItem('role');
	const theme = useSelector(state => state.theme);
	const { userImageUrl } = useUserData();

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				const uid = user.uid;
				dispatch(logined(!!uid));
				dispatch(logIn({ uid: user.uid }));
				const docRef = doc(db, `users`, uid);
				getDoc(docRef).then(resp => {
					dispatch(addUserData(resp.data()));
					navigate(location.pathname, { replace: true });
				});
			} else {
				dispatch(unlogined(false));
			}
		});
	}, []);

	const logout = () => {
		signOut(auth)
			.then(() => {
				dispatch(logOut());
				dispatch(clearUserData());
				localStorage.removeItem('role');
				localStorage.removeItem('isAuth');
			})
			.catch(error => {
				console.error(error);
			});
	};

	return (
		<>
			<div className={`header ${theme}`}>
				<div className={'container-xl'}>
					<Link className={'header__logo'} to='/'>
						<div className={'header__logo_item'}>
							{theme === 'light' ? (
								<img
									className={'header__logo_img'}
									src={logo_black}
									alt='logo-black'
								/>
							) : (
								<img
									className={'header__logo_img'}
									src={logo_white}
									alt='logo-white'
								/>
							)}
						</div>
					</Link>
					<div className={'header__user'}>
						<div className={'header__theme'}>
							<ThemeSwitch />
						</div>

						<div className={'dropdown'}>
							<div
								className={'header__user'}
								role='button'
								data-bs-toggle='dropdown'
							>
								<ul
									className='dropdown-menu'
									aria-labelledby='dropdownMenuLink'
								>
									<li>
										<NavLink
											className='dropdown-item'
											to={'/profile'}
											onClick={moveToProfile}
										>
											Profile
										</NavLink>
									</li>
									<li>
										<NavLink
											className='dropdown-item'
											to={'/login'}
											onClick={() => {
												logout();
											}}
										>
											Log out
										</NavLink>
									</li>
								</ul>
								<div className={'header__user_img pe-md-1'}>
									{userImageUrl ? (
										<img
											src={userImageUrl}
											alt='...'
											width='40'
											fill='currentColor'
											className='user-image'
											viewBox='0 0 16 16'
										/>
									) : (
										<img
											width='40'
											fill='currentColor'
											className='bi bi-person-circle'
											viewBox='0 0 16 16'
											src='https://bootdey.com/img/Content/avatar/avatar7.png'
											alt='...'
										/>
									)}
								</div>
								<div className={'header__user_info d-xl-block ps-2'}>
									<div className={'header__user_name'}>{name}</div>
									<div className={'header__user_role small '}>{role}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={`navbar ${theme}`}>
				<div className={'container-xl'}>
					<ul className={'navbar__nav'}>
						<li>
							<div className={'navbar__box'}>
								<NavLink className={'navbar__item '} to='/'>
									<span className={'navbar__img pe-md-2'}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='17px'
											height='17px'
											fill='currentColor'
											className='bi bi-house'
											viewBox='0 0 16 16'
										>
											<path
												fillRule='evenodd'
												d='M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z'
											/>
											<path
												fillRule='evenodd'
												d='M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z'
											/>
										</svg>
									</span>
									<span className={'navbar__page'}>Home</span>
								</NavLink>
							</div>
						</li>
						<li>
							<div className={'navbar__box'}>
								<NavLink className={'navbar__item '} to='/members'>
									<span className={'navbar__img pe-md-2'}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='17px'
											height='17px'
											fill='currentColor'
											className='bi bi-people'
											viewBox='0 0 16 16'
										>
											<path d='M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' />
										</svg>
									</span>
									<span className={'navbar__page'}>Members</span>
								</NavLink>
							</div>
						</li>
						{role !== 'user' && (
							<li>
								<div className={'navbar__box'}>
									<NavLink className={'navbar__item '} to='/managers'>
										<span className={'navbar__img pe-md-2'}>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='17px'
												height='17px'
												fill='currentColor'
												className='bi bi-person-workspace'
												viewBox='0 0 16 16'
											>
												<path d='M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' />
												<path d='M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z' />
											</svg>
										</span>
										<span className={'navbar__page'}>Managers</span>
									</NavLink>
								</div>
							</li>
						)}
						<li>
							<div className={'navbar__box'}>
								<NavLink className={'navbar__item '} to='/events'>
									<span className={'navbar__img pe-md-2'}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='17px'
											height='17px'
											fill='currentColor'
											className='bi bi-calendar-event'
											viewBox='0 0 16 16'
										>
											<path d='M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z' />
											<path d='M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z' />
										</svg>
									</span>
									<span className={'navbar__page '}>Events</span>
								</NavLink>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Header;
