import Member from "./components/Member/Member";

import "./Members.scss";

const Members = () => {
	return (
		<div className={"managers bg-light"}>
			<div className={"page-header"}>
				<div className={"container-xl"}>
					<h3 className={"page-name pt-2"}> Members </h3>
				</div>
			</div>
			<div className={"page-body pt-4"}>
				<div className={"container-xl"}>
					<div className={"managers-row row"}>
						<Member/>
						<Member/>
						<Member/>
						<Member/>
						<Member/>
						<Member/>
						<Member/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Members;
