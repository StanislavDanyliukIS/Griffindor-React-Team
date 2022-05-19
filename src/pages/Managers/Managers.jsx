import "./Managers.scss";
import Manager from "./components/Manager/Manager";

const Managers = () => {
    return (
        <div className={"managers bg-light"}>
            <div className={"page-header"}>
                <div className={"container-xl"}>
                    <h3 className={"page-name pt-2"}> Managers </h3>
                </div>
            </div>
            <div className={"page-body pt-4"}>
                <div className={"container-xl"}>
                    <div className={"managers-row row"}>
                        <Manager/>
                        <Manager/>
                        <Manager/>
                        <Manager/>
                        <Manager/>
                        <Manager/>
                        <Manager/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Managers;
