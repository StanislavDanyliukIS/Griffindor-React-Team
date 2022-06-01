import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from '@firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBILEjdX7WQ8UaWPqUaZoigXvOtQ_s1JC0',
	authDomain: 'gryffindor-app.firebaseapp.com',
	projectId: 'gryffindor-app',
	storageBucket: 'gryffindor-app.appspot.com',
	messagingSenderId: '79589530676',
	appId: '1:79589530676:web:debbb7771e4b4995ed7e61',
	measurementId: 'G-7W1YYB5LM2',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

const analytics = getAnalytics(app);
