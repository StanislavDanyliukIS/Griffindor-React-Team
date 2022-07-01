import './Pagination.scss';

const Pagination = ({
	firstContentIndex,
	lastContentIndex,
	page,
	totalPages,
	prevPage,
	setPage,
	nextPage,
}) => {
	return (
		<div className='container-xl d-flex align-items-center pag-blur'>
			<p className='text'>
				Showing {firstContentIndex + 1} to {lastContentIndex} of {page}/
				{totalPages} pages
			</p>
			<ul className={'pagination m-0 ms-auto'}>
				<li key={Math.random()}>
					<button
						onClick={prevPage}
						className='page-item btn btn-outline-secondary'
					>
						&larr;
					</button>
				</li>
				{[...Array(totalPages).keys()].map(el => (
					<li key={el}>
						<button
							onClick={() => setPage(el + 1)}
							className={`page-item btn btn-outline-${
								page === el + 1 ? 'primary' : 'secondary'
							}`}
						>
							{el + 1}
						</button>
					</li>
				))}
				<li key={Math.random()}>
					<button
						onClick={nextPage}
						className='page-item btn btn-outline-secondary'
					>
						&rarr;
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Pagination;
