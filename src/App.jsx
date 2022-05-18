import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import { Events, Home, Managers, Members, NotFound } from './pages';

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />}></Route>
					<Route path='members' element={<Managers />}></Route>
					<Route path='managers' element={<Members />}></Route>
					<Route path='events' element={<Events />}></Route>
					<Route path='*' element={<NotFound />}></Route>
				</Route>
			</Routes>
		</>
	);
};

export default App;
