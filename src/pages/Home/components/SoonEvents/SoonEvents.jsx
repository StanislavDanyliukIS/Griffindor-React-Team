import "./SoonEvents.scss";
import SoonEvent from "../SoonEvent/SoonEvent";
import {useEffect, useState} from "react";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../../../../firebase";

const SoonEvents = () => {

    const [dateArr, setDateArr] = useState([]);

    useEffect(() => {
        let q;
        q = query(
            collection(db, "events")
        );

        const dateList = onSnapshot(q, (querySnapshot) => {
            let dateArray = [];

            querySnapshot.forEach((doc) => {
                dateArray.push({...doc.data(), id: doc.id});
            });

            setDateArr(dateArray);
        });

    }, []);

    const sortDate = dateArr.sort((a, b) => {

        if ((new Date(a.date)) < new Date(b.date)) {
            return -1;
        }
        if ((new Date(a.date)) > new Date(b.date)) {
            return 1;
        }
        return 0;
    });

    const filteredDate = sortDate.filter((el)=>new Date(el.date)>Date.now()).slice(0, 6);

    return (
        <div className={"soon_events col"}>
            <h4>Soon Events</h4>
            <div className={"soon_events-container row w-100 rounded"}>
                {filteredDate.map((el, idx) => (
                    <SoonEvent name={el.name} date={el.date} number={idx + 1}/>
                ))}
            </div>
        </div>
    )

}

export default SoonEvents;