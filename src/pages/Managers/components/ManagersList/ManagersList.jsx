import { useState } from "react";

import ManagerList from "../ManagerList/ManagerList";

import "./ManagersList.scss";

const managersArr = [
  {
    name: "Lolik",
    number: "23545363",
  },
  {
    name: "Bolik",
    number: "12343242",
  },
  {
    name: "Alcoholic",
    number: "4353234245",
  },
  {
    name: "Shokoladnyy",
    number: "234243123",
  },
  {
    name: "Zayats",
    number: "2342355",
  },
  {
    name: "Laskavyy",
    number: "4574364254",
  },
  {
    name: "Merzavets",
    number: "678674573",
  },
];

const ManagersList = () => {
  const [searchName, setSearchName] = useState("");

  const handleChange = (event) => {
    setSearchName(event.target.value);
  };

  const results = !searchName
    ? managersArr
    : managersArr.filter((manager) => manager.name.includes(searchName));
  return (
    <div className={"managers bg-light"}>
      <div className={"page-header"}>
        <div className={"container-xl"}>
          <h3 className={"page-name pt-2"}> Managers </h3>
        </div>
      </div>
      <div className={"page-search container-xl "}>
        <div>
          <span className={"text-muted"}> {results.length + " managers"} </span>
        </div>
        <div>
          <input
            className={"px-2 border rounded-1"}
            type={"text"}
            placeholder={"Search"}
            value={searchName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={"page-body pt-4"}>
        <div className={"container-xl"}>
          <div className={"managers-row row"}>
            {results.map((item) => (
              <ManagerList
                key={Math.random() * 10000000}
                name={item.name}
                number={item.number}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagersList;
