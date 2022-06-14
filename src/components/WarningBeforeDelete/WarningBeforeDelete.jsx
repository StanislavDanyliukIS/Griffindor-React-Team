import "./WarningBeforeDelete.scss";

const WarningBeforeDelete = ({handleCloseWindow, handleDeleteSubmit, user}) => {

  return(
      <div className={"warning_before_delete position-absolute rounded"}>
          <h5 className={"title py-2"}>
              Do you want delete {user[0].name}?
          </h5>
            <div className={"buttons py-2"}>
                <button  className={"btn btn-primary"} onClick={handleDeleteSubmit}>Delete</button>
                <button className={"btn btn-secondary"} onClick={handleCloseWindow}>Cancel</button>
            </div>
      </div>
  )
}

export default WarningBeforeDelete;