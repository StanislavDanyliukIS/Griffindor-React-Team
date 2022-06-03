import './SoonEvent.scss';

const SoonEvent = ({name, date, number}) => {
  return(
      <div className={"soon_event container-xl "}>
        <div className={"d-flex"}>
            <div className={"soon_event-number  m-2"}>{number}</div>
            <div className={"flex-column px-3"}>
                <div className={"soon_event-name "}>{name}</div>
                <div className={"soon_event-date "}>{date}</div>
            </div>
        </div>
      </div>
  )
}

export default SoonEvent;