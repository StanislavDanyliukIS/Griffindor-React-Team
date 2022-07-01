import Scorers from './components/Scorers/Scorers';
import SoonEvents from './components/SoonEvents/SoonEvents';
import Carrousel from './components/Carrousel/Carrousel';

import './Home.scss';

const Home = () => {
	return (
		<div className={'home'}>
			<div className='container-xl heading-container'>
				<h3 className={'page-name pt-2'}>Home</h3>
			</div>
			<div className={'home__first_container page-body pt-4'}>
				<div className={'home__first_row'}>
					<Scorers />
				</div>
				<div className={'home__second_container container-xl pt-3'}>
					<div className={'home__second_row row w-100'}>
						<SoonEvents />
						<Carrousel />
					</div>
				</div>
			</div>
		</div>
	);
};
export default Home;
