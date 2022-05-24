import ManagerList from "./components/ManagersList/ManagersList";

import "./Managers.scss";
import {useAuth} from "../../hook/useAuth";
import ManagersManagement from "./components/ManagersManagement/ManagersManagement";
import NotFound from "../NotFound/NotFound";

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
