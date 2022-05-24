import MembersList from "./components/MembersList/MembersList";

import "./Members.scss";
import {useAuth} from "../../hook/useAuth";
import MembersManagement from "./components/MembersManagement/MembersManagement";

const Members = () => {

	const {isAuth, role} = useAuth();

	return (
		<div className={"members bg-light"}>
			{(isAuth && role==="user")
			?
				<MembersList/>
			:
				<MembersManagement/>}
		</div>
	);
};

export default Members;
