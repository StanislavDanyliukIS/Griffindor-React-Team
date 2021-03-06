import { useEffect, useRef, useState } from 'react';

import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../../firebase';

import CarrouselItem from '../CarrouselItem/CarrouselItem';

import './Carrousel.scss';

import HOT_EVENT from '../../../../imgs/highScore.png';
import TOP_EVENT from '../../../../imgs/topEvent.png';
import BOBR from '../../../../imgs/bobr.png';

const Carrousel = () => {
	const [events, setEvents] = useState([]);
	const [offset, setOffset] = useState(0);
	const carrouselParent = useRef(0);
	const timeoutRef = useRef();
	const delay = 5000;

	useEffect(() => {
		timeoutRef.current = setTimeout(() => handleRightClick(), delay);
		return () => {
			resetTimeoutRef();
		};
	}, [offset]);

	useEffect(() => {
		let q;
		q = query(collection(db, 'events'));

		onSnapshot(q, querySnapshot => {
			let eventArray = [];

			querySnapshot.forEach(doc => {
				eventArray.push({ ...doc.data(), id: doc.id });
			});

			setEvents(eventArray);
		});
	}, []);

	const sortEventsScore = events.sort((a, b) => {
		if (Number(a.score) < Number(b.score)) {
			return 1;
		}
		if (Number(a.score) > Number(b.score)) {
			return -1;
		}
		return 0;
	});

	const hotEvent = sortEventsScore
		.filter(el => new Date(el.date) > Date.now())
		.slice(0, 1);

	const attendedEvent = events.map(el => {
		const attended = el.participants.filter(el => el.attended === true);
		el.countAttended = attended.length;
		return el;
	});

	const sortEventsAttanded = attendedEvent.sort((a, b) => {
		if (Number(a.countAttended) < Number(b.countAttended)) {
			return 1;
		}
		if (Number(a.countAttended) > Number(b.countAttended)) {
			return -1;
		}
		return 0;
	});

	const topEvent = sortEventsAttanded.slice(0, 1);

	const resetTimeoutRef = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	};

	const widthCarrousel = () => {
		if (!!carrouselParent.current.children[0].clientWidth) {
			return carrouselParent.current.children[0].clientWidth;
		} else {
			return widthCarrousel();
		}
	};

	const handleLeftClick = () => {
		const children = carrouselParent.current.childElementCount;
		const res = offset + widthCarrousel();
		if (res > 0) {
			setOffset(-1 * ((children - 1) * widthCarrousel()));
		} else {
			setOffset(res);
		}
	};

	const handleRightClick = () => {
		const children = carrouselParent.current.childElementCount;
		const res = offset - widthCarrousel();
		if (res <= -1 * (children * widthCarrousel())) {
			setOffset(0);
		} else {
			setOffset(res);
		}
	};

	return (
		<div className={'carrousel col '}>
			<h4 className={'carrousel-title'}>News</h4>
			<div className={'carrousel_box w-100 d-flex '}>
				<div className={'left-arrow'} onClick={handleLeftClick}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='currentColor'
						className='bi bi-caret-left-fill '
						viewBox='0 0 16 16'
					>
						<path d='m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z' />
					</svg>
				</div>
				<div
					className={
						'carrousel-container d-flex justify-content-start align-items-center'
					}
				>
					{events.length !== 0 && (
						<div
							className={'d-flex'}
							ref={carrouselParent}
							style={{
								transform: `translateX(${offset}px)`,
								transition: 'translate',
								transitionProperty: 'transform',
								transitionDuration: '0.5s',
							}}
						>
							<CarrouselItem
								key={Math.random() * 999999999}
								title={`HOT event - ${hotEvent[0].name}`}
								subtitle={`For this event you can get ${hotEvent[0].score}`}
								img={HOT_EVENT}
								color={'#F3262D'}
								textPaddingTop={15}
							/>

							<CarrouselItem
								key={Math.random() * 999999999}
								title={`The best event - ${topEvent[0].name}`}
								subtitle={`This event was attended by the most people - ${topEvent[0].countAttended}`}
								img={TOP_EVENT}
								color={'#E6E7E9'}
								textPaddingTop={21}
							/>

							<CarrouselItem
								key={Math.random() * 999999999}
								title={''}
								subtitle={''}
								img={BOBR}
								color={''}
								textPaddingTop={0}
							/>
						</div>
					)}
				</div>
				<div className={'right-arrow'} onClick={handleRightClick}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='currentColor'
						className='bi bi-caret-right-fill'
						viewBox='0 0 16 16'
					>
						<path d='m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z' />
					</svg>
				</div>
				<div className={'dots'}></div>
			</div>
		</div>
	);
};

export default Carrousel;
