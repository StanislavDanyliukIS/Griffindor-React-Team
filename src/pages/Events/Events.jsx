import { useSorting } from "../../hook/useSorting";

import { getClassNames } from "../../functions/getClassNames";

import { events } from "../../constants/events";

import "./Events.scss";
import {useEffect, useState} from "react";

const Events = () => {
  const { items, requestSort, sorting } = useSorting(events);

  return (
    <div className="container">
      <main>
        {/* <form className='events-manager-add'>
					<input
						className='form-control'
						type='date'
						name='date'
						required='required'
						placeholder='Enter a date'
					/>
					<input
						className='form-control'
						type='text'
						name='event'
						required='required'
						placeholder='Enter the event'
					/>
					<input
						className='form-control'
						type='number'
						name='score'
						required='required'
						placeholder='Enter the score'
					/>
				</form> */}
        <button
          type="button"
          className="btn btn-outline-secondary btn-table-create"
        >
          Create a new Event
        </button>
        <table className="table">
          <thead>
            <tr>
              <th
                scope="col"
                onClick={() => requestSort("date")}
                className={getClassNames("date", sorting)}
              >
                Date
              </th>
              <th
                scope="col"
                onClick={() => requestSort("name")}
                className={getClassNames("name", sorting)}
              >
                Events
              </th>
              <th
                scope="col"
                onClick={() => requestSort("score")}
                className={getClassNames("score", sorting)}
              >
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={Math.random() * 100000000}>
                <th scope="row">
                  {item.date.substr(0, 10) + " " + item.date.substr(11, 8)}
                </th>
                <td>{item.name}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Events;
