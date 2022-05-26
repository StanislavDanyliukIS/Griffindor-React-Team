import ManagerList from "./components/ManagersList/ManagersList";
import ManagersManagement from "./components/ManagersManagement/ManagersManagement";


import "./Managers.scss";
import { useAuth } from "../../hook/useAuth";
import { useUserData } from "../../hook/useUserData";
import ManagersManagement from "./components/ManagersManagement/ManagersManagement";
import NotFound from "../NotFound/NotFound";


const Managers = () => {
  const { isAuth } = useAuth();
  const { role } = useUserData();

  return (
    <div className={"managers bg-light"}>
      {(() => {
        if (isAuth && role === "admin") {
          return <ManagersManagement />;
        } else if (isAuth && role === "manager") {
          return <ManagerList />;
        }
      })()}
    </div>
  );
};

export default Managers;
