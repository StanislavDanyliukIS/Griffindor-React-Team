export const EditField = ({
	editFormData,
	handleEditFormChange,
	handleEditFormSubmit,
	handleCancelClick,
}) => {
	return (
		<tr>
			<td>
				<input
					className='form-control user-form'
					type='text'
					name='name'
					value={editFormData.name}
					required='required'
					placeholder='Name'
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className='form-control user-form'
					type='email'
					name='email'
					value={editFormData.email}
					required='required'
					placeholder='Email'
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className='form-control user-form'
					type='text'
					name='telephone'
					value={editFormData.telephone}
					required='required'
					placeholder='Telephone'
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className='form-control user-form'
					type='text'
					name='organization'
					value={editFormData.organization}
					required='required'
					placeholder='Company'
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className='form-control user-form'
					type='number'
					name='score'
					value={editFormData.score}
					required='required'
					placeholder='Score'
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					className='form-control user-form'
					type='date'
					name='birthday'
					value={editFormData.birthday}
					required='required'
					placeholder='Date of birth'
					onChange={handleEditFormChange}
				/>
			</td>

      <td>
        <div
          class="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button
            onClick={handleEditFormSubmit}
            type="submit"
            class="btn btn-success"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-save"
              viewBox="0 0 16 16"
            >
              <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
            </svg>
          </button>
          <button
            type="button"
            class="btn btn-danger"
            onClick={handleCancelClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};
