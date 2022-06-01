
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
import LoginAccess from "./hoc/LoginAccess";


export const users = [
  {
    name: "Adam",
    role: "admin",
    email: "admin@gmail.com",
    number: "1234567890",
    password: "111111",
    organization: "eLogic",
    birthday: "1995-12-17T03:24:00",
    score: 0,
  },
  {
    name: "Yeva",
    role: "manager",
    email: "sdfsdg@gmail.com",
    number: "1234567890",
    password: "111111",
    organization: "SoftServe",
    birthday: "2001-12-17T03:24:00",
    score: 30,
  },
  {
    name: "Tanya",
    role: "manager",
    email: "fsdfae@gmail.com",
    number: "1234567890",
    password: "111111",
    organization: "InventorSoft",
    birthday: "2020-12-17T03:24:00",
    score: 20,
  },
  {
    name: "Matroskin",
    role: "manager",
    email: "manager@gmail.com",
    number: "1234567890",
    password: "111111",
    organization: "ASD",
    birthday: "2006-12-17T03:24:00",
    score: 50,
  },
  {
    name: "Leopold",
    role: "user",
    email: "user@gmail.com",
    number: "1234567890",
    password: "111111",
    organization: "SharpMinds",
    birthday: "1976-12-17T03:24:00",
    score: 40,
  },
  {
    name: "Tiger",
    role: "user",
    email: "sdfsx@gmail.com",
    number: "1234567890",
    password: "111111",
    organization: "EPAM",
    birthday: "1986-12-17T03:24:00",
    score: 24,
  },
  {
    name: "Tom",
    role: "user",
    email: "sdffx@gmail.com",
    number: "1234567890",
    password: "111111",
    organization: "Pub24",
    birthday: "1998-12-17T03:24:00",
    score: 31,
  },
];

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
          path="login"
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
					<Route path='members' element={<Members />} />
					<Route path='managers' element={<Managers />} />
					<Route path='events' element={<Events />} />
					<Route path='events/:title' element={<Event />} />
				</Route>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
};

export default App;
