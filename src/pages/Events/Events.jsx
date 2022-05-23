import "./Events.scss";

const Events = () => {
  return (
    <div className="container">
      <main>
        <form className="events-manager-add">
          <input
            className="form-control"
            type="date"
            name="date"
            required="required"
            placeholder="Enter a date"
          />
          <input
            className="form-control"
            type="text"
            name="event"
            required="required"
            placeholder="Enter the event"
          />
          <input
            className="form-control"
            type="number"
            name="score"
            required="required"
            placeholder="Enter the score"
          />
        </form>
        <button
          type="button"
          className="btn btn-outline-secondary btn-table-create"
        >
          Create a new Event
        </button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Events</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">18.05.2022</th>
              <td>Adaptation hour</td>
              <td>100</td>
            </tr>
            <tr>
              <th scope="row">17.05.2022</th>
              <td>Communication in the Remote Era</td>
              <td>100</td>
            </tr>
            <tr>
              <th scope="row">16.05.2022</th>
              <td>Webinar - Structures and Methods</td>
              <td>100</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Events;
