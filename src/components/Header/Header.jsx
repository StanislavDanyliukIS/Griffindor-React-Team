import {Link, NavLink} from 'react-router-dom';
import './Header.scss';

const Header = () => {
	return (
		<div className={'header'}>
			<div className={'container-xl'}>
				<Link className={'header__logo pe-0 pe-md-3'} to='/'>
					<h1>logo</h1>
				</Link>
				<div className={'header__user pe-0 pe-md-3'}>
					<div className={'header__theme pe-md-5'}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='25'
							height='25'
							fill='currentColor'
							className='bi bi-moon'
							viewBox='0 0 16 16'
						>
							<path d='M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z' />
						</svg>
					</div>
					<div className={"dropdown"}>
						<div className={'header__user  dropdown-toggle'} role="button"  data-bs-toggle="dropdown" >
							<ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
								<li><NavLink className="dropdown-item" to={"/profile"}>Profile</NavLink></li>
								<li><NavLink className="dropdown-item" to={"/login"}>Log out</NavLink></li>
							</ul>
							<div className={'header__user_img pe-md-1'}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='40'
									fill='currentColor'
									className='bi bi-person-circle'
									viewBox='0 0 16 16'
								>
									<path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
									<path
										fill-rule='evenodd'
										d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
									/>
								</svg>
							</div>
							<div className={'header__user_info d-xl-block ps-2'}>
								<div className={'header__user_name'}>Vasyl Pypkin</div>
								<div className={'header__user_role small text-muted'}>Admin</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
