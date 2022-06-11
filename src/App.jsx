import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { setEventsData } from './store/eventsSlice';
import { db } from './firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Members from './pages/Members/Members';
import Managers from './pages/Managers/Managers';
import Events from './pages/Events/Events';
import Event from './pages/Event/Event';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Profile/Profile';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Login from './pages/Login/Login';
import RequiredAuth from './hoc/RequiredAuth';
import LoginAccess from './hoc/LoginAccess';
import EditUserData from './pages/EditUserData/EditUseerData';

const App = () => {
	const theme = useSelector(state => state.theme);
	const dispatch = useDispatch();

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		localStorage.setItem('theme', theme);
	}, [theme]);

	useEffect(() => {
		const q = query(collection(db, 'events'));
		onSnapshot(q, querySnapshot => {
			const eventsArray = [];

			querySnapshot.forEach(doc => {
				eventsArray.push({ ...doc.data(), id: doc.id });
			});
			dispatch(setEventsData(eventsArray));
		});
	}, []);
	return (
		<>
			<Routes>
				<Route
					path='login'
					element={
						<LoginAccess>
							<Login />
						</LoginAccess>
					}
				/>
				<Route path='forgot' element={<ForgotPassword />} />
				<Route
					path='/'
					element={
						<RequiredAuth>
							<Layout />
						</RequiredAuth>
					}
				>
					<Route index element={<Home />} />
					<Route path='profile' element={<Profile />} />
					<Route path='profile/edit-data' element={<EditUserData />} />
					<Route path='members' element={<Members />} />
					<Route path='managers' element={<Managers />} />
					<Route path='events' element={<Events />} />
					<Route path='events/:id' element={<Event />} />
				</Route>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
};

export default App;
