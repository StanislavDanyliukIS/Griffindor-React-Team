import Member from "./components/Member/Member";

import {useState} from "react";

import "./Members.scss";
import Manager from "../Managers/components/Manager/Manager";

const membersArr =  [
	{
		name:"Lolik",
		organization:"EPAM",
		number:"23545363"
	},
	{
		name:"Bolik",
		organization:"InventorSoft",
		number: "12343242"
	},
	{
		name:"Alcoholic",
		organization:"ASD",
		number: "4353234245"
	},
	{
		name: "Shokoladnyy",
		organization:"SoftServe",
		number: "234243123"
	},
	{
		name: "Zayats",
		organization:"SharpMinds",
		number: "2342355"
	},
	{
		name: "Laskavyy",
		organization:"Bizico",
		number: "4574364254"
	},
	{
		name: "Merzavets",
		organization:"eLogic",
		number: "678674573"
	}
]

const Members = () => {

	const [searchField, setSearchField] = useState("");

	const handleChange = (event) => {
		setSearchField(event.target.value);
	}

	const results = !searchField
		? membersArr
		: membersArr.filter(member =>
			member.name.includes(searchField) || member.organization.includes(searchField)
		);

	return (
		<div className={"members bg-light"}>
			<div className={"page-header"}>
				<div className={"container-xl"}>
					<h3 className={"page-name pt-2"}> Members </h3>
				</div>
			</div>
			<div className={"page-search container-xl "}>
				<div>
					<span className={"text-muted"}> {results.length + " members"} </span>
				</div>
				<div>
					<input
						className={"px-2 border rounded-1"}
						type={"text"}
						placeholder={"Search"}
						value={searchField}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className={"page-body pt-4"}>
				<div className={"container-xl"}>
					<div className={"members-row row"}>
						{results.map(item =>(
							<Member key={Math.random()*10000000} name={item.name} number={item.number} organization={item.organization}/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Members;
