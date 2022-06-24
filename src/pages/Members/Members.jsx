import MembersList from "./components/MembersList/MembersList";
import MembersManagement from "./components/MembersManagement/MembersManagement";

import "./Members.scss";

const Members = () => {
  const role = localStorage.getItem("role");

  return (
    <div className={"members-general"}>
      {role === "user" ? <MembersList /> : <MembersManagement />}
    </div>
  );
};

export default Members;
