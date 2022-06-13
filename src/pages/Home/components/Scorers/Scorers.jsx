import {useEffect, useState} from "react";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../../../../firebase";

import "./Scorers.scss";
import gold from "../../../../imgs/gold.png";
import silver from "../../../../imgs/silver.png";
import bronze from "../../../../imgs/bronze.png";

const Scorers = () => {

    const [scorers, setScorers] = useState([]);
    const sortScore = scorers.sort((a,b)=> Number(b.score)-Number(a.score));

    useEffect(() => {
        let q;
        q = query(
            collection(db, "users"),
            where("role", "==", "user")
            );

        const scorersList = onSnapshot(q, (querySnapshot) => {
            let scorersArray = [];

            querySnapshot.forEach((doc) => {
                scorersArray.push({...doc.data(), id: doc.id});
            });

            setScorers(scorersArray);
        });

    }, []);
    return (
        <>
            <div className={"container-xl"}>
                <h4> Top scorers </h4>
            </div>
            <div className={"scorers container-xl"}>
                <div className={"row w-100"}>
                    <div className={'scorers-container col-sm  rounded px-5 py-2 m-2 d-flex'}>
                        <div className={" p-4 text-center col m-auto "}>
                            <img className={"scorers-avatar"} src={gold} alt="gold" />
                        </div>
                        <div className={'scorers-item p-4 text-center col m-auto'}>
                            <div className={'scorers-img rounded-circle m-auto mb-2'}></div>
                            <h5 className={'scorers-text m-0 mb-2 pt-2'}> {!!sortScore.length? sortScore[0].name:""}</h5>
                            <div className={' py-1'}>
                                <div>
                                    <span className={'number-text'}>Score: {!!sortScore.length? sortScore[0].score:""}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {sortScore.length >= 2 &&
                        <div className={'scorers-container col-sm  rounded px-5 py-2 m-2 d-flex'}>
                            <div className={" p-4 text-center col m-auto "}>
                                <img className={"scorers-avatar"} src={silver} alt="gold" />
                            </div>
                            <div className={'scorers-item p-4 text-center col m-auto'}>
                                <div className={'scorers-img rounded-circle m-auto mb-2'}></div>
                                <h5 className={'scorers-text m-0 mb-2 pt-2'}> {!!sortScore.length? sortScore[1].name:""}</h5>
                                <div className={' py-1'}>
                                    <div>
                                        <span className={'number-text'}>Score: {!!sortScore.length? sortScore[1].score:""}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {sortScore.length >= 3 &&
                        <div className={'scorers-container col-sm  rounded px-5 py-2 m-2 d-flex'}>
                            <div className={" p-4 text-center col m-auto "}>
                                <img className={"scorers-avatar"} src={bronze} alt="gold" />
                            </div>
                            <div className={'scorers-item p-4 text-center col m-auto'}>
                                <div className={'scorers-img rounded-circle m-auto mb-2'}></div>
                                <h5 className={'scorers-text m-0 mb-2 pt-2'}> {!!sortScore.length? sortScore[2].name:""}</h5>
                                <div className={' py-1'}>
                                    <div>
                                        <span className={'number-text'}>Score: {!!sortScore.length? sortScore[2].score:""}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </>
    )

}

export default Scorers;
