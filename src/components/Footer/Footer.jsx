import './Footer.scss';
import { NavLink } from 'react-router-dom';

const Footer = () => {
	return (
		<div className={'footer px-5 pb-1 pt-5'}>
			<div className={'container-xl'}>
				<div className={'footer-text '}>
					Copyright © 2022 Tabler. All rights reserved.
				</div>
				<NavLink
					className={'footer-link  pe-auto text-decoration-none'}
					to={'/documentation'}
				>
					Documentation
				</NavLink>
			</div>
		</div>
	);
};

export default Footer;
