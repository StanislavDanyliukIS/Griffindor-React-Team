import React from "react";

// import "./eventsUser.css";

export const EventsUser = () => {
  return (
    <div className="container">
      <main>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Data</th>
              <th scope="col">Events</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>18.05.2022</td>
              <td>Adaptation hour</td>
              <td>100</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>17.05.2022</td>
              <td>Communication in the Remote Era</td>
              <td>100</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>16.05.2022</td>
              <td>Webinar - Structures and Methods</td>
              <td>100</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};
