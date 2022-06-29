import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
	return (
		<div className='page'>
			<div className='container'>
				<div className='empty'>
					<div className='empty__header'>404</div>
					<p className='empty__title'>Oops... You just found an error page</p>
					<p className='empty__subtitle'>
						We are sorry but the page you are looking for was not found
					</p>
					<div className='empty-btn'>
						<Link to='/' className='btn btn-primary'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='icon'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								strokeWidth='2'
								stroke='currentColor'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
								<line x1='5' y1='12' x2='19' y2='12'></line>
								<line x1='5' y1='12' x2='11' y2='18'></line>
								<line x1='5' y1='12' x2='11' y2='6'></line>
							</svg>
							Take me home
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default NotFound;
