import "./WarningBeforeDelete.scss";

const WarningBeforeDelete = ({handleCloseWindow, handleDeleteSubmit, user}) => {

  return(
      <div className={"warning_before_delete container position-absolute rounded"}>
          <div className={"title py-2"}>
              Are you want delete {user[0].name}?
          </div>
            <div className={"buttons py-2"}>
                <button onClick={handleDeleteSubmit}>Delete</button>
                <button onClick={handleCloseWindow}>Cancel</button>
            </div>
      </div>
  )
}

export default WarningBeforeDelete;