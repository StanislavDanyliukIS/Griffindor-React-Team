import { Link, NavLink, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/themeSlice';

import { useAuth } from '../../hook/useAuth';

import './Header.scss';

const Header = () => {
	const navigate = useNavigate();
	const moveToLogin = () => navigate('login', { replace: true });
	const moveToProfile = () => navigate('profile');
	const theme = useSelector(state => state.theme.theme);
	const dispatch = useDispatch();

	const { isAuth, name, role } = useAuth();

	const logout = () => {
		sessionStorage.clear();
	};

	return (
	<>
		<div className={'header'}>
			<div className={'container-xl'}>
				<Link className={'header__logo pe-0 pe-md-3'} to='/'>
					<h1>logo</h1>
				</Link>
				<div className={'header__user pe-0 pe-md-3'}>
					<div className={'header__theme pe-md-5'}>
						<span
							style={{cursor: 'pointer'}}
							onClick={() => dispatch(toggleTheme())}
						>
							{theme.isDark ? (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='25'
									height='25'
									fill='currentColor'
									className='bi bi-brightness-high'
									viewBox='0 0 16 16'
								>
									<path
										d='M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z'/>
								</svg>
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='25'
									height='25'
									fill='currentColor'
									className='bi bi-moon'
									viewBox='0 0 16 16'
								>
									<path
										d='M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z'/>
								</svg>
							)}
						</span>
					</div>
					{isAuth ? (
						<div className={'dropdown'}>
							<div
								className={'header__user  dropdown-toggle'}
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
												moveToLogin();
												logout();
											}}
										>
											Log out
										</NavLink>
									</li>
								</ul>
								<div className={'header__user_img pe-md-1'}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='40'
										fill='currentColor'
										className='bi bi-person-circle'
										viewBox='0 0 16 16'
									>
										<path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'/>
										<path
											fillRule='evenodd'
											d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
										/>
									</svg>
								</div>
								<div className={'header__user_info d-xl-block ps-2'}>
									<div className={'header__user_name'}>{name}</div>
									<div className={'header__user_role small text-muted'}>
										{role}
									</div>
								</div>
							</div>
						</div>
					) : (
						<button
							className='btn btn-primary d-sm-inline-block'
							onClick={moveToLogin}
						>
							Login
						</button>
					)}
				</div>
			</div>
		</div>
		<div className={'navbar'}>
			<div className={'container-xl'}>
				<ul className={'navbar__nav'}>
					<li>
						<Link className={'navbar__item pe-md-5'} to='/'>
								<span className={'navbar__img pe-md-2'}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='1.5vw'
										height='1.5vw'
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
						</Link>
					</li>
					<li>
						<Link className={'navbar__item pe-md-5'} to='/members'>
								<span className={'navbar__img pe-md-2'}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='1.5vw'
										height='1.5vw'
										fill='currentColor'
										className='bi bi-people'
										viewBox='0 0 16 16'
									>
										<path d='M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' />
									</svg>
								</span>
							<span className={'navbar__page'}>Members</span>
						</Link>
					</li>
					<li>
						{isAuth && role==="user"
						?
							""
						:
							<Link className={'navbar__item pe-md-5'} to='/managers'>
								<span className={'navbar__img pe-md-2'}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='1.5vw'
										height='1.5vw'
										fill='currentColor'
										className='bi bi-person-workspace'
										viewBox='0 0 16 16'
									>
										<path d='M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' />
										<path d='M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z' />
									</svg>
								</span>
								<span className={'navbar__page'}>Managers</span>
							</Link>}
					</li>
					<li>
						<Link className={'navbar__item pe-md-5'} to='/events'>
								<span className={'navbar__img pe-md-2'}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='1.5vw'
										height='1.5vw'
										fill='currentColor'
										className='bi bi-calendar-event'
										viewBox='0 0 16 16'
									>
										<path d='M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z' />
										<path d='M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z' />
									</svg>
								</span>
							<span className={'navbar__page pe-md-5'}>Events</span>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	</>
	);
};

export default Header;
