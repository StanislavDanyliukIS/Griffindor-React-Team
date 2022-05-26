import ManagerList from "./components/ManagersList/ManagersList";
import ManagersManagement from "./components/ManagersManagement/ManagersManagement";

import {useAuth} from "../../hook/useAuth";

import "./Managers.scss";

const Managers = () => {

    const {isAuth, role} = useAuth();

    return (
        <div className={"managers bg-light"}>
            {(() => {
                if (isAuth && role === "admin") {
                    return <ManagersManagement/>
                } else if (isAuth && role === "manager") {
                    return <ManagerList/>
                }
            })()}
        </div>
    );
};

export default Managers;
