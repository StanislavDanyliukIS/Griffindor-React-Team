import "./Pagination.scss";

const Pagination = ({firstContentIndex, lastContentIndex, page, totalPages, prevPage, setPage, nextPage}) => {

    return (
        <div className="container-xl d-flex align-items-center">
            <p className="text">
                Showing {firstContentIndex + 1} to {lastContentIndex} of {page}/{totalPages} pages
            </p>
            <ul className={"pagination m-0 ms-auto"}>
                <li>
                    <button onClick={prevPage} className="page-item btn btn-outline-secondary">
                        &larr;
                    </button>
                </li>
                {[...Array(totalPages).keys()].map((el) => (
                    <li>
                        <button
                            onClick={() => setPage(el + 1)}
                            key={el}
                            className={`page-item btn btn-outline-${page === el + 1 ? "primary" : "secondary"}`}
                        >
                            {el + 1}
                        </button>
                    </li>
                ))}
                <li>
                    <button onClick={nextPage} className="page-item btn btn-outline-secondary">
                        &rarr;
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Pagination;