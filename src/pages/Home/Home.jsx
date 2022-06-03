import './Home.scss';
import Scorers from "./components/Scorers/Scorers";
import SoonEvents from "./components/SoonEvents/SoonEvents";
import Rating from "./components/Rating/Rating";

const Home = () => {
	return (
		<div className={"home"}>
			<div className='container-xl'>
				<h3 className={'page-name pt-2'}>Home</h3>
			</div>
			<div className={"page-body pt-4"}>
				<Scorers/>
				<div className={"container-xl pt-3"}>
					<div className={"row w-100"}>
						<SoonEvents/>
						<Rating/>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Home;
